export const categories = [
  { id: "earrings" },
  { id: "rings" },
] as const;

export const metals = [{ id: "silver" }, { id: "gold-toned" }] as const;

export const collections = [
  { id: "dalga" },
  { id: "cubic" },
  { id: "aura" },
  { id: "studio" },
] as const;

export const sorts = [
  { id: "featured" },
  { id: "name-asc" },
  { id: "name-desc" },
  { id: "newest" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type MetalId = (typeof metals)[number]["id"];
export type CollectionId = (typeof collections)[number]["id"];
export type SortId = (typeof sorts)[number]["id"];
export type Availability = "ready" | "ask";

export type ProductImage = {
  src: string;
  fit: "cover" | "contain";
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  metal: MetalId;
  collection: CollectionId;
  image: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
  images: ProductImage[];
  /** Named collection pieces are marked ready. Studio pieces we named from photos are ask-first. */
  availability: Availability;
  pairsWith: string[];
  featured: boolean;
  order: number;
};

const box = "/insta-media/pics/IMG_0935.JPG.jpeg";

export const products: Product[] = [
  {
    slug: "dalga-sirga",
    name: "Dalğa sırğa",
    category: "earrings",
    metal: "silver",
    collection: "dalga",
    image: "/insta-media/pics/IMG_0926.JPG.jpeg",
    width: 1402,
    height: 1753,
    fit: "cover",
    images: [
      { src: "/insta-media/pics/IMG_0926.JPG.jpeg", fit: "cover" },
      { src: box, fit: "cover" },
    ],
    availability: "ready",
    pairsWith: ["dalga-uzuk"],
    featured: true,
    order: 1,
  },
  {
    slug: "cubic-sirga",
    name: "Cubic sırğa",
    category: "earrings",
    metal: "silver",
    collection: "cubic",
    image: "/insta-media/pics/IMG_0928.JPG.jpeg",
    width: 1402,
    height: 1753,
    fit: "cover",
    images: [
      { src: "/insta-media/pics/IMG_0928.JPG.jpeg", fit: "cover" },
      { src: box, fit: "cover" },
    ],
    availability: "ready",
    pairsWith: ["dalga-uzuk"],
    featured: true,
    order: 2,
  },
  {
    slug: "dalga-uzuk",
    name: "Dalğa üzük",
    category: "rings",
    metal: "silver",
    collection: "dalga",
    image: "/insta-media/pics/IMG_0927.JPG.jpeg",
    width: 1402,
    height: 1753,
    fit: "cover",
    images: [
      { src: "/insta-media/pics/IMG_0927.JPG.jpeg", fit: "cover" },
      { src: "/insta-media/pics/IMG_0934.JPG.jpeg", fit: "cover" },
    ],
    availability: "ready",
    pairsWith: ["dalga-sirga"],
    featured: true,
    order: 3,
  },
  {
    slug: "aura-sirga",
    name: "Aura sırğa",
    category: "earrings",
    metal: "silver",
    collection: "aura",
    image: "/insta-media/pics/IMG_0933.JPG.jpeg",
    width: 1390,
    height: 1738,
    fit: "cover",
    images: [
      { src: "/insta-media/pics/IMG_0933.JPG.jpeg", fit: "cover" },
      { src: box, fit: "cover" },
    ],
    availability: "ready",
    pairsWith: ["cubic-sirga"],
    featured: true,
    order: 7,
  },
  {
    slug: "resin-hoop",
    name: "Resin hoop",
    category: "earrings",
    metal: "gold-toned",
    collection: "studio",
    image: "/insta-media/pics/IMG_0932.JPG.jpeg",
    width: 1092,
    height: 1454,
    fit: "contain",
    images: [
      { src: "/insta-media/pics/IMG_0932.JPG.jpeg", fit: "contain" },
      { src: "/insta-media/pics/IMG_0931.JPG.jpeg", fit: "cover" },
    ],
    availability: "ask",
    pairsWith: ["open-ring"],
    featured: false,
    order: 6,
  },
  {
    slug: "open-ring",
    name: "Open ring",
    category: "rings",
    metal: "silver",
    collection: "studio",
    image: "/insta-media/pics/IMG_0930.JPG.jpeg",
    width: 1557,
    height: 2076,
    fit: "cover",
    images: [
      { src: "/insta-media/pics/IMG_0930.JPG.jpeg", fit: "cover" },
      { src: box, fit: "cover" },
    ],
    availability: "ask",
    pairsWith: ["resin-hoop"],
    featured: false,
    order: 5,
  },
  {
    slug: "dome-ring",
    name: "Dome ring",
    category: "rings",
    metal: "silver",
    collection: "studio",
    image: "/insta-media/pics/IMG_0929.JPG.jpeg",
    width: 1496,
    height: 1867,
    fit: "cover",
    images: [
      { src: "/insta-media/pics/IMG_0929.JPG.jpeg", fit: "cover" },
      { src: box, fit: "cover" },
    ],
    availability: "ask",
    pairsWith: ["dalga-sirga"],
    featured: false,
    order: 4,
  },
];

export type ProductQuery = {
  category?: string;
  metal?: string;
  collection?: string;
  sort?: string;
  q?: string;
};

const categoryIds = new Set<string>(categories.map((item) => item.id));
const metalIds = new Set<string>(metals.map((item) => item.id));
const collectionIds = new Set<string>(collections.map((item) => item.id));
const sortIds = new Set<string>(sorts.map((item) => item.id));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function pairedProducts(product: Product) {
  return product.pairsWith
    .map((slug) => getProduct(slug))
    .filter((item): item is Product => Boolean(item));
}

export function relatedProducts(product: Product, limit = 3) {
  const paired = new Set(product.pairsWith);
  return products
    .filter(
      (item) =>
        item.slug !== product.slug && !paired.has(item.slug) && item.category === product.category,
    )
    .slice(0, limit);
}

export function filterProducts(
  query: ProductQuery,
  options?: {
    locale?: string;
    text?: (product: Product) => string;
    name?: (product: Product) => string;
  },
) {
  const category = query.category && categoryIds.has(query.category) ? query.category : "";
  const metal = query.metal && metalIds.has(query.metal) ? query.metal : "";
  const collection =
    query.collection && collectionIds.has(query.collection) ? query.collection : "";
  const sort = query.sort && sortIds.has(query.sort) ? (query.sort as SortId) : "featured";
  const q = query.q?.trim() ?? "";
  const locale = options?.locale ?? "az";
  const needle = q.toLocaleLowerCase(locale);

  const list = products.filter((product) => {
    if (category && product.category !== category) return false;
    if (metal && product.metal !== metal) return false;
    if (collection && product.collection !== collection) return false;
    if (needle) {
      const hay = (options?.text?.(product) ?? product.name).toLocaleLowerCase(locale);
      if (!hay.includes(needle)) return false;
    }
    return true;
  });

  const label = (product: Product) => options?.name?.(product) ?? product.name;
  const sorted = [...list];
  if (sort === "name-asc") {
    sorted.sort((a, b) => label(a).localeCompare(label(b), locale));
  } else if (sort === "name-desc") {
    sorted.sort((a, b) => label(b).localeCompare(label(a), locale));
  } else if (sort === "newest") {
    sorted.sort((a, b) => b.order - a.order);
  } else {
    sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
  }

  return { products: sorted, category, metal, collection, sort, q };
}
