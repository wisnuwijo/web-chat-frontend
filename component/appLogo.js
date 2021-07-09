export default function AppLogo() {

    return (
        <div>
            <div className="p-5 font-bold text-xl">
                {process.env.appName}
            </div>
            <div className="h-0.5 bg-gray-100 w-full"></div>
        </div>
    )
}