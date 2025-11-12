import React from "react";
import AnimatedDiv from "../../../ui/animation/AnimatedDiv";
import { FaRegCheckCircle } from "react-icons/fa";

const StepThree = ({ direction }: { direction: number }) => {
  return (
    <AnimatedDiv
      className="flex min-h-[396px] flex-col items-center justify-center text-center"
      direction={direction}
    >
      <FaRegCheckCircle
        aria-hidden="true"
        size={128}
        className="mb-4 text-primaryBlue drop-shadow-sm"
      />
      <h2 className="mb-7 mt-4 text-2xl font-semibold">تهانينا! 🎉</h2>
      <p className="max-w-[474px] text-sm text-myGray-500">
        تم ارسال طلبك بنجاح ونتطلع إلى مراجعة طلبك قريبًا.
      </p>
    </AnimatedDiv>
  );
};

export default StepThree;
