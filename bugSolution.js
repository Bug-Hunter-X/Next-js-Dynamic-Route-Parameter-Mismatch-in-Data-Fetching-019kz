// bug.js
// Incorrect handling of route parameters
export async function getStaticProps(context) {
  const { params } = context;
  // Only uses 'category' parameter, ignores 'color'
  const product = await fetch(`/api/products/${params.category}`).then(res => res.json());

  return {
    props: {
      product,
    },
  };
}

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Category: {product.category}</p>
      {/* Color missing due to improper parameter handling */}
    </div>
  );
}

// bugSolution.js
// Correct handling of route parameters
export async function getStaticProps(context) {
  const { params } = context;
  // Uses both 'category' and 'color' parameters
  const product = await fetch(`/api/products/${params.category}/${params.color}`).then(res => res.json());

  return {
    props: {
      product,
    },
  };
}

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Category: {product.category}</p>
      <p>Color: {product.color}</p> 
    </div>
  );
}