import React from 'react';
import usePreventDefault from '../Hooks/usePreventDefault';
import SectionTitle from './SectionTitle';
type Props = {
  title?: string;
  description?: string;
  form?: string | React.ReactNode;
  actions?: string | React.ReactNode;
  onSubmit?: CallableFunction;
  className?: string;
};
const FormSection: React.FC<Props> = ({
  title = '',
  description = '',
  form,
  actions = '',
  onSubmit = () => {},
  className = '',
}) => {
  return (
    <div className={['md:grid md:grid-cols-3 md:gap-6', className].join(' ')}>
      <SectionTitle title={title} description={description} />

      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={(e) => usePreventDefault(e, onSubmit)}>
          <div
            className={[
              'px-4 py-5 bg-white sm:p-6 shadow',
              actions === '' ? 'sm:rounded-md' : 'sm:rounded-tl-md sm:rounded-tr-md',
            ].join(' ')}
          >
            <div className="grid grid-cols-6 gap-6">{form}</div>
          </div>

          {actions ? (
            <div className="flex items-center justify-end px-4 py-3 text-right shadow bg-gray-50 sm:px-6 sm:rounded-bl-md sm:rounded-br-md">
              {actions}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default FormSection;
