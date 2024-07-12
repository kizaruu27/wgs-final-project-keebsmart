import axios from "axios";
import { urlEndpoint } from "./url";

export const getAllCategory = async (setCategories) => {
    try {
        const response = (await axios.get(`${urlEndpoint}/category`)).data;
        console.log(response);
        setCategories(response);
    } catch (error) {
        console.log(error);
    }
}

export const addNewProduct = async (productName, description, brand, categoryId, onSuccess, onFailed) => {
    try {
        const response = await axios.post(`${urlEndpoint}/product/add`, {
            productName, description, brand, categoryId: Number(categoryId)
        });

        if (response.status !== 201) return onFailed('Add product failed!');

        console.log(response);
        onSuccess();
    } catch (error) {
        onFailed(error);
    }
};

export const getAllProducts = async (setProducts) => {
    try {
        const response = (await axios.get(`${urlEndpoint}/products`)).data;
        console.dir(response);
        setProducts(response);
    } catch (error) {
        console.log(error);
    }
};

export const getProductDetail = async (id, setProduct, setProductItems, setCategory) => {
    try {
        const response = (await axios.get(`${urlEndpoint}/product/${id}`)).data;
        setProduct(response);
        setProductItems(response.productItem);
        setCategory(response.category.categoryName);
    } catch (error) {
        console.log(error);
    }
}
export const getProductVariation = async (id, setVariation) => {
    try {
        const response = (await axios.get(`${urlEndpoint}/product/variation/${id}`)).data;
        console.log(response);
        setVariation(response);
    } catch (error) {
        console.log(error);
    }
}

export const addProductItem = async (productId, qty, imageURLs, price, manufacturer, status, process, variationValue, variationId, onSuccess, onFailed) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${urlEndpoint}/product/item/add`, {
            productId: Number(productId), 
            qty: Number(qty), 
            imageURLs, 
            price: Number(price), 
            manufacturer, 
            status, 
            process, 
            variationValue, 
            variationId: Number(variationId)
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status !== 201) return console.log('Add product failed!');
        console.log(response);
        onSuccess('Add product item successfull');

    } catch (error) {
        onFailed(error);
    }
};

export const getSwitchesData = async (setSwitch) => {
    try {
        const response = await axios.get(`${urlEndpoint}/products/switch`);
        console.dir(response.data.switches);
        setSwitch(response.data.switches);
    } catch (error) {
        console.log(error);
    }

}
