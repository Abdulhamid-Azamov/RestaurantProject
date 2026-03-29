"use client"
import { createMenu, deleteMenu, updateMenu } from "@/app/lib/service"
import { DeleteIcon, PenBoxIcon, PlusCircle, Server, X } from "lucide-react"
import { useState } from "react"

interface Menu {
    id: string
    name: string
    description: string
    price: number | string
    image: string
    isPopular: boolean
    category: { id: string, categoryName: string }
}

interface Category {
    id: string
    categoryName: string
}

interface Props {
    menus: Menu[]
    categories: Category[]
}

const AdminMenuClient = ({ menus: initialMenus, categories }: Props) => {
    const [menus, setMenus] = useState<Menu[]>(initialMenus)
    const [activeCategory, setActiveCategory] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [viewMenu, setViewMenu] = useState<Menu | null>(null)
    const [editMenu, setEditMenu] = useState<Menu | null>(null)
    
    const [form, setForm] = useState({
        name: "", description: "", price: "", image: "", categoryId: "", isPopular: false
    })

    const filteredMenus = menus.filter(m => activeCategory ? m.category?.id === activeCategory : true)

    const openView = (menu: Menu) => {
        setViewMenu(menu)
        setIsViewModalOpen(true)
    }

    const openCreate = () => {
        setEditMenu(null)
        setForm({ name: "", description: "", price: "", image: "", categoryId: "", isPopular: false })
        setIsModalOpen(true)
    }

    const openEdit = (menu: Menu) => {
        setEditMenu(menu)
        setForm({
            name: menu.name,
            description: menu.description,
            price: String(menu.price),
            image: menu.image,
            categoryId: menu.category?.id || "",
            isPopular: menu.isPopular
        })
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("O'chirishni tasdiqlaysizmi?")) return
        await deleteMenu(id)
        setMenus(prev => prev.filter(m => m.id !== id))
    }

    const handleSubmit = async () => {
        const body = { ...form, price: parseFloat(form.price) || 0 }
        try {
            if (editMenu) {
                const result = await updateMenu(editMenu.id, body)
                setMenus(prev => prev.map(m => m.id === editMenu.id ? result.data : m))
            } else {
                const result = await createMenu(body)
                setMenus(prev => [...prev, result.data])
            }
            setIsModalOpen(false)
        } catch (error) {
            alert("Xatolik yuz berdi!")
        }
    }

    return (
        <div className="p-4">
            {/* Header qismi */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-[32px] font-black">Menu</h1>
                    <p className="text-black/50 text-[14px]">Jami: {filteredMenus.length} ta taom</p>
                </div>
                <button onClick={openCreate} className="bg-black text-white px-6 py-3 rounded-2xl cursor-pointer hover:bg-gray-800 transition font-semibold flex gap-2 items-center shadow-lg">
                    Qo'shish <PlusCircle size={20} />
                </button>
            </div>

            {/* Filterlar */}
            <div className="flex gap-3 mb-6 flex-wrap">
                <button onClick={() => setActiveCategory("")} className={`px-5 py-2 rounded-full text-[14px] font-medium transition cursor-pointer ${!activeCategory ? "bg-black text-white shadow-md" : "bg-white/50 backdrop-blur-md hover:bg-white"}`} >
                    Hammasi
                </button>
                {categories.map(cat => (
                    <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-5 py-2 rounded-full text-[14px] font-medium transition cursor-pointer ${activeCategory === cat.id ? "bg-black text-white shadow-md" : "bg-white/50 backdrop-blur-md hover:bg-white"}`} >
                        {cat.categoryName}
                    </button>
                ))}
            </div>

            {/* Jadval */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/20">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-black/10 bg-white/30 text-black/40 text-[11px] uppercase tracking-widest font-bold">
                            <th className="text-left px-6 py-4">Rasm</th>
                            <th className="text-left px-6 py-4">Nomi & Tavsif</th>
                            <th className="text-left px-6 py-4">Kategoriya</th>
                            <th className="text-left px-6 py-4">Narx</th>
                            <th className="text-left px-6 py-4">Popular</th>
                            <th className="text-center px-6 py-4">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {filteredMenus.map((menu) => (
                            <tr key={menu.id} className="hover:bg-white/50 transition">
                                <td className="px-6 py-4">
                                    <img src={menu.image} alt={menu.name} className="w-14 h-14 object-cover rounded-2xl shadow-sm border border-black/5" />
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-[15px]">{menu.name}</p>
                                    {/* DIZAYN TUZATILDI: line-clamp matnni chiroyli qisqartiradi */}
                                    <p className="text-black/40 text-[12px] mt-0.5 max-w-50 line-clamp-1">{menu.description}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-white/80 px-3 py-1 rounded-full text-[12px] font-semibold border border-black/5">
                                        {menu.category?.categoryName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-black text-[16px] text-gray-800">
                                    ${Number(menu.price).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-black tracking-tighter ${menu.isPopular ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                                        {menu.isPopular ? "POPULAR" : "ODDIY"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-4">
                                        <button title="Batafsil" onClick={() => openView(menu)} className="hover:scale-110 transition cursor-pointer">
                                            <Server size={22} className="text-blue-500" />
                                        </button>
                                        <button title="Tahrirlash" onClick={() => openEdit(menu)} className="hover:scale-110 transition cursor-pointer">
                                            <PenBoxIcon size={22} className="text-gray-800" />
                                        </button>
                                        <button title="O'chirish" onClick={() => handleDelete(menu.id)} className="hover:scale-110 transition cursor-pointer">
                                            <DeleteIcon size={22} className="text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CREATE/EDIT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 flex items-center justify-center p-4">
                    <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h2 className="text-[24px] font-black mb-6">{editMenu ? "Tahrirlash" : "Yangi taom"}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[12px] font-bold text-black/40 ml-1">NOMI</label>
                                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-black/5 transition" />
                            </div>
                            <div>
                                <label className="text-[12px] font-bold text-black/40 ml-1">TAVSIF</label>
                                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 outline-none min-h-25" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[12px] font-bold text-black/40 ml-1">NARX ($)</label>
                                    <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 outline-none" />
                                </div>
                                <div>
                                    <label className="text-[12px] font-bold text-black/40 ml-1">KATEGORIYA</label>
                                    <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 outline-none appearance-none">
                                        <option value="">Tanlang</option>
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.categoryName}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-[12px] font-bold text-black/40 ml-1">RASM URL</label>
                                <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 outline-none" />
                            </div>
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer">
                                <input type="checkbox" checked={form.isPopular} onChange={e => setForm({...form, isPopular: e.target.checked})} className="w-5 h-5 accent-black" />
                                <span className="font-bold text-[14px]">Mashhur taom (Popular)</span>
                            </label>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl bg-gray-100 font-bold hover:bg-gray-200 transition">Bekor qilish</button>
                            <button onClick={handleSubmit} className="flex-1 py-4 rounded-2xl bg-black text-white font-bold hover:shadow-lg transition">Saqlash</button>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW MODAL (MORE SAHIFASI) */}
            {isViewModalOpen && viewMenu && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-110 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] p-8 w-full max-w-2xl shadow-2xl relative border border-white/20">
                        <button onClick={() => setIsViewModalOpen(false)} className="absolute right-6 top-6 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition cursor-pointer">
                            <X size={24} />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="relative group">
                                <img src={viewMenu.image} alt={viewMenu.name} className="w-full h-72 object-cover rounded-4xl shadow-2xl transition group-hover:scale-[1.02]" />
                                {viewMenu.isPopular && (
                                    <span className="absolute top-4 left-4 bg-black text-white px-4 py-1.5 rounded-full text-[12px] font-black shadow-lg">🔥 POPULAR</span>
                                )}
                            </div>
                            
                            <div className="flex flex-col justify-center space-y-6">
                                <div>
                                    <p className="text-blue-600 font-black text-[12px] tracking-[3px] uppercase mb-1">{viewMenu.category?.categoryName}</p>
                                    <h2 className="text-[36px] font-black leading-none text-gray-900">{viewMenu.name}</h2>
                                </div>
                                
                                <div className="space-y-1">
                                    <p className="text-[12px] font-bold text-black/30 uppercase tracking-widest">Narxi</p>
                                    <p className="text-[32px] font-black text-green-600">${Number(viewMenu.price).toFixed(2)}</p>
                                </div>

                                <div className="bg-gray-50 p-5 rounded-3xl border border-black/5">
                                    <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest mb-2">Taom haqida</p>
                                    <p className="text-gray-700 leading-relaxed italic">"{viewMenu.description || 'Tavsif berilmagan'}"</p>
                                </div>
                            </div>
                        </div>
                        
                        <button onClick={() => setIsViewModalOpen(false)} className="w-full mt-10 py-5 bg-black text-white rounded-[20px] font-black text-[16px] hover:bg-gray-800 transition shadow-xl uppercase tracking-widest">
                            Yopish
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminMenuClient