"use client"
import NavBar from "@/components/NavBar"
import WherePath from "@/components/WherePath"
import { useCart } from "@/context/CartContext"
import { useState } from "react"

interface Menu {
    id: string
    name: string
    description: string
    price: number | string
    image: string
    category: {
        id: string
        categoryName: string
    }
}

const MenuDetail = ({ menu }: { menu: Menu }) => {
    const price = parseFloat(String(menu.price))
    const [count, setCount] = useState(1)
    const { addItem } = useCart()

    return (
        <div className="containers">
            <NavBar />
            <div className="px-16.25 py-10 op-background rounded-bl-[50px] rounded-br-[50px]">
                <WherePath pathName='/menu' pageName='Меню' />
                <h1 className="text-[36px] font-black text-center mt-4">{menu.name}</h1>
                <div className="flex gap-10 mt-8 items-center">
                    <div className="w-1/2 flex items-center justify-center">
                        <img src={menu.image} alt={menu.name} className="w-full max-h-105 object-contain drop-shadow-2xl" />
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <div className="flex items-center gap-4">
                            <p className="text-[28px] font-black">${price.toFixed(2)}</p>
                            <div className="flex items-center gap-1">
                                {"★★★★☆".split("").map((star, i) => (
                                    <span key={i} className="text-yellow-400 text-xl">{star}</span>
                                ))}
                                <span className="text-black font-bold ml-1">4,0</span>
                                <span className="text-black/50 text-[14px] ml-2 cursor-pointer underline">
                                    (Смотреть отзывы)
                                </span>
                            </div>
                        </div>
                        <h3 className="text-[20px] font-bold mt-6">Описание:</h3>
                        <p className="text-[15px] text-black/70 mt-2 leading-relaxed">
                            {menu.description}
                        </p>
                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3">
                                <button onClick={() => setCount(c => Math.max(1, c - 1))} className="text-[20px] font-bold cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-xl transition" >
                                    −
                                </button>
                                <span className="text-[18px] font-bold w-6 text-center">{count}</span>
                                <button onClick={() => setCount(c => c + 1)} className="text-[20px] font-bold cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-xl transition"  >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    for (let i = 0; i < count; i++) {
                                        addItem({
                                            id: menu.id,
                                            name: menu.name,
                                            image: menu.image,
                                            price: menu.price
                                        })
                                    }
                                }}
                                className="bg-black text-white px-10 py-3 rounded-2xl text-[16px] cursor-pointer hover:bg-gray-800 transition"
                            >
                                В корзину
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuDetail