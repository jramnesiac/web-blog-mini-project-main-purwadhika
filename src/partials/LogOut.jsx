import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearValue } from "../redux/userSlice";
import React from 'react'

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem("token");

   
    dispatch(clearValue());

    // Redirect ke HOME
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn text-white bg-red-600 hover:bg-red-700"
    >
      Log Out
    </button>
  );
}

export default LogOut;
