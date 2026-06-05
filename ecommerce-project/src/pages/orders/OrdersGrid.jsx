import { OrderHeader } from "./OrderHeader";
import { OrderDetailsGrid } from "./OrderDetailsGrid";
import LogoImage from "../../assets/images/logo-white.png";
import MobileLogoImage from "../../assets/images/mobile-logo-white.png";
import SearchIcon from "../../assets/images/icons/search-icon.png";
import CartIcon from "../../assets/images/icons/cart-icon.png";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";

export function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order} />

            <OrderDetailsGrid order={order} />
          </div>
        );
      })}
    </div>
  );
}
