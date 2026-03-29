"use client"
import { createContext, useContext, useState, ReactNode } from "react"

const LikeContext = createContext<LikeContextType>({} as LikeContextType)

export const LikeProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<LikeItem[]>([])

    const addItem = (item: LikeItem) => {
        setItems(prev => {
            if (prev.find(i => i.id === item.id)) return prev
            return [...prev, item]
        })
    }

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }

    const isLiked = (id: string) => items.some(i => i.id === id)

    return (
        <LikeContext.Provider value={{ items, addItem, removeItem, isLiked, totalCount: items.length }}>
            {children}
        </LikeContext.Provider>
    )
}

export const useLike = () => useContext(LikeContext)