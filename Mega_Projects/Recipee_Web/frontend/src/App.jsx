import React from "react";
import Mainroutes from "./routes/Mainroutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="py-10 px-[10%] w-full  min-h-screen text-white font-thin bg-gray-800">
        <Navbar />
        <Mainroutes />
      </div>
      <div className="px-5 py-3 bg-gray-800 border-t border-t-[#2d4465]">
        <Footer />
      </div>
    </>
  );
};

export default App;
