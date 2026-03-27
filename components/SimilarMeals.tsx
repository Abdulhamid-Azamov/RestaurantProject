"use client"
import { useState } from "react"
import MealCard from "./MealCard"
import { NextIcon, PrevIcon } from "@/public/icons"

const OBV_NUM = 4

const SimilarMeals = ({ menus }: { menus: Menu[] }) => {
    const [startIndex, setStartIndex] = useState(0)

    const visibleMeals = menus.slice(startIndex, startIndex + OBV_NUM)
    const canPrev = startIndex > 0
    const canNext = startIndex + OBV_NUM < menus.length

    return (
        <div className="mt-16 px-16.25 py-16.25">
            <h2 className="text-[32px] font-black mb-8">Похожие:</h2>
            <div className="relative flex items-center gap-4">
                <button onClick={() => canPrev && setStartIndex(i => i - OBV_NUM)} disabled={!canPrev} className="shrink-0 w-15 h-15 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" >
                    <PrevIcon />
                </button>
                <div className="flex-1 grid grid-cols-4 gap-6 pt-12">
                    {visibleMeals.map((meal, index) => (
                        <MealCard key={meal.id} meal={meal} featured={index === 1 || index === 2} />
                    ))}
                </div>
                <button onClick={() => canNext && setStartIndex(i => i + OBV_NUM)} disabled={!canNext} className="shrink-0 w-15 h-15 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" >
                    <NextIcon />
                </button>
            </div>
        </div>
    )
}

export default SimilarMeals