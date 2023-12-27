import MyOrders from "@/app/components/MyOrders";
import OrderForm from "@/app/components/OrderForm";
import { Tabs, TabsItem, Card } from "../../../components/flowbite-components";
import { HiShoppingCart, HiArrowUp} from "../../../components/react-icons/hi"
import { ChartComponent } from "@/app/components/ChartComponent";

export default async function HomeBrokerPage({
  params,
}: {
  params: {wallet_id: string, asset_id: string};
}) {

  return (
    <main className="flex flex-grow flex-col container mx-auto p-2">
      <article className="format format-invert">
        <h1>Home Broker - {params.asset_id}</h1>
      </article>
      <div className="grid grid-cols-5">
        <div className="col-span-2">
          <div>
          <Card
            theme={{
              root: {
                children: "flex h-full flex-col justify-center gap-4 py-4 px-2",
              },
           }}
          >            
          <Tabs aria-label="Default tabs" style="pills">
              <TabsItem active title="Comprar" icon={HiShoppingCart}>
                <OrderForm 
                  wallet_id={params.wallet_id}
                  asset_id={params.asset_id}
                  type="BUY"
                />
              </TabsItem>
              <TabsItem title="Vender" icon={HiArrowUp}>
              <OrderForm 
                  wallet_id={params.wallet_id}
                  asset_id={params.asset_id}
                  type="SELL"
                />
              </TabsItem>
            </Tabs>
            </Card>
            </div>
            <div className="mt-2">
          <Card
            theme={{
              root: {
                children: "flex h-full flex-col justify-center gap-4 py-4 px-2",
              },
           }}
          >
            <MyOrders wallet_id={params.wallet_id}/>
          </Card>
          </div>
        </div>
        <div className="col-span-3 flex flex-grow">
          <ChartComponent header="Asset 1 - 100"/>
      </div>
      </div>
    </main>
  );
}