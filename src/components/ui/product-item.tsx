import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon } from "lucide-react";
import { Badge } from "./badge";
import Image from "next/image";


interface ProductItemProps {
    product: ProductWithTotalPrice
}

const ProductItem = ({product}:ProductItemProps) => {
    return ( 
        <div className="flex flex-col gap-4 max-w-[156px]">
            <div className="relative bg-accent rounded-lg h-[170px] w-[156px] flex items-center justify-center">
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
                    <Badge className="absolute left-3 top-3 px-2 py-[2px ]">
                        <ArrowDownIcon />{product.discountPercentage}%
                    </Badge>
                )}
            </div>

            <div>
                <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                    {product.name}
                </p>

                <div className="flex items-center gap-2">
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
    );
}
 
export default ProductItem;