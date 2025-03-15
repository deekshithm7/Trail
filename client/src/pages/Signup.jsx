import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('') // Added state for phone number
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name, 
                email, 
                password, 
                phoneNumber // Include phone number in request
            })
            
            if(response.data.success) {
                navigate('/login')
            }
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='border shadow p-6 w-96 bg-white'> {/* Increased width for form */}
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Name</label>
                        <input 
                            type="text" 
                            onChange={(e) => setName(e.target.value)}
                            className='w-full px-3 py-2 border rounded'
                            placeholder="Enter Username" required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-3 py-2 border rounded' 
                            placeholder="Enter Email" required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Phone Number</label>
                        <input 
                            type="tel" 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='w-full px-3 py-2 border rounded' 
                            placeholder="Enter Phone Number (with country code)" />
                        <p className="text-xs text-gray-500 mt-1">Format: +[country code][number] (e.g., +911234567890)</p>
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
                            className='w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition'>Sign Up</button>
                        <p className='text-center mt-4'>
                            Already Have Account? <Link to="/login" className="text-teal-600 hover:underline">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup