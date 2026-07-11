# Enroute

Enroute is a travel planner app I created to replace the 15 browser tabs, Excel spreadsheet, and Notion page I used to organize my trips.

PSA: This app is in alpha and is my first solo dev project! There **will** be bugs and weirdness. [See how you can give feedback here!](#contributing)

## Screenshots

![Main Window](/screenshots/enroute1.png)
![Main Window + Sidebar](/screenshots/enroute2.png)

## Features / Usage

Create, store, and update trips as you plan them out! These trips contain stops, which can range from the hotel you plan to stay at to fun activities you want to do. Trip detailed can be edited within the page, Notion-style. Stop details are accessed through a sidebar that opens when you select one.

After creating stops, routes are automatically calculated between two stops given two addresses. Some basic trip statistics are also calculated to help with some budgeting math and for fun!

No user account is required to use the app, and all of your data is stored locally. The only data that makes it out of your local device are stop addresses to do routing.

## Installation

### Windows
1. Go to **Releases**
2. Download the latest ```Enroute Setup X.X.X.exe```
3. Run the installer
4. The app should automatically run upon finishing the installation. If not, feel free to search for it through your Windows search bar!

By default, our data is preserved on your machine after uninstalling through Windows Settings. If you want to delete all traces of the app from your machine, you can delete these folders:
- ```C:\Users\[user]\AppData\Local\enroute-updater```
- ```C:\Users\[user]\AppData\Roaming\enroute```

## Tech Stack

- Electron
    - Desktop app framework
- React + Vite
    - Frontend
- FastAPI
    - Backend
- SQLite3
    - Local database

## WIP Features / Known Issues
- More customization! Lots of emojis and colors for everyone!
- More robust trip analytics
- More settings and preferences (themes, unit systems, etc.)
- Stop autosave

## Contributing

Feel free to contact me through email at soph@soofles.me to report any bugs or request any features.

## Credits

### Map Data & Geocoding

All map data used is sourced from OpenStreetMap © OpenStreetMap contributors.

Address search and geocoding features use Nominatim.

https://www.openstreetmap.org/copyright

### Route Calculation

Route calculation uses openrouteservice © HeiGIT and openrouteservice contributors

https://openrouteservice.org

## License

This project is licensed under the MIT License. [See the LICENSE file for details.](LICENSE)