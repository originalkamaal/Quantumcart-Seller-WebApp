import React, { useRef, useState } from "react";
import Input from "../../components/input";
import { BtnBorderedRounded } from "../../components/btnBorderedRounded";
import { FormGroupLabel } from "../../components/formGroupLabel";
import useOutsideAlerter from "../../helpers/utils";
import { AiOutlineClose } from "react-icons/ai";
import AuthFormTitles from "../../components/auth_form_title";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgSpinner } from "react-icons/cg";
import { loginUserStart } from "../../redux/slices/authSlice";
import AuthPageContainer from "../../containers/auth_pages_container";
import CheckAuth from "../../containers/check_auth";


const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("kamalkakhan@gmail.com");
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const [password, setPassword] = useState("Kayu@2024");
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeModal);

  const handleLogin = () => {
    if (isValidLogin(username, password)) {
      dispatch(loginUserStart({ username, password }));
    } else {
      setError("Invalid username or password");
    }
  };

  const isValidLogin = (username: string, password: string): boolean => {
    return username.trim() !== "" && password.trim() !== "";
  };

  return (
    <AuthPageContainer>

      <div
        ref={wrapperRef}
        className="relative bg-white rounded-lg p-10 md:mx-0 mx-4 md:w-[500px] w-full shadow-2xl overflow-x-auto flex flex-col"
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <AiOutlineClose />
        </button>

        <AuthFormTitles title="Welcome Back" subtitle="Login to your account" />

        <div className=" w-full">
          <FormGroupLabel title="Phone or Email" />

          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Phone or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />

          <div className="flex justify-between">
            <FormGroupLabel title="Password" />
            <div className="text-xs text-blue-500 underline cursor-pointer">
              Forgot password?
            </div>{" "}
          </div>

          <Input
            type="password"
            name="password"
            id="password"
            ifError={error}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
        </div>

        <BtnBorderedRounded type="button" className="w-full bg-green-400" onClick={handleLogin}>
          {isLoading ? <CgSpinner className="animate-spin duration-300 w-6 h-6" /> : "Login"}
        </BtnBorderedRounded>
        <p className="mt-2 text-gray-600 text-xs text-center">
          By continuing, I agree to KayuKart’s{" "}
          <span className="text-blue-500 underline cursor-pointer">Terms of Use</span> &{" "}
          <span className="text-blue-500 underline cursor-pointer">Privacy Policy</span>
        </p>
        <p className="mt-2 text-gray-600 text-sm text-center">
          Don't have an account?{" "}
          <BtnBorderedRounded
            className="w-full  mt-4"
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign up
          </BtnBorderedRounded>
        </p>
      </div>
    </AuthPageContainer>
  );
};

export default CheckAuth(Login);
