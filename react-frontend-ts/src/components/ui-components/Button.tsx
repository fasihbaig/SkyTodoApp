/**
 * Theme Button UI
 */

import React, { ReactNode } from 'react'

interface Props {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    disabled?: boolean,
    type: "submit",
    children: string | ReactNode
    theme?: ButtonTheme
}

enum ButtonTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary"
}

const themeClass = {
    [ButtonTheme.PRIMARY]: 'bg-indigo-600',
    [ButtonTheme.SECONDARY]: 'bg-indigo-100'
}

function Button({
    onClick,
    disabled = false,
    type = "submit",
    children,
    theme = ButtonTheme.PRIMARY
}: Props) {

    const attributes = {
        disabled,
        type
    }
    return (
        <button
            className={` ${themeClass[theme]} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    )
}

export default Button
