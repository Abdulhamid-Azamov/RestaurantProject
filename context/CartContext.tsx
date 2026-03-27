"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Interface-ni ham yangilab qo'ying (agar alohida faylda bo'lsa)
interface CartContextType {
    items: CartItem[];
    addItem: (item: any) => void;
    removeItem: (id: string) => void;
    updateCount: (id: string, count: number) => void;
    clearCart: () => void; // Yangi funksiya
    totalCount: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([])

    useEffect(() => {
        const saved = localStorage.getItem('cart')
        if (saved) setItems(JSON.parse(saved))
    }, [])

    const clearCart = () => {
        setItems([])
        localStorage.removeItem('cart')
    }

    const addItem = (item: Omit<CartItem, 'count'>) => {
        setItems(prev => {
            const exists = prev.find(i => i.id === item.id)
            if (exists) {
                return prev.map(i => i.id === item.id ? { ...i, count: i.count + 1 } : i)
            }
            return [...prev, { ...item, count: 1 }]
        })
    }

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }

    const updateCount = (id: string, count: number) => {
        if (count < 1) return removeItem(id)
        setItems(prev => prev.map(i => i.id === id ? { ...i, count } : i))
    }

    const totalCount = items.reduce((sum, i) => sum + i.count, 0)
    const totalPrice = items.reduce((sum, i) => sum + parseFloat(String(i.price)) * i.count, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateCount, clearCart, totalCount, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}

