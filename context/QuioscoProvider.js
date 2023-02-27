import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState({})
    const [product, setProduct] = useState({})
    const [modal, setModal] = useState(false)
    const [order, setOrder] = useState([])
    const [name, setName] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const getCategories = async () => {
        const { data } = await axios.get('/api/categories')
        setCategories(data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        setCurrentCategory(categories[0])
    }, [categories])

    useEffect(() => {
        const newTotal = order.reduce((total, product) => (product.price * product.quantity) + total, 0)
        setTotal(newTotal)
    }, [order])

    const handleClickCategory = id => {
        const category = categories.filter(cat => cat.id === id)
        setCurrentCategory(category[0])
        router.push('/')
    }

    const handleSetProduct = product => setProduct(product)

    const handleSetModal = () => setModal(!modal)

    const handleSetOrder = ({ categoryId, ...product }) => {
        if (order.some(productState => productState.id === product.id)) {
            // update quantity
            const orderUpdated = order.map(productState => productState.id === product.id ? product : productState)

            setOrder(orderUpdated)

            toast.success('Order updated successfully')
        } else {
            setOrder([...order, product])
            toast.success('Order saved successfully')
        }
        setModal(false)
    }

    const handleEditQuantity = id => {
        const productUpdate = order.filter(product => product.id === id)
        setProduct(productUpdate[0])
        setModal(!modal)
    }
    
    const handleDeleteQuantity = id => {
        const orderUpdated = order.filter(product => product.id !== id)
        setOrder(orderUpdated)
    }

    const colocarOrder = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/orders', {
                name,
                total, 
                order,
                date: Date.now().toString()
            })

            setCurrentCategory(categories[0])
            setOrder([])
            setName('')
            setTotal(0)

            toast.success('Order succesfully requested')

            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categories,
                currentCategory,
                handleClickCategory,
                handleSetProduct,
                product,
                modal,
                handleSetModal,
                handleSetOrder,
                order,
                handleEditQuantity,
                handleDeleteQuantity,
                name,
                setName,
                colocarOrder,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext