import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CallMadeIcon from '@mui/icons-material/CallMade';

function SignUp() {
    const [ signUp, setSignUp ] = useState({
        firstName:'',
        lastName:'',
        username:'',
        password:'',
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault();
        try {
            const { name, value } = e.target;
            setSignUp({...signUp, [name]:value})
        } catch(error) {
            console.error('error occurred in extracting values from form')
        }
    }
    const handleCancel = (e) => {
        navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUp)
            })
            navigate('/')
        } catch (error) {
            console.error('Error in signing up')
        }
    }
    return(
        <div className='flex flex-col items-center'>
            <div className='flex items-center bg-custom-tan w-full h-1/4'>
                <CallMadeIcon className='text-darker-green'></CallMadeIcon>
                <h2 className='text-darker-green text-2xl font-bold'>Vektor</h2>
            </div>
            <div className='flex bg-pastel-green w-full min-h-screen justify-center'>
                <div className='flex flex-col bg-custom-tan w-1/2 h-1/2 p-11 justify-center items-center mt-20 (pt-10 pb-15) rounded-lg shadow-2xl'>
                    <h2 className='flex flex-col w-full text-2xl text-bold text-darkest-green m-1 text-center'>Create an Account</h2>
                    <form method='post' className='flex flex-col w-3/4' onSubmit={handleSubmit}>
                        <div className='flex justify-center'>
                            <input className='text-bold text-darker-green w-3/4 text-center m-1 pt-4 pb-3' type='text' name='firstName' placeholder='First Name' onChange={handleChange}></input>
                        </div>
                        <div className='flex justify-center'>
                            <input className='text-bold text-darker-green w-3/4 text-center m-1 pt-4 pb-3' type='text' name='lastName' placeholder='Last Name' onChange={handleChange}></input>
                        </div>
                        <div className='flex justify-center'>
                            <input className='text-bold text-darker-green w-3/4 text-center m-1 pt-4 pb-3' type='text' name='username' placeholder='Create Username' onChange={handleChange}></input>
                        </div>
                        <div className='flex justify-center'>
                            <input className='text-bold text-darker-green w-3/4 text-center m-1 pt-4 pb-3' type='password' name='password' placeholder='Create Password' onChange={handleChange}></input>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <button className='flex w-3/4 justify-center bg-darker-green text-custom-tan font-bold rounded-lg p-3 m-1 hover:bg-pastel-green hover:text-custom-tan' type='submit'>Submit</button>
                            <button className='flex w-3/4 justify-center bg-darker-green text-custom-tan font-bold rounded-lg p-3 m-1 hover:bg-pastel-green hover:text-custom-tan' type='button' onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
 
export default SignUp;