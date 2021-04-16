import React from 'react';

type Props = {};

export const SectionTitle: React.FC<Props> = ({}) => {
  return (
    <div className="flex justify-between md:col-span-1">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium text-gray-900">
          <slot name="title"></slot>
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          <slot name="description"></slot>
        </p>
      </div>

      <div className="px-4 sm:px-0">
        <slot name="aside"></slot>
      </div>
    </div>
  );
};
