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

export const addProductItem = async (productId, qty, images, price, manufacturer, status, process, variationValue, variationId, onSuccess, onFailed) => {
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('qty', qty);
        formData.append('price', price);
        formData.append('manufacturer', manufacturer);
        formData.append('status', status);
        formData.append('process', process);
        formData.append('variationValue', variationValue);
        formData.append('variationId', variationId);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        const response = await axios.post(`${urlEndpoint}/product/item/add`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
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
