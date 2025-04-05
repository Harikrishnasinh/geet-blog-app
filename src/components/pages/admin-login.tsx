import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { axiosPost } from '@/handleApi'
import { useNavigate } from 'react-router'
import { updateAdminUser } from '@/store/admin.slice'
import { useDispatch } from 'react-redux'

const AdminLogin = () => {

  const [admin, setAdmin] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e: any) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const oPayload = {
      userName: admin.username,
      password: admin.password
    }
    const response = await axiosPost('/api/v1/admin/login', oPayload)
    if(response.success) {
      localStorage.setItem('admin', JSON.stringify(response.user))
      dispatch(updateAdminUser(response.user))
      navigate('/admin/dashboard');
    }
  }

  return (
    <div className='h-[80vh] flex items-center justify-center'>
        <div className='container w-[20vw] border p-8 flex-col flex items-center justify-center rounded-md shadow-2xl'>
            <h1 className='text-3xl font-light tracking-wide'>Admin Login</h1>
            <Separator className='my-6'/>
            <form className='flex flex-col gap-4 w-[20vw] px-8'>
                <Input type='text' placeholder='Username' name='username' value={admin.username} onChange={(e: any) => handleChange(e) } />
                <Input type='password' placeholder='Password' name='password' value={admin.password} onChange={(e: any) => handleChange(e)} />
                <Button type='submit' onClick={(e) => handleLogin(e)}>Login</Button>
            </form>
        </div>
    </div>
  )
}

export default AdminLogin