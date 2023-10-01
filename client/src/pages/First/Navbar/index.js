import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
      <div className="bg-third">
        <div className="p-1">
          <div className="header p-2 bg-primary flex justify-between rounded items-center">
            <h1
              className="text-2xl text-black font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              BIBLIOTEKA
            </h1>
  
            <div className="flex items-center gap-1 bg-white p-1 rounded">
              <i className="ri-user-heart-line"></i>
              <span
                className="text-sm cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Prijavite se
              </span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Navbar