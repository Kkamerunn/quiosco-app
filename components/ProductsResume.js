import Image from 'next/image'
import { formatMoney } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const ProductsResume = ({product}) => {

    const { handleEditQuantity, handleDeleteQuantity } = useQuiosco()

    return (
        <div className='shadow p-5 mb-3 flex gap-10 items-center'>
            <div className='md:w-1/6'>
                <Image 
                    width={300}
                    height={400}
                    alt={`Product image ${product.name}`}
                    src={`/assets/img/${product.image}.jpg`}
                />
            </div>
            <div className='md:w-5/6'>
                <p className='text-3xl font-bold'>{product.name}</p>
                <p className='text-xl font-bold mt-2'>Quantity: {product.quantity}</p>
                <p className='text-xl font-bold text-amber-500 mt-2'>Price: {formatMoney(product.price)}</p>
                <p className='text-sm text-gray-700 mt-2'>Subtotal: {formatMoney(product.price * product.quantity)}</p>
            </div>
            <div>
                <button
                    type='button'
                    className='bg-sky-700 flex px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full text-center'
                    onClick={() => handleEditQuantity(product.id)}
                >
                    Edit
                </button>
                <button
                    type='button'
                    className='bg-red-700 flex px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full text-center mt-3'
                    onClick={() => handleDeleteQuantity(product.id)}                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProductsResume