import React from 'react';

const Badge = ({ status }) => {
  return (
    <>
      {status === "Available" && (
        <span className="bg-green-100 text-green-800 text-sm  mr-2 px-2.5 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 font-semibold text-nowrap">
          Available
        </span>
      )}
      {status === "Out of stock" && (
        <span className="bg-red-100 text-red-800 text-sm  mr-2 px-2.5 py-1 rounded-sm dark:bg-red-900 dark:text-red-300 font-semibold text-nowrap">
          Out of stock
        </span>
      )}
      {status === "Reserved" && (
        <span className="bg-[#f9f5ed] text-[#caa76c] text-sm  mr-2 px-2.5 py-1  rounded-sm dark:bg-red-900 dark:text-red-300 font-semibold text-nowrap">
          Reserved
        </span>
      )}
      {
        status === "Borrowed" && (
          <span className="bg-blue-100 text-blue-800 text-sm  mr-2 px-2.5 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 font-semibold text-nowrap">
            Borrowed
          </span>
        )
      }
      {
        status === "Overdue" && (
          <span className="bg-yellow-100 text-yellow-800 text-sm  mr-2 px-2.5 py-1 rounded-sm dark:bg-yellow-900 dark:text-yellow-300 font-semibold text-nowrap">
            Overdue
          </span>
        )
      }
      {
        status === "Missing" && (
          <span className="bg-red-100 text-red-800 text-sm  mr-2 px-2.5 py-1 rounded-sm dark:bg-red-900 dark:text-red-300 font-semibold text-nowrap">
            Missing
          </span>
        )
      }
    </>
  );
};

export default Badge;
