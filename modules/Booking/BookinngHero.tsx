import Contact from '@/components/Contact'
import CustomBooking from '@/components/CustomBooking'
import NavBar from '@/components/NavBar'
import NewsCustom from '@/components/NewsCustom'
import WherePath from '@/components/WherePath'
import WorkTimes from '@/components/WorkTimes'
import { LeafBL, LeafRight } from '@/public/images'
import Image from 'next/image'

const BookinngHero = () => {
    return (
        <div className='containers relative'>
            <Image src={LeafRight} alt="" width={258} height={258} className="absolute z-30 -left-45 top-210 pointer-events-none select-none" />
            <Image src={LeafRight} alt="" width={258} height={258} className="absolute z-0 left-130 top-350 -rotate-10 pointer-events-none select-none" />
            <Image src={LeafBL} alt="" width={252} height={252} className="absolute bottom-240 -left-45 z-30 rotate-260 pointer-events-none select-none" />
            <Image src={LeafRight} alt="" width={258} height={258} className="absolute z-0 -right-50 bottom-240 -rotate-180 pointer-events-none select-none" />
            <NavBar />
            <div className='px-16.25 py-20 op-background rounded-bl-[50px] rounded-br-[50px]'>
                <WherePath pathName='/booking' pageName='Бронирование' />
                <h1 className='text-[48px] font-extrabold text-center leading-[150%] mt-7.5'>
                    Бронирование
                </h1>
                <WorkTimes />
                <CustomBooking title='Хотите забронировать стол?' exTitleClass='text-center' exBtnClass='mx-auto' />
                <Contact title='Связаться с нами' />
            </div>

            <NewsCustom variant='home' />
        </div>
    )
}

export default BookinngHero