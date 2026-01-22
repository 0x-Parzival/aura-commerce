import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    productId: string;
    title: string;
    price: string;
    grade: string;
    quantity: number;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>, quantity: number) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    totalItems: number;
    getCartTotal: () => string;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        // Load cart from localStorage
        const saved = localStorage.getItem('genus-cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('genus-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.productId === product.productId);

            if (existingItem) {
                // Update quantity if item exists
                return prevItems.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new item
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (productId: string) => {
        setItems(prevItems => prevItems.filter(item => item.productId !== productId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const getCartTotal = () => {
        const total = items.reduce((sum, item) => {
            // Extract numeric price (remove ₹ and /kg)
            const priceMatch = item.price.match(/[\d,]+/);
            const price = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0;
            return sum + (price * item.quantity);
        }, 0);

        return `₹${total.toLocaleString('en-IN')}`;
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                totalItems,
                getCartTotal,
                isCartOpen,
                setIsCartOpen
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
