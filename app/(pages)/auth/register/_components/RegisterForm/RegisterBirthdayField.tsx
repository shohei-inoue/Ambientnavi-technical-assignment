'use client'

import { useState } from "react"
import RegisterItem from "./RegisterItem"
import Input from "@/app/components/Input/Input"

type RegisterBirthdayFieldProps = {
  title: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const RegisterBirthdayField: React.FC<RegisterBirthdayFieldProps> = ({
  title,
  value,
  setValue,
}) => {
  const [isError, setIsError] = useState<boolean>(false)

  const handleValidate = () => {
    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/
    setIsError(!datePattern.test(value))
  }

  return (
    <RegisterItem title={title}>
      <Input
        type="date"
        placeholder="YYYY/MM/DD"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
        disabled 
      />
      {isError && (
        <p className="text-red-500">
          生年月日を正しい形式で入力してください
        </p>
      )}
    </RegisterItem>
  )
}

export default RegisterBirthdayField