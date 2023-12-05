import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CarItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createChckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {

    const handleFinishPurchaseClick = async () => {
        const checkout = await createChckout(products)

        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
        )

        stripe?.redirectToCheckout({
            sessionId: checkout.id
        })
    }

    const { products, subtotal, total, totalDiscount } = useContext(CartContext)

    return (
        <div className="flex flex-col gap-8 h-full">
            <Badge className="w-fit gap-1 text-base uppercase border-primary border-2 px-3 py-[0.375rem]" variant='outline'>
                <ShoppingCartIcon size={16}/>
                Carrinho
            </Badge>

            <div className="flex flex-col gap-5 h-full max-h-full overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="flex h-full flex-col gap-8">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <CarItem key={product.id} product={computeProductTotalPrice(product as any) as any}/>
                            ))
                        ) : (
                            <p className="text-center font-semibold">Carrinho vazio. Vamos fazer compras ?</p>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {products.length > 0 && (
                <div>
                    <div className="flex flex-col gap-3">
                <Separator />

                <div className="flex items-center justify-between text-xs">
                    <p>Subtotal</p>
                    <p>R$ {subtotal.toFixed(2)}</p>
                </div>
                <Separator />

                <div className="flex items-center justify-between text-xs">
                    <p>Entrega</p>
                    <p className="uppercase">Grátis</p>
                </div>
                <Separator />

                <div className="flex items-center justify-between text-xs">
                    <p>Descontos</p>
                    <p>R$ {totalDiscount.toFixed(2)}</p>
                </div>
                <Separator />

                <div className="flex items-center justify-between text-sm font-bold">
                    <p>Total</p>
                    <p>R$ {total.toFixed(2)}</p>
                </div>
            </div>

            <Button onClick={handleFinishPurchaseClick} className="uppercase font-bold mt-7">Finalizar compra</Button>
                </div>
            )}
        </div>
    );
}
 
export default Cart;