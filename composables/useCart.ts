import { IProduct } from "~/types";

export default function () {
    const cart = useState<IProduct[]>("cart", () => []);

    // get cart data in localstorage to update cart context
    const updateCart = () => {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
            cart.value = JSON.parse(localCart) as IProduct[];
        }
    };

    // add item into cart context, set to localstorage
    const addToCard = (product: IProduct) => {
        cart.value.push(product);
        localStorage.setItem("cart", JSON.stringify(cart.value));
    };

    // remove item out of cart context, update localstorage
    const removeCartItem = (index: number) => {
        cart.value.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart.value));
    };

    // reset cart context, clear cart in localstorage
    const clearCart = () => {
        cart.value = [];
        localStorage.removeItem("cart");
    };

    // get total amount to checkout cart
    const getTotal = () => {
        return cart.value.reduce((prev, cur) => prev + cur.price, 0);
    };
    return {
        cart,
        updateCart,
        addToCard,
        removeCartItem,
        getTotal,
        clearCart,
    };
}
