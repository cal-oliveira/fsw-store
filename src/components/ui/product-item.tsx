import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon } from "lucide-react";
import { Badge } from "./badge";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";


interface ProductItemProps {
    product: ProductWithTotalPrice
}

const ProductItem = ({product}:ProductItemProps) => {
    return ( 
        <Link href={`/product/${product.slug}`}>
            <div className="flex flex-col gap-4">
                <div className="relative bg-accent rounded-lg h-[170px] w-full flex items-center justify-center">
                    <Image 
                        src={product.imageUrls[0]}
                        height={100}
                        width={100}
                        alt={product.name}
    /*                     className="h-auto w-auto max-h-[70%] max-w-[80%]" */
                        style={{
                            objectFit: 'contain'
                        }}
                    /> 

                    {product.discountPercentage > 0 && (
                        <DiscountBadge className="absolute left-3 top-3">
                            {product.discountPercentage}
                        </DiscountBadge>
                    )}
                </div>

                <div>
                    <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                        {product.name}
                    </p>

                    <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis ">
                        {product.discountPercentage > 0 ? (
                            <>
                                <p className="font-semibold">
                                    R$ {product.totalPrice.toFixed(2)}
                                </p>

                                <p className="text-xs line-through opacity-75">
                                    R${Number(product.basePrice).toFixed(2)}
                                </p>
                            </>
                        ) : (
                            <p className="text-xs line-through opacity-75">
                                R${Number(product.basePrice).toFixed(2)}
                            </p>
                        )}                    
                    </div>
                </div>
            </div>
        </Link>
    );
}
 
export default ProductItem;