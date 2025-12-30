// Product data for Galande Snacks
export const products = [
    {
        id: 1,
        name: "Salted Peanuts",
        tagline: "Premium roasted & salted",
        description: "Crunchy, perfectly salted peanuts roasted to golden perfection",
        price: 25,
        weight: "40g",
        color: "#8B4513", // Peanut Brown
        bgColor: "#8B4513",
        category: "Classic",
        featured: true,
        ingredients: ["Premium Peanuts", "Rock Salt", "Groundnut Oil"],
        image: null, // Placeholder - will use CSS gradients
    },
    {
        id: 2,
        name: "Sabudana Chivda",
        tagline: "Upwas Special",
        description: "Light and crispy sabudana mix, perfect for fasting days",
        price: 30,
        weight: "40g",
        color: "#6B3FA0", // Purple
        bgColor: "#6B3FA0",
        category: "Upwas Special",
        featured: true,
        ingredients: ["Sabudana", "Peanuts", "Curry Leaves", "Green Chilli"],
        image: null,
    },
    {
        id: 3,
        name: "Haldi Chana",
        tagline: "Spiced & Healthy",
        description: "Turmeric-coated roasted chana with authentic Maharashtrian spices",
        price: 20,
        weight: "40g",
        color: "#1E3A5F", // Blue
        bgColor: "#1E3A5F",
        category: "Healthy",
        featured: true,
        ingredients: ["Roasted Chana", "Turmeric", "Red Chilli", "Salt"],
        image: null,
    },
    {
        id: 4,
        name: "Fried Peanuts",
        tagline: "Classic Crunch",
        description: "Perfectly fried peanuts with a satisfying crunch",
        price: 25,
        weight: "40g",
        color: "#C41E3A", // Maroon
        bgColor: "#722F37",
        category: "Classic",
        featured: true,
        ingredients: ["Premium Peanuts", "Groundnut Oil", "Salt"],
        image: null,
    },
    {
        id: 5,
        name: "Green Peas",
        tagline: "Crispy & Light",
        description: "Crunchy fried green peas with a hint of spice",
        price: 20,
        weight: "40g",
        color: "#228B22", // Green
        bgColor: "#228B22",
        category: "Healthy",
        featured: true,
        ingredients: ["Green Peas", "Vegetable Oil", "Salt", "Spices"],
        image: null,
    },
    {
        id: 6,
        name: "Lahsun Sev",
        tagline: "Garlic Lovers",
        description: "Crispy sev with bold garlic flavor",
        price: 25,
        weight: "40g",
        color: "#B22222", // Dark Red
        bgColor: "#B22222",
        category: "Namkeen",
        featured: false,
        ingredients: ["Besan", "Garlic", "Red Chilli", "Salt"],
        image: null,
    },
    {
        id: 7,
        name: "Cornflakes Mixture",
        tagline: "Crunchy Mix",
        description: "Delicious mixture of cornflakes, peanuts and spices",
        price: 35,
        weight: "40g",
        color: "#E07020", // Orange
        bgColor: "#E07020",
        category: "Mixture",
        featured: false,
        ingredients: ["Cornflakes", "Peanuts", "Curry Leaves", "Spices"],
        image: null,
    },
    {
        id: 8,
        name: "Upwas Special Mix",
        tagline: "Fasting Favorite",
        description: "Special mix for fasting days with sabudana and nuts",
        price: 40,
        weight: "40g",
        color: "#DAA520", // Gold
        bgColor: "#DAA520",
        category: "Upwas Special",
        featured: false,
        ingredients: ["Sabudana", "Peanuts", "Potato", "Rock Salt"],
        image: null,
    },
];

export const featuredProducts = products.filter((p) => p.featured);

export const categories = [
    { name: "All", count: products.length },
    { name: "Classic", count: products.filter((p) => p.category === "Classic").length },
    { name: "Healthy", count: products.filter((p) => p.category === "Healthy").length },
    { name: "Upwas Special", count: products.filter((p) => p.category === "Upwas Special").length },
    { name: "Namkeen", count: products.filter((p) => p.category === "Namkeen").length },
    { name: "Mixture", count: products.filter((p) => p.category === "Mixture").length },
];

export const brandInfo = {
    name: "Galande Snacks",
    tagline: "Authentic Taste of Maharashtra",
    established: 1999,
    slogan: "Crunch jo roz yaad aaye",
};
