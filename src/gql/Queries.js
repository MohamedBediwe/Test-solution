import { gql } from "@apollo/client";

export const PRODUCTS_QEURY = gql`
  query ($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        name
        inStock
        id
        gallery
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const CURRENCIES_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  {
    categories {
      name
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query ($id: String!) {
    product(id: $id) {
      name
      gallery
      id
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      brand
      inStock
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      description
    }
  }
`;
