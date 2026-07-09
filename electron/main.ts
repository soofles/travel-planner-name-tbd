import { app, BrowserWindow, shell } from "electron"
import path from "path"
import { spawn, ChildProcess, exec } from "child_process"
import dotenv from "dotenv"
import fs from "fs"
import { ipcMain } from "electron"

dotenv.config();

function getConfig() {
  const configPath = app.isPackaged
    ? path.join(
      process.resourcesPath,
      "config.json"
    )
    : path.join(
      __dirname,
      "../secrets/config.json"
    );
    console.log("INFO: configPath - ", configPath);
    return JSON.parse(
      fs.readFileSync(configPath, "utf-8")
    )
}

let backendProcess: ChildProcess | null = null;
const config = getConfig();

function startBackend() {
  const backendPath = app.isPackaged
    ? path.join(
      process.resourcesPath,
      "Enroute.exe"
    )
    : path.join(
      __dirname,
      "../backend/EnrouteBackend.exe"
  );
  console.log("INFO: Routing key exists"),
  backendProcess = spawn(backendPath, [], {
    env: {
      ...process.env,
      TRIPS_DB_PATH: path.join(app.getPath("userData"), "trips.db"),
      ROUTING_API_KEY: config.ROUTING_API_KEY,
    },
  });
  console.log("INFO: Backend Process - ", backendProcess.pid);
  backendProcess.stdout?.on("data", (data) => {
    console.log(`INFO: Backend - ${data}`);
  });
  backendProcess.stderr?.on("data", (data) => {
    console.error(`INFO: Backend - ${data}`);
  });
  backendProcess.on("close", (code) => {
    console.log(`INFO: Backend exited with code ${code}`);
  });
}

async function waitForBackend() {
  while(true) {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/"
      );

      if (res.ok) {
        console.log("INFO: Backend Ready");
        return;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  };
}

function stopBackend() {
  if (!backendProcess?.pid) {
    return;
  }
  console.log(`INFO: Stopping Backend ${backendProcess.pid}`);
  exec(
    `taskkill /pid ${backendProcess.pid} /T /F`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("ERROR: stopBackend failed - ", error.message);
        return;
      }
      if (stderr) {
        console.error("ERROR: taskkill Error - ", stderr);
        return;
      }
      console.log("INFO: Backend stopped");
    }
  )
  backendProcess = null;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1070,
    height: 750,
    minWidth: 840,
    minHeight: 470,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  ipcMain.on("window:minimize", () => {
    win.minimize();
  });
  ipcMain.on("window:maximize", () => {
    win.maximize();
  });
  ipcMain.on("window:close", () => {
    win.close();
  });

  win.webContents.setWindowOpenHandler((details) => {
    if (details.url.startsWith("http:") || details.url.startsWith("https:")) {
      shell.openExternal(details.url);
      return { action: "deny" };
    }
    return { action: "allow" }
  })

  if (app.isPackaged) {
    win.loadFile(
      path.join(
        __dirname,
        "../frontend/dist/index.html"
      )
    );
  } else {
    win.loadURL("http://localhost:5173");
  }
}

app.whenReady().then(async () => {
  startBackend();
  await waitForBackend();
  createWindow();
});

app.on("before-quit", () => {
  stopBackend();
  if (process.platform !== "darwin") {
    app.quit();
  }
});