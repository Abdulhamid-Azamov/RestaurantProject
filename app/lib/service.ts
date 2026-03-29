"use server"

import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const registerApi = async (data: {
    firstname: string
    lastname: string
    phone: string
    username: string
    password: string
}) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const loginApi = async (data: {
    username: string
    password: string
}) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return response.json()
}


export const logoutApi = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('token')
}

export const getToken = async () => {
    const cookieStore = await cookies()
    return cookieStore.get('token')?.value
}

export const GetGallery = async () => {
    const res = await fetch(`${API_URL}/gallery`, { next: { revalidate: 60 } })
    return res.json()
}

export const GetMenu = async () => {
    const response = await fetch(`${API_URL}/menu`, { next: { revalidate: 60 } })
    const result = await response.json()
    return result.data
}

export const GetMenuById = async (id: string) => {
    const response = await fetch(`${API_URL}/menu/${id}`, { next: { revalidate: 60 } })
    return response.json()
}

export const GetCategories = async () => {
    const response = await fetch(`${API_URL}/category`, { next: { revalidate: 60 } })
    const result = await response.json()
    return result.data
}

export const GetPopular = async () => {
    const response = await fetch(`${API_URL}/menu/popular`, { next: { revalidate: 60 } })
    const result = await response.json()
    return result.data
}

export const GetSimilarMenus = async (categoryId: string, excludeId: string) => {
    const response = await fetch(`${API_URL}/menu/category/${categoryId}?excludeId=${excludeId}`, { next: { revalidate: 60 } })
    const result = await response.json()
    return result.data
}

export const GetNews = async () => {
    const response = await fetch(`${API_URL}/news`, { next: { revalidate: 60 } })
    const result = await response.json()
    return result.data
}

export const GetTeamMembers = async () => {
    const response = await fetch(`${API_URL}/team`, { next: { revalidate: 60 } })
    const result = await response.json()
    return result.data
}

export const getUserFromToken = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return null
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return {
            username: payload.username as string,
            role: payload.role as string
        }
    } catch {
        return null
    }
}

export const createReservation = async (data: {
    email: string
    guests: number
    date: string
    time: string
    location: string
}) => {
    const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Ошибка при бронировании")
    }
    return result
}


export const createMenu = async (data: object) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const response = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const updateMenu = async (id: string, data: object) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const deleteMenu = async (id: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    await fetch(`${API_URL}/menu/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const getUsers = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const response = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
    })
    const result = await response.json()
    return result.data
}

export const makeAdmin = async (id: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const response = await fetch(`${API_URL}/users/${id}/make-admin`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.json()
}

export const deleteUser = async (id: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const getOrders = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const response = await fetch(`${API_URL}/reservation`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
    })
    const result = await response.json()
    return result.data
}

export const updateOrderStatus = async (id: string, status: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const response = await fetch(`${API_URL}/reservation/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    })
    return response.json()
}