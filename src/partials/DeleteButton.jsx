import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const DeleteButton = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const username = useSelector((state) => state.user.value.username);

  const onDelete = async () => {
    try {
      const response = await axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${blogId}`
      );
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default DeleteButton;
