import React, { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensures cookies are sent/received if backend sets them
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
    //   setTitle("");
    //   setLoad("");
    //   setReps("");
    //   setError(null);


      console.log("Successfully log in ");
      console.log(json);
    }
  };
  return (
    <div className="flex flex-col justify-center">
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="border-2"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="border-2"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
