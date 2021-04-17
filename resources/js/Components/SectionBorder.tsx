import React from 'react';

type Props = {
  className?: string; //In case you want to pick another color
};
const SectionBorder = ({ className = 'border-gray-200' }: Props) => {
  return (
    <div className="hidden sm:block">
      <div className="py-8">
        <div className={['border-t', className].join(' ')}></div>
      </div>
    </div>
  );
};
export default SectionBorder;
