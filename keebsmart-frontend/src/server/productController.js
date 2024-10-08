import axios from "axios";
import { urlEndpoint, token } from "./url";

// Function for get all category
export const getAllCategory = async (setCategories) => {
    try {
        const response = (await axios.get(`${urlEndpoint}/category`)).data;
        console.log(response);
        setCategories(response);
    } catch (error) {
        console.log(error);
    }
}

// Function for add new product
export const addNewProduct = async (inventoryId, productName, description, brand, categoryId, specs, imagePreviewUrl, imageUrls, onSuccess, onFailed) => {
    try {
        const formData = new FormData();
        formData.append('inventoryId', inventoryId);
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('brand', brand);
        formData.append('categoryId', categoryId);
        formData.append('imagePreview', imagePreviewUrl);

        for (let i = 0; i < imageUrls.length; i++) {
            formData.append('images', imageUrls[i]);
        }

        for (let i = 0; i < specs.length; i++) {
            formData.append('specs', specs[i]);
        }

        const response = await axios.post(`${urlEndpoint}/product`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status !== 201) return onFailed('Add product failed!');

        onSuccess(response);
    } catch (error) {
        onFailed(error);
    }
};

// Function for get all products for admins
export const getAllProducts = async (setProducts) => {
    try {
        const response = (await axios.get(`${urlEndpoint}/products`)).data;
        // console.dir(response);
        setProducts(response);
    } catch (error) {
        console.log(error);
    }
};

// Function for get all products for customer
export const getProductsForCustomer = async (onSuccess) => {
    try {
        const response = await axios.get(`${urlEndpoint}/products/user`);
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}

// Function for get product by id
export const getProductById = async (id, onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/product/${id}`);
        onSucces(response.data);
    } catch (error) {
        console.log(error);
    }
}

// Function for get product details
export const getProductDetail = async (id, setProduct, setProductItems, setCategory, setImage, onGetStatistic) => {
    try {
        const response = (await axios.get(`${urlEndpoint}/product/${id}`)).data;
        if (setProduct) setProduct(response);
        if (setProductItems) setProductItems(response.productItem);
        if (setImage) setImage(response.productImage.imagePreviewUrl);
        if (setCategory) setCategory(response.category.categoryName);
        
        const getStatistic = (await axios.get(`${urlEndpoint}/product/sales/${id}`)).data;

        const items = getStatistic.productItem;
        const soldItem = items.map(item => item.sold);
        const variationItem = items.map(item => item.variationOption.variationValue);

        if (onGetStatistic) {
            onGetStatistic(soldItem, variationItem);
        }
    } catch (error) {
        console.log(error);
    }
}

// Function for get product variation data
export const getProductVariation = async (id, setVariation) => {
    try {
        const response = (await axios.get(`${urlEndpoint}/product/variation/${id}`)).data;
        // console.log(response);
        setVariation(response);
    } catch (error) {
        console.log(error);
    }
}

// Function for add product item data
export const addProductItem = async ( productId, price, qty, status, manufacturer, inventoryItemId, images, onSuccess, onFailed) => {
    try {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('qty', qty);
        formData.append('price', price);
        formData.append('manufacturer', manufacturer);
        formData.append('status', status);
        formData.append('inventoryItemId', inventoryItemId);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        const response = await axios.post(`${urlEndpoint}/product/item/add`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status !== 201) return onFailed('Add Product Failed')
        onSuccess(response);

    } catch (error) {
        onFailed(error);
    }
};

// Function for get all switches data for admins
export const getSwitchesData = async (setSwitch) => {
    try {
        const response = await axios.get(`${urlEndpoint}/products/switch`);
        console.dir(response.data.switches);
        setSwitch(response.data.switches);
    } catch (error) {
        console.log(error);
    }
}

// Function for get all keycaps data for admins
export const getKeycapsData = async (setKeycaps) => {
    try {
        const response = await axios.get(`${urlEndpoint}/products/keycaps`);
        console.dir(response.data.keycaps);
        setKeycaps(response.data.keycaps);
    } catch (error) {
        console.log(error);
    }
}

// Function for get all keyboards data for admins
export const getKeyboardsData = async (setKeyboards, onGetStatistic) => {
    try {
        const response = await axios.get(`${urlEndpoint}/products/keyboards`);
        // console.dir(response.data.keyboards);
        setKeyboards(response.data.keyboards);

        const keyboards = response.data.keyboards;
        const sold = keyboards.map((kb) => (
            kb.productItem.map((item) => ( 
                item.sold
            ))
        )).map(item => (
            item.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0)
        )).sort((a, b) => b - a).slice(0, 3);

        const keyboardName = keyboards.map(kb => kb.productName).slice(0, 3);

        if (onGetStatistic) onGetStatistic(sold, keyboardName);
    } catch (error) {
        console.log(error);
    }
}

// Function for delete a product
export const deleteProduct = async (productId, onDelete, onFailed) => {
    try {
        const response = await axios.delete (`${urlEndpoint}/product/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        onDelete('Delete product success');
    } catch (error) {
        console.log(error);
        onFailed(error);
    }
}

