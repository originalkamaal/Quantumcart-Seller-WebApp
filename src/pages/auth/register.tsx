import { useState, FormEvent, useEffect } from "react";
import Input from "../../components/input";
import AuthPageContainer from "../../containers/auth_pages_container";
import { BtnBorderedRounded } from "../../components/btnBorderedRounded";
import { CgSpinner } from "react-icons/cg";

import { auth } from "../../helpers/firebase";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, User } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { OtpData, OtpErrors, UserData, UserDataErrors } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AuthFormTitles from "../../components/auth_form_title";
import CheckAuth from "../../containers/check_auth";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult | null;
  }
}

const RegisterStepOne = () => {
  var isLoading = useSelector((state: any) => state.auth.isLoading);
  const [isValidPass, setIsValidPass] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<any>(null);

  const [userData, setUserData] = useState<UserData>({
    name: "Ahmed Kamal Faridee khan",
    phone: "9999999999",
    email: "kk@kk.com",
    password: "Kayu@2024",
    confirmPassword: "Kayu@2024",
    receiveWhatsAppUpdates: false,
  });

  const navigator = useNavigate();

  const [userDataErrors, setUserDataErrors] = useState<UserDataErrors>({});

  useEffect(() => {
    onCaptchaVerify();
  }, []);

  const validatePhone = (value: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(value);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
  };

  const handleUserDataSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors: UserDataErrors = {};
    if (!userData.name) {
      errors.name = "Name is required";
    }
    if (!userData.phone) {
      errors.phone = "Phone number is required";
    }
    if (userData.phone.length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!validatePhone(userData.phone)) {
      errors.phone = "Phone number must only contain numbers";
    }
    if (!userData.email) {
      errors.email = "Email is required";
    }
    if (!validateEmail(userData.email)) {
      errors.email = "Please provide a valid email address";
    }
    if (userData.password.length < 8) {
      errors.password = "Please enter at least 8 characters";
    }
    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = "Please enter the same password";
    }

    if (Object.keys(errors).length > 0) {
      setUserDataErrors(errors);
    } else {
      setUserDataErrors({});
      onSignUp();
    }
  };

  const maxRetryAttempts = 3;
  let retryCount = 0;

  const onCaptchaVerify = () => {
    if (!recaptchaVerifier) {
      const newRecaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "normal",
        callback: (response: any) => { },
        "expired-callback": function () {
          if (retryCount < maxRetryAttempts) {
            retryCount++;
            onCaptchaVerify();
          } else {
            console.error("reCAPTCHA expired after multiple retries");
          }
        },
      });

      setRecaptchaVerifier(newRecaptchaVerifier);
    }
  };

  const onSignUp = () => {
    const phone = "+91" + userData.phone;
    signInWithPhoneNumber(auth, phone, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent successfully!");

        const propsToPass = {
          userData,
        };
        navigator("/verify-otp", { state: propsToPass });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AuthPageContainer>
      <div className="fixed right-1 bottom-1" id="recaptcha-container"></div>
      <div className=" bg-white rounded-lg p-10  md:mx-0 mx-4 md:w-[500px] w-full shadow-2xl overflow-x-auto flex flex-col items-center justify-center">
        <form onSubmit={handleUserDataSubmit} className="w-full">
          <div className="leading-none pb-4">
            <AuthFormTitles title="Create Account" subtitle=" Grow Your Business with Us" />
          </div>

          <div className="w-full">
            <div>
              <Input
                type="text"
                name="seller_name"
                id="seller_name"
                value={userData.name}
                ifError={userDataErrors.name}
                placeholder="Enter Full Name"
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                required={true}
              />
              <div className={`flex ${!userDataErrors.phone && "mb-4"}`}>
                <input
                  type="number"
                  name="number"
                  id="number"
                  className=" bg-gray-50 w-12 placeholder:text-xs  text-center border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block py-2.5"
                  placeholder="+91"
                  disabled
                />
                <input
                  type="number"
                  value={userData.phone}
                  onChange={(e) => {
                    if (e.target.value.length <= 10) {
                      setUserData({ ...userData, phone: e.target.value });
                    }
                  }}
                  className=" bg-gray-50 w-full tracking-[6px] text-center placeholder:tracking-normal placeholder:text-xs border ml-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5"
                  placeholder="Enter 10 Digit Mobile"
                  required={true}
                />
              </div>
              {userDataErrors.phone && (
                <span className="text-red-500 pb-4 text-sm">{userDataErrors.phone}</span>
              )}
              <Input
                type="email"
                placeholder="Email"
                ifError={userDataErrors.email}
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Password"
                ifError={userDataErrors.password}
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                ifError={userDataErrors.confirmPassword}
                value={userData.confirmPassword}
                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
              />

              <div className="rounded-md border-grey-300 special-password-check mb-4">
                <PasswordChecklist
                  className={`${userData.password.length > 0 ? "flex flex-col" : "hidden"
                    } font-light text-xs`}
                  rules={["minLength", "specialChar", "number", "capital", "match"]}
                  minLength={8}
                  value={userData.password}
                  valueAgain={userData.confirmPassword}
                  onChange={(isValid) => {
                    setIsValidPass(isValid);
                  }}
                />
              </div>

              <label className="flex items-center space-x-2 pb-4">
                <input
                  type="checkbox"
                  name="receiveWhatsAppUpdates"
                  id="receiveWhatsAppUpdates"
                  checked={userData.receiveWhatsAppUpdates}
                  onChange={(e) =>
                    setUserData({ ...userData, receiveWhatsAppUpdates: e.target.checked })
                  }
                  className="form-checkbox text-blue-600 border-gray-300 p-2 focus:ring-blue-600"
                />
                <span className="text-xs text-gray-700 flex gap-1">
                  I want to receive important updates on{" "}
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#43A92C"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.071 4.929A10 10 0 0012 2C6.477 2 2 6.477 2 12c0 1.97.57 3.8 1.55 5.35L2 22l4.65-1.55C8.2 21.43 10.03 22 12 22c5.523 0 10-4.477 10-10a10 10 0 00-2.929-7.071zM16.85 14.01a15.46 15.46 0 01-.099-.051l-1.67-.88-.01-.003c-.224-.079-.383-.134-.57.113l-.81.94c-.15.16-.3.18-.54.04-.039-.021-.092-.046-.159-.078A6.251 6.251 0 0111.2 12.87c-.7-.69-1.2-1.52-1.32-1.78-.137-.244-.007-.374.111-.491L10 10.59l.39-.42.27-.41c.09-.16.05-.31-.01-.44l-.69-1.87c-.172-.463-.361-.456-.507-.451L9.41 7h-.47c-.17-.03-.44 0-.68.26l-.007.006c-.264.244-.893.825-.943 2.034-.04 1.23.8 2.44.92 2.61l.056.088c.313.501 1.765 2.83 4.054 3.832 2.053.899 2.42.825 2.744.76.068-.013.135-.026.216-.03.46-.02 1.5-.56 1.7-1.12.25-.57.27-1.07.21-1.18-.043-.086-.168-.15-.361-.25z"
                      fill="#43a92c"
                    ></path>
                  </svg>{" "}
                  WhatsApp
                </span>
              </label>
            </div>

            <BtnBorderedRounded type="submit" className="w-full bg-yellow-400">
              {isLoading ? <CgSpinner className="animate-spin duration-300 w-6 h-6" /> : "Next"}
            </BtnBorderedRounded>
            <p className="mt-2 text-gray-600 text-xs text-center">
              By continuing, I agree to KayuKart’s{" "}
              <span className="text-blue-500 underline cursor-pointer">Terms of Use</span> &{" "}
              <span className="text-blue-500 underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </form>
      </div>
    </AuthPageContainer>
  );
};


export default CheckAuth(RegisterStepOne)