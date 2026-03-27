"use client"

import { ReactNode } from "react"



const BadgeAction = ({ icon, count, onClick }: { icon: ReactNode, count?: number, onClick?: () => void }) => {
    return (
        <button onClick={onClick} className="relative flex items-center justify-center w-12 h-12 rounded-full border-3 hover:cursor-pointer border-black hover:border-red-500 hover:text-red-500 duration-300 hover:bg-black/5 transition">
            {icon}
            {count !== undefined && count > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center  w-5 h-5 text-[10px] font-semibold text-white bg-red-500 rounded-full">
                    {count}
                </span>
            )}
        </button>
    )
}

export default BadgeAction