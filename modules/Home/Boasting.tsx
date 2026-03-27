import { Atmosphere, CarDelivery, Cooks, DelDishes, GoodService, Soup } from "@/public/icons"
import Image from "next/image"

const Boasting = () => {

    const boasts = [
        { id: 1, icon: Soup, title: "Качественные продукты", desc: "Входные билеты в музеи, для посещения достопримечательностей, памятников" },
        { id: 2, icon: CarDelivery, title: "Быстрая доставка", desc: "Входные билеты в музеи, для посещения достопримечательностей, памятников" },
        { id: 3, icon: DelDishes, title: "Вкусные рецепты", desc: "Входные билеты в музеи, для посещения достопримечательностей, памятников" },
        { id: 4, icon: Atmosphere, title: "Уютная атмосфера", desc: "Входные билеты в музеи, для посещения достопримечательностей, памятников" },
        { id: 5, icon: Cooks, title: "Опытные повара", desc: "Входные билеты в музеи, для посещения достопримечательностей, памятников" },
        { id: 6, icon: GoodService, title: "Обслуживания", desc: "Входные билеты в музеи, для посещения достопримечательностей, памятников" },
    ]
    return (
        <div className="containers">
            <div>
                <h1 className="text-[48px] leading-[150%] font-gilory font-bold text-center my-19.25">Почему именно мы?</h1>
            </div>
            <div className="flex items-center flex-wrap gap-18.75">
                {boasts.map((item) => {
                    const Icon = item.icon
                    return (
                        <div key={item.id} className="flex flex-col w-97.5 ">
                            <Icon className="w-17.5 h-17.5 mb-5 text-orange-500" />
                            <h2 className="text-[32px] mb-2.5">{item.title}</h2>
                            <p className="text-[16px] leading-[100%]">{item.desc}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Boasting
