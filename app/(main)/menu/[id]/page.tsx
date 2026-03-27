import MenuDetail from "@/modules/Menu/MenuDetail"
import SimilarMeals from "@/components/SimilarMeals"
import { GetMenuById, GetSimilarMenus } from "@/app/lib/service"

const MenuDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const menu = await GetMenuById(id)
    const similarMenus = await GetSimilarMenus(menu.data.category.id, id)

    return (
        <div>
            <MenuDetail menu={menu.data} />
            <SimilarMeals menus={similarMenus} />
        </div>
    )
}

export default MenuDetailPage