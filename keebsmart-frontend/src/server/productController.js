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
        console.dir(response.productItem);
        console.dir(response.category.category_name);
        setProduct(response);
        setProductItems(response.productItem);
        setCategory(response.category.category_name);
    } catch (error) {
        console.log(error);
    }
}