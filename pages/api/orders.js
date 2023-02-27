import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient()

    // Get orders
    const orders = await prisma.order.findMany({
        where: {
            state: false
        }
    })
    res.status(200).json(orders)

    // Create order
    if (req.method === "POST") {
        const order = await prisma.order.create({
            data: {
                name: req.body.name,
                total: req.body.total,
                order: req.body.order,
                date: Date.now().toString()
            }
        })
        res.json(order)
    }
}