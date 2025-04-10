import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setAuth(true); 
        navigate("/dashboard"); 
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);  
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleLogin} className="mt-4">
          <input type="text" placeholder="Email" className="w-full p-2 border rounded mb-2"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;