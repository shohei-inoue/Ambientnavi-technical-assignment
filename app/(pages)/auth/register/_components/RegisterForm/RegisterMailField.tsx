'use client'

import Input from "@/app/components/Input/Input"
import RegisterItem from "./RegisterItem"
import { useState } from "react"

type RegisterMailFieldProps = {
  title: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const RegisterMailField: React.FC<RegisterMailFieldProps> = ({
  title,
  value,
  setValue,
}) => {
  const [isError, setIsError] = useState<boolean>(false)

  const handleValidate = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    setIsError(!emailPattern.test(value))
  }

  return  (
    <RegisterItem title={title}>
      <Input
        type="email"
        placeholder="example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
        disabled
      />
      {isError && (
        <p className="text-red-500">
          メールアドレスを正しい形式で入力してください
        </p>
      )}
    </RegisterItem>
  )
}

export default RegisterMailField