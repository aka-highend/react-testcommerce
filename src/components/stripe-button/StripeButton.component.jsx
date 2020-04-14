import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_Ua5qI7p82Nj3QZWGDxVjnJBd00qrNXGw5O";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="React Commerce"
      billingAddress
      shippingAddress
      image="https://image.flaticon.com/icons/svg/2/2772.svg"
      description={`Your total is Rp${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
