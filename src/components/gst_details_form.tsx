import { useState, useRef } from "react";
import AuthPageContainer from "../containers/auth_pages_container";
import { FormGroupLabel } from "./formGroupLabel";
import Input from "./input";
import { BtnBorderedRounded } from "./btnBorderedRounded";
import { Link } from "react-router-dom";

export const RegisterStepThree = () => {
  const [pincode, setPincode] = useState("");
  return (
    <AuthPageContainer>
      <div className="  bg-white rounded-lg p-10 shadow-2xl overflow-x-auto flex flex-col items-center justify-center">
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
              required={true}
            />
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
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Shop No, Building Name, Floor"
              required={true}
            />
            <Input
              type="displayName"
              name="displayName"
              id="displayName"
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Street, Area, Colony"
              required={true}
            />
            <Input
              type="displayName"
              name="displayName"
              id="displayName"
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Nearby Landmark"
              required={true}
            />
            <Input
              type="displayName"
              name="displayName"
              id="displayName"
              onChange={(e) => setPincode(e.target.value)}
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
    </AuthPageContainer>
  );
};
