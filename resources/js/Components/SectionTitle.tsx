import React from 'react';

type Props = {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  aside?: React.ReactNode;
};

const SectionTitle: React.FC<Props> = ({ title = '', description = '', aside }) => {
  return (
    <div className="flex justify-between md:col-span-1">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>

        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>

      {aside && <div className="px-4 sm:px-0">{aside}</div>}
    </div>
  );
};
export default SectionTitle;
