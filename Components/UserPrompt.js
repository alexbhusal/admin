"use client";
import Swal from "sweetalert2";

const UserPrompt = async (userList) => {
  const inputOptions = userList.reduce((acc, name) => {
    acc[name] = name;
    return acc;
  }, {});

  const result = await Swal.fire({
    title: "Select your username",
    input: "select",
    inputOptions,
    inputPlaceholder: "Choose a username",
    showCancelButton: true,
  });

  return result;
};

export default UserPrompt;
