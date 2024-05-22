import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51PCxb0SDjms1pTN0PfXUvGXX2Rcp45rlFHHnJJJm3341UaFXO5SK2mrTBvI2dao2aEE9yAJb61w3AQOmcjmnU6TU00RQiJidNp');

export default function Payment () {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}