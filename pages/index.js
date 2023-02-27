import Layout from "../layout/layout"
import Head from "next/head"
import useQuiosco from "../hooks/useQuiosco"
import Product from "../components/Product"
import { useEffect } from 'react'

export default function Home() {
  const { currentCategory } = useQuiosco()

  return (
    <>
      <Layout page={`Menu: ${currentCategory?.name}`}>
        <h1 className="text-4xl font-black">{currentCategory?.name}</h1>
        <p className="text-2xl my-10">Choose and customize your order</p>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {currentCategory?.products?.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </Layout>
    </>
  )
}