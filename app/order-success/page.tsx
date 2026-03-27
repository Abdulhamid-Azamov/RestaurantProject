"use client"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function OrderSuccess() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      {/* Doira animatsiyasi */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <CheckCircle2 size={64} className="text-green-600" />
        </motion.div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-3xl font-black mb-2"
      >
        Заказ принят!
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-gray-500 mb-8"
      >
        Ваш вкусный ужин уже готовится.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Link href="/" className="bg-black text-white px-8 py-3 rounded-xl font-bold">
          На главную
        </Link>
      </motion.div>
    </div>
  )
}