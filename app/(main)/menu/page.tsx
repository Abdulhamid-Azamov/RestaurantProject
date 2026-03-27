import { GetCategories, GetMenu } from '@/app/lib/service'
import NewsCustom from '@/components/NewsCustom'
import HeroMenu from '@/modules/Menu/HeroMenu'

const MenuPage = async () => {
    const menus = await GetMenu()
    const categories = await GetCategories()

    return (
        <div className='overflow-hidden'>
            <HeroMenu menus={menus} categories={categories} />
            <NewsCustom />
        </div>
    )
}

export default MenuPage