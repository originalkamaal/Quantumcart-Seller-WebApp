import React, { useState } from "react";
import { config } from "../configs/default";
import Input from "./input";

const CheckPincodeServiceable = () => {
  const [pincode, setPincode] = useState<string>("");
  return (
    !config.signUp.allowNonServiceablePincode && (
      <div>
        <div className="py-2">
          <Input
            type="text"
            name="displayName"
            value=""
            id="sdfg"
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter Pincode"
            required={true}
          />
        </div>

        <div>
          <p className="font-bold text-xs text-green-600 pb-4">Your pincode is serviceable</p>
        </div>
      </div>
    )
  );
};

export default CheckPincodeServiceable;