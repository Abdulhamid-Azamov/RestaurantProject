"use client"
import AdminSideBar from "@/components/AdminSideBar"
import { ReactNode } from "react"
export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen" style={{ background: "linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 50%, #d4c4b0 100%)" }}>
            <AdminSideBar />
            <main className="ml-64 flex-1 p-10">
                {children}
            </main>
        </div>
    )
}