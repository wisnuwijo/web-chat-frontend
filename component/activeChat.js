export default function ActiveChat(props) {

    return (
        <div className="flex flex-col h-full ">
            <div className="flex-none w-full h-16 blur-lg">
                <div className="absolute filter h-16 rounded-3xl" style={{ backgroundRepeat: 'no-repeat',backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20190828/pngtree-dark-vector-abstract-background-image_302715.jpg)', }}></div>
                <div className="rounded-t-3xl h-16 w-full bg-green-500 text-white pl-5 pt-2">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="rounded-full h-10 w-10 flex bg-blue-200 items-center justify-center text-lg font-bold">{'E'.charAt(0)}</div>
                                </td>
                                <td>
                                    <div className="font-bold text-md pl-2">Elon Musk</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex-grow w-full p-3">
                <div className="grid grid-cols-6">
                    <div className="col-span-6 mt-2">
                        <div className="float-right pt-2 pb-2 pl-5 pr-5 rounded-3xl bg-gray-300 text-black">
                            Broooo, pie kabare?
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-6">
                    <div className="col-span-6 mt-2">
                        <div className="float-left pt-2 pb-2 pl-5 pr-5 rounded-3xl bg-gray-200 text-black">
                            Alhamdulillah sehat, awakmu pie kabare jo?
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-6">
                    <div className="col-span-6 mt-2">
                        <div className="float-left pt-2 pb-2 pl-5 pr-5 rounded-3xl bg-gray-200 text-black">
                            Ayo neng mars bro
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-none w-full h-20 pl-4 pr-4">
                <div className="h-16 bg-white rounded-3xl shadow-lg w-full">
                    <div className="grid grid-cols-6 h-full">
                        <div className="col-span-5">
                            <input type="text" className="bg-transparent rounded-3xl border-0 w-full h-full" placeholder="Write your message ..." />
                        </div>
                        <div className="col-span-1 m-2">
                            <button className="bg-green-500 w-full h-full rounded-3xl text-white">SEND</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}