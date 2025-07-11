const LOCAL_CART_KEY = "local_cart";
const CART_KEY = "cart";

// Get regular cart (for add to cart)
export const getLocalCart = () => {
  try {
    const data = localStorage.getItem(LOCAL_CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Get buy-now cart
export const getCart = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveLocalCart = (cart) => {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getLocalCart();
  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveLocalCart(cart);
  return cart; // Return the updated cart
};

export const replaceCartWithSingleItem = (product) => {
  // Clear both carts first
  clearCart();
  // Then set the buy-now cart with the single item
  saveCart([{ ...product, quantity: 1 }]);
};

export const clearCart = () => {
  localStorage.removeItem(LOCAL_CART_KEY);
  localStorage.removeItem(CART_KEY);
};

// New function to get combined cart state
export const getCombinedCart = () => {
  const buyNowCart = getCart();
  return buyNowCart.length > 0 ? buyNowCart : getLocalCart();
};
