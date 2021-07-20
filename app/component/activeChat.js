import { useState, useRef, useEffect } from "react"
import Message from "./message"

export default function ActiveChat(props) {

    const [chatTyped, setChatTyped] = useState("")
    const bottomRef = useRef()

    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [props.chats])

    return (
        <div className="flex flex-col h-full ">
            <div className="flex-none w-full h-16 blur-lg">
                <div className="absolute filter h-16 rounded-3xl" style={{ backgroundRepeat: 'no-repeat',backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20190828/pngtree-dark-vector-abstract-background-image_302715.jpg)', }}></div>
                <div className="rounded-t-3xl h-16 w-full bg-green-500 text-white pl-5 pt-2">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="rounded-full h-10 w-10 flex bg-blue-200 items-center justify-center text-lg font-bold">{props.contactName ? props.contactName.charAt(0) : '?'.charAt(0)}</div>
                                </td>
                                <td>
                                    <div className="font-bold text-md pl-2">{props.contactName}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex-grow w-full p-3 h-96 overflow-scroll">
                {
                    props.chats.length > 0
                        ? props.chats.map(
                            (i) => <Message key={i.id} isSender={i.is_sender}>
                                {i.message}
                            </Message>
                        ) : ''
                }
                <div className="w-full" ref={bottomRef}></div>
            </div>
            <div className="flex-none w-full h-20 pl-4 pr-4">
                <form onSubmit={(e) => {
                    setChatTyped('')
                    props.onSend(e, chatTyped)
                }}>
                    <div className="h-16 bg-white rounded-3xl shadow-lg w-full">
                        <div className="grid grid-cols-6 h-full">
                            <div className="col-span-5">
                                <input type="text" onChange={(e) => setChatTyped(e.target.value)} value={chatTyped} className="bg-transparent rounded-3xl border-0 w-full h-full focus:outline-none" placeholder="Write your message ..." />
                            </div>
                            <div className="col-span-1 m-2">
                                <button type="submit" className="bg-green-500 w-full h-full rounded-3xl text-white">SEND</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}