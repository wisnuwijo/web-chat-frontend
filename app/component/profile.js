import { useEffect, useState } from "react"
import styles from '../../styles/Home.module.css'

export default function Index() {

    const [name, setName] = useState('')
    const [pin, setPin] = useState()

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data.user'))
        if (userData && userData.name) {
            setName(userData.name)
            setPin(userData.pin)
        }
    }, [])

    return <div>
        <div className={styles.profile}>
            <div className="grid justify-items-center">
                <div className="rounded-full h-20 w-20 flex bg-yellow-200 items-center justify-center text-3xl font-bold">{name.charAt(0)}</div>
            </div>
            <div className="grid grid-cols-1 pt-3 pl-3 justify-items-center">
                <div className="text-xl">
                    {name}
                </div>
            </div>
            <div className="grid grid-cols-1 pt-3 pl-3 justify-items-center">
                <div className="rounded-full text-md bg-green-200 pt-1 pb-1 pl-5 pr-5" style={{ color: "rgba(6, 78, 59, var(--tw-bg-opacity))" }}>
                    PIN : {pin}
                </div>
            </div>
        </div>
    </div>
}