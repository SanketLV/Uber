import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img src="/logo-black.png" alt="logo" className="w-24 mb-10" />
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <h3 className="text-lg font-medium mb-2">What&apos;s your name</h3>
          <div className="flex gap-3 mb-7">
            <input
              type="text"
              required
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="bg-[#eeeeee] px-4 py-2 border w-1/2 text-lg rounded placeholder:text-base"
            />
            <input
              type="text"
              required
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="bg-[#eeeeee] px-4 py-2 border w-1/2 text-lg rounded placeholder:text-base"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
          <input
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-xs leading-tight">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
