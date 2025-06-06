import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password})
            if(response.data.success) {
                localStorage.setItem("token", response.data.token)
                navigate('/')
            }
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='border shadow p-6 w-96 bg-white'> {/* Increased width to match signup */}
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-3 py-2 border rounded' 
                            placeholder="Enter Email" required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Password</label>
                        <input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-3 py-2 border rounded'
                            placeholder="Enter password" required />
                    </div>
                    <div className='mb-4'>
                        <button 
                            type="submit"
                            className='w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition'>Login</button>
                        <p className='text-center mt-4'>
                            Don't Have Account? <Link to="/register" className="text-teal-600 hover:underline">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login