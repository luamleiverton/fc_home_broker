import { Badge, Table, TableBody, TableHead, TableHeadCell, TableCell, TableRow } from "../components/flowbite-components";
import { Order } from "../models";
import { IsHomeBrokerClosed } from "../utils";

async function getOrders(wallet_id: string): Promise<Order[]>{
  const response = await fetch(`http://localhost:3000/wallets/${wallet_id}/orders`, {
    next: {tags: [`orders-wallet-${wallet_id}`], 
    revalidate: 1,},
    //revalidate: IsHomeBrokerClosed() ? 60*60 : 5 ,},
    },
  );
  return response.json();
}

export default async function MyOrders(props: {
  wallet_id: string
}) {

  const orders = await getOrders(props.wallet_id);

  return (
    <div>
      <article className="format format-invert">
        <h2>Minhas ordens</h2>
      </article>
      <Table className="mt-2">
        <TableHead >
          <TableHeadCell>asset_id</TableHeadCell>
          <TableHeadCell>quant</TableHeadCell>
          <TableHeadCell>price</TableHeadCell>
          <TableHeadCell>type</TableHeadCell>
          <TableHeadCell>status</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
            {orders.map((order, key) => (
              <TableRow
              className="dark:border-gray-700 dark:bg-gray-800" key={key}
              >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {order.asset_id}
              </TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.shares}</TableCell>
              <TableCell>
                <Badge>{order.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge>{order.status}</Badge>
              </TableCell>
              </TableRow>
              ))}
          </TableBody>
      </Table>
      </div>
  );
}