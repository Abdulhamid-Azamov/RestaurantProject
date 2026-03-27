"use client"
import { useState } from "react"
import Contact from "@/components/Contact"
import ContactMeInp from "@/components/ContactMeInp"
import NavBar from "@/components/NavBar"
import WherePath from "@/components/WherePath"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle2 } from "lucide-react"

const ContactHero = () => {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")

    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!fullname || !email || !phone || !message) return
        setStatus('loading')
        setTimeout(() => {
            setStatus('success')
            setFullname("")
            setEmail("")
            setPhone("")
            setMessage("")
            setTimeout(() => {
                setStatus('idle')
            }, 3000)
        }, 2500)
    }

    return (
        <div className="containers">
            <NavBar />
            <div className="px-16.25 py-20 op-background rounded-bl-[50px] rounded-br-[50px]">
                <WherePath pathName='/contact' pageName='Контакты' />
                <Contact title="Контакты" />
                <h1 className='text-[48px] font-extrabold text-center leading-[150%] mt-19 mb-15 text-black'>Написать нам</h1>
                <form onSubmit={handleSubmit} className="flex flex-col px-37.5 gap-4">
                    <ContactMeInp placeholder="Ваше имя" type="text" value={fullname} onChange={e => setFullname(e.target.value)} />
                    <ContactMeInp placeholder="Ваш E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <ContactMeInp placeholder="Ваш номер телефона" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                    <ContactMeInp placeholder="Ваше сообщение" type="textarea" value={message} onChange={e => setMessage(e.target.value)} />
                    <div className="flex justify-end mt-4">
                        <button disabled={status !== 'idle'} type="submit" className={`min-w-50 h-15 rounded-2xl text-[18px] font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${status === 'success' ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'}  disabled:opacity-80 disabled:cursor-not-allowed`}  >
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
                                        Отправить
                                    </motion.span>
                                )}
                                {status === 'loading' && (
                                    <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2"   >
                                        <Loader2 className="animate-spin w-5 h-5" />
                                        <span>Отправка...</span>
                                    </motion.div>
                                )}
                                {status === 'success' && (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2" >
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span>Отправлено!</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactHero