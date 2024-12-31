import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [captainData, setCaptainData] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCaptainData({ email, password, fullname: { firstname, lastname } });
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
          <h3 className="text-lg font-medium mb-2">
            What&apos;s our Captain&apos;s name
          </h3>
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
          <h3 className="text-lg font-medium mb-2">
            What&apos;s our Captains&apos;s email
          </h3>
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
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-xs leading-tight">
          This site is protected by reCAPTCHA and the Google{" "}
          <span className="font-semibold underline">Privacy Policy</span> and
          <span className="font-semibold underline">Terms of Service</span>{" "}
          apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
