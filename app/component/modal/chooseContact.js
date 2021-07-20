import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'

export default function ChooseContact(props) {

    const cancelButtonRef = useRef(null)
    const [contactList, setContactList] = useState()

    useEffect(() => {
        if (!props.open) return
        
        const getContactList = async () => {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }

            const getContactList = await axios.get(process.env.endPoint + '/contacts/load', config)
            if (getContactList.status === 403) {
                localStorage.removeItem('token')
                router.push('/login')
            }

            setContactList(getContactList.data)
        }

        getContactList()
    }, [props.open])

    const contact = (name, chatRoomsId) => {
        return <div className="hover:bg-gray-100 pt-2 pb-2">
            <div className="grid grid-cols-8 pt-1">
                <div className="col-span-1">
                    <div className="rounded-full h-10 w-10 flex bg-blue-200 items-center justify-center text-lg font-bold">{name.charAt(0)}</div>
                </div>
                <div className="col-span-5">
                    <div className="font-bold text-md">{name}</div>
                    <div className="text-gray-500 text-xs"></div>
                </div>
                <div className="col-span-2 text-sm">
                    <button onClick={(e) => {
                        props.parentCallback(name, chatRoomsId)
                        e.preventDefault()
                    }} className={"p-3 text-white bg-green-500 w-full"}>Start</button>
                </div>
            </div>
        </div>
    }

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={props.open}
                onClose={props.onCancel}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Choose Contact
                                        </Dialog.Title>
                                        <div className="mt-5">
                                            {
                                                contactList && contactList.data.length > 0 
                                                    ? contactList.data.map(
                                                        (i) => <div key={i.id}>
                                                            {contact(i.name, i.chat_rooms_id)}
                                                        </div>
                                                    ) : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={props.onCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
