import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Profile from '../component/profile'
import AppLogo from '../component/appLogo'
import RecentChat from '../component/recentChat'
import ActiveChat from '../component/activeChat'

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [chatHistory, setChatHistory] = useState()

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
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
    
    if (!token) {
      router.push('/login')
    } else {
      setIsLoggedIn(true)
      getChatHistory()
    }
  }, [])

  const chats = () => {
    return <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
      <div className="hidden md:block md:col-span-1">
        <AppLogo />
        <Profile />
        <RecentChat chats={[
          {
            key: 1,
            name: "Paijo",
            lastChat: "Okok"
          },
          {
            key: 2,
            name: "Yuriko",
            lastChat: "Sido neng jepang ga ki?"
          },
          {
            key: 3,
            name: "Elon Musk",
            lastChat: "Ayo neng mars bro"
          }
        ]} />
      </div>
      <div className="align-middle col-span-1 md:col-span-3 pt-3 pr-3 pb-3">
        <div className="w-full h-full rounded-3xl bg-gray-100">
          <ActiveChat />
        </div>
      </div>
    </div>
  }

  return (
    <div>
      <Head>
        <title>Hi! Welcome to {process.env.appName}</title>
        <meta name="description" content="SpeakUp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { isLoggedIn ? chats() : 'Please wait ...'}
    </div>
  )
}
