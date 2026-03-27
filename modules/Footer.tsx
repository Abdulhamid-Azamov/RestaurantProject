import { Facebook, Instagram, LogoIcon, Telegram, WhatsUp } from '@/public/icons'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='flex items-start justify-start gap-40'>
      <div className='pt-15 pl-17.5'>
        <LogoIcon />
        <div className='flex items-center gap-2.5 mt-4'>
          <Telegram />
          <WhatsUp />
          <Facebook />
          <Instagram />
        </div>
      </div>
      <div className='pt-19 flex items-start gap-47.5'>
        <div>
          <h2 className='text-[25px] font-semibold'>Наши услуги</h2>
          <div className='flex flex-col gap-2'>
            <Link href={"/"}>Цены</Link>
            <Link href={"/"}>Отслеживание</Link>
            <Link href={"/"}>Cообщить об ошибке</Link>
            <Link href={"/"}>Условия услуг</Link>
          </div>
        </div>
        <div>
          <h2 className='text-[25px] font-semibold'>Наша компания</h2>
          <div className='flex flex-col gap-2'>
            <Link href={"/"}>Наша компания</Link>
            <Link href={"/"}>Cвяжитесь с нами</Link>
            <Link href={"/"}>Управление</Link>
          </div>
        </div>
        <div className='w-40'>
          <h2 className='text-[25px] font-semibold'>Адрес</h2>
          <div className='flex flex-col gap-2'>
            <p>Узбекистан, Ташкент Улица, 24</p>
            <p>+99894848844848</p>
            <p>info@bmgsoft.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
