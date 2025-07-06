import React from "react";
import { Leaf } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-green-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full border-4 border-amber-500 border-t-transparent h-16 w-16"></div>
        <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
          <Leaf className="text-green-600 animate-pulse" />
          <span>Loading, please wait...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
