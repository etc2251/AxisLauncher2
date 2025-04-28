import React, { useEffect, useState } from "react";
import { useNavigate, Route, Routes, Navigate } from "react-router"
import Frame from "./core/frame";

const App: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdating) {
        navigate('/update');
    }
}, [navigate]);

useEffect(() => {
    if (!isUpdating) {
        navigate('/');
    }
}, [navigate]);

if (isUpdating) {
  return (
      <main className="min-h-screen min-w-full bg">
      <Frame />
      <Routes>
          <Route path="/update" element={<Prepare setIsUpdating={setIsUpdating} />} />
          <Route path="*" element={<Navigate to="/update" />} />
      </Routes>
      </main>
  );
}
  return (
    <>
      <main className="min-h-screen min-w-full bg">
        <Frame />
        
      </main>
    </>
  );
}

export const Prepare: React.FC<{ setIsUpdating: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsUpdating }) => {
  const [status, setStatus] = useState<string>("");
  const [subStatus, setSubStatus] = useState<string>("");
  const nav = useNavigate();

  const updateApp = async () => {
    try {
      setIsUpdating(true);
      setStatus("Preparing");
      setSubStatus("Please wait, this may take a few seconds.");
      await new Promise((resolve) => setTimeout(resolve, 4000));
      nav("/");
    } catch (error) {
      console.error("failed", error);
    } finally {
      setIsUpdating(false);
      nav("/");
    }
  };

  useEffect(() => {
    updateApp();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen text-center z-5">
      <div className="w-[350px] min-h-[200px] bg-[#0e2743] text-white p-5 rounded-2xl border-2 border-[#153b67] shadow-lg flex flex-col items-center justify-center relative gap-4">
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-2xl font-bold text-text-light">
            {status || "Preparing"}
          </h1>
          <p className="text-[13px] font-extralight text-text-light">
            {subStatus || "Please wait, this may take a few seconds."}
          </p>
        </div>
        <div className="h-10 w-10 mt-4 animate-spin border-4 border-t-transparent border-white rounded-full"></div>
      </div>
    </div>
  );  
};

export default App;
