import { useRouter } from "next/router"

const steps = [
    {step: 1, name: 'Menu', url: '/'},
    {step: 2, name: 'Resume', url: '/resumen'},
    {step: 3, name: 'Total', url: '/total'},
]

const Steps = () => {
    const router = useRouter()

    const calculateProgress = () => {
        let value
        if (router.pathname === '/') {
            value = 2
        } else if (router.pathname === '/resumen') {
            value = 50
        } else {
            value = 100
        }
        return value
    }

    return (
        <>
            <div className="flex justify-between mb-5">
                {
                    steps.map(step => (
                        <button className="text-2xl font-bold" key={step.step} onClick={() => {
                            router.push(step.url)
                        }}>
                            {step.name}
                        </button>
                    ))
                }
            </div>
            <div className="bg-gray-100 mb-10">
                <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
                    style={{ width: `${calculateProgress()}%` }}
                ></div>
            </div>
        </>
    )
}

export default Steps