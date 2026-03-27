"use client"
import Link from "next/link"
import MenuButton from "./MenuButton"
import { useEffect, useState } from "react"
import Pagination from "./Pagination"
import { GetNews } from "@/app/lib/service"


type Props = {
    variant?: "home" | "news-page"
}


const NewsCustom = ({ variant = "home" }: Props) => {
    const [newsList, setNewList] = useState<NewsType[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        GetNews()
            .then(data => setNewList(data))
            .catch(err => console.error(err))
    }, [])
    const displayedNews = variant === "home" ? newsList.slice(0, 3) : newsList

    if (variant === "news-page") {
        const NEWS_PER_PAGE = 6
        const totalPages = Math.ceil(newsList.length / NEWS_PER_PAGE)
        const start = (currentPage - 1) * NEWS_PER_PAGE
        const displayedNews = newsList.slice(start, start + NEWS_PER_PAGE)
        return (
            <div className="containers">
                <h1 className="text-[48px] leading-[150%] font-bold text-center">
                    Новости
                </h1>
                <div className="grid grid-cols-3 gap-8 pb-8">
                    {displayedNews.map((item) => (
                        <NewsCard key={item.id} item={item} />
                    ))}
                </div>
                {totalPages > 1 && (
                    <Pagination total={totalPages} current={currentPage} onChange={(page) => {
                        setCurrentPage(page)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    />
                )}
            </div>
        )
    }

    return (
        <div className="containers">
            <h1 className="text-[48px] leading-[150%] font-bold text-center">
                <Link href="/news">Новости</Link> / Галерея
            </h1>
            <div className="flex items-center justify-center gap-24 pb-8">
                {displayedNews.map((item) => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </div>
            <div className="flex justify-end">
                <MenuButton title="Посмотреть все" href="/news" />
            </div>
        </div>
    )
}

const NewsCard = ({ item }: { item: NewsType }) => (
    <div className="flex flex-col justify-around pt-24 pb-5 relative w-90 rounded-3xl mt-36 op-background h-70 pl-6">
        <img
            className="absolute -top-20 left-5 w-53.25 h-39.5 rounded-3xl object-cover"
            src={item.image}
            alt="News Gallery"
        />
        <p className="text-[16px] leading-[160%]">{item.about}</p>
        <div className="flex items-center justify-start gap-3 mt-4">
            <img
                className="w-11 h-11 rounded-full object-cover"
                src={item.authorImage}
                alt="Profile Image"
            />
            <h3 className="text-[16px] font-semibold leading-[160%]">{item.author}</h3>
        </div>
    </div>
)

export default NewsCustom