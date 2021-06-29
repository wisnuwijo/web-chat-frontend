import Link from 'next/link'
import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import Img1 from '../public/assets/img-1.svg'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function signUp() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) router.push('/')
    }, [])

    const registerHandler = async (e) => {
        e.preventDefault()

        let userData = {
            "username": username,
            "email": email,
            "name": name,
            "password": password
        }
        const register = await axios.post(process.env.endPoint + '/users/register', userData)

        if (register.data == null) {
            setErrorMessage('Oops, looks like something went wrong')
            return;
        }

        if (register.data.message.toLowerCase() === "success") {
            setErrorMessage('')

            delete userData.password;

            localStorage.setItem('data.user', JSON.stringify(userData))
            localStorage.setItem('token', JSON.stringify(register.data.token))

            router.push('/')
        } else {
            if (register.data.message) setErrorMessage(register.data.message)
            else setErrorMessage('Invalid credentials, please try again')
        }
    }

    const registerForm = () => {
        return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen">
            <div className="p-10 md:p-20 align-middle col-auto md:col-span-1">
                <div>
                    <h2 className="font-extrabold text-2xl pb-2 pt-5">Sign up</h2>
                    <Link href="/signin">
                        <a>
                            <p className="text-gray-500">Sign up to connect withother  thousands user at {process.env.appName}</p>
                        </a>
                    </Link>

                    <span className="font-bold text-red-500	">{errorMessage}</span>
                    <form onSubmit={registerHandler}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input px-4 py-3 rounded-full text-gray-500 mt-3 min-w-full	border-gray-300	" placeholder="Username" required />
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input px-4 py-3 rounded-full text-gray-500 mt-3 min-w-full	border-gray-300	" placeholder="Name" required />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input px-4 py-3 rounded-full text-gray-500 mt-3 min-w-full	border-gray-300	" placeholder="Email" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input px-4 py-3 rounded-full text-gray-500 mt-3 min-w-full	border-gray-300	" placeholder="Password" required />
                        <button type="submit" className="pt-2 pb-2 pl-5 pr-5 mt-3 rounded-full text-white bg-green-500 min-w-full">Sign up</button>
                    </form>
                </div>

                <div>
                    <p className="text-gray-500 mt-3">
                        Already have an account?
                        <Link href="/">
                            <a className="pl-3 text-black font-bold">Login</a>
                        </Link>
                    </p>
                </div>
            </div>
            <div className="bg-green-200 p-0 md:p-10 col-auto hidden md:block">
                <Image src={Img1} />
            </div>
        </div>
    }

    return (
        <div>
            <Head>
                <title>Sign up</title>
                <meta name="description" content="ChatApp" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {registerForm()}
        </div>
    )
}