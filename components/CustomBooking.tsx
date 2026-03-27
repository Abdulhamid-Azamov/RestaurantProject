"use client"
import { createReservation } from "@/app/lib/service"
import { CalendarDays, Clock, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { motion, AnimatePresence } from "framer-motion"

const CustomBooking = ({ title, exTitleClass, exBtnClass }: { title: string, exTitleClass?: string, exBtnClass?: string }) => {
    const [email, setEmail] = useState<string>("")
    const [people, setPeople] = useState<string>("")
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [place, setPlace] = useState<string>("")

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const tables = [
        { id: 1, name: "Первая таблица" },
        { id: 2, name: "Вторая таблица" },
        { id: 3, name: "Третий стол" },
        { id: 4, name: "Четвертая таблица" },
        { id: 5, name: "Таблица пять" },
        { id: 6, name: "Стол шесть" },
    ]

    const peopleSize = [
        { id: 1, size: 2, value: 1 },
        { id: 2, size: 4, value: 2 },
        { id: 3, size: 6, value: 3 },
        { id: 4, size: 8, value: 4 },
        { id: 5, size: 10, value: 5 },
        { id: 6, size: "Oilaviy", value: 6 },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email || !people || !startDate || !startTime || !place) {
            setError("Пожалуйста, заполните все поля")
            return
        }

        const date = startDate.toISOString().split("T")[0]
        const time = startTime.toTimeString().slice(0, 5)

        setLoading(true)
        try {
            await createReservation({
                email,
                guests: Number(people),
                date,
                time,
                location: place,
            })
            setTimeout(() => {
                setSuccess(true)
                setLoading(false)
            }, 1500)
        } catch (err: any) {
            setError(err.message)
            setLoading(false)
        }
    }

    const resetForm = () => {
        setSuccess(false)
        setEmail("")
        setPeople("")
        setStartDate(null)
        setStartTime(null)
        setPlace("")
    }

    return (
        <div className="relative overflow-hidden min-h-125 flex items-center justify-center">
            <AnimatePresence mode="wait">
                {!success ? (
                    <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }} className="w-full"  >
                        <h2 className={`${exTitleClass} font-bold font-glory text-[32px] leading-[150%] mb-8.75 text-center`}>
                            {title}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="outline-none mb-10 w-full border-y-none border-b-2 py-2.5 text-[16px] text-[#585858] leading-[150%] font-glory bg-transparent" placeholder="Ваш email" />
                            <select value={people} onChange={e => setPeople(e.target.value)} className="outline-none mb-10 w-full border-y-none border-b-2 py-2.5 text-[16px] text-[#585858] leading-[150%] font-glory bg-transparent appearance-none" >
                                <option value="" disabled>На сколько человек?</option>
                                {peopleSize.map((item) => <option key={item.id} value={item.value} className="text-black">{item.size}</option>)}
                            </select>
                            <div className="relative w-full">
                                <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} placeholderText="Выберите дату" dateFormat="dd.MM.yyyy" minDate={new Date()} className="outline-none mb-10 w-full border-y-none border-b-2 py-2.5 text-[16px] text-[#585858] leading-[150%] font-glory bg-transparent" wrapperClassName="w-full" />
                                <CalendarDays size={24} className="absolute right-1 top-6 -translate-y-1/2 text-[#000000] pointer-events-none" />
                            </div>
                            <div className="relative w-full">
                                <DatePicker selected={startTime} onChange={(time: any) => setStartTime(time)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Время" placeholderText="Выберите время" dateFormat="HH:mm" className="outline-none mb-10 w-full border-y-none border-b-2 py-2.5 text-[16px] text-[#585858] leading-[150%] font-glory bg-transparent" wrapperClassName="w-full" />
                                <Clock size={24} className="absolute right-1 top-6 -translate-y-1/2 text-[#000000] pointer-events-none" />
                            </div>
                            <select value={place} onChange={e => setPlace(e.target.value)} className="outline-none w-full border-y-none border-b-2 py-2.5 text-[16px] text-[#585858] leading-[150%] font-glory bg-transparent appearance-none" >
                                <option value="" disabled>Выберите место</option>
                                {tables.map(item => (
                                    <option className="text-black" key={item.id} value={String(item.id)}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <Link href={"/"} className="text-[13px] leading-[150%] text-[#06004C] block mb-17.5 mt-2.5 hover:underline" >
                                Выбрать места на карте
                            </Link>
                            {error && (
                                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg font-glory text-center">
                                    {error}
                                </motion.p>
                            )}
                            <div className="flex justify-end">
                                <button type="submit" disabled={loading} className={`${exBtnClass} relative cursor-pointer min-w-42.5 h-15 text-white bg-black rounded-[13px] disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center overflow-hidden`}  >
                                    <AnimatePresence mode="wait">
                                        {loading ? (
                                            <motion.div key="loading" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Загрузка...</span>
                                            </motion.div>
                                        ) : (
                                            <motion.span key="label" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                                                Забронировать
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="flex flex-col items-center justify-center text-center py-10 w-full"  >
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="mb-6 bg-green-100 p-4 rounded-full text-green-600 flex items-center justify-center shadow-lg"  >
                            <CheckCircle2 size={64} />
                        </motion.div>
                        <h2 className={`${exTitleClass} font-bold font-glory text-[32px] leading-[150%] mb-4 text-black`}>
                            Стол забронирован!
                        </h2>
                        <p className="text-black font-glory text-[18px] mb-10 max-w-87.5">
                            Мы свяжемся с вами по email <br />
                            <span className="font-bold text-black break-all">{email}</span>
                        </p>
                        <button onClick={resetForm} className={`${exBtnClass} cursor-pointer w-full max-w-62.5 h-15 text-white bg-black rounded-[13px] hover:bg-zinc-800 transition-colors shadow-xl`} >
                            Забронировать ещё
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CustomBooking