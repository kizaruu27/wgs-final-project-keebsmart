import { GoToPage } from "../../server/pageController"
import { CardBody, CardContainer, CardItem } from "../ui/3d-card"

export default function FeaturedProductItem({productName, description, img, price, id}) {
    return (
        <CardContainer className="inter-var h-full" onClick={() => GoToPage(`/product/${id}`)}>
            <CardBody className="bg-gray-100 relative group/card text-wrap dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border flex flex-col justify-start gap-1 h-full" width={300}>
                <CardItem translateZ="100" className="mx-auto mt-8 h-52">
                    <div style={{width: 230, height: 200}} className="flex justify-center items-center">
                        <img
                            src={img}
                            alt="thumbnail"
                            className="rounded-xl"
                            width={180}
                        />
                    </div>
                </CardItem>
                <CardItem
                translateZ="50"
                className="h-5 ext-lg font-bold text-neutral-600 dark:text-white"
                >
                {productName}
                </CardItem>
                <CardItem as="p" translateZ="60" className="h-16 text-neutral-500 text-sm max-w-sm mt-8 dark:text-neutral-300 text-wrap">
                    {description}
                </CardItem>

                <div className="mt-5">
                    <CardItem
                        translateZ={20}
                        as="p"
                        className="text-neutral-400 text-md font-semibold"
                    >
                        <div className="bg-black text-white p-2 px-4 rounded-full">
                            Rp. {price}
                        </div>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    )
}