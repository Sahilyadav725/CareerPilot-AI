import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  sendOTP,
  verifyOTP,
  resetPassword
} from "../../api/authApi";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {

    if (!email) {

      toast.error("Enter Email");

      return;

    }

    try {

      setLoading(true);

      const response = await sendOTP(email);

      if (response.success) {

        toast.success(response.message);

        setOtpSent(true);

      }

    } catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Failed to send OTP"

      );

    }

    setLoading(false);

  };

  const handleVerifyOtp = async () => {

    if (otp.length !== 6) {

      toast.error("Enter valid OTP");

      return;

    }

    try {

      setLoading(true);

      const response = await verifyOTP(

        email,

        otp

      );

      if (response.success) {

        toast.success(response.message);

        setOtpVerified(true);

      }

    } catch (err) {

      toast.error(

        err.response?.data?.message ||

        err.response?.data?.detail ||

        "OTP Verification Failed"

      );

    }

    setLoading(false);

  };

  const handleResetPassword = async () => {

  if (password.length < 8) {

    toast.error("Password must be at least 8 characters");

    return;

  }

  if (password !== confirmPassword) {

    toast.error("Passwords do not match");

    return;

  }

  try {

    setLoading(true);

    const response = await resetPassword(

      email,

      password

    );

    if (response.success) {

      toast.success(response.message);

      navigate("/login");

    } else {

      toast.error(response.message);

    }

  } catch (err) {

    toast.error(

      err.response?.data?.message ||

      "Failed to reset password"

    );

  }

  setLoading(false);

};

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">

          Forgot Password

        </h1>

        <p className="text-center text-gray-500 mt-2">

          Reset your CareerPilot password

        </p>

        <div className="mt-8 space-y-5">

  <input
    type="email"
    placeholder="Enter Registered Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
  />

  <button
    onClick={handleSendOtp}
    disabled={loading}
    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
  >
    Send OTP
  </button>

  {otpSent && (

    <>

      <input
        type="text"
        maxLength={6}
        placeholder="Enter OTP"
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
        className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
      />

      <button
        onClick={handleVerifyOtp}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
      >
        Verify OTP
      </button>

    </>

  )}

  {otpVerified && (

    <>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
      />

      <button
        onClick={handleResetPassword}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
      >
        Update Password
      </button>

    </>

  )}

</div>

        {/* Remaining UI next step */}

      </div>

    </div>

  );

}

export default ForgotPassword;