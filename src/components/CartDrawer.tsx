import React, { useState } from 'react';
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import OrderModal from './OrderModal';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { items, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (items.length === 0) return;
        setIsOrderModalOpen(true);
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-green-600 text-white p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <h2 className="text-lg font-bold">Your Cart ({items.length})</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <ShoppingCart className="w-16 h-16 mb-4" />
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <p className="text-sm">Add some products to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.productId} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <div className="flex gap-3">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                                            <p className="text-xs text-gray-600">{item.grade}</p>
                                            <p className="text-sm font-bold text-green-700 mt-1">{item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="p-1 hover:bg-red-100 rounded text-red-600 h-fit"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-xs text-gray-600">Quantity:</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-200 p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Total:</span>
                            <span className="text-2xl font-bold text-green-700">{getCartTotal()}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all transform active:scale-95"
                        >
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={clearCart}
                            className="w-full text-red-600 text-sm hover:text-red-700 font-medium"
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
            {/* Order Modal */}
            {isOrderModalOpen && (
                <OrderModal
                    isOpen={isOrderModalOpen}
                    onClose={() => {
                        setIsOrderModalOpen(false);
                        onClose(); // Close cart drawer too
                    }}
                    items={items.map(item => ({
                        title: item.title,
                        price: item.price,
                        grade: item.grade,
                        quantity: item.quantity
                    }))}
                />
            )}
        </>
    );
};

export default CartDrawer;
