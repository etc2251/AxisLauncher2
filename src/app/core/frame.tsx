import { useState, useEffect } from "react";
import { HiX, HiMinusSm } from "react-icons/hi";
import { getVersion } from "@tauri-apps/api/app"
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

function Frame() { 
  const [players, setPlayers] = useState(0);
  const [version, setVersion] = useState<string | null>("");
  
  useEffect(() => {
    const setLauncherVersion = async () => {
      const version = await getVersion();
      setVersion(version);
    }
    setLauncherVersion();
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-[50px] bg-transparent z-50">
      <div data-tauri-drag-region className="absolute inset-0 right-[80px]"/>
      <span className="absolute mb-5 text-[18px] text-white frame-text">
        AXIS
        <small className="text-[15px] frame-version-text">v{version}</small>
        <p className="text-[15px] font-200 uppercase frame-players-text">{players} Players Online</p>
      </span>
      <div className="absolute right-[15px] h-full flex items-center gap-2">
        <button 
          className="relative p-1 rounded-full text-white hover:text-[#b6b6b6] transition-colors duration-100 cursor-pointer z-50"
          onClick={() => getCurrentWebviewWindow().minimize()}
        >
          <HiMinusSm size={20} />
        </button>
        <button 
          className="relative p-1 rounded-full text-white hover:text-[#b6b6b6] transition-colors duration-100 cursor-pointer z-50"
          onClick={() => getCurrentWebviewWindow().close()}
        >
          <HiX size={20} />
        </button>
      </div>
    </div>
  );
};

export default Frame;