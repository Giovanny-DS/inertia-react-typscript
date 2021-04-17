import React from 'react';
import SectionTitle from './SectionTitle';

type Props = {
  title?: string;
  description?: string;
  content?: string | React.ReactNode;
  className?: string;
};
const ActionSection: React.FC<Props> = ({ title = '', description = '', content = '', className = '' }) => (
  <div className={['md:grid md:grid-cols-3 md:gap-6', className].join(' ')}>
    <SectionTitle title={title} description={description} />

    <div className="mt-5 md:mt-0 md:col-span-2">
      <div className="px-4 py-5 bg-white shadow sm:p-6 sm:rounded-lg">{content}</div>
    </div>
  </div>
);

export default ActionSection;
