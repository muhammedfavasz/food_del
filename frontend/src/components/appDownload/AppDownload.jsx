import { assets } from "../../assets/assets"
import "./appDownload.css"
const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
        <p>For Better Expirience Download <br /> Tomato App</p>
        <div className="app-download-platform">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
      
    </div>
  )
}

export default AppDownload
