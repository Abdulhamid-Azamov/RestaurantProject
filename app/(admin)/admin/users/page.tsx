import { getUsers } from "@/app/lib/service"
import AdminUsersClient from "../AdminUsersClient"

const AdminUsersPage = async () => {
    const users = await getUsers()
    return <AdminUsersClient users={users} />
}

export default AdminUsersPage