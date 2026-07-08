import "./Settings.css"

interface SettingsProps {
    onToggleSettings: (active: boolean) => void;
}

export default function Settings({
    onToggleSettings,
}: SettingsProps) {
    return (
        <div className="settings">
            <div className="settings-timeline">
                <span className="settings-title">Settings (WIP)</span>
                <div className="settings-menu">
                    <div className="settings-row">
                        <div className="settings-item">Theme</div>
                        <div className="settings-item">UI Scale</div>
                        <div className="settings-item">Unit System</div>
                    </div>
                    <div className="settings-row">
                        <div className="settings-item">Time Display</div>
                        <div className="settings-item">Clear Route Cache</div>
                        <div className="settings-item"></div>
                    </div>
                </div>
            </div>
            <button className="close-settings-button" onClick={() => {onToggleSettings(false)}}>&times;</button>
        </div>
    )
}