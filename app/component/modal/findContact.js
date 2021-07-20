import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useDebounce from '../../hooks/useDebounce'
import Contact from '../contact'
import axios from 'axios'

export default function FindContact(props) {

    const cancelButtonRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [pin, setPin] = useState('')
    const [searchedContacts, setSearchedContacts] = useState()

    const debouncedData = useDebounce(pin, 1000)

    useEffect(() => {
        const findContactHandler = async (e) => {
            setLoading(true)

            const token = localStorage.getItem('token')
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }

            const findContact = await axios.get(process.env.endPoint + '/contacts/find?pin=' + pin, {
                headers: headers
            })

            setSearchedContacts(findContact.data)
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
        
        if (debouncedData) {
            findContactHandler()
        }
    }, [debouncedData])

    useEffect(() => {
        return () => {
            setPin('')
        }
    } ,[])

    const addContactHandler = async (userIdContact) => {
        setLoading(true)

        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        let userData = {
            "user_id_contact": userIdContact
        }

        const addContact = await axios.post(process.env.endPoint + '/contacts/store', userData, {
            headers: headers
        })
        console.log('addContactaddContact ', addContact);

        setTimeout(() => {
            setLoading(false)
        }, 500)
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
                                            Find Contact
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Use PIN to find contact" className="border-0 border-b-2 w-full focus:outline-none focus:ring-transparent" />
                                            {
                                                loading
                                                    ? <div className="p-5">Loading ...</div>
                                                    : searchedContacts 
                                                        ? searchedContacts.data.length > 0
                                                            ? searchedContacts.data.map((i) => <Contact key={i.id} name={i.name} lastChat={i.username} addContactHandler={(_) => addContactHandler(i.id)} isContact={i.is_contact} />)
                                                            : <div className="p-5">No contact found</div>
                                                        : ''
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
