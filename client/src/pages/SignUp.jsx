import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:1500/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      Navigate.push("/login");
    }
  };

  const handleChange = (event) => {};

  //   useEffect(() => {
  //     console.log(name);
  //   }, [name]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(text) => {
              setName(text.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(text) => {
              setEmail(text.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(text) => {
              setPassword(text.target.value);
            }}
          />
        </label>
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default SignUp;
