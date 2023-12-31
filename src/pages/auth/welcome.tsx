
import { useState } from "react";
import RequireAuth from "../../containers/require_auth";
import WelcomeContainer from "../../containers/welcome_container";
import { BtnBorderedRounded } from "../../components/btnBorderedRounded";
import { FormGroupLabel } from "../../components/formGroupLabel";
import verifyGST from "../../helpers/fetch_gst";
import { CgSpinner } from "react-icons/cg";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChangeEvent } from "react";

const Welcome = () => {

  const [loadingForGST, setLoadingForGST] = useState<boolean>(false);
  const [gstinNumber, setGstinNumber] = useState<string>("");
  const [panNumber, setPANNumber] = useState<string>("");
  const [adharNumber, setAdharNumber] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ gstin: string; pan: string; aadhar: string }>({
    gstin: "",
    pan: "",
    aadhar: "",
  });

  const handleNext = () => {
    navigate("/auth/register/step-three", { replace: true });
  };
  const validateGSTIN: (value: string) => boolean = (value) => {
    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;
    return regex.test(value);
  };

  const validatePAN: (value: string) => boolean = (value) => {
    const regex = /^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$/;
    return regex.test(value);
  };

  const validateAadhar: (value: string) => boolean = (value) => {
    const regex = /^\d{12}$/;
    return regex.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const verifyGSTNumber: (gstinNum: string) => void = async (gstinNum) => {
    setLoadingForGST(true);
    try {
      const result = await verifyGST(gstinNum.toUpperCase());
      setVerificationResult(result);
      setLoadingForGST(false);
    } catch (error: any) {
      setLoadingForGST(false);
      console.error(error);
    }
  };
  return (
    <WelcomeContainer>
      <div className=" bg-white rounded-lg p-10  md:mx-0 mx-4 md:w-[500px] w-full overflow-x-auto flex flex-col items-center justify-center">
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
          {loadingForGST ? (
            <>
              <CgSpinner className="animate-spin duration-300" />
            </>
          ) : (
            verificationResult && (
              <>
                {verificationResult.gstStatus && verificationResult.gstStatus == "Active" ? (
                  <>
                    <p className="font-bold text-xs text-green-600">
                      Your GST number is {verificationResult.gstStatus}
                    </p>
                    <div className="rounded-md bg-blue-50 p-4 w-80 my-2 border border-blue-700">
                      <div className="flex flex-col">
                        <div className="font-semibold text-gray-600 text-sm pb-2">
                          {verificationResult.businessName}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {verificationResult.businessAddress} -{" "}
                          {verificationResult.businessPincode}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  gstinNumber.length > 0 && (
                    <p className="font-bold text-xs text-red-500">GST number verification failed</p>
                  )
                )}
              </>
            )
          )}
        </div>
        <BtnBorderedRounded type={undefined} className="w-full bg-yellow-400" onClick={handleNext}>
          Next
        </BtnBorderedRounded>
      </div>
      <div className="pt-6"></div>
      <div className=" bg-white rounded-lg p-10  md:mx-0 mx-4 md:w-[500px] w-full overflow-x-auto flex flex-col items-center justify-center">
        <form action="#">
          <h3 className=" mb-4 text-lg leading-none text-gray-900 font-bold">
            Pickup Details
          </h3>
          <div className=" w-full">
            <FormGroupLabel title="Store Details" />
            <Input
              type="name"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              required={true} value={""} onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              }} />
            <Input
              type="displayName"
              name="displayName"
              id="displayName"
              placeholder="Enter Display Name"
              required={true}
            />

            <FormGroupLabel title="Pickup Address" />

            <Input
              type="displayName"
              name="displayName"
              id="displayName"
              onChange={() => { }}
              placeholder="Shop No, Building Name, Floor"
              required={true}
            />
            <Input
              type="displayName"
              name="displayName"
              id="displayName"
              onChange={() => { }}
              placeholder="Street, Area, Colony"
              required={true}
            />
            <Input
              type="displayName"
              name="displayName"
              id="displayName"
              onChange={() => { }}
              placeholder="Nearby Landmark"
              required={true}
            />
            <Input
              type="displayName"
              name="displayName"
              id="displayName"
              onChange={() => { }}
              placeholder="CITY"
              required={true}
            />

            <div className="flex gap-2 pb-4">
              <Input
                type="displayName"
                name="displayName"
                id="displayName"
                placeholder="STATE"
                required={true}
              />
              <Input
                type="displayName"
                name="displayName"
                id="displayName"
                placeholder="PINCODE"
                required={true}
              />
            </div>
          </div>
          <Link to={"/dashboard"}>
            <BtnBorderedRounded className="w-full bg-yellow-400">Next</BtnBorderedRounded>
          </Link>
        </form>
      </div>
    </WelcomeContainer>
  );
};

export default RequireAuth(Welcome);
