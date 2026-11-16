import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({
  cart,
  deliveryOptions,
  onDeliveryOptionChange,
  onQuantityChange,
  onDeleteCartItem,
}) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId,
          );

          if (!selectedDeliveryOption) return null;

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

              <div className="cart-item-details-grid">
                <CartItemDetails
                  cartItem={cartItem}
                  onQuantityChange={onQuantityChange}
                  onDeleteCartItem={onDeleteCartItem}
                />

                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  onDeliveryOptionChange={onDeliveryOptionChange}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
