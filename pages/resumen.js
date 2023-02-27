import Layout from "../layout/layout"
import useQuiosco from "../hooks/useQuiosco"
import ProductsResume from "../components/ProductsResume"

export default function Resumen() {

    const { order } = useQuiosco()

    return (
        <Layout page="Check order">
            <h1 className="text-4xl font-black">Resume</h1>
            <p className="text-2xl my-10">Check your order</p>
            {order.length === 0 ? (
                <p className="text-center text-2xl">There are no elements in your order</p>
            ) : (
                order.map(product => (
                    <ProductsResume 
                        key={product.id}
                        product={product}
                    />
                ))
            )}
        </Layout>
    )
}