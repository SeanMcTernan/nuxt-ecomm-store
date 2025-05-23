export const createCheckoutMutation = gql`
  mutation Checkout($variantId: ID!) {
    checkoutCreate(input: { lineItems: { variantId: $variantId, quantity: 1 } }) {
      checkout {
        webUrl
      }
    }
  }
`;
