"use client";

import { useCart } from "@/context/CartContext";
import { BasketBtn, LikeBtn } from "@/public/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MealCard = ({ meal, extraClass, featured = false }: MealCardProps) => {
    const [liked, setLiked] = useState(false);
    const router = useRouter();
    const { addItem } = useCart()

    return (
        <div onClick={() => router.push(`/menu/${meal.id}`)} className={`${extraClass} relative flex flex-col bg-white/40 backdrop-blur-md rounded-4xl px-5 pb-6 transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 ${featured ? "shadow-xl" : "shadow-md"} hover:cursor-pointer`} >
            <div className={`relative rounded-full overflow-hidden mx-auto ${featured ? "-mt-12 w-52 h-52" : "-mt-10 w-44 h-44"}`}>
                <img src={meal.image} alt={meal.name} className='w-full h-full object-cover' />
            </div>
            <div className="flex items-start justify-between gap-2 mt-5">
                <h3 className={`font-bold text-black leading-tight ${featured ? "text-xl" : "text-base"}`}>
                    {meal.name}
                </h3>
                <button onClick={(e) => { e.stopPropagation(), setLiked(!liked) }} className={`shrink-0 transition-all duration-200 cursor-pointer ${liked ? "text-red-500 scale-110" : "text-black/90 hover:text-red-500"}`} >
                    <LikeBtn />
                </button>
            </div>
            <p className="text-black/40 text-sm mt-1">
                {meal.description}
            </p>
            <div className="flex items-center justify-between mt-6">
                <span className={`font-black text-black ${featured ? "text-2xl" : "text-lg"}`}>
                    ${Number(meal.price).toFixed(2)}
                </span>
                <button onClick={(e) => { e.stopPropagation(), addItem({ id: meal.id, name: meal.name, image: meal.image, price: meal.price }) }} className="w-11 h-11 flex items-center justify-center bg-black text-white rounded-2xl transition-all duration-200 hover:scale-110 hover:shadow-lg hover:bg-gray-800 active:scale-95 cursor-pointer"  >
                    <BasketBtn />
                </button>
            </div>
        </div>
    );
};

export default MealCard;