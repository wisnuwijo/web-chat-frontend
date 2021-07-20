import { useEffect, useState } from "react"

export default function Message(props) {

    const [float, setFloat] = useState('')
    const [bg, setBg] = useState('')

    useEffect(() => {
        if (props.isSender) {
            setFloat('float-right')
            setBg('bg-gray-300')
        } else {
            setFloat('float-left')
            setBg('bg-gray-200')
        }
    }, [])
    return <>
        <div className="grid grid-cols-6">
            <div className="col-span-6 mt-2">
                <div className={bg + " "+ float +" pt-2 pb-2 pl-5 pr-5 rounded-3xl text-black"}>
                    {props.children}
                </div>
            </div>
        </div>
    </>
}