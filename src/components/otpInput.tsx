import React, { useEffect, useRef, useState } from "react";

const OTPInput = ({ handleOTP, nextElement }: { handleOTP: any, nextElement: any }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (activeOTPIndex === 6) {
      nextElement.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [activeOTPIndex]);

  const handleChange = async (e: any, index: any) => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value.substring(e.target.value.length - 1);
    setOtp(newOTP);
    setActiveOTPIndex(index + 1);
    if (index === 5) {
      var otpToSend = "";
      otp.forEach((el) => {
        otpToSend = otpToSend + "" + el;
      });
      await handleOTP(otpToSend);
    }
  };

  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-xs font-medium text-gray-900"
      >
        * Enter OTP sent to your mobile
      </label>
      <div className="flex gap-2 pt-2">
        {otp.map((_, index) => {
          return (
            <input
              ref={index === activeOTPIndex ? inputRef : null}
              onChange={(e) => handleChange(e, index)}
              key={index}
              type="number"
              id={"otp" + index}
              autoComplete="off"
              className={` ${index < activeOTPIndex
                ? "text-white bg-blue-700 border-blue-700 "
                : "text-gray-900 bg-gray-50 border-gray-300 "
                } text-center  w-10 h-10 border  text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5`}
            />
          );
        })}
      </div>
      <p className="text-xs pt-2">
        Didn't receive OTP? <span className="font-bold text-blue-700">Resend OTP</span>
      </p>
    </div>
  );
};

export default OTPInput;
