import 'tailwindcss/tailwind.css'

export default function Index() {

    return (
        <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <button class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
                Click me
            </button>
        </div>
    )
}