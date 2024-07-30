import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { addProductItem, getProductById } from "../../../../server/productController";
import { useParams } from "react-router-dom";
import { getInventoryItem } from "../../../../server/inventoryController";
import { GoToPage } from "../../../../server/pageController";
import FormAlert from "../../../elements/Alert/FormAlert";

export default function AddProductVariationModal({openModal, setOpenModal}) {
    const { id } = useParams();
    const [inventoryItem, setInventoryItem] = useState([]);
    const [qty, setQty] = useState(0);

    // state for add product items
    const [itemQty, setItemQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [manufacturer, setManufacturer] = useState('');
    const [status, setStatus] = useState('');
    const [inventoryItemId, setInventoryItemId] = useState(0);
    const [images, setImages] = useState([]);
    const [inventoryIsUsed, setInventoryIsUsed] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const [onShowAlert, setOnShowAlert] = useState(false);
    const [onShowQtyAlert, setOnShowQtyAlert] = useState(false);

    useEffect(() => {
        getProductById(id, (data) => {
            console.log(data.inventory.item);
            setInventoryItem(data.inventory.item);
        })
    }, []);

    const onVariantChange = (id) => {
        getInventoryItem(id, (data) => {
            setInventoryItemId(data.id);
            setInventoryIsUsed(data.isUsed);
            setQty(data.qty);
            setIsSelected(true);
        })
    };

    const postNewProductItem = (e) => {
        e.preventDefault();
        addProductItem(id, price, itemQty, status, manufacturer, inventoryItemId, images, (data) => {
            console.log(data);
            GoToPage(`/admin/product/${id}`, 100);
        }, (error) => {
            setOnShowAlert(true);
        });
    };

    const handleOnQtyChange = (e) => {
        setItemQty(e.target.value);
        if (e.target.value > qty) setOnShowQtyAlert(true);
        else setOnShowQtyAlert(false);
    }

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add Product Variant</Modal.Header>
            <Modal.Body>
                <FormAlert msg='All data must be filled!' onShow={onShowAlert}/>
                <FormAlert msg='Item qty cannot set more than inventory qty' onShow={onShowQtyAlert}/>
                <form onSubmit={e => postNewProductItem(e)}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <label htmlFor="variant">Variant</label>
                            <select onChange={e => onVariantChange(e.target.value)} id="variant" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultChecked>Choose a variation</option>
                                {inventoryItem.map((item, key) => (
                                    <option key={key} value={item.id}>{item.variation}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="qty">Qty</label>
                            <input disabled={!isSelected} onChange={e => handleOnQtyChange(e)} type="number" id="qty" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            <p className="text-sm text-gray-500">Qty: {qty}</p>
                        </div>
                        {!inventoryIsUsed && 
                            <div>
                                <label htmlFor="price">Price</label>
                                <input disabled={!isSelected}  onChange={e => setPrice(e.target.value)} type="number" id="price" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        }
                        
                        {!inventoryIsUsed && 
                            <div>
                                <label htmlFor="manufacturer">Manufacturer</label>
                                <input disabled={!isSelected}  onChange={e => setManufacturer(e.target.value)} type="text" id="manufacturer" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        }

                        <div>
                            <label htmlFor="status">Status</label>
                            <select disabled={!isSelected}  onChange={e => setStatus(e.target.value)} id="status" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultChecked>Choose status</option>
                                <option value="in stock">In Stock</option>
                                <option value="empty">Empty</option>
                            </select>
                        </div>
                        
                        {!inventoryIsUsed && 
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="images">Upload Images</label>
                                <input disabled={!isSelected}  required onChange={e => setImages(e.target.files)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="images" type="file" multiple></input>
                            </div>
                        }
                        <div className="my-4">
                            <button disabled={onShowQtyAlert} type="submit" 
                            className={`${onShowQtyAlert ? 'text-gray-400' : 'text-gray-900 hover:bg-gray-100'}  bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Add Variant</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}