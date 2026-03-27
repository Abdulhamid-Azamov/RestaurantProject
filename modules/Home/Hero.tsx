import MenuButton from '@/components/MenuButton'
import NavBar from '@/components/NavBar'
import { BigMeal, Leaf, LeafBL, LeafMid, LeafRight } from '@/public/images'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className='containers'>
            <NavBar />
            <div className='w-full px-17.5 pb-20 flex justify-between items-center op-background rounded-b-[50px] relative'>
                <Image src={Leaf} alt="" className="absolute -top-20 z-99 -left-32 w-74.5 h-74.5  rotate-0 pointer-events-none select-none" />
                <Image src={LeafBL} alt="" width={252} height={252} className="absolute bottom-6 right-120 z-99 rotate-[-16deg] pointer-events-none select-none" />
                <Image src={LeafMid} alt="" width={341} height={341} className="absolute top-12 left-[28%] rotate-0  pointer-events-none select-none leaf-img" />
                <Image src={LeafRight} alt="" width={258} height={258} className="absolute  z-999 -right-12 bottom-30 pointer-events-none select-none" />
                <div className="relative z-10">
                    <div className='mb-5'>
                        <h2 className='text-[65px] uppercase w-95 font-gilory font-extrabold leading-[150%]'>
                            Вкусная еда ждет тебя!
                        </h2>
                    </div>
                    <MenuButton title='Посмотреть меню' href='/menu' />
                </div>
                <Image src={BigMeal} loading='eager' alt='Big Meal Image' className="relative z-10" />
            </div>
        </div>
    )
}

export default Hero