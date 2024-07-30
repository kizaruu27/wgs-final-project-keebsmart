import { useEffect } from "react";
import Navbar from "../../../Layouts/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { makeNewOrder } from "../../../../server/orderController";

export default function OrderSummaryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const name = location.state?.name || []; // sent for orders
    const phoneNumber = location.state?.phoneNumber || []; // sent for orders
    const cartIds = location.state?.targetedCartIds || []; // sent for orders
    const carts = location.state?.carts || [];
    const addressId = location.state?.addressId || []; // sent for orders
    const orderNotes = location.state?.orderNotes || []; // sent for orders
    const street = location.state?.street || [];
    const kecamatan = location.state?.kecamatan || [];
    const kelurahan = location.state?.kelurahan || [];
    const province = location.state?.province || [];
    const city = location.state?.city || [];
    const postCode = location.state?.postCode || [];
    const totalPrice = location.state?.totalPrice || []; // sent for orders

    useEffect(() => {
        console.log(name, phoneNumber, cartIds, addressId, orderNotes, carts);
    }, []);

    const postNewOrder = (e) => {
        e.preventDefault();
        makeNewOrder(cartIds, name, phoneNumber, totalPrice, orderNotes, 1, addressId, (data) => {
            console.log(data);
            navigate('/order/confirmation', {
                state: {
                    orderId: data.newOrder.orderId,
                    date: data.newOrder.orderDate,
                    paymentMethod: data.newOrder.paymentMethod.paymentType,
                    name,
                    address: `${street}, ${kelurahan}, ${kecamatan}, ${city}, ${province}, ${postCode}`,
                    phoneNumber
                }
            })
        })
    }

    return (
        <div className="mx-auto">
            <Navbar  />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form onSubmit={e => postNewOrder(e)} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order summary</h2>

                        <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery information</h4>
                            <dl>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{name} - {phoneNumber}, {street}, {kelurahan}, {kecamatan}, {city}, {province}, {postCode} </dd>
                                <dd className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"><span className="font-semibold">Notes:</span>  {orderNotes}</dd>
                            </dl>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {carts.map((item, key) => (
                                            <tr key={key}>
                                                <td className="whitespace-nowrap py-4 md:w-[384px]">
                                                    <div className="flex items-center gap-4">
                                                        <a href="#" className="flex items-center aspect-square w-10 h-10 shrink-0">
                                                            <img className="h-auto w-full max-h-full rounded-lg dark:hidden" src={item.productItem.imageURLs[0]} alt="imac image" />
                                                        </a>
                                                        <p className="text-wrap">{item.productItem.product.productName} - {item.productItem.variationOption.variationValue}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-base font-normal text-gray-900 dark:text-white">x{item.qty}</td>
                                                <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">Rp. {item.subTotalPrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 space-y-6">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</h4>

                                <div className="space-y-4">
                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-lg font-bold text-gray-900 dark:text-white">Rp. {totalPrice}</dd>
                                    </dl>
                                </div>

                            <div className="gap-4 sm:flex sm:items-center">
                                <a href="/" type="button" className="w-full rounded-lg  border text-center border-gray-200 bg-gray-100 px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Return to Shopping</a>
                                <button type="submit" className="mt-4 flex w-full items-center justify-center rounded-lg bg-black  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Send the order</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}