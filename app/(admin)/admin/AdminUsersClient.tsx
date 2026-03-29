"use client"
import { useState } from "react"
import { makeAdmin, deleteUser } from "@/app/lib/service"


const AdminUsersClient = ({ users: initialUsers }: { users: User[] }) => {
    const [users, setUsers] = useState<User[]>(initialUsers)

    const handleMakeAdmin = async (id: string) => {
        const result = await makeAdmin(id)
        setUsers(prev => prev.map(u => u.id === id ? result.data : u))
    }

    const handleDelete = async (id: string) => {
        if (!confirm("O'chirishni tasdiqlaysizmi?")) return
        await deleteUser(id)
        setUsers(prev => prev.filter(u => u.id !== id))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-[32px] font-black">Foydalanuvchilar</h1>
                    <p className="text-black/50 text-[14px]">Jami: {users.length} ta</p>
                </div>
            </div>
            <div className="bg-white/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-black/10 bg-white/30">
                            <th className="text-left px-6 py-4 text-[13px] font-bold text-black/40 uppercase tracking-wider">Ism</th>
                            <th className="text-left px-6 py-4 text-[13px] font-bold text-black/40 uppercase tracking-wider">Username</th>
                            <th className="text-left px-6 py-4 text-[13px] font-bold text-black/40 uppercase tracking-wider">Telefon</th>
                            <th className="text-left px-6 py-4 text-[13px] font-bold text-black/40 uppercase tracking-wider">Role</th>
                            <th className="text-left px-6 py-4 text-[13px] font-bold text-black/40 uppercase tracking-wider">Sana</th>
                            <th className="text-left px-6 py-4 text-[13px] font-bold text-black/40 uppercase tracking-wider">Amallar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user.id} className={`border-b border-black/5 hover:bg-white/40 transition ${index % 2 === 0 ? "bg-white/10" : "bg-transparent"}`}>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-[15px]">{user.firstname} {user.lastname}</p>
                                </td>
                                <td className="px-6 py-4 text-black/60">@{user.username}</td>
                                <td className="px-6 py-4 text-black/60">{user.phone}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${user.role === 'admin' ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500"}`}>
                                        {user.role === 'admin' ? 'Admin' : 'User'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-black/40 text-[13px]">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        {user.role !== 'admin' && (
                                            <button onClick={() => handleMakeAdmin(user.id)} className="px-4 py-2 bg-blue-500 text-white rounded-xl text-[13px] cursor-pointer hover:bg-blue-600 transition font-medium" >
                                                Admin qilish
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(user.id)} className="px-4 py-2 bg-red-500 text-white rounded-xl text-[13px] cursor-pointer hover:bg-red-600 transition font-medium"  >
                                            O'chirish
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users?.length === 0 && (
                    <div className="text-center py-16 text-black/40">
                        <p className="text-[16px]">Foydalanuvchilar topilmadi</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminUsersClient