"use client"
import { GetGallery } from "@/app/lib/service"
import Pagination from "@/components/Pagination"
import { useEffect, useState } from "react"

const GALLERY_PER_PAGE = 8

const Gallery = () => {
    const [galleryList, setGalleryList] = useState<GalleryType[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        GetGallery().then((data) => setGalleryList(data))
    }, [])

    const totalPages = Math.ceil(galleryList.length / GALLERY_PER_PAGE)
    const start = (currentPage - 1) * GALLERY_PER_PAGE
    const displayedGallery = galleryList.slice(start, start + GALLERY_PER_PAGE)

    return (
        <div className="containers">
            <h1 className="text-[48px] leading-[150%] font-bold text-center">
                Галерея
            </h1>
            <div className="grid grid-cols-4 gap-4 pb-8">
                {displayedGallery.map((item) => (
                    <img key={item.id} src={item.image} alt="Gallery" className="w-full h-52 object-cover rounded-3xl" />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination
                    total={totalPages}
                    current={currentPage}
                    onChange={(page) => {
                        setCurrentPage(page)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                />
            )}
        </div>
    )
}

export default Gallery