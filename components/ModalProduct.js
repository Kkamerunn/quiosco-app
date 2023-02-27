import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import { formatMoney } from '../helpers'
import { useState, useEffect } from 'react'

const ModalProduct = () => {
    const { product, handleSetModal, handleSetOrder, order } = useQuiosco()
    const [quantity, setQuantity] = useState(1)
    const [edition, setEdition] = useState(false)

    useEffect(() => {
        if (order.some((orderState) => orderState.id === product.id)) {
            const productEdition = order.find(
                orderState => orderState.id === product.id
            )
            setEdition(true)
            setQuantity(productEdition.quantity)
        }
    }, [product, order])

    return (
        <div className='md:flex gap-10'>
            <div className='md:w-1/3'>
                <Image 
                    width={300}
                    height={400}
                    alt={`product image ${product.name}`}
                    src={`/assets/img/${product.image}.jpg`}
                />
            </div>
            <div className='md:w-2/3'>
                <div className='flex justify-end'>
                    <div>
                        <button onClick={handleSetModal}>
                            <svg className='w-5' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <h1 className='text-3xl font-bold mt-5'>{product.name}</h1>
                <p className='mt-5 font-black text-5xl text-amber-500'>
                    {formatMoney(product.price)}
                </p>
                <div className='flex gap-4 mt-5'>
                    <button onClick={() => {
                        if (quantity <= 1) return
                        setQuantity(quantity - 1)
                    }}>
                        <svg className='h-6 w-6' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </button>
                    <p>{quantity}</p>
                    <button onClick={() => {
                        if (quantity >= 5) return
                        setQuantity(quantity + 1)
                    }}>
                        <svg className='h-6 w-6' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </button>
                </div>
                <button 
                    type='button' 
                    className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded'
                    onClick={() => {
                        handleSetOrder({...product, quantity})
                    }}
                >
                    {edition ? 'save changes' : 'add order'}
                </button>
            </div>
        </div>
    )
}

export default ModalProduct