import React from 'react';
import { UsePageProps } from '../types/types';
import { usePage } from './../Hooks/usePage';
type Props = {
  className: string;
};
const ValidationErrors: React.FC<Props> = ({ className = '' }) => {
  const { errors } = usePage().props;
  if (!errors || !Object.keys(errors).length) {
    return null;
  }

  return (
    <div className={className}>
      <div className="font-medium text-red-600">Whoops! Something went wrong.</div>

      <ul className="mt-3 text-sm text-red-600 list-disc list-inside">
        {Object.keys(errors).map((key) => (
          <li key={key}>{errors[key]}</li>
        ))}
      </ul>
    </div>
  );
};
export default ValidationErrors;
