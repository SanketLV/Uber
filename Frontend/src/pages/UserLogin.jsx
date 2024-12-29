import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserData({ email, password });
    console.log(userData);
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
          New Here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] text-white flex items-center justify-center font-semibold px-4 py-2 mb-5 w-full text-lg rounded"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
