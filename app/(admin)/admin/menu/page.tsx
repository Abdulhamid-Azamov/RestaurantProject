import { GetCategories, GetMenu } from "@/app/lib/service"
import { cookies } from "next/headers"
import AdminMenuClient from "../AdminMenuClient"

const AdminMenuPage = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  const menus = await GetMenu()
  const categories = await GetCategories()

  return <AdminMenuClient menus={menus} categories={categories} />
}

export default AdminMenuPage