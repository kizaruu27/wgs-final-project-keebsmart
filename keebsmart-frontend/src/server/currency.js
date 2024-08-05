export const convertCurrency = (price) => {
    const convertedPrice = new Intl.NumberFormat("id-ID", {
        currency: "IDR"
    }).format(price);

    return `Rp. ${convertedPrice}`
}