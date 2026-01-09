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
  const items = await getProducts();
  if (category === "all") {
    return items;
  }
  items.forEach((item) => {
    console.log(item.category);
  });
  const filteredItems = items.filter((item) => item.category === category);
  console.log(filteredItems);
  return filteredItems;
}

export function searchProduct(items, keyword) {}
