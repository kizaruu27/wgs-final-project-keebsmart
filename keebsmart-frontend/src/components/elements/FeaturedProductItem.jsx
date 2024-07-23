import { CardBody, CardContainer, CardItem } from "../ui/3d-card"

export default function FeaturedProductItem({productName, description, img, price, imgMarginY}) {
    return (
        <CardContainer className="inter-var h-full">
            <CardBody className="bg-gray-100 relative group/card text-wrap dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border flex flex-col justify-start gap-1 h-full" width={300}>
                <CardItem
                translateZ="50"
                className="h-5 ext-lg font-bold text-neutral-600 dark:text-white"
                >
                {productName}
                </CardItem>
                <CardItem translateZ="100" className="mx-auto mt-8">
                <img
                    src={img}
                    alt="thumbnail"
                    className="rounded-xl"
                />
                </CardItem>
                <CardItem as="p" translateZ="60" className="h-16 text-neutral-500 text-sm max-w-sm mt-8 dark:text-neutral-300 text-wrap">
                    {description}
                </CardItem>

                <div className="mt-5">
                    <CardItem
                        translateZ={20}
                        as="p"
                        className="text-neutral-400 text-xl font-semibold"
                    >
                        Rp. {price}
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    )
}