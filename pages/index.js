import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Img1 from '../public/assets/img-1.svg'
import { useEffect, useState } from 'react'

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const loginForm = () => {
    return <div className="grid grid-cols-2 gap-4 min-h-screen">
      <div className="p-20 align-middle">
        <div>
          <h2 className="font-extrabold text-2xl pb-2 pt-5">Login</h2>
          <Link href="/signin">
            <a>
              <p className="text-gray-500">Sign in to connect withother  thousands user at {process.env.appName}</p>
            </a>
          </Link>

          <input type="text" className="form-input px-4 py-3 rounded-full text-gray-500 mt-7 min-w-full	border-gray-300	" placeholder="Email or Username" />
          <input type="password" className="form-input px-4 py-3 rounded-full text-gray-500 mt-3 min-w-full	border-gray-300	" placeholder="Password" />
          <button className="pt-2 pb-2 pl-5 pr-5 mt-3 rounded-full text-white bg-green-500 min-w-full">Sign in</button>
        </div>

        <div>
          <p className="text-gray-500 mt-3">
            Not registered yet?
            <Link href="/signup">
              <a className="pl-3 text-black font-bold">Create an account</a>
            </Link>
          </p>
        </div>
      </div>
      <div className="bg-green-200 p-10">
        <Image src={Img1} />
      </div>
    </div>
  }

  const chats = () => {
    return <div class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
      <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
        <div class="rounded-lg shadow-xs overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  Successfully saved!
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Anyone with a link can now view this file.
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  return (
    <div>
      <Head>
        <title>Hi! Welcome to {process.env.appName}</title>
        <meta name="description" content="ChatApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { isLoggedIn ? chats() : loginForm()}
    </div>
  )
}
