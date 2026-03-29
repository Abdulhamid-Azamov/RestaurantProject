"use client"
import { loginApi } from "@/app/lib/service"
import CustomInput from "@/components/CustomInput"
import { Ins } from "@/public/images"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


const Login = () => {

    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!username) return
        if (!password) return
        try {
            const result = await loginApi({ username, password })
            if (result.token) {
                localStorage.setItem('token', result.token)
                document.cookie = `token=${result.token}; path=/; max-age=${60 * 60 * 24 * 7}`

                const payload = JSON.parse(atob(result.token.split('.')[1]))
                if (payload.role === 'admin') {
                    router.push('/admin')
                } else {
                    router.push('/')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-bg py-30 px-[35%]">
            <div className="lg-c relative z-10 w-115.75 rounded-4xl overflow-visible op-background">
                <div className="absolute -top-9 left-15.5 z-20 rounded-full w-31.25 h-31.25 flex items-center justify-center">
                    <div className="bg-black w-27.75 h-27.75 flex items-center justify-center rounded-full">
                        <Image src={Ins} width={55} height={55} alt="Kitchen Instrument" />
                    </div>
                </div>
                <div className="px-13.75 pt-23.75 pb-16.25">
                    <h2 className="font-bold font-glory text-[32px] leading-[150%] mb-8.75">Вход в аккаунт</h2>
                    <form onSubmit={handleSubmit}>
                        <CustomInput onChange={e => setUsername(e.target.value)} value={username} type="text" placeholder="Ваше имя пользователя" />
                        <CustomInput onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
                        <Link href={"/forgot-password"} className="text-[13px] leading-[150%] text-black block mb-7 mt-2.5">Забыли пароль?</Link>
                        <button type="submit" className=" cursor-pointer  w-42.5 h-15 mx-[26%] text-white bg-black rounded-[13px]">
                            Вход в аккаунт
                        </button>
                        <Link href={"/register"} className="text-[13px] text-center leading-[150%] text-[#06004C] block mt-2.5">Еще нет учетной записи?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login






