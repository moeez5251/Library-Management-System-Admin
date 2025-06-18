import React from 'react';

const Badge = ({ status }) => {
  return (
    <>
      {status === "Available" && (
        <span className="bg-green-100 text-green-800 text-sm  mr-2 px-2.5 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 font-semibold">
          Available
        </span>
      )}
      {status === "Out of stock" && (
        <span className="bg-red-100 text-red-800 text-sm  mr-2 px-2.5 py-1 rounded-sm dark:bg-red-900 dark:text-red-300 font-semibold">
          Out of stock
        </span>
      )}
      {status === "Reserverd" && (
        <span className="bg-[#f9f5ed] text-[#caa76c] text-sm  mr-2 px-2.5 py-1  rounded-sm dark:bg-red-900 dark:text-red-300 font-semibold">
          Reserverd
        </span>
      )}
    </>
  );
};

export default Badge;
