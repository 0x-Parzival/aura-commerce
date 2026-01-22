import React, { useState } from 'react';
import { X, CreditCard, Building2, Wallet, Copy, Check, AlertCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderData: {
        orderId: string;
        items: Array<{
            title: string;
            price: string;
            grade: string;
            quantity: number;
        }>;
        customer: {
            name: string;
            phone: string;
            address: string;
        };
    };
}

type PaymentMethod = 'upi' | 'bank' | 'cod' | null;

const PaymentModal = ({ isOpen, onClose, orderData }: PaymentModalProps) => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const bankDetails = {
        accountNumber: '119826900000491',
        bankName: 'Yes Bank',
        ifscCode: 'YESB0001198',
        accountName: 'Genus Agro Foods'
    };

    const upiId = 'yespay.smessi24534@yesbankltd';

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(null), 2000);
    };

    const calculateTotal = () => {
        let total = 0;
        orderData.items.forEach(item => {
            const priceMatch = item.price.match(/[\d,]+/);
            const price = priceMatch ? parseInt(priceMatch[0].replace(/,/g, '')) : 0;
            total += price * item.quantity;
        });
        return total;
    };

    const generateUPILink = () => {
        const amount = calculateTotal();
        return `upi://pay?pa=${upiId}&pn=GenusAgroFoods&am=${amount}&cu=INR&tn=Order-${orderData.orderId}`;
    };

    const sendWhatsAppConfirmation = (paymentMethod: string, paymentStatus: string) => {
        const customerWhatsAppLink = `https://wa.me/${orderData.customer.phone.replace(/[^0-9]/g, '')}`;

        const itemsList = orderData.items.map(item =>
            `- ${item.title} (${item.grade}) x ${item.quantity} = ${item.price}`
        ).join('\n');

        const message = `🎉 *NEW ORDER RECEIVED*

*Order ID:* ${orderData.orderId}

*Order Items:*
${itemsList}

*Total Amount:* ₹${calculateTotal().toLocaleString()}

*Customer Details:*
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
📱 WhatsApp: ${customerWhatsAppLink}
Address: ${orderData.customer.address}

*Payment Method:* ${paymentMethod}
*Payment Status:* ${paymentStatus}

Please confirm order processing.`;

        const businessNumber = '919873961111';
        const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    };

    const handleConfirmOrder = () => {
        let paymentMethod = '';
        let paymentStatus = '';

        switch (selectedMethod) {
            case 'upi':
                paymentMethod = 'UPI Payment';
                paymentStatus = 'Pending - UPI payment initiated';
                break;
            case 'bank':
                paymentMethod = 'Bank Transfer';
                paymentStatus = 'Pending - Awaiting bank transfer confirmation';
                break;
            case 'cod':
                paymentMethod = 'Cash on Delivery';
                paymentStatus = 'Confirmed - Payment on delivery';
                break;
        }

        sendWhatsAppConfirmation(paymentMethod, paymentStatus);
        setOrderConfirmed(true);

        // Close modal after 2 seconds
        setTimeout(() => {
            onClose();
            setOrderConfirmed(false);
            setSelectedMethod(null);
        }, 2000);
    };

    if (!isOpen) return null;

    if (orderConfirmed) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600">Sending confirmation to our team...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-green-600 text-white p-6 rounded-t-3xl flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-2xl font-bold">Select Payment Method</h2>
                        <p className="text-sm text-white/90 mt-1">Order ID: {orderData.orderId}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                        <div className="space-y-3">
                            {orderData.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900">{item.title}</p>
                                        <p className="text-xs text-gray-600">{item.grade} x {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-gray-900">{item.price}</p>
                                </div>
                            ))}
                            <div className="border-t pt-2 flex justify-between">
                                <span className="font-bold text-gray-900">Total Amount</span>
                                <span className="font-bold text-green-700 text-lg">₹{calculateTotal().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-4 mb-6">
                        {/* UPI Payment */}
                        <div
                            onClick={() => setSelectedMethod('upi')}
                            className={cn(
                                "border-2 rounded-xl p-4 cursor-pointer transition-all",
                                selectedMethod === 'upi'
                                    ? "border-orange-500 bg-orange-50"
                                    : "border-gray-200 hover:border-orange-300"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                                    selectedMethod === 'upi' ? "border-orange-500" : "border-gray-300"
                                )}>
                                    {selectedMethod === 'upi' && (
                                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Wallet className="w-5 h-5 text-orange-600" />
                                        <h4 className="font-bold text-gray-900">UPI Payment</h4>
                                    </div>
                                    {selectedMethod === 'upi' && (
                                        <div className="mt-3 space-y-3">
                                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                <p className="text-xs text-gray-600 mb-1">UPI ID</p>
                                                <div className="flex items-center justify-between">
                                                    <code className="text-sm font-mono">{upiId}</code>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCopy(upiId, 'upi');
                                                        }}
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                    >
                                                        {copied === 'upi' ? (
                                                            <Check className="w-4 h-4 text-green-600" />
                                                        ) : (
                                                            <Copy className="w-4 h-4 text-gray-600" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            <a
                                                href={generateUPILink()}
                                                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg text-center transition-colors"
                                            >
                                                Pay with UPI App
                                            </a>
                                            <p className="text-xs text-gray-500 text-center">
                                                Opens Paytm/PhonePe/GPay with pre-filled details
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bank Transfer */}
                        <div
                            onClick={() => setSelectedMethod('bank')}
                            className={cn(
                                "border-2 rounded-xl p-4 cursor-pointer transition-all",
                                selectedMethod === 'bank'
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-300"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                                    selectedMethod === 'bank' ? "border-blue-500" : "border-gray-300"
                                )}>
                                    {selectedMethod === 'bank' && (
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                        <h4 className="font-bold text-gray-900">Bank Transfer</h4>
                                    </div>
                                    {selectedMethod === 'bank' && (
                                        <div className="mt-3 space-y-2">
                                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-xs text-gray-600 mb-1">Account Number</p>
                                                        <div className="flex items-center justify-between">
                                                            <code className="text-sm font-mono">{bankDetails.accountNumber}</code>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleCopy(bankDetails.accountNumber, 'acc');
                                                                }}
                                                                className="p-1 hover:bg-gray-100 rounded"
                                                            >
                                                                {copied === 'acc' ? (
                                                                    <Check className="w-4 h-4 text-green-600" />
                                                                ) : (
                                                                    <Copy className="w-4 h-4 text-gray-600" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600 mb-1">IFSC Code</p>
                                                        <div className="flex items-center justify-between">
                                                            <code className="text-sm font-mono">{bankDetails.ifscCode}</code>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleCopy(bankDetails.ifscCode, 'ifsc');
                                                                }}
                                                                className="p-1 hover:bg-gray-100 rounded"
                                                            >
                                                                {copied === 'ifsc' ? (
                                                                    <Check className="w-4 h-4 text-green-600" />
                                                                ) : (
                                                                    <Copy className="w-4 h-4 text-gray-600" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-xs text-gray-600 mb-1">Bank Name</p>
                                                        <p className="text-sm font-medium">{bankDetails.bankName}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-xs text-gray-600 mb-1">Account Name</p>
                                                        <p className="text-sm font-medium">{bankDetails.accountName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                                <p className="text-xs text-blue-800">
                                                    After transfer, please send payment proof via WhatsApp to confirm your order.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Cash on Delivery */}
                        <div
                            onClick={() => setSelectedMethod('cod')}
                            className={cn(
                                "border-2 rounded-xl p-4 cursor-pointer transition-all",
                                selectedMethod === 'cod'
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 hover:border-green-300"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                                    selectedMethod === 'cod' ? "border-green-500" : "border-gray-300"
                                )}>
                                    {selectedMethod === 'cod' && (
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CreditCard className="w-5 h-5 text-green-600" />
                                        <h4 className="font-bold text-gray-900">Cash on Delivery</h4>
                                    </div>
                                    {selectedMethod === 'cod' && (
                                        <p className="text-sm text-gray-600 mt-2">
                                            Pay when you receive your order. No advance payment required.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirmOrder}
                        disabled={!selectedMethod}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all transform",
                            selectedMethod
                                ? "bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 hover:scale-[1.02] active:scale-95"
                                : "bg-gray-300 cursor-not-allowed"
                        )}
                    >
                        {selectedMethod ? 'Place Order' : 'Select a Payment Method'}
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                        Order confirmation will be sent to our team via WhatsApp
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
