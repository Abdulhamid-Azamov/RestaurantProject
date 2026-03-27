"use client"

import { registerApi } from "@/app/lib/service"
import CustomInput from "@/components/CustomInput"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Register = () => {

    const router = useRouter()

    const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [agreed, setAgreed] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
        agreed: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors = {
            firstname: !firstname ? "Ismingizni kiriting" : "",
            lastname: !lastname ? "Familiyangizni kiriting" : "",
            phone: !phone ? "Telefon raqamingizni kiriting" : "",
            username: !username ? "Username kiriting" : "",
            password: !password ? "Parol kiriting" : "",
            confirmPassword: password !== confirmPassword ? "Parollar mos emas" : "",
            agreed: !agreed ? "Shartlarga rozilik bildiring" : ""
        }
        setErrors(newErrors)
        const hasError = Object.values(newErrors).some(err => err !== "")
        if (hasError) return

        try {
            const result = await registerApi({
                firstname,
                lastname,
                phone,
                username,
                password
            })

            if (result.message) {
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-bg py-8 px-130">
            <div className="op-background w-115.75 pt-7 pb-5 rounded-[30px] px-10">
                <h2 className="font-bold text-center font-glory text-[24px] leading-[150%] mb-5">Зарегистрироваться</h2>
                <form onSubmit={handleSubmit}>
                    <CustomInput placeholder="Ваше имя" type="text" value={firstname} onChange={e => setFirstname(e.target.value)} error={errors.firstname} />
                    <CustomInput placeholder="Фамилия" type="text" value={lastname} onChange={e => setLastname(e.target.value)} error={errors.lastname} />
                    <CustomInput placeholder="Ваш номер телефона" type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ""))} error={errors.phone} />
                    <CustomInput placeholder="Ваше имя пользователя" type="text" value={username} onChange={e => setUsername(e.target.value)} error={errors.username} />
                    <CustomInput placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} />
                    <CustomInput placeholder="Подтвердите пароль" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} error={errors.confirmPassword} />
                    <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="agree" className="text-[12px] text-[#585858] font-glory cursor-pointer">
                            Я прочитал и принял Политику конфиденциальности и Условия*
                        </label>
                    </div>
                    {errors.agreed && (
                        <p className="text-red-500 text-[12px] mb-3">{errors.agreed}</p>
                    )}
                    <button type="submit" className="cursor-pointer w-42.5 h-11 mx-[26%] text-white bg-black rounded-[13px]">
                        Вход в аккаунт
                    </button>
                    <Link href={"/login"} className="text-[12px] text-center leading-[150%] text-[#06004C] block mt-2">Уже есть аккаунт?</Link>
                </form>
            </div>
        </div>
    )
}

export default Register