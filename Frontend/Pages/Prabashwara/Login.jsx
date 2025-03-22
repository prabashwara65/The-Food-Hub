import React, {  useState } from "react";
import { useDispatch } from 'react-redux';
import { setUser } from '../../ReduxToolKit/userSlice';
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {

      setEmail("");
      setPassword("")

      console.log(result.role)

    dispatch(setUser({
        name: result.name,
        email: result.email,
    }))

    if(result.role == "user"){
      navigate("/")
    }

    else if (result.role == "admin"){
      navigate("/")
    }


      console.log("Successfully log in ");
      console.log(result.email);
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
