import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const captainData = { email, password };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captainData
    );

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img src="/logo-black.png" alt="logo" className="w-24 mb-10" />
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="bg-[#eeeeee] px-4 py-2 mb-7 border w-full text-lg rounded placeholder:text-base"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] px-4 py-2 mb-7 border w-full text-lg rounded placeholder:text-base"
          />
          <button className="bg-[#111] text-white font-semibold px-4 py-2 mb-3 w-full text-lg rounded">
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] text-white flex items-center justify-center font-semibold px-4 py-2 mb-5 w-full text-lg rounded"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
