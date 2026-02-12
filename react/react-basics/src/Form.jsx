import { useState } from "react";
export default function Form() {
  let [formData, setFormData] = useState({
    fullName: "mdtowfikomer",
    userName: "towfik",
    password: "",
  });
  let changeFormData = (event) => {
    setFormData((curData) => {
      return { ...curData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      fullName: "",
      userName: "",
      password: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Enter your Full name"
        value={formData.fullName}
        onChange={changeFormData}
      />
      <br />
      <br />
      <input
        type="text"
        name="userName"
        placeholder="Enter your User name"
        value={formData.userName}
        onChange={changeFormData}
      />
      <br />
      <br />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={changeFormData}
      />
      <br />
      <br />
      <button>submit</button>
    </form>
  );
}
