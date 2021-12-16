import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);

  const populateData = async () => {
    console.log("token validated");

    //get the dashbard data from backend api

    await fetch("http://localhost:1500/api/data", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          setQuote(data.quote);
        }
      });
  };

  //check the user logged ine before populate data --> check the token is valid

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);

      if (!user) {
        //invalid token --> not decoded
        localStorage.removeItem("token");
        navigate.replace("/login");
      } else {
        //user is valid
        populateData();
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:1500/api/data", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: quote,
      }),
    }).then((res) => {
      const data = res.json();
      console.log(data);
    });
  };

  return (
    <>
      <div>hello, massege: {quote || "no quote found"}</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            New Quote:
            <input
              type="text"
              onChange={(quote) => {
                setQuote(quote.target.value);
              }}
            />
          </label>
          <br />
          <input type="submit" value="Add Quote" />
        </form>
      </div>
    </>
  );
}

export default Dashboard;
