import "./TitleBar.css"

export default function TitleBar() {
    return (
        <header className="title-bar">
            <div className="title">
                <span>🧭</span>
                <span>Enroute</span>
            </div>
            <div className="title-remainder">
                <div className="feature-bar"></div>
                <div className="window-buttons-container">
                    <button className="min-window-button" onClick={() => window.electron.minimize()}>—</button>
                    <button className="max-window-button" onClick={() => window.electron.maximize()}>❐</button>
                    <button className="close-window-button" onClick={() => window.electron.close()}>✕</button>
                </div>
            </div>
        </header>
    )
}