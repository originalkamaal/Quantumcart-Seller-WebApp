import React, { useEffect, useState } from "react";
import { SectionItem } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnboardingProgressStart } from "../redux/slices/authSlice";
import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";

const RegistrationProgress: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  useEffect(() => {
    // dispatch(fetchOnboardingProgressStart({ sellerId: state.auth.user.sellerId as string }));
  }, []);

  if (state.auth.isLoading) {
    return <div>Loading...</div>;
  }
  if (!state.auth.isLoading && !state.auth.onboardingProgress) {
    return <div>Something Went Wrong..</div>;
  }

  if (!state.auth.onboardingProgress) {
    return <div>Loading...</div>;
  }

  var totalWeightage = 0.0;
  // Iterate through the onboardingProgress array.
  (state.auth.onboardingProgress ?? []).forEach((category: SectionItem) => {
    category.keys.forEach((item) => {
      // Check if the status is "Passed."
      if (item.status === "Passed") {
        // Add the weightage to the totalWeightagePassed.
        totalWeightage += item.weightage;
      }
    });
  });

  const totalAllWeightage = 100;

  return (
    <div className="w-full rounded-lg shadow-md bg-white">
      <div className="bg-gray-200 rounded-t-lg relative">
        <div
          className="absolute inset-0 border border-gray-300 bg-green-500 opacity-30 rounded-tl-lg"
          style={{ width: `${totalWeightage}%` }}
        ></div>
        <div className="font-semibold flex justify-between p-4 relative">
          <h2 className="text-sm pr-5">Your Onboarding Completion Status</h2>
          <h2 className="text-3xl">{totalWeightage.toFixed(2)}%</h2>{" "}
          {/* Display progress percentage */}
        </div>
      </div>
      <div className="p-4">
        {state.auth.onboardingProgress.map((section: SectionItem, index: number) => (
          <div key={index} className="mb-4">
            <div className="text-md pb-2">{section.title}</div>
            {section.keys.map((keyItem, keyIndex: number) => (
              <div key={keyIndex} className="text-sm pb-1">
                <span className="inline-block w-4 h-4 mr-2 text-xl">
                  {keyItem.status === "NotStarted" ? (
                    <div className="text-gray-400">
                      <AiFillInfoCircle />
                    </div>
                  ) : keyItem.status === "Pending" ? (
                    <div className="text-orange-400">
                      <AiFillCheckCircle />
                    </div>
                  ) : keyItem.status === "Passed" ? (
                    <div className="text-green-600">
                      <AiFillCheckCircle />
                    </div>
                  ) : (
                    <div className="text-red-500">
                      <AiFillCloseCircle />
                    </div>
                  )}
                </span>
                {keyItem.key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return <div>KKKKK</div>;
};

export default RegistrationProgress;
