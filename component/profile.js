import { useEffect, useState } from "react"

export default function Index() {

    const [name, setName] = useState()

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data.user'))
        if (userData.name) setName(userData.name)
    }, [])

    return <div>{name}</div>
}