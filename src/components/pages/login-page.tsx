import { LoginForm } from '../ui/login-form'

const loginPage = () => {
  return (
    <div className="removeScroll flex items-center justify-center w-full p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}

export default loginPage