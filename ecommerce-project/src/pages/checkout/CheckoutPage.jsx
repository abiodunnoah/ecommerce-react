import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./CheckoutPage.css";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  const [paymentSummary, setPaymentSummary] = useState(null);

  const loadCheckoutData = async () => {
    let response = await axios.get(
      "/api/delivery-options?expand=estimatedDeliveryTime",
    );
    setDeliveryOptions(response.data);

    response = await axios.get("/api/payment-summary");
    setPaymentSummary(response.data);
  };

  useEffect(() => {
    loadCheckoutData();
  }, []);

  const updateDeliveryOption = async (productId, deliveryOptionId) => {
    await axios.put(`/api/cart-items/${productId}`, { deliveryOptionId });

    // Refresh both the cart and the totals (shipping cost changes the summary).
    await Promise.all([loadCart(), loadCheckoutData()]);
  };

  const updateQuantity = async (productId, quantity) => {
    await axios.put(`/api/cart-items/${productId}`, { quantity });

    await Promise.all([loadCart(), loadCheckoutData()]);
  };

  const deleteCartItem = async (productId) => {
    await axios.delete(`/api/cart-items/${productId}`);

    await Promise.all([loadCart(), loadCheckoutData()]);
  };

  if (!paymentSummary || deliveryOptions.length === 0) {
    return <div>Loading checkout...</div>;
  }

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            onDeliveryOptionChange={updateDeliveryOption}
            onQuantityChange={updateQuantity}
            onDeleteCartItem={deleteCartItem}
          />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
