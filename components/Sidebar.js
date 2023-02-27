import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Category from "./Category"

const Sidebar = () => {
    const { categories } = useQuiosco()

    return (
        <>
            <Image 
                width={100}
                height={100}
                src="/assets/img/logo.svg"
                alt="image logo"
            />
            <nav className="mt-10">
                {categories.map(category => (
                    <Category 
                        key={category.id}
                        category={category}
                    />
                ))}
            </nav>
        </>
    )
}

export default Sidebar