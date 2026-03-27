"use client"
import { GetTeamMembers } from "@/app/lib/service"
import CustomAbout from "@/components/CustomAbout"
import NavBar from "@/components/NavBar"
import NewsCustom from "@/components/NewsCustom"
import TeamCard from "@/components/TeamCard"
import WherePath from "@/components/WherePath"
import { OurMeals, OurWays } from "@/public/images"
import { useEffect, useState } from "react"

const AboutHero = () => {
    const [teamList, setTeamList] = useState<TeamType[]>([])

    useEffect(() => {
        GetTeamMembers()
            .then(data => setTeamList(data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="containers relative">
            <NavBar />
            <div className="px-16.25 py-20 op-background rounded-bl-[50px] rounded-br-[50px]">
                <WherePath pathName='/about' pageName='О нас' />
                <h1 className='text-[48px] font-extrabold text-center leading-[150%] mt-7.5'>О нас</h1>
                <p className="text-[20px] leading-[150%]">
                    С 1995 года наша миссия в ресторане — питать и вдохновлять каждого члена команды, гостя и сообщество, которому мы служим. Спустя все эти годы эти основные ценности остаются в основе всего, что мы делаем. От нашего меню до наших услуг и способов ведения бизнеса — наш свежий, неожиданный и человечный взгляд отличает нас. Мы называем это Необыкновенной Добротой. И это во всем, что мы делаем. <br /> <br /> Имея более 450 ресторанов в 26 штатах и ​​более 8000 членов команды, мы два года подряд были названы Forbes одним из лучших работодателей Америки в области разнообразия. Денверский деловой журнал признал нас одним из лучших мест для работы. Мы считаем, что эти успехи основаны на нашей уникальной и заботливой культуре, благодаря которой каждый, кто входит в наши двери, чувствует себя желанным гостем и оцененным по достоинству.
                </p>
                <CustomAbout SideImage={OurMeals} textAbout="Наша страсть — создавать исключительные впечатления от еды по отличной цене. От традиционных и современных блюд до наших собственных кулинарных творений, таких как фаршированные тортеллони премиум-класса, наши свежеприготовленные рецепты отличаются индивидуальностью, креативностью и ярким вкусом кухонь всего мира." aboutText="От «Пенне Роза» до японской лапши, салата «Мед» и всемирно известных макарон с сыром «Висконсин» — мы используем только самые лучшие и полезные ингредиенты. Каждое блюдо готовится свежим и делается на заказ. Наше богатое меню наполнено яркими, яркими и приятными вкусами." title="Наша еда" />
                <CustomAbout extraClass="!flex-row-reverse" SideImage={OurWays} textAbout="С самого начала мы взяли на себя обязательство предлагать свежие продукты, свежие ингредиенты и новый взгляд на заботу о наших гостях, членах нашей команды и наших сообществах. Мы искренне верим, что нет ничего, что могло бы объединить людей или сделать мир лучше, чем тарелка лапши" aboutText="Продолжая расти, мы реализуем ключевые инициативы во всей нашей компании, чтобы поддержать светлое будущее. В нашем отчете о влиянии рассматриваются некоторые из этих областей, такие как создание меню, наполненного свежими и захватывающими новыми вкусами; активация лучших в отрасли льгот для людей; и некоторые способы лучше заботиться о наших сообществах – и о нашей планете – которую мы называем домом." title="Наш путь" showBtn={true} />
                <h1 className='text-[48px] font-extrabold text-center leading-[150%] mt-7.5 mb-10'>Наша команда</h1>
                <div className="flex flex-wrap gap-20 justify-center items-center">
                    {teamList.map((item) => (
                        <div key={item.id}>
                            <TeamCard memberImg={item.image} fullName={item.fullName} position={item.position} />
                        </div>
                    ))}
                </div>
            </div>
            <NewsCustom variant="home" />
        </div>
    )
}

export default AboutHero
