import CustomBooking from "@/components/CustomBooking"
import { BigPizza, Ins, LeafMid } from "@/public/images"
import Image from "next/image"

const BookingPlace = () => {
    return (
        <div className=" relative containers flex justify-between items-center">
            <Image src={LeafMid} alt="" width={400} height={400} className="absolute -top-30 right-110 rotate-30  pointer-events-none select-none " />
            <Image src={LeafMid} alt="" width={400} height={400} className="absolute -bottom-20 right-50 rotate-120  pointer-events-none select-none " />
            <div className="relative z-10 w-115.75 rounded-4xl overflow-visible op-background">
                <div className="absolute -top-9 left-15.5 z-20 rounded-full w-31.25 h-31.25 flex items-center justify-center">
                    <div className="bg-black w-27.75 h-27.75 flex items-center justify-center rounded-full">
                        <Image src={Ins} width={55} height={55} alt="Kitchen Instrument" />
                    </div>
                </div>
                <div className="px-13.75 pt-23.75 pb-16.25">
                    <CustomBooking title="Забронировать стол" />
                </div>
            </div>
            <Image className="absolute -right-20" src={BigPizza} alt="Big Pizza" />
        </div>
    )
}

export default BookingPlace