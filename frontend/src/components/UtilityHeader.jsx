import { PlusIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

export const UtilityHeader = ({ user }) => {
  const navigate = useNavigate();
  
  return (
    <div
      className="text-white flex flex-col md:flex-row items-center justify-between 
          w-[88%] md:w-[97%] place-self-center px-6 fixed top-24 md:top-24 left-1/2 transform -translate-x-1/2 
          bg-violet-900/30 backdrop-blur-xl border border-violet-500/50 rounded-2xl ring-1 ring-violet-500/20 
          shadow-[0_0_20px_#8b5cf633] gap-5 md:gap-0 py-4 md:py-4 h-auto z-20"
    >
      <div className="flex flex-col items-start w-full md:w-auto">
        <h2 className="text-xl text-left md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300 drop-shadow-md">
          Welcome back!
        </h2>
        <h3 className="font-body text-sm md:text-md">{user.fullName}</h3>
      </div>
      <div className="flex flex-row justify-center items-center gap-6 md:gap-8 text-sm">
        <button
          type="button"
          className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition font-medium shadow cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/path")}
        >
          <PlusIcon className="h-4 w-4" />
          Create Path
        </button>
        <button
          type="button"
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium shadow cursor-pointer flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete Path
        </button>
      </div>
    </div>
  );
};
