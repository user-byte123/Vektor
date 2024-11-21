import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import CallMadeIcon from '@mui/icons-material/CallMade';
import imageForVektor from '../assets/vektor.jpg'


function Login() {
    React.useEffect(() => {
        // disables the scrolling
        document.body.style.overflow = 'hidden';
    })
    const [ loginData, setLogin ] = useState({
        username:'',
        password:'',
    });

    const [ cookies, setCookies ] = useCookies(["username"]);

    const handleCookies = () => {
        //setting the cookie and setting our cookie to be valid on any URL path
        setCookies('username', loginData.username, {path: '/', secure: true})
    }

    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLogin({...loginData, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // check what route for get request for login
        try {
            const loginInfo = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify(loginData)
        })
        if (loginInfo.ok) {
            handleCookies()
            navigate('/homepage')
        }
        else {
            navigate('/')
        }
    } catch(error) {
        console.error('Error in fetching data ', error)
    }
 }
        
    return(
        <div className='flex flex-col items-center'>
            <div className='bg-custom-tan h-1/4 w-full'>
                <div className='flex font-bold  m-1 p-3 text-darker-green text-2xl items-center'>
                    <CallMadeIcon></CallMadeIcon>Vektor
                </div>
            </div>
            <div className='flex flex-row w-full min-h-screen bg-slate-50'>
                <div className='flex flex-col w-2/3 min-h-screen'>
                    <img className='h-full opacity-80' src={imageForVektor} alt="Vektor image" />
                </div>
                <div className='flex flex-col items-center justify-center border-solid w-1/3 bg-pastel-green'>
                    <div className='flex bg-white px-28 py-10 rounded-lg shadow-xl'>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label className='flex text-darkest-green font-bold'>Username: </label>
                                <div className='flex justify-center'>
                                    <input className='flex text-center rounded-lg border border-solid border-gray-800 pr-4 pl-4 p-1' type='text' name='username' placeholder='Enter Username' onChange={handleChange} value= {loginData.username}></input>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center'>
                                <label className='text-darkest-green font-bold'>Password: </label>
                                <div className='flex justify-center'> 
                                    <input className='flex text-center rounded-lg border border-solid border-gray-800 pr-4 pl-4 p-1' type='password' name = 'password' placeholder='Enter Password' onChange={handleChange}
                                    value = {loginData.password}></input>
                                </div>
                            </div>
                            <div className='flex justify-center w-100'>
                                <button type='submit' className='mt-4 mb-4 p-2 (pr-2 pl-2) bg-darker-green rounded-lg text-white hover:bg-custom-tan hover:text-darker-green'><strong>Sign in</strong></button>
                            </div>
                            <p className='flex text-darker-green justify-center'>Don't have an account? <Link to="/signup" className='text-red-500 hover:underline font-bold'>Sign Up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;