import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({
  cartItem,
  onQuantityChange,
  onDeleteCartItem,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(String(cartItem.quantity));

  const startEditing = () => {
    setQuantity(String(cartItem.quantity));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setQuantity(String(cartItem.quantity));
    setIsEditing(false);
  };

  const saveQuantity = async () => {
    const newQuantity = Number(quantity);

    // The backend accepts any whole number that is at least 1.
    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
      return;
    }

    await onQuantityChange(cartItem.productId, newQuantity);
    setIsEditing(false);
  };

  const deleteCartItem = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item from your cart?",
    );

    if (confirmed) {
      await onDeleteCartItem(cartItem.productId);
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          {isEditing ? (
            <>
              <span>
                Quantity:{" "}
                <input
                  className="quantity-input"
                  type="number"
                  min="1"
                  value={quantity}
                  autoFocus
                  onChange={(event) => setQuantity(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") saveQuantity();
                    if (event.key === "Escape") cancelEditing();
                  }}
                />
              </span>
              <button
                type="button"
                className="link-primary save-quantity-link"
                onClick={saveQuantity}
              >
                Save
              </button>
              <button
                type="button"
                className="link-primary"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>
                Quantity:{" "}
                <span className="quantity-label">{cartItem.quantity}</span>{" "}
              </span>
              <button
                type="button"
                className="link-primary update-quantity-link"
                onClick={startEditing}
              >
                Update
              </button>
            </>
          )}
          <button
            type="button"
            className="link-primary delete-quantity-link"
            onClick={deleteCartItem}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
