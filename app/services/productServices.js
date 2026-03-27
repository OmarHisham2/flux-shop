export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch");
  }
  return res.json();
}

export async function getShuffledProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch");
  }
  const products = await res.json();
  const shuffled = [...products].sort(() => 0.5 - Math.random());

  return shuffled;
}

export async function filterProducts(category) {
  const products = await getProducts();
  if (category === "all") {
    return products;
  }
  products.forEach((product) => {
    console.log(product.category);
  });
  const filteredProducts = products.filter(
    (product) => product.category === category,
  );
  console.log(filteredProducts);
  return filteredProducts;
}

export function searchProduct(products, keyword) {
  if (!keyword) return products;

  const cleanedKeyword = keyword.toLowerCase().trim();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().trim().includes(cleanedKeyword),
  );
  return filteredProducts;
}
