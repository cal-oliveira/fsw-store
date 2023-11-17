import Image from "next/image"

type PromoBannerProps = {
    src: string,
    alt: string,
}

const PromoBanner = ({ src, alt }: PromoBannerProps) => {
    return(
        <Image 
            src={src}
            alt={alt}
            height={0}
            width={0}
            className="h-auto w-full px-5"
            sizes="100vh"
        />
    )
}

export default PromoBanner