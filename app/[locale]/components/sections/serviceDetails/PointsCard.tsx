import React from "react";

const PointsCard = ({ title, points }: { title: string; points: string[] }) => {
  if (points.length === 0) return null;
  return (
    <div className="bg-white shadow-navbar-shadow border-t border-primaryBorder rounded-[10px] md:p-10 p-5">
      <h4 className="mb-[30px]">{title}</h4>
      <ul className="md:space-y-[30px] space-y-5">
        {points.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center gap-x-3 py-3 px-5 min-h-[50px] border-s-2 border-primaryBlue"
          >
            <span className="text-[16px] text-textColor font-secondary font-normal">
              {item}
            </span>
            <span className="text-gray-400 font-medium">{`0${index + 1}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PointsCard;
