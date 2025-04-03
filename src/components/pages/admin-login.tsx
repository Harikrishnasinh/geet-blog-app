import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const AdminLogin = () => {
  return (
    <div className='h-[80vh] flex items-center justify-center'>
        <div className='container w-[20vw] border p-8 flex-col flex items-center justify-center rounded-md shadow-2xl'>
            <h1 className='text-3xl font-light tracking-wide'>Admin Login</h1>
            <Separator className='my-6'/>
            <form className='flex flex-col gap-4 w-[20vw] px-8'>
                <Input type='text' placeholder='Username' />
                <Input type='password' placeholder='Password' />
                <Button type='submit'>Login</Button>
            </form>
        </div>
    </div>
  )
}

export default AdminLogin