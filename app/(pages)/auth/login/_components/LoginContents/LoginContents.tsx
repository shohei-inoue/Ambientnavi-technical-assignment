import LoginButtonContents from "../LoginButtonContent/LoginButtonContent"
import LoginForm from "../LoginForm/LoginForm"

const LoginContents = () => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <LoginForm />
      <LoginButtonContents />
    </div>
  )
}

export default LoginContents