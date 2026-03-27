import { ContactWithCall, MapContact, SocialMediaContact } from "@/public/images"
import Image from "next/image"

const Contact = ({ title }: { title: string }) => {
    const contactTypes = [
        { id: 1, icon: SocialMediaContact, title: "Напишите нам", firstLink: "info@bmgsoft.com", secondLink: "t.me/bmgsoft.com" },
        { id: 2, icon: ContactWithCall, title: "Позвоните нам", firstLink: "+9998908767888", secondLink: "+9989865332322" },
        { id: 3, icon: MapContact, title: "Посетите нас", firstLink: "Узбекистан, Ташкент", secondLink: "Улица, 24" }
    ]

    return (
        <div className="containers">
            <h1 className="text-[48px] leading-[150%] font-bold text-center mb-12">
                {title}
            </h1>
            <div className="flex items-center justify-center gap-38.75">
                {contactTypes.map((contact) => (
                    <div key={contact.id} className="flex flex-col items-center gap-4 text-center">
                        <Image src={contact.icon} alt={contact.title} width={48} height={48} />
                        <h2 className="text-[18px] font-bold leading-[150%]">
                            {contact.title}
                        </h2>
                        <div className="flex flex-col gap-1">
                            <a className="text-[14px] leading-[160%] text-gray-700 hover:text-black transition-colors">
                                {contact.firstLink}
                            </a>
                            <a className="text-[14px] leading-[160%] text-gray-700 hover:text-black transition-colors">
                                {contact.secondLink}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contact