import React, { useState } from "react";


const ServiceabilityChecker = () => {
  const [pincode, setPincode] = useState<string>("");

  const handlePincodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Restrict input to 6 digits
    if (value.length <= 6) {
      setPincode(value);

      // Call API when 6th digit is entered
      if (value.length === 6) {
        // checkServiceability(value);
      }
    }
  };

  return (
    <div>
      <label htmlFor="pincode">Pincode:</label>
      <input
        type="number"
        id="pincode"
        name="pincode"
        value={pincode}
        onChange={handlePincodeChange}
        className="border border-gray-300 rounded p-2"
        maxLength={6}
      />
    </div>
  );
};

export default ServiceabilityChecker;
