import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
    </div>
  );
};

export default SkeletonLoader;
