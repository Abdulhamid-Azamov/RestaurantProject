"use client"
import { useState } from "react"
import { updateOrderStatus } from "@/app/lib/service"

interface OrderItem {
    id: string
    name: string
    count: number
    price: number | string
}

interface Order {
    id: string
    totalPrice: number | string
    status: string
    deliveryType: string
    paymentType: string
    address?: string
    items: OrderItem[]
    user: {
        firstname: string
        lastname: string
        username: string
        phone: string
    }
    createdAt: string
}

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-600",
    preparing: "bg-blue-100 text-blue-600",
    delivered: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-500",
}

const statusLabels: Record<string, string> = {
    pending: "Kutilmoqda",
    preparing: "Tayyorlanmoqda",
    delivered: "Yetkazildi",
    cancelled: "Bekor qilindi",
}

const AdminOrdersClient = ({ orders: initialOrders }: { orders: Order[] }) => {
    const [orders, setOrders] = useState<Order[]>(initialOrders)
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const handleStatusChange = async (id: string, status: string) => {
        const result = await updateOrderStatus(id, status)
        setOrders(prev => prev.map(o => o.id === id ? result.data : o))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-[32px] font-black">Zakazlar</h1>
                    <p className="text-black/50 text-[14px]">Jami: {orders.length} ta zakaz</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {orders.length === 0 && (
                    <div className="text-center py-16 text-black/40 bg-white/40 backdrop-blur-md rounded-3xl">
                        <p className="text-[16px]">Zakazlar topilmadi</p>
                    </div>
                )}
                {orders.map((order, index) => (
                    <div key={order.id} className="bg-white/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg">
                        <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/20 transition" onClick={() => setExpandedId(expandedId === order.id ? null : order.id)} >
                            <div className="flex items-center gap-6">
                                <span className="text-black/40 text-[13px] font-bold">#{index + 1}</span>
                                <div>
                                    <p className="font-bold text-[15px]">
                                        {order.user?.firstname}
                                    </p>
                                    <p className="text-black/40 text-[13px]">@{order.user?.username}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${statusColors[order.status]}`}>
                                    {statusLabels[order.status]}
                                </span>
                                <span className="font-black text-[16px]">
                                    ${parseFloat(String(order.totalPrice)).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <select value={order.status} onChange={e => { e.stopPropagation(), handleStatusChange(order.id, e.target.value) }} onClick={e => e.stopPropagation()} className="bg-white/60 border border-black/10 rounded-xl px-3 py-2 text-[13px] outline-none cursor-pointer" >
                                    <option value="pending">Kutilmoqda</option>
                                    <option value="preparing">Tayyorlanmoqda</option>
                                    <option value="delivered">Yetkazildi</option>
                                    <option value="cancelled">Bekor qilindi</option>
                                </select>
                                <span className="text-black/40 text-[20px]">
                                    {expandedId === order.id ? "▲" : "▼"}
                                </span>
                            </div>
                        </div>
                        {expandedId === order.id && (
                            <div className="px-6 pb-6 border-t border-black/10">
                                <div className="grid grid-cols-3 gap-6 mt-4">
                                    <div className="col-span-2">
                                        <h3 className="font-bold text-[14px] text-black/50 mb-3 uppercase tracking-wider">Taomlar</h3>
                                        <div className="flex flex-col gap-2">
                                            {order.items?.map(item => (
                                                <div key={item.id} className="flex justify-between items-center bg-white/40 rounded-2xl px-4 py-3">
                                                    <span className="font-medium">{item.name} × {item.count}</span>
                                                    <span className="font-bold">${(parseFloat(String(item.price)) * item.count).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>  
                                    <div>
                                        <h3 className="font-bold text-[14px] text-black/50 mb-3 uppercase tracking-wider">Ma'lumotlar</h3>
                                        <div className="flex flex-col gap-2">
                                            <div className="bg-white/40 rounded-2xl px-4 py-3">
                                                <p className="text-[12px] text-black/40">Telefon</p>
                                                <p className="font-medium">{order.user?.phone}</p>
                                            </div>
                                            <div className="bg-white/40 rounded-2xl px-4 py-3">
                                                <p className="text-[12px] text-black/40">Yetkazish</p>
                                                <p className="font-medium capitalize">{order.deliveryType}</p>
                                            </div>
                                            <div className="bg-white/40 rounded-2xl px-4 py-3">
                                                <p className="text-[12px] text-black/40">To'lov</p>
                                                <p className="font-medium capitalize">{order.paymentType}</p>
                                            </div>
                                            {order.address && (
                                                <div className="bg-white/40 rounded-2xl px-4 py-3">
                                                    <p className="text-[12px] text-black/40">Manzil</p>
                                                    <p className="font-medium">{order.address}</p>
                                                </div>
                                            )}
                                            <div className="bg-white/40 rounded-2xl px-4 py-3">
                                                <p className="text-[12px] text-black/40">Sana</p>
                                                <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminOrdersClient