import "./About.css"

interface AboutProps {
    onTogglePage: (active: string) => void;
}

export default function About({
    onTogglePage,
}: AboutProps) {
    return (
        <div className="about">
            <span>About Enroute</span>
            <p>Enroute is a travel planner app created to help you organize your trips in one place.</p>
            <p>You can find extra documentation here: <a href="https://github.com/soofles/enroute" target="_blank" rel="noopener noreferrer"><strong>GitHub Repository</strong></a></p>
            <p>Version 0.1.0 (Alpha) © 2026 Sophie Tonthat</p>
            <span>Privacy</span>
            <p>No user account is required to use this app.</p>
            <p>All of your the data in Enroute is stored locally on your device.</p>
            <p>Location searching and route calculation may use third-party services to enable the use of said features.</p>
            <span>Credits</span>
            <p><strong>Map data:</strong> © OpenStreetMap contributors</p>
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">https://www.openstreetmap.org/copyright</a>
            <p></p>
            <p><strong>Geocoding:</strong> Nominatim</p>
            <p><strong>Routing:</strong> openrouteservice © HeiGIT and openrouteservice contributors</p>
            <a href="https://openrouteservice.org" target="_blank" rel="noopener noreferrer">https://openrouteservice.org</a>

            <button className="close-about-button" onClick={() => {onTogglePage("")}}>&times;</button>
        </div>
    )
}