import React from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async () => {
    try {
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="p-8 max-w-md border-4 rounded-md shadow-lg">
        <div>
          <h1 className="mb-6 text-center text-white">Validating your password</h1>
          <div className="text-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full mb-10"
              onClick={handleSubmit}
            >
              Validate
            </button>
            <div className="text-white">
              <div className="w-6 h-6 mx-auto border-t-2 border-white rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
