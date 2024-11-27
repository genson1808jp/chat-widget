import React from 'react';

export const SkeletonMessageComponent: React.FC = () => {
  return (
    <div className="flex animate-pulse">
      <div className="bg-gray-300 h-12 w-3/4 rounded-lg"></div>
    </div>
  );
};