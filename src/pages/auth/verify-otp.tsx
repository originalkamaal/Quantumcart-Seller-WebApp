import React, { useEffect } from "react";
import { FormEvent, useState } from "react";
import { OtpData, OtpErrors, UserData } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { registerUserStart, resetRedirectToLogin } from "../../redux/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

import Input from "../../components/input";
import { BtnBorderedRounded } from "../../components/btnBorderedRounded";
import { CgSpinner } from "react-icons/cg";
import AuthPageContainer from "../../containers/auth_pages_container";
import AuthFormTitles from "../../components/auth_form_title";
import CheckAuth from "../../containers/check_auth";

const VerifyOTP = () => {
  const user = useSelector((state: any) => state.auth.user);
  const redirectToLogin = useSelector((state: any) => state.auth.redirectToLogin);

  useEffect(() => {
    // Check if the userData is not passed via location.state, which implies the screen was directly accessed
    if (!location.state) {
      navigator("/", { replace: true }); // Navigate to the "/" route
    }
  }, []);
  const navigator = useNavigate();
  const location = useLocation();
  const { userData }: { userData: UserData } = location.state ?? {};
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const [otpErrors, setOtpErrors] = useState<OtpErrors>({});
  const [otpData, setOtpData] = useState<OtpData>({
    emailOtp: "",
    phoneOtp: "123456",
  });


  useEffect(() => {
    // Check if redirectToLogin is true, then navigate to the login page
    if (redirectToLogin) {
      navigator('/login');
      // After navigating, reset the flag
      dispatch(resetRedirectToLogin());
    }
  }, [redirectToLogin, navigator, dispatch]);

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors: OtpErrors = {};
    // if (!otpData.emailOtp) {
    //   errors.emailOtp = "Email OTP is required";
    // }
    if (!otpData.phoneOtp) {
      errors.phoneOtp = "Phone OTP is required";
    }

    if (Object.keys(errors).length > 0) {
      setOtpErrors(errors);
    } else {
      if (window.confirmationResult) {
        window.confirmationResult
          .confirm(otpData.phoneOtp)
          .then((result: any) => {
            dispatch(
              registerUserStart({
                name: userData.name,
                phone: "91" + userData.phone,
                email: userData.email,
                password: userData.password,
                receiveWhatsAppUpdates: userData.receiveWhatsAppUpdates,
              }),
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  return (
    <AuthPageContainer>
      <div className=" bg-white rounded-lg p-10  md:mx-0 mx-4 md:w-[500px] w-full shadow-2xl overflow-x-auto flex flex-col items-center justify-center">
        <form onSubmit={handleOtpSubmit} className="w-full">
          <AuthFormTitles title="Verify OTP" subtitle="Enter OTP sent to your phone" />

          <div className="w-full">
            <Input
              type="number"
              maxLength={6}
              placeholder="Phone OTP"
              value={otpData.phoneOtp}
              onChange={(e) => setOtpData({ ...otpData, phoneOtp: e.target.value })}
            />
            {otpErrors.phoneOtp && (
              <span className="text-red-500 text-sm">{otpErrors.phoneOtp}</span>
            )}
          </div>
          <div className="pb-2"></div>

          <BtnBorderedRounded type="submit" className="w-full bg-yellow-400">
            {isLoading ? <CgSpinner className="animate-spin duration-300 w-6 h-6" /> : "Verify"}
          </BtnBorderedRounded>
        </form>
      </div>
    </AuthPageContainer>
  );
};

export default CheckAuth(VerifyOTP);
