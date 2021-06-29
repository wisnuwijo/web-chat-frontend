import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Profile from '../component/profile'

export default function Home() {

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [chatHistory, setChatHistory] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      router.push('/login')
    } else {
      setIsLoggedIn(true)
      getChatHistory()
    }
  }, [])

  const getChatHistory = async () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }

    const getChatHistory = await axios.get(process.env.endPoint + '/chats/history', config)
    if (getChatHistory.status === 403) {
      localStorage.removeItem('token')
      router.push('/login')
    }

    setChatHistory(getChatHistory)
  }

  const chats = () => {
    return <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-screen">
      <div className="bg-green-200 hidden md:block md:col-span-1">
        <Profile />
        Recent chats
      </div>
      <div className="p-10 md:p-20 align-middle col-span-1 md:col-span-3">
        Conversation
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

      { isLoggedIn ? chats() : 'Please wait ...'}
    </div>
  )
}
