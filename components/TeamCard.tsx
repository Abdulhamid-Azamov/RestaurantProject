import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

const TeamCard = ({ memberImg, fullName, position }: { memberImg: string | StaticImport, fullName: string, position: string }) => {
    return (
        <div className='text-center'>
            <div className='p-7.5 border rounded-[50%]'>
                <Image src={memberImg} alt='Member IMg' width={233} height={233} className='rounded-[50%]' />
            </div>
            <h1 className='text-[24px leading-[150%] font-bold'>{fullName}</h1>
            <p className='text-[20px] leading-[150%]'>{position}</p>
        </div>
    )
}

export default TeamCard