// FUnction for delete a product item
export const deleteProductItem = async (id, onSuccess, onFailed) => {
    try {
        const response = await axios.delete(`${urlEndpoint}/product/item/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
        onFailed(error);
    }
}

// Function for update a product
export const updateProduct = async (id, productName, description, brand, categoryId, specs, imagePreview, images, onSuccess, onFailed) => {
    try {
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('brand', brand);
        formData.append('categoryId', categoryId);
        formData.append('imagePreview', imagePreview);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        for (let i = 0; i < specs.length; i ++) {
            formData.append('specs', specs[i]);
        }

        const response = await axios.put(`${urlEndpoint}/product/update/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status !== 201) return onFailed('Edit product failed!');
        onSuccess(response.data);
    } catch (error) {
        onFailed(error);
    }
}

// Function for update product item
export const updateProductItem = async (id, price, qty, status, manufacturer, images, onSuccess, onFailed) => {
    try {
        const formData = new FormData();
        formData.append('price', price);
        formData.append('qty', qty);
        formData.append('status', status);
        formData.append('manufacturer', manufacturer);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        const response = await axios.put(`${urlEndpoint}/product/item/update/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        if (response.status !== 201) return console.log('Edit product failed!');

        onSuccess(response.data);
    } catch (error) {
        onFailed(error);
    }
}

// Function for handle product activation
export const activateProduct = async (id, isActive) => {
    try {
        const response = await axios.patch(`${urlEndpoint}/product/activate/${id}`, {
            isActive
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

// Function for get product sales statistics
export const getSalesStatistic = async (onSuccess) => {
    try {
        const sales = await axios.get(`${urlEndpoint}/sales`);
        onSuccess(sales)
    } catch (error) {
        console.log(error);
    }
};

// Function for get product item detail
export const getProductItemDetail = async (id, onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/product/item/${id}`);
        onSucces(response.data);
    } catch (error) {
        console.log(error);
    }
}

// Function for add new cart
export const addNewCart = async (productItemId, qty, onSuccess, onFailed) => {
    try {
        const response = await axios.post(`${urlEndpoint}/cart`, {
            productItemId, qty
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) return onFailed(response.data.msg);
        
        onSuccess(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Function for get switches data for customer
export const getSwitchesForCustomer = async (onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/switches`);
        onSucces(response.data.switches);
    } catch (error) {
        console.log(error);
    }
}

// Function for get keyboards data for customer
export const getKeyboardsForCustomer = async (onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/keyboards`);
        onSucces(response.data.keyboards);
    } catch (error) {
        console.log(error);
    }
}

// Function for get keycaps data for customer
export const getKeycapsForCustomer = async (onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/keycaps`);
        onSucces(response.data.keycaps);
    } catch (error) {
        console.log(error);
    }
};

// Function for search products
export const searchProducts = async (searchKey, onSuccess) => {
    try {
        const response = await axios.get(`${urlEndpoint}/product/search/?key=${searchKey}`);
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}

// Function for check product item is available or not
export const checkProductsQty = async (id, onSucces) => {
    try {
        const data = { id }
        const response = await axios.post(`${urlEndpoint}/product/qty`, data);
        onSucces(response.data);
    } catch (error) {
        console.log(error);
    }
}

// Function for get keyboards sales
export const getKeyboardsSales = async (onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/sales/keyboards`);
        onSucces(response.data.totalSales);
    } catch (error) {
        console.log(error);
    }
}

// Function for get keycaps sales
export const getKeycapsSales = async (onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/sales/keycaps`);
        onSucces(response.data.totalSales);
    } catch (error) {
        console.log(error);
    }
}

// Function for get switches sales
export const getSwitchesSales = async (onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/sales/switches`);
        onSucces(response.data.totalSales);
    } catch (error) {
        console.log(error);
    }
}

