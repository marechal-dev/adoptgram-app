// import { BrandInput, BrandInputProps } from "../BrandInput/BrandInput"
import { ReactNode } from "react"
import { BrandInput } from "../BrandInput"

import { Control, Controller } from "react-hook-form"
import { BrandInputInputProps } from "../BrandInput/Input"

type ControlledInputProps = {
  control: Control<any>
  name: string
  inputProps: BrandInputInputProps
  children?: ReactNode
}

export function ControlledInput({
  control,
  name,
  inputProps,
  children,
}: ControlledInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <BrandInput.Root>
          {children}
          <BrandInput.Input onChange={onChange} value={value} {...inputProps} />
        </BrandInput.Root>
      )}
    />
  )
}
