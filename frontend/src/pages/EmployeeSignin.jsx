import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import api from "../services/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/UseAuth";

export default function EmployeeSignin() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [screen, setScreen] = useState("email");
  const [email, setEmail] = useState("");
  const [accessCode, setAcesscode] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const handleCreateAcessCode = async () => {
    try {
      setDisableButton(true);
      if (!email) {
        return toast.error("Please enter email number");
      }
      //validate the email number

      //Check if the email is registered

      //Send SMS OTP
      const res = await api.post("/LoginEmail", { email });
      if (res.status) {
        toast.success(res.message);
        setScreen("validate");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDisableButton(false);
    }
  };

  const handleValidateAcessCode = async () => {
    try {
      setDisableButton(true);
      if (!accessCode) {
        return toast.error("Please enter validate code");
      }

      const res = await api.post("/ValidateAccessCodeEmail", {
        email,
        accessCode,
      });
      if (res.status) {
        toast.success(res.message);
        setUser(res.data);
        navigate("/dashboard/employee");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDisableButton(false);
    }
  };

  const handleResendCode = async () => {
    //Check reverse timing, avoid spam

    //ressend
    await handleCreateAcessCode();
  };

  return (
    <div className="relative min-w-sm text-center border border-gray-300 rounded-md flex flex-col pb-4 pt-12 px-5 gap-4">
      {screen === "email" ? (
        <>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="hover:cursor-pointer absolute top-2 left-3 flex flex-row items-center"
          >
            <IoIosArrowRoundBack className="w-10 h-10 text-gray-700" />
            <span className="font-semibold text-sm">Back</span>
          </button>
          <h1 className="text-4xl font-semibold ">Sign In</h1>
          <p className="text-gray-500 mb-6">
            Please enter your email to sign in
          </p>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="large"
            placeholder="Your Email"
            required
          ></Input>
          <Button
            onClick={handleCreateAcessCode}
            size="large"
            type="primary"
            className="mt-3"
            disabled={disableButton}
          >
            Next
          </Button>
          <p className="text-gray-600/90 mb-8 text-sm">
            passwordless authentication methods.
          </p>
          <div className="flex flex-row text-sm gap-1">
            <p>Don’t having account?</p>
            <Link
              to={"#"}
              className="text-blue-500 font-semibold hover:cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setScreen("email")}
            type="button"
            className="absolute top-2 left-3 flex flex-row items-center"
          >
            <IoIosArrowRoundBack className="w-10 h-10 text-gray-700" />
            <span className="font-semibold text-sm">Back</span>
          </button>
          <h1 className="text-4xl font-semibold ">Email verification</h1>
          <p className="text-gray-500 mb-6">
            Please enter your code that send to your email
          </p>
          <Input
            type="number"
            value={accessCode}
            onChange={(e) => setAcesscode(e.target.value)}
            size="large"
            placeholder="Enter Your code"
            required
          ></Input>
          <Button
            onClick={handleValidateAcessCode}
            size="large"
            type="primary"
            className="mt-3"
            disabled={disableButton}
          >
            Submit
          </Button>
          <p className="text-gray-600/90 mb-8 text-sm">
            passwordless authentication methods.
          </p>
          <div className="flex flex-row text-sm gap-1">
            <p>Code not receive?</p>
            <button
              type="button"
              onClick={handleResendCode}
              className="text-blue-500 font-semibold hover:cursor-pointer"
            >
              Send again
            </button>
          </div>
        </>
      )}
    </div>
  );
}
