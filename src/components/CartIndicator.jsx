import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CartIndicator = ({ history, cartLength }) => (
  <div className="ml-auto mt-2">
    <Button color="primary" onClick={() => history.push("/cart")}>
      <FaShoppingCart />
      <span className="ml-2">{cartLength}</span>
    </Button>
  </div>
);

export default withRouter(CartIndicator);
// withRouter is giving CartIndicator the router props (history, location and match)
// without mounting it just on a specific path
