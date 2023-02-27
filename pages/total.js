import { useEffect, useCallback } from "react"
import Layout from "../layout/layout"
import useQuiosco from "../hooks/useQuiosco"
import { formatMoney } from "../helpers"

export default function Total() {
    const { order, name, setName, colocarOrder, total } = useQuiosco()

    const confirmOrder = useCallback(() => {
        return order.length === 0 || name === "" || name.length < 3
    }, [order, name])

    useEffect(() => {
        confirmOrder()
    }, [order, confirmOrder])

    return (
        <Layout page="Total and confirm order">
            <h1 className="text-4xl font-black">Total and confirm order</h1>
            <p className="text-2xl my-10">Confirm your order right away</p>
            <form onSubmit={colocarOrder}>
                <div>
                    <label 
                        className="block uppercase text-slate-800 font-bold text-xl"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input 
                        id="name"
                        type="text"
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mt-10">
                    <p>
                        Total to pay: <span className="font-bold">{formatMoney(total)}</span>
                    </p>
                </div>
                <div className="mt-5">
                    <input
                        type='submit'
                        className={`${confirmOrder() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        value="Confirm order"
                        disabled={confirmOrder()}
                    />
                </div>
            </form>
        </Layout>
    )
}