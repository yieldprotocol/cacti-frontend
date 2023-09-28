interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = ({ className, ...props }: ButtonProps) => {
  const baseClasses = `
    h-10 inline-flex w-full 
    cursor-pointer items-center justify-center 
    rounded-md border border-white/10 
    bg-green-primary p-2 px-6 py-2.5 
    text-center text-sm font-bold leading-tight text-white/70 
    shadow-sm transition duration-200 ease-in-out 
    hover:bg-green-primary/70 
    focus:outline-none focus:ring-0 
    disabled:cursor-not-allowed disabled:bg-gray-500
  `;

  const allClasses = `${baseClasses} ${className}`;

  return <button {...props} className={allClasses} />;
};
