import { convertCurrency } from "../../../server/currency"
import { urlEndpoint } from "../../../server/url"

export default function OrderSummaryItemSection({carts}) {
    return (
        <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
            <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {carts.map((item, key) => (
                        <tr key={key}>
                            <td className="whitespace-nowrap py-4 md:w-[384px]">
                                <div className="flex items-center gap-4">
                                    <a href="#" className="flex items-center aspect-square w-10 h-10 shrink-0">
                                        <img className="h-auto w-full max-h-full rounded-lg dark:hidden" src={`${urlEndpoint}/${item.productItem.imageURLs[0]}`} alt="imac image" />
                                    </a>
                                    <p className="text-wrap">
                                        {item.productItem.product.productName} - {item.productItem.variationOption.variationValue}
                                    </p>
                                </div>
                            </td>
                            <td className="p-4 text-base font-normal text-gray-900 dark:text-white">x{item.qty}</td>
                            <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">{convertCurrency(item.subTotalPrice)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}