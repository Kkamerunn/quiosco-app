import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from '../layout/adminLayout'
import Order from '../components/Order'

export default function Admin() {

    const fetcher = () => axios('/api/orders').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/orders', fetcher, {
        refreshInterval: 100
    })

    return (
        <AdminLayout page={"Admin"}>
            <h1 className="text-4xl font-black">Administration panel</h1>
            <p className="text-2xl my-10">Manage all your orders</p>
            {data && data.length ? data.map(order => (
                <Order 
                    key={order.id}
                    order={order}
                />
            )) :
                <p>There are no orders at the moment</p>
            }
        </AdminLayout>
    )
}