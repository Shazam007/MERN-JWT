import React, { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:1500/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    //check the token is coming || token is the 'user'
    if (data.user) {
      alert("Logged in");
      localStorage.setItem("token", data.user);
      window.location.href = "/dashboard";
    } else {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
