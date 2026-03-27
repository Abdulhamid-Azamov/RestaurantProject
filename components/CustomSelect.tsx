"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const CustomSelect = ({ languages }: { languages: Language[] }) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Language>(languages[0])
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={ref} className="relative  w-50">
            <button onClick={() => setOpen(!open)} className=" cursor-pointer flex w-[80%] items-center justify-between  rounded-lg px-3 py-2" >
                <div className="flex items-center gap-4">
                    <Image src={selected.flag} alt={selected.name} width={18} height={18} />
                    <span>{selected.name}</span>
                </div>
                <span className={`transition ${open ? "rotate-180" : ""}`}>
                    ▼
                </span>
            </button>
            {open && (
                <div className="absolute mt-2 w-full rounded-lg border bg-transparent shadow-lg z-50">
                    {languages.map((lang) => (
                        <div key={lang.id} onClick={() => { setSelected(lang), setOpen(false) }} className="flex items-center gap-2 px-3 py-2 hover:bg-transparent cursor-pointer" >
                            <Image src={lang.flag} alt={lang.name} width={18} height={18} />
                            <span>{lang.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomSelect