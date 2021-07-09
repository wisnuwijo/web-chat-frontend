export default function Chat(props) {
    return (
        <div style={props.style} className="hover:bg-gray-100 pt-2 pb-2">
            <div className="grid grid-cols-6 pr-5 pl-5 pt-1">
                <div className="col-span-1">
                    <div className="rounded-full h-10 w-10 flex bg-blue-200 items-center justify-center text-lg font-bold">{props.name.charAt(0)}</div>
                </div>
                <div className="col-span-4">
                    <div className="font-bold text-md">{props.name}</div>
                    <div className="text-gray-500 text-xs">{props.lastChat}</div>
                </div>
            </div>
        </div>
    )
}