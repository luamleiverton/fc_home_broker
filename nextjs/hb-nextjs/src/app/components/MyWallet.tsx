import { WalletAsset } from "../models";
import { IsHomeBrokerClosed } from "../utils";
import { Table, TableBody, TableHead, TableHeadCell, TableCell, TableRow } from "../components/flowbite-components";
import Link from 'next/link';

async function getWalletAssets(wallet_id: string): Promise<WalletAsset[]>{
  const response = await fetch(`http://localhost:8000/wallets/${wallet_id}/assets`,
  {
    //cache: "no-store", --processamento sempre dinâmico, sem cache
    next: {
      //revalidate: IsHomeBrokerClosed() ? 60 * 60 : 5,
      revalidate: 1,
    },
  }
  );
  return response.json();;
}

export default async function MyWallet(props: {
  wallet_id: string
}) {

  const walletAssets = await getWalletAssets(props.wallet_id);

  return (
      <ul>
        <Table>
          <TableHead>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>Preço</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Comprar/Vender</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {walletAssets.map((walletAsset, key) => (
              <TableRow
              className="bg-white dark:border-gray-700 dark:bg-gray-800" key={key}
              >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {walletAsset.Asset.id} ({walletAsset.Asset.symbol})
              </TableCell>
              <TableCell>{walletAsset.Asset.price}</TableCell>
              <TableCell>{walletAsset.shares}</TableCell>
              <TableCell>
                <Link
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" 
                href={`/${props.wallet_id}/home-broker/${walletAsset.Asset.id}`}
                >Comprar/Vender</Link>
              </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </ul>
  );
}