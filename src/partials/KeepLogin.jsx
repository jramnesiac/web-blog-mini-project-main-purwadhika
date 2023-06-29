import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { setValue } from "../redux/userSlice";

function KeepLogin() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const keepLogin = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setValue(response.data));
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return null;
}

export default KeepLogin;