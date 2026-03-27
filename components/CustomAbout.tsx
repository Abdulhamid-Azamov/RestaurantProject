import Image from "next/image"
import MenuButton from "./MenuButton"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

const CustomAbout = ({ SideImage, title, textAbout, aboutText, extraClass, showBtn }: { SideImage: string | StaticImport, title: string, textAbout: string, aboutText: string, extraClass?: string, showBtn?: boolean }) => {
    return (
        <div className={` ${extraClass} flex justify-between items-center my-22.5`}>
            <div className="w-141">
                <h2 className="text-[40px] font-bold leading-[150%]">{title}</h2>
                <p className="leading-[150%] text-[20px] mt-11">
                    {textAbout}
                </p>
                <p className="leading-[150%] text-[20px] mb-11 mt-2.5 text-start">
                    {aboutText}
                </p>
                <MenuButton title="Посмотреть меню" href="/menu" extraClass={`${showBtn ? "!hidden" : ""}`} />
            </div>
            <Image src={SideImage} alt="Our Meals" height={676} width={500} />
        </div>
    )
}

export default CustomAbout
