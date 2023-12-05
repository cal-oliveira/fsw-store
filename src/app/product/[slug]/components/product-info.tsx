"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
    product: ProductWithTotalPrice
}

const ProductInfo = ({product}: ProductInfoProps) => {

    const [quantity, setQuantity] = useState(1)

    const { addProductToCart } = useContext(CartContext)

    const handleDecrementQuantity = () => {
        setQuantity(quantity === 1 ? quantity : quantity - 1)
    }

    const handleIncrementQuantity = () => {
        setQuantity(quantity+1)
    }

    const handleAddToCartClick = () => {
        addProductToCart({...product, quantity})
    }

    return (
        <div className="flex flex-col px-5">
            <h2 className="text-lg">{product.name}</h2>

            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">R$ {product.totalPrice.toFixed(2)}</h1>
                {product.discountPercentage > 0 && (
                    <DiscountBadge>{product.discountPercentage}</DiscountBadge>
                )}

            </div>
            {product.discountPercentage > 0 && (
                <p className="opacity-75 text-sm line-through">R$ {Number(product.basePrice).toFixed(2)}</p>
            )}
            <div className="flex items-center gap-2 mt-4">
                <Button size='icon' variant='outline' onClick={handleDecrementQuantity}>
                    <ArrowLeftIcon size={16}/>
                </Button>
                <span>{quantity}</span>
                <Button size='icon' variant='outline' onClick={handleIncrementQuantity}>
                    <ArrowRightIcon size={16} />
                </Button>
            </div>

            <div className="flex flex-col gap-3 mt-8">
                <h3 className="font-bold">Descrição</h3>

                <p className="text-justify opacity-60 text-sm">
                    {product.description}
                </p>
            </div>

            <Button onClick={handleAddToCartClick} className="mt-8 uppercase font-bold">Adicionar ao carrinho</Button>
        
            <div className="bg-accent flex items-center justify-between rounded-lg px-5 py-2 mt-5">
                <div className="flex items-center gap-2">
                    <TruckIcon />

                    <div className="flex flex-col">
                        <p className="text-xs">
                            Entrega via <span className="font-bold">FSPacket®</span>
                        </p>

                        <p className="text-[#8162FF] text-xs">
                            Envio para <span className="font-bold">todo Brasil</span>
                        </p>
                    </div>
                </div>

                <p className="font-bold">Frete Grátis</p>
            </div>
        </div>
    );
}
 
export default ProductInfo;