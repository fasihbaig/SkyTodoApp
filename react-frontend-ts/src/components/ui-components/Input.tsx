/**
 * Theme Input UI
 */

import React, { ChangeEvent, LegacyRef } from 'react'

interface Props {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string | number | string[]
  name?: string,
  type?: "email" | "text" | "number" | "password"
  autoComplete?: string
  required?: boolean
}

function Input({
  onChange,
  onBlur,
  value,
  name,
  type = "text",
  autoComplete,
  required
}: Props, ref?: LegacyRef<HTMLInputElement>) {

  const inputAttributes = {
    value,
    name,
    type,
    autoComplete,
    required
  }
  return (
    <input
      className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg block w-full appearance-none leading-none py-2 px-2'
      onChange={onChange}
      onBlur={onBlur}
      {...inputAttributes}
      ref={ref}
    />
  )
}

export default React.forwardRef(Input)
