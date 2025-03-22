import { RegisterForm } from '../ui/register-form'

const RegisterPage = () => {
  return (
    <div className="removeScroll flex items-center justify-center w-full p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage