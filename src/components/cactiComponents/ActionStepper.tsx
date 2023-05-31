import S from '@walletconnect/keyvaluestorage';

const StepperItem = ({ step, title, description, active }: any) => {
  return (
    <li
      className={`flex items-center space-x-2.5 ${
        active ? 'text-teal-600 dark:text-teal-500 ' : 'text-white/70'
      }`}
    >
      <div
        className={`flex h-8 w-8 ${
          active ? 'border-teal-500 text-teal-600 dark:text-teal-500 ' : ''
        } shrink-0 items-center justify-center rounded-full border `}
      >
        {step}
      </div>

      <span>
        <div className="text-sm font-medium leading-tight ">{title}</div>
        <div className="text-xs font-thin">{description}</div>
      </span>
    </li>
  );
};

export const ActionStepper = () => {
  return (
    <div className="flex w-full">
      <ol className="w-full items-center justify-evenly space-y-4 rounded-lg border-[1px] border-white/20 p-2 sm:flex sm:space-x-8 sm:space-y-0 ">
        <StepperItem
          step={1}
          title="Token Approval"
          description="Step details here"
          active={true}
        />
        <StepperItem
          step={2}
          title="Submit Transaction"
          description="Step details here"
          active={false}
        />
        <StepperItem
          step={3}
          title="Transaction complete"
          description="Step details here"
          active={false}
        />
      </ol>
    </div>
  );
};
