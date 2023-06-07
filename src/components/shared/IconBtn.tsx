import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
/**
 * Generic styled Icon Button
 */
export const IconBtn: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <button
        className="grid h-8 w-8 place-items-center rounded-md text-gray-100 hover:bg-gray-800 hover:text-gray-200  enabled:hover:cursor-pointer disabled:bg-gray-600 disabled:hover:text-gray-400"
        {...rest}
    >
        {children}
    </button>
);
