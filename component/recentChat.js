import { useEffect, useState } from "react"
import Chat from "./chat"

export default function RecentChat(props) {

    const [chatList, setChatList] = useState([])

    useEffect(() => {
        if (props.chats != undefined && props.chats.length > 0) {
            let chats = []
            for (let i = 0; i < props.chats.length; i++) {
                const el = <Chat key={props.chats[i].key} name={props.chats[i].name} lastChat={props.chats[i].lastChat} />
                chats.push(el)
            }

            setChatList(chats)
        }
    }, [])

    return (
        <div>
            <div className="p-5">
                <input type="text" className="bg-gray-100 p-3 border-0 w-full rounded-xl" placeholder="Search" />
            </div>
            <div className="grid grid-cols-6 pr-5 pl-5 pt-1 justify-end">
                <div className="col-span-5 text-gray-500">
                    Recent chats
                </div>
                <div className="col-span-1 flex justify-end">
                    <button className="w-8 bg-green-100 text-green-400 h-8">+</button>
                </div>
            </div>
            <div className="mt-5">
                {chatList}
            </div>
        </div>
    )
}