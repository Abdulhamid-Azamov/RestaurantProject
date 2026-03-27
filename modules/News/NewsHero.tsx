import Gallery from '@/components/Galety'
import NavBar from '@/components/NavBar'
import NewsCustom from '@/components/NewsCustom'
import WherePath from '@/components/WherePath'
import { LeafBL, LeafRight } from '@/public/images'
import Image from 'next/image'

const NewsHero = () => {
    return (
        <div className='containers relative'>
            <Image src={LeafRight} alt="" width={258} height={258} className="absolute z-999 -right-40 top-70 rotate-190 pointer-events-none select-none" />
            <Image src={LeafBL} alt="" width={252} height={252} className="absolute top-230 -left-45 z-999 rotate-250 pointer-events-none select-none" />
            <Image src={LeafRight} alt="" width={258} height={258} className="absolute z-999 -left-45 bottom-70  pointer-events-none select-none" />
            <Image src={LeafBL} alt="" width={252} height={252} className="absolute bottom-70 -right-45 z-999 rotate-80 pointer-events-none select-none" />
            <NavBar />
            <div className='px-16.25 py-20 op-background rounded-bl-[50px] rounded-br-[50px]'>
                <WherePath pathName='/news' pageName='Новости' />
                <NewsCustom variant="news-page" />
                <Gallery />
            </div>
        </div>
    )
}

export default NewsHero
