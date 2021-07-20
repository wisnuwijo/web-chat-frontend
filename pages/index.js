import Head from 'next/head'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Profile from '../app/component/profile'
import AppLogo from '../app/component/appLogo'
import RecentChat from '../app/component/recentChat'
import ActiveChat from '../app/component/activeChat'
import socketClient from "socket.io-client"
import Ask from '../app/component/modal/ask'
import FindContact from "../app/component/modal/findContact"
import ChooseContact from "../app/component/modal/chooseContact"
import Image from 'next/image'
import WelcomeSvg from '../app/assets/illustration/welcome.svg'

export default function Home() {

  const socket = socketClient(process.env.endPoint)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [chatHistory, setChatHistory] = useState()

  // chat-related
  const [activeChatRoom, setActiveChatRoom] = useState()
  const [activeChatContactName, setActiveChatContactName] = useState()
  const [message, setMessage] = useState([])

  // modal-related
  const [askModalStatus, setAskModalStatus] = useState(false)
  const [findContactModalStatus, setFindContactModalStatus] = useState(false)
  const [chooseContactModalStatus, setChooseContactModalStatus] = useState(false)

  const router = useRouter()
  const messageRef = useRef([]);

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

    setChatHistory(getChatHistory.data)
  }

  useEffect(() => {
    socket.on('connection', () => {
      console.log(`CHAT CONNECTED`);
    });

    const token = localStorage.getItem('token')
    
    if (!token) {
      router.push('/login')
    } else {
      setIsLoggedIn(true)
      getChatHistory()
    }
  }, [])

  const syncMessage = useCallback(() => {
    const userData = localStorage.getItem('data.user')
    if (userData) {
      const userId = JSON.parse(userData).id
  
      messageRef.current = []
  
      socket.on(activeChatRoom, function (data) {
        if (data.sender_id != userId) {
          messageRef.current = [...messageRef.current, {
            id: Math.round(Math.random() * 1000),
            is_sender: false,
            message: data.message
          }]
    
          setMessage(messageRef.current)
        }
      })
    }
  }, [activeChatRoom])

  useEffect(() => {
    syncMessage()
  }, [syncMessage])

  const sendChatHandler = (e, msg) => {
    e.preventDefault()

    messageRef.current = [...messageRef.current, {
      id: Math.round(Math.random() * 100),
      is_sender: true,
      message: msg
    }]

    setMessage(messageRef.current)

    const userData = localStorage.getItem('data.user')
    const userId = JSON.parse(userData).id

    if (userId) {
      socket.emit(activeChatRoom, {
        sender_id: userId,
        message: msg
      })

      getChatHistory()
    }
  }

  const addNewContactHandler = () => {
    setAskModalStatus(!askModalStatus)
    setTimeout(() => {
      setFindContactModalStatus(!findContactModalStatus)
    }, 500);
  }

  const startNewChatHandler = () => {
    setAskModalStatus(!askModalStatus)
    setTimeout(() => {
      setChooseContactModalStatus(!chooseContactModalStatus)
    }, 500);
  }

  const chooseContactParentHandler = async (contactName, chatRoomsId, changeModalStatus = true) => {
    setActiveChatContactName(contactName)
    setActiveChatRoom(chatRoomsId)
    if (changeModalStatus) setChooseContactModalStatus(!chooseContactModalStatus)

    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }

    const userData = localStorage.getItem('data.user')
    const userId = JSON.parse(userData).id
    const loadChatRoom = await axios.get(process.env.endPoint + `/chats/${chatRoomsId}`, config)
    messageRef.current = [
      ...loadChatRoom.data.data.map((i) => {
        return {
          id: i.id,
          is_sender: i.sender_user_id == userId,
          message: i.message
        }
      })
    ]

    setMessage(messageRef.current)
  }

  const onChatClickHandler = (contactName, chatRoomsId) => {
    chooseContactParentHandler(contactName, chatRoomsId, false)
  }

  const welcomeMessage = () => {
    return <div className="w-full h-full text-center pt-44">
      <Image src={WelcomeSvg} className="text-center" width="320px" height="300px" />
      <h1 className="text-4xl text-gray-700">Welcome to <b>{process.env.appName}</b></h1>
      <p className="text-gray-500">Start conversation by finding your friends using PIN</p>
    </div>
  }

  const chats = useCallback(() => {
    return <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
      <div className="hidden md:block md:col-span-1">
        <AppLogo />
        <Profile />
        <RecentChat onChatClick={(contactName, chatRoomsId) => onChatClickHandler(contactName, chatRoomsId)} onAddButtonClick={() => setAskModalStatus(!askModalStatus)}
          chats={
            chatHistory ? [
              ...chatHistory.data.map((i) => {
                return {
                  key: i.chat_rooms_id,
                  chat_rooms_id: i.chat_rooms_id,
                  name: i.name,
                  lastChat: i.last_chat
                }
              })
            ] : []
          }
        />
      </div>
      <div className="align-middle col-span-1 md:col-span-3 pt-3 pr-3 pb-3">
        <div className="w-full h-full rounded-3xl bg-gray-100">
          {
            activeChatContactName
              ? <ActiveChat contactName={activeChatContactName} chats={message} onSend={(e, msg) => sendChatHandler(e, msg)} />
              : welcomeMessage()
          }
        </div>
      </div>
    </div>
  }, [chatHistory, activeChatContactName, message, askModalStatus])

  return (
    <div>
      <Head>
        <title>{process.env.appName}</title>
        <meta name="description" content="SpeakUp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Ask open={askModalStatus} onCancel={() => setAskModalStatus(!askModalStatus)} onAddNewContact={addNewContactHandler} onStartNewChat={startNewChatHandler} />
      <FindContact open={findContactModalStatus} onCancel={() => setFindContactModalStatus(!findContactModalStatus)} />
      <ChooseContact open={chooseContactModalStatus} parentCallback={chooseContactParentHandler} onCancel={() => setChooseContactModalStatus(!chooseContactModalStatus)} />

      { isLoggedIn ? chats() : 'Please wait ...'}
    </div>
  )
}
