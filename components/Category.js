import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

const Category = ({ category }) => {
    const { name, icon, id } = category
    const { currentCategory, handleClickCategory } = useQuiosco()

    return (
        <div className={`${currentCategory?.id === id ? "bg-amber-400" : ""} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
            <Image 
                width={100}
                height={100}
                src={`/assets/img/icono_${icon}.svg`}
                alt="Icon image"
            />
            <button 
                type='button'
                className='text-2xl font-bold hover:cursor-pointer'
                onClick={() => handleClickCategory(id)}
            >
                {name}
            </button>
        </div>
    )
}

export default Category