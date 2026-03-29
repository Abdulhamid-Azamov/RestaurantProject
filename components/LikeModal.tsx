"use client"
import { useLike } from "@/context/LikeContext"
import { useEffect } from "react"

const LikeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { items, removeItem } = useLike()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    return (
        <>
            {isOpen && (
                <div onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-md z-40" />
            )}
            <div className={`fixed top-0 right-0 h-full w-105 bg-white/80 backdrop-blur-xl z-50 shadow-2xl rounded-l-3xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex items-center justify-between px-8 py-6 border-b border-black/10">
                    <h2 className="text-[24px] font-black">Избранное</h2>
                    <button onClick={onClose} className="text-[42px] font-normal rotate-45 cursor-pointer hover:text-red-500 transition">+</button>
                </div>
                <div className="flex-1 overflow-y-auto px-8 py-4 flex flex-col gap-4">
                    {items.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-black/40 text-[16px]">Список пуст</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex items-center gap-4 bg-white/60 backdrop-blur-md rounded-2xl p-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-[15px]">{item.name}</h3>
                                    <p className="text-black/50 text-[13px]">${parseFloat(String(item.price)).toFixed(2)}</p>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 cursor-pointer transition text-[32px] rotate-45">+</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default LikeModal