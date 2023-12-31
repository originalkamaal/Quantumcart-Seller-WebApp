import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CgSpinner } from "react-icons/cg";
import Input from "./input";
import { FormGroupLabel } from "./formGroupLabel";
import AuthPageContainer from "../containers/auth_pages_container";
import { BtnBorderedRounded } from "./btnBorderedRounded";
import verifyGST from "../helpers/fetch_gst";
import { GSTVerificationResult } from "../types";

export const RegisterStepTwo = () => {
  const navigate = useNavigate();
  const [loadingForGST, setLoadingForGST] = useState(false);
  const [gstinNumber, setGstinNumber] = useState("");
  const [panNumber, setPANNumber] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState<GSTVerificationResult | null>(null);
  const [errors, setErrors] = useState({
    gstin: "",
    pan: "",
    aadhar: "",
  });

  const handleNext = () => {
    navigate("/auth/register/step-three", { replace: true });
  };
  const validateGSTIN = (value: any) => {
    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;
    return regex.test(value);
  };

  const validatePAN = (value: any) => {
    const regex = /^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$/;
    return regex.test(value);
  };

  const validateAadhar = (value: any) => {
    const regex = /^\d{12}$/;
    return regex.test(value);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "gstNumber") {
      setGstinNumber(value.toUpperCase()); // Convert to uppercase
      if (validateGSTIN(value)) {
        setErrors({ ...errors, gstin: "" });
        verifyGSTNumber(value); // Trigger verification when GSTIN matches the format
      } else {
        setErrors({ ...errors, gstin: "Invalid GSTIN format" });
        setVerificationResult(null); // Reset verification result if GSTIN is invalid
      }
    } else if (name === "panNumber") {
      setPANNumber(value.toUpperCase()); // Convert to uppercase
      if (!validatePAN(value)) {
        setErrors({ ...errors, pan: "Invalid PAN format" });
      } else {
        setErrors({ ...errors, pan: "" });
      }
    } else if (name === "adharNumber") {
      setAdharNumber(value);
      if (!validateAadhar(value)) {
        setErrors({ ...errors, aadhar: "Invalid Aadhar format" });
      } else {
        setErrors({ ...errors, aadhar: "" });
      }
    }
  };

  const verifyGSTNumber = async (gstinNum: any) => {
    setLoadingForGST(true);
    try {
      const result = await verifyGST(gstinNum.toUpperCase());
      setVerificationResult(result);
      setLoadingForGST(false);
    } catch (error: any) {
      setLoadingForGST(false);
    }
  };

  return (
    <AuthPageContainer>
      <div className="bg-white rounded-lg p-10 shadow-2xl overflow-x-auto flex flex-col items-center justify-center">
        <h3 className="w-80 mb-4 text-lg leading-none text-gray-900 font-bold">
          Business Details
        </h3>
        <div className="pb-4 w-full">
          <FormGroupLabel title="PAN & Aadhar Details" />

          <Input
            type="text"
            name="panNumber"
            id="panNumber"
            maxLength={10}
            placeholder="Enter PAN Number"
            value={panNumber}
            onChange={handleInputChange}
            required={true}
          />
          {errors.pan && <p className="text-red-500 text-xs">{errors.pan}</p>}
          <Input
            type="number"
            value={adharNumber}
            name="adharNumber"
            id="adharNumber"
            maxLength={12}
            onChange={handleInputChange}
            placeholder="Enter Aadhar Number"
            required={true}
          />
          {errors.aadhar && <p className="text-red-500 text-xs">{errors.aadhar}</p>}
          <p className="text-xs font-semibold pb-2">GST Details</p>

          <Input
            type="text"
            name="gstNumber"
            id="gstNumber"
            value={gstinNumber}
            maxLength={15}
            onChange={handleInputChange}
            placeholder="Enter GST Number"
            required={true}
          />
          {errors.gstin && <p className="text-red-500 text-xs">{errors.gstin}</p>}
          {!loadingForGST ? (
            <>
              {verificationResult &&
              (verificationResult as any).gstStatus &&
              (verificationResult as any).gstStatus == "Active" ? (
                <>
                  <p className="font-bold text-xs text-green-600">
                    Your GST number is {(verificationResult as any).gstStatus}
                  </p>
                  <div className="rounded-md bg-blue-50 p-4 w-80 my-2 border border-blue-700">
                    <div className="flex flex-col">
                      <div className="font-semibold text-gray-600 text-sm pb-2">
                        {(verificationResult as any).businessName}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {(verificationResult as any).businessAddress} -{" "}
                        {(verificationResult as any).businessPincode}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="font-bold text-xs text-red-500">GST number verification failed</p>
              )}
            </>
          ) : (
            <>
              <CgSpinner className="animate-spin duration-300" />
            </>
          )}
        </div>
        <BtnBorderedRounded className="w-full bg-yellow-400" onClick={handleNext}>
          Next
        </BtnBorderedRounded>

        {/* <button onClick={() => setCurrentStep(currentStep + 1)} className='pl-5'>  Ghost Navigation</button> */}
      </div>
    </AuthPageContainer>
  );
};
