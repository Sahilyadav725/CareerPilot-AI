import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  sendOTP,
  verifyOTP
} from "../../api/authApi";
import toast from "react-hot-toast";
import { Eye, EyeOff, MailCheck } from "lucide-react";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const handleSendOtp = async () => {

  if (!email) {

    toast.error("Enter Email");

    return;

  }

  try {

    setSendingOtp(true);

    const response = await sendOTP(email);

    if (response.success) {

      toast.success(response.message);

      setOtpSent(true);

    } else {

      toast.error(response.message);

    }

  } catch (err) {

    toast.error(

      err.response?.data?.message ||

      "Failed to send OTP"

    );

  }

  setSendingOtp(false);

};
  const handleVerifyOtp = async () => {

  if (otp.length !== 6) {
    toast.error("Please enter a valid 6-digit OTP");
    return;
  }

  try {

    setVerifyingOtp(true);

    const response = await verifyOTP(email, otp);

    if (response.success) {

      toast.success("Email Verified Successfully");

      setOtpVerified(true);

    } else {

      toast.error(response.message || "Invalid OTP");

    }

  } catch (err) {

  toast.error(

    err.response?.data?.detail ||

    "Invalid or Expired OTP"

  );

} finally {

    setVerifyingOtp(false);

  }

};

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");

    if(password!==confirmPassword){

      toast.error("Passwords do not match");

      return;

    }

    try{

      const response = await registerUser({

        name,

        email,

        password

      });

      if(response.success===false){

        setError(response.message);

        return;

      }

      toast.success("Registration Successful");

      navigate("/login");

    }

    catch(err){

      setError(

        err.response?.data?.detail ||

        err.response?.data?.message ||

        "Registration Failed"

      );

    }

  };

  return(

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800">

          Create Account

        </h1>

        <p className="text-center text-slate-500 mt-2">

          Join CareerPilot and start your journey.

        </p>

        <form
        onSubmit={handleRegister}
        className="space-y-5 mt-8">

          <div>

            <label className="block mb-2 font-medium">

              Full Name

            </label>

            <input

            type="text"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            placeholder="Enter your full name"

            className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"

            required

            />

          </div>

          <div>

            <label className="block mb-2 font-medium">

              Email Address

            </label>

            <input

            type="email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            placeholder="Enter your email"

            className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"

            required

            />

            <button

            type="button"

            onClick={handleSendOtp}

            disabled={sendingOtp}

            className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"

            >

              {sendingOtp ? "Sending OTP..." : "Send OTP"}

            </button>

          </div>

          {otpSent && (

            <>

              <div>

                <label className="block mb-2 font-medium">

                  Enter OTP

                </label>

                <input

                type="text"

                maxLength={6}

                value={otp}

                onChange={(e)=>setOtp(e.target.value)}

                placeholder="Enter 6 digit OTP"

                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"

                />

              </div>

              <button

              type="button"

              onClick={handleVerifyOtp}

              disabled={verifyingOtp}

              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"

              >

                {verifyingOtp ? "Verifying..." : "Verify OTP"}

              </button>

              {otpVerified && (

                <div className="flex items-center gap-2 text-green-600 font-medium">

                  <MailCheck size={18}/>

                  Email Verified Successfully

                </div>

              )}
            </>
          )}
          <div>

            <label className="block mb-2 font-medium">

              Create Password

            </label>

            <div className="relative">

              <input

                type={showPassword ? "text" : "password"}

                value={password}

                onChange={(e) => setPassword(e.target.value)}

                placeholder="Create Password"

                disabled={!otpVerified}

                className={`w-full rounded-lg p-3 border outline-none ${
                  otpVerified
                    ? "focus:border-blue-600"
                    : "bg-gray-100 cursor-not-allowed"
                }`}

                required

              />

              <button

                type="button"

                onClick={() => setShowPassword(!showPassword)}

                className="absolute right-4 top-4 text-gray-500"

              >

                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}

              </button>

            </div>

          </div>

          <div>

            <label className="block mb-2 font-medium">

              Confirm Password

            </label>

            <div className="relative">

              <input

                type={showConfirmPassword ? "text" : "password"}

                value={confirmPassword}

                onChange={(e) => setConfirmPassword(e.target.value)}

                placeholder="Confirm Password"

                disabled={!otpVerified}

                className={`w-full rounded-lg p-3 border outline-none ${
                  otpVerified
                    ? "focus:border-blue-600"
                    : "bg-gray-100 cursor-not-allowed"
                }`}

                required

              />

              <button

                type="button"

                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }

                className="absolute right-4 top-4 text-gray-500"

              >

                {showConfirmPassword ? (
                  <EyeOff size={20}/>
                ) : (
                  <Eye size={20}/>
                )}

              </button>

            </div>

          </div>

          {error && (

            <p className="text-red-600 text-sm">

              {error}

            </p>

          )}

          <button

            type="submit"

            disabled={!otpVerified}

            className={`w-full py-3 rounded-lg font-semibold transition ${
              otpVerified
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}

          >

            Register

          </button>

        </form>

      </div>

    </div>

  );

}

export default Register;