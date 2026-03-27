"use client"
import NavBar from "@/components/NavBar"
import { useCart } from "@/context/CartContext"
import { ApplePay, HumoCart, MasterCart, Uzcard, VisaCart } from "@/public/images"
import { LucideHome, Loader2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

const CheckoutHero = () => {
  const { clearCart, items, totalPrice } = useCart()
  const router = useRouter()
  const [delivery, setDelivery] = useState<'pickup' | 'door' | 'address'>('door')
  const [payment, setPayment] = useState<'card' | 'cash'>('card')
  const [isLoading, setIsLoading] = useState(false)


  const handleOrder = async () => {
    setIsLoading(true)
    setTimeout(() => {
      clearCart()
      router.push("/order-success")
    }, 2500)
  }

  return (
    <div className="containers">
      <NavBar />
      <div className="px-16.25 py-10 op-background rounded-bl-[50px] rounded-br-[50px]">
        <h1 className='text-[48px] font-extrabold text-center leading-[150%]'>Оформление заказа</h1>
        <div className="flex gap-10 mt-10">
          < div className="flex-1 flex flex-col gap-8" >
            <div className=" rounded-3xl p-8">
              <h2 className="text-[40px] leading-[150%] font-black mb-6">Способ получения:</h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="delivery" checked={delivery === 'pickup'} onChange={() => setDelivery('pickup')} className="w-5 h-5 cursor-pointer" />
                  <span className="text-[24px] leading-[150%] font-semibold">Заказ с собой</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="delivery" checked={delivery === 'door'} onChange={() => setDelivery('door')} className="w-5 h-5 cursor-pointer" />
                  <span className="text-[24px] leading-[150%] font-semibold">Доставка до двери</span>
                </label>
                {delivery === 'door' && (
                  <div className="mt-2">
                    <div className="flex items-center gap-3.75">
                      <LucideHome width={48} height={48} />
                      <h2 className="font-semibold text-[24px] leading-[150%]">Доставка по адресу:</h2>
                    </div>
                    <p className="text-[13px] text-black/50 mb-3">Укажите адрес доставки на карте:</p>
                    <button className="bg-black text-white px-8 py-3 rounded-2xl cursor-pointer hover:bg-gray-800 transition">
                      Выбрать
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className=" rounded-3xl p-8">
              <h2 className="text-[40px] leading-[150%]  font-black mb-6">Способ оплаты:</h2>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={payment === 'card'} onChange={() => setPayment('card')} className="w-5 h-5 cursor-pointer" />
                    <span className="text-[24px] leading-[150%]">Картой онлайн</span>
                  </div>
                  {payment === 'card' && (
                    <div className="flex items-center gap-2 ml-8">
                      <Image src={HumoCart} alt="Humo cart" width={48} height={32} />
                      <Image src={Uzcard} alt="Uzcart" width={48} height={32} />
                      <Image src={VisaCart} alt="Visa Cart" width={48} height={32} />
                      <Image src={MasterCart} alt="Master Cart" width={48} height={32} />
                      <Image src={ApplePay} alt="Apple pay cart" width={48} height={32} />
                    </div>
                  )}
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" checked={payment === 'cash'} onChange={() => setPayment('cash')} className="w-5 h-5 cursor-pointer" />
                  <span className="text-[24px] leading-[150%]">Оплата при получении</span>
                </label>
              </div>
            </div>
          </div >
          <div className="w-95 bg-white/40 backdrop-blur-md rounded-3xl p-8 h-fit text-center">
            <h2 className="text-[32px] leading-[150%] font-black text-center mb-6">Ваш заказ</h2>
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b border-black/10 pb-3">
                  <span className="text-[16px] leading-[150%] text-black/70">
                    {item.name} ({item.count})
                  </span>
                  <span className="text-[16px] font-semibold">
                    {(parseFloat(String(item.price)) * item.count).toFixed(0)} сум
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center mt-2">
                <span className="text-[24px] leading-[150%] font-black">Итого:</span>
                <span className="text-[24px] leading-[150%] font-black">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button disabled={isLoading || items.length === 0} onClick={handleOrder} className="cursor-pointer w-full bg-black text-white py-4 rounded-2xl text-[20px] font-bold mt-8 flex justify-center items-center gap-2 hover:bg-zinc-800 transition disabled:opacity-50" >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>Обработка...</span>
                </>
              ) : (
                "Заказать"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutHero