import { getOrders } from "@/app/lib/service"
import AdminOrdersClient from "../AdminOrderClient"

const AdminOrdersPage = async () => {
    const orders = await getOrders()
    return <AdminOrdersClient orders={orders || []} />
}

export default AdminOrdersPage