import { RightSmall } from "@/public/icons"
import Image from "next/image"
import Link from "next/link"
const WherePath = ({ pageName, pathName }: { pageName: string, pathName: string }) => {
    return (
        <div className="flex gap-1">
            <Link href="/" className="cursor-pointer text-[18px] text-[#626464] leading-[150%]">Главная</Link>
            <Image src={RightSmall} alt="To Right" width={15} height={3} />
            <Link href={pathName} className="cursor-pointer text-[18px] text-black leading-[150%]">{pageName}</Link>
        </div>
    )
}

export default WherePath