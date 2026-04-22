import React, { useState, useEffect } from 'react';
import { X, MapPin, Phone, Building, Loader2, AlertCircle, User, Edit3 } from 'lucide-react';
import { cn } from "@/lib/utils";
import PaymentModal from './PaymentModal';

interface OrderItem {
    title: string;
    price: string;
    grade: string;
    quantity?: number;
}

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: OrderItem[];
}

interface LocationData {
    city: string;
    state: string;
    pincode: string;
    area: string;
    country: string;
    fullAddress: string;
}

interface OrderInfo {
    orderId: string;
    items: OrderItem[];
    customer: {
        name: string;
        phone: string;
        address: string;
    };
}

const OrderModal = ({ isOpen, onClose, items }: OrderModalProps) => {
    const [loading, setLoading] = useState(false);
    const [locationError, setLocationError] = useState('');
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [showPayment, setShowPayment] = useState(false);
    const [orderData, setOrderData] = useState<OrderInfo | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        building: '',
        tower: '',
        landmark: '',
        // Manual address fields
        manualCity: '',
        manualState: '',
        manualPincode: '',
        manualArea: ''
    });

    useEffect(() => {
        // Don't auto-detect on open - let user choose
    }, [isOpen]);

    const detectLocation = () => {
        setLoading(true);
        setLocationError('');

        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser. Please enter address manually.');
            setLoading(false);
            return;
        }

        // Request location with high accuracy for better GPS on mobile
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude, accuracy } = position.coords;

                console.log(`Location detected: ${latitude}, ${longitude} (accuracy: ${accuracy}m)`);

                try {
                    // Using Nominatim with more detailed address components
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`,
                        {
                            headers: {
                                'User-Agent': 'GenusAgroWebsite/1.0',
                                'Accept-Language': 'en'
                            }
                        }
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch address');
                    }

                    const data = await response.json();
                    const address = data.address;

                    console.log('Reverse geocoding result:', address);

                    // Build full address from components
                    const addressParts = [
                        address.road || address.street,
                        address.suburb || address.neighbourhood,
                        address.city || address.town || address.village,
                        address.state_district,
                        address.state,
                        address.postcode
                    ].filter(Boolean);

                    const locData = {
                        city: address.city || address.town || address.village || address.county || '',
                        state: address.state || '',
                        pincode: address.postcode || '',
                        area: address.suburb || address.neighbourhood || address.road || address.street || '',
                        country: address.country || 'India',
                        fullAddress: addressParts.join(', ')
                    };

                    setLocationData(locData);

                    // Auto-fill manual fields
                    setFormData(prev => ({
                        ...prev,
                        manualCity: locData.city,
                        manualState: locData.state,
                        manualPincode: locData.pincode,
                        manualArea: locData.area
                    }));

                    setLoading(false);
                } catch (error) {
                    console.error('Reverse geocoding failed:', error);
                    setLocationError('Could not determine address from location. Please enter manually.');
                    setLoading(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                let errorMessage = 'Location access denied. ';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'No problem! You can enter your address manually below.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information is unavailable. Please ensure GPS is enabled.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Location request timed out. Please try again.';
                        break;
                    default:
                        errorMessage += 'An unknown error occurred.';
                }

                setLocationError(errorMessage);
                setLoading(false);
            },
            {
                enableHighAccuracy: true,  // Use GPS on mobile devices
                timeout: 15000,            // Increased timeout for GPS lock
                maximumAge: 0              // Don't use cached position
            }
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Use manual entry or auto-detected location
        const city = formData.manualCity || locationData?.city || '';
        const state = formData.manualState || locationData?.state || '';
        const pincode = formData.manualPincode || locationData?.pincode || '';
        const area = formData.manualArea || locationData?.area || '';

        const addressParts = [
            formData.building,
            formData.tower,
            formData.landmark,
            area,
            city,
            state,
            pincode
        ].filter(Boolean);

        const fullAddress = addressParts.join(', ');

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}`;

        // Prepare order data for payment modal
        const orderInfo = {
            orderId,
            items: items.map(item => ({
                title: item.title,
                price: item.price,
                grade: item.grade,
                quantity: item.quantity || 1
            })),
            customer: {
                name: formData.name,
                phone: formData.phone,
                address: fullAddress
            }
        };

        setOrderData(orderInfo);
        setShowPayment(true);
    };

    const handlePaymentClose = () => {
        setShowPayment(false);
        // Close order modal and reset
        onClose();
        setFormData({
            name: '',
            phone: '',
            building: '',
            tower: '',
            landmark: '',
            manualCity: '',
            manualState: '',
            manualPincode: '',
            manualArea: ''
        });
        setLocationData(null);
    };

    const isFormValid = formData.name && formData.phone && formData.building &&
        (locationData || (formData.manualCity && formData.manualState && formData.manualPincode));

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-green-600 text-white p-6 rounded-t-3xl flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-2xl font-bold">Complete Your Order</h2>
                        <p className="text-sm text-white/90 mt-1">
                            {items.length === 1
                                ? `${items[0].title} - ${items[0].price}`
                                : `${items.length} items in your order`}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    {/* Location Detection Status */}
                    {loading && (
                        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
                            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                            <div>
                                <p className="text-blue-800 font-medium">Detecting your location...</p>
                                <p className="text-xs text-blue-600 mt-1">Please ensure GPS/Location is enabled on your device</p>
                            </div>
                        </div>
                    )}

                    {locationError && (
                        <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl mb-6">
                            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-orange-800 font-medium text-sm">{locationError}</p>
                                <button
                                    onClick={detectLocation}
                                    className="text-sm text-orange-600 underline mt-2 hover:text-orange-700 font-medium"
                                >
                                    Try detecting location again
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Location Options */}
                    {!locationData && !loading && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-bold text-blue-900 mb-2">Want to save time?</p>
                                    <p className="text-sm text-blue-800 mb-3">Click below to auto-fill your address using GPS</p>
                                    <button
                                        type="button"
                                        onClick={detectLocation}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                                    >
                                        <MapPin className="w-4 h-4" />
                                        Use My Current Location
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Order Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Customer Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Your Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-gray-900"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+91 98739 61111"
                                pattern="[0-9+\s-]+"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-gray-900"
                                required
                            />
                        </div>

                        {/* Building Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Building className="w-4 h-4 inline mr-2" />
                                Building / House Name *
                            </label>
                            <input
                                type="text"
                                name="building"
                                value={formData.building}
                                onChange={handleInputChange}
                                placeholder="e.g., Sunshine Apartments, House No. 123"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-gray-900"
                                required
                            />
                        </div>

                        {/* Tower / Floor */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Tower / Floor / Flat Number
                            </label>
                            <input
                                type="text"
                                name="tower"
                                value={formData.tower}
                                onChange={handleInputChange}
                                placeholder="e.g., Tower A, Floor 5, Flat 501"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-gray-900"
                            />
                        </div>

                        {/* Landmark (Optional) */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Landmark (Optional)
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                                placeholder="e.g., Near City Mall, Behind ABC School"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-gray-900"
                            />
                        </div>

                        {/* Address Fields - Always visible */}
                        <div className="border-t pt-5 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-gray-700 font-bold">
                                    <MapPin className="w-4 h-4" />
                                    <span>Delivery Address</span>
                                </div>
                                {locationData && (
                                    <span className="text-xs text-green-600 font-medium">✓ Auto-filled from GPS</span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Area / Locality *
                                    </label>
                                    <input
                                        type="text"
                                        name="manualArea"
                                        value={formData.manualArea}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Sector 62"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="manualCity"
                                        value={formData.manualCity}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Noida"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-gray-900"
                                        required={!locationData}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        name="manualState"
                                        value={formData.manualState}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Uttar Pradesh"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-gray-900"
                                        required={!locationData}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pincode *
                                    </label>
                                    <input
                                        type="text"
                                        name="manualPincode"
                                        value={formData.manualPincode}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 201301"
                                        pattern="[0-9]{6}"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-gray-900"
                                        required={!locationData}
                                    />
                                </div>
                            </div>

                            {!loading && (
                                <button
                                    type="button"
                                    onClick={detectLocation}
                                    className="text-sm text-orange-600 underline hover:text-orange-700 font-medium"
                                >
                                    Try auto-detecting location again
                                </button>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={cn(
                                "w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all transform",
                                isFormValid
                                    ? "bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 hover:scale-[1.02] active:scale-95"
                                    : "bg-gray-300 cursor-not-allowed"
                            )}
                        >
                            {isFormValid ? 'Place Order via WhatsApp' : 'Please fill all required fields'}
                        </button>

                        <p className="text-xs text-center text-gray-500">
                            By placing this order, you'll be redirected to WhatsApp to confirm your order with our team.
                        </p>
                    </form>
                </div>
            </div>

            {/* Payment Modal */}
            {showPayment && orderData && (
                <PaymentModal
                    isOpen={showPayment}
                    onClose={handlePaymentClose}
                    orderData={orderData}
                />
            )}
        </div>
    );
};

export default OrderModal;
