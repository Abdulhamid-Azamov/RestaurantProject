"use client"
import { useState } from "react"
import NavBar from '@/components/NavBar'
import WherePath from '@/components/WherePath'
import MealCard from "@/components/MealCard"
import Image from "next/image"
import { LeafBL, LeafRight } from "@/public/images"


const HeroMenu = ({ menus, categories }: HeroMenuProps) => {
    const [activeCategory, setActiveCategory] = useState<string>("")

    return (
        <div className='relative containers z-20'>
            <Image src={LeafBL} alt="" width={252} height={252} className="absolute top-120 -right-50 z-30 rotate-70 pointer-events-none select-none" />
            <Image src={LeafRight} alt="" width={258} height={258} className="absolute z-30 -left-50 top-210 pointer-events-none select-none" />
            <Image src={LeafRight} alt="" width={258} height={258} className="absolute z-10 left-135 top-500 pointer-events-none select-none" />
            <Image src={LeafBL} alt="" width={252} height={252} className="absolute bottom-90 -left-42 z-999 rotate-250 pointer-events-none select-none" />
            <Image src={LeafRight} alt="" width={258} height={258} className="absolute z-999 -right-45 bottom-70 rotate-190 pointer-events-none select-none" />
            <NavBar />
            <div className='px-16.25 py-20 op-background rounded-bl-[50px] rounded-br-[50px] relative z-22'>
                <WherePath pathName='/menu' pageName='Меню' />
                <h1 className='text-[48px] font-extrabold text-center leading-[150%] mt-7.5'>Меню</h1>
                <div className='mx-auto mt-6 rounded-[36px] flex justify-center items-center gap-4 bg-white/40 h-14 w-fit px-2'>
                    {categories.map((item) => (
                        <h2 key={item.id} onClick={() => setActiveCategory(item.id)} className={`cursor-pointer px-5 py-2 rounded-full transition-all duration-200 ${activeCategory === item.id ? 'bg-white text-black font-bold shadow-sm' : 'text-black/70 hover:text-black'}`}>
                            {item.categoryName}
                        </h2>
                    ))}
                </div>
                <div className='grid grid-cols-4 gap-6 px-16 mt-6 pt-16'>
                    {menus
                        .filter(item => activeCategory ? item.category.id === activeCategory : true)
                        .map((menu, index) => (
                            <MealCard
                                extraClass="mt-[40px]"
                                key={menu.id}
                                meal={menu}
                                featured={index === 1 || index === 2}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroMenu