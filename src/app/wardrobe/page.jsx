
"use client";

import { useState } from "react";
import {
  Shirt,
  Plus,
  Search,
  Heart,
  X,
  Trash2,
  ImagePlus,
  ChevronRight,
} from "lucide-react";

import AppNavigation from "@/components/layout/app/AppNavigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const categoryData = {
  Tops: [
    "T-shirts",
    "Tank Tops",
    "Crop Tops",
    "Long Sleeve Tops",
    "Blouses",
    "Shirts",
    "Knitwear",
    "Sweaters",
    "Cardigans",
    "Vests",
    "Bodysuits",
    "Corsets",
    "Hoodies",
    "Sweatshirts",
  ],
  Bottoms: [
    "Jeans",
    "Trousers",
    "Leggings",
    "Joggers",
    "Shorts",
    "Denim Shorts",
    "Skirts",
    "Mini Skirts",
    "Midi Skirts",
    "Maxi Skirts",
  ],
  "Dresses & Jumpsuits": [
    "Mini Dresses",
    "Midi Dresses",
    "Maxi Dresses",
    "Shirt Dresses",
    "Knit Dresses",
    "Party Dresses",
    "Jumpsuits",
    "Playsuits",
    "Rompers",
  ],
  Outerwear: [
    "Blazers",
    "Jackets",
    "Denim Jackets",
    "Leather Jackets",
    "Coats",
    "Trench Coats",
    "Puffer Jackets",
    "Vests",
    "Rainwear",
  ],
  Shoes: [
    "Sneakers",
    "Boots",
    "Ankle Boots",
    "Knee-High Boots",
    "Heels",
    "Sandals",
    "Flats",
    "Loafers",
    "Ballet Flats",
    "Mules",
    "Slippers",
  ],
  Bags: [
    "Shoulder Bags",
    "Crossbody Bags",
    "Tote Bags",
    "Handbags",
    "Clutches",
    "Backpacks",
    "Mini Bags",
    "Evening Bags",
  ],
  Accessories: [
    "Jewellery",
    "Necklaces",
    "Earrings",
    "Bracelets",
    "Rings",
    "Belts",
    "Hats & Caps",
    "Scarves",
    "Gloves",
    "Sunglasses",
    "Hair Accessories",
    "Watches",
  ],
  Activewear: [
    "Sports Bras",
    "Sports Tops",
    "Sports Leggings",
    "Sports Shorts",
    "Tracksuits",
    "Workout Jackets",
  ],
  "Lingerie & Sleepwear": [
    "Bras",
    "Briefs",
    "Underwear Sets",
    "Pyjamas",
    "Nightwear",
    "Robes",
    "Loungewear",
  ],
  Swimwear: [
    "Bikinis",
    "One-Piece Swimsuits",
    "Swim Shorts",
    "Cover-Ups",
    "Beachwear",
  ],
};

const mainCategories = Object.keys(categoryData);

export default function WardrobePage() {
  const [items, setItems] = useState([]);
console.log("DEMO ITEMS:", items);
  const [activeCategory, setActiveCategory] = useState("All items");
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("Tops");
  const [itemSubcategory, setItemSubcategory] = useState("T-shirts");
  const [imagePreview, setImagePreview] = useState("");

  const [favorites, setFavorites] = useState([]);

  const visibleSubcategories =
    activeCategory !== "All items"
      ? categoryData[activeCategory]
      : [];

  const formSubcategories = categoryData[itemCategory];

  // FILTER ITEMS
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === "All items" ||
      item.category === activeCategory;

    const matchesSubcategory =
      activeSubcategory === "All" ||
      item.subcategory === activeSubcategory;

    const matchesSearch = `${item.name} ${item.category} ${item.subcategory}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFavorites =
      !showFavorites || favorites.includes(item.id);

    return (
      matchesCategory &&
      matchesSubcategory &&
      matchesSearch &&
      matchesFavorites
    );
  });

  // CATEGORY SELECTION
  function selectCategory(category) {
    setActiveCategory(category);
    setActiveSubcategory("All");
    setShowFavorites(false);
  }

  // ADD ITEM FORM
  function openForm() {
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setItemName("");
    setItemCategory("Tops");
    setItemSubcategory(categoryData.Tops[0]);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
  }

  // IMAGE UPLOAD
  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(URL.createObjectURL(file));
  }

  // ADD NEW ITEM
  function handleAddItem(event) {
    event.preventDefault();

    if (!itemName.trim()) return;

    const newItem = {
      id: crypto.randomUUID(),
      name: itemName.trim(),
      category: itemCategory,
      subcategory: itemSubcategory,
      image: imagePreview,
    };

    setItems((previous) => [...previous, newItem]);

    setShowForm(false);
    setItemName("");
    setItemCategory("Tops");
    setItemSubcategory(categoryData.Tops[0]);
    setImagePreview("");
  }

  // FAVORITES
  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((favoriteId) => favoriteId !== id)
        : [...previous, id]
    );
  }

  // DELETE ITEM
  function deleteItem(id) {
    setItems((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setFavorites((previous) =>
      previous.filter((favoriteId) => favoriteId !== id)
    );
  }

  return (
    <main className="min-h-screen bg-dressed-pink-light text-dressed-text">
      <AppNavigation />

      <div className="page-container py-10">

        {/* PAGE HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge variant="pink">MY PERSONAL COLLECTION</Badge>

            <h1 className="mt-4 font-serif text-4xl">
              My Closet.
            </h1>

            <p className="mt-2 text-sm text-dressed-muted">
              All your favourite pieces, in one place.
            </p>
          </div>

          <Button onClick={openForm}>
            <Plus size={17} />
            Add an item
          </Button>
        </div>

        {/* CATEGORY NAVIGATION */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl">
                My categories
              </h2>

              <p className="mt-1 text-xs text-dressed-muted">
                Find your pieces by category.
              </p>
            </div>

            <span className="text-xs text-dressed-muted">
              {mainCategories.length} categories
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => selectCategory("All items")}
              className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                activeCategory === "All items" && !showFavorites
                  ? "border-dressed-pink-strong bg-dressed-pink-strong text-white"
                  : "border-dressed-border bg-white text-dressed-muted hover:bg-dressed-pink-soft"
              }`}
            >
              All items
            </button>

            <button
              type="button"
              onClick={() => {
                setShowFavorites(true);
                setActiveCategory("All items");
                setActiveSubcategory("All");
              }}
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                showFavorites
                  ? "border-dressed-pink-strong bg-dressed-pink-strong text-white"
                  : "border-dressed-border bg-white text-dressed-muted hover:bg-dressed-pink-soft"
              }`}
            >
              <Heart size={15} />
              Favorites
            </button>

            {mainCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "border-dressed-pink-strong bg-dressed-pink-strong text-white"
                    : "border-dressed-border bg-white text-dressed-muted hover:bg-dressed-pink-soft"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* SUBCATEGORY NAVIGATION */}
        {activeCategory !== "All items" && (
          <section className="mt-6 rounded-2xl border border-dressed-border bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <ChevronRight
                size={17}
                className="text-dressed-pink-strong"
              />

              <h3 className="text-sm font-semibold">
                {activeCategory}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveSubcategory("All")}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                  activeSubcategory === "All"
                    ? "bg-dressed-pink-soft text-dressed-pink-dark"
                    : "bg-dressed-pink-light text-dressed-muted hover:bg-dressed-pink-soft"
                }`}
              >
                All {activeCategory}
              </button>

              {visibleSubcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  type="button"
                  onClick={() => setActiveSubcategory(subcategory)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    activeSubcategory === subcategory
                      ? "bg-dressed-pink-soft text-dressed-pink-dark"
                      : "bg-dressed-pink-light text-dressed-muted hover:bg-dressed-pink-soft"
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* SEARCH AND ITEM COUNT */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-xl border border-dressed-border bg-white px-4 py-3">
            <Search
              size={18}
              className="shrink-0 text-dressed-muted"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search your closet..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-dressed-muted"
            />
          </div>

          <p className="text-xs text-dressed-muted">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* WARDROBE ITEMS */}
        {filteredItems.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => {
              const isFavorite = favorites.includes(item.id);

              return (
                <Card
                  key={item.id}
                  padding="small"
                  className="group overflow-hidden"
                >
                  <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl bg-dressed-pink-light">
                    {item.image ? (
                       <img
    src={item.image}
    alt={item.name}
    className="h-full w-full object-contain p-5"
  />
                    ) : (
                      <Shirt
                        size={48}
                        strokeWidth={1}
                        className="text-dressed-pink-strong"
                      />
                    )}

                    {/* FAVORITE BUTTON */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(item.id)}
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
                    >
                      <Heart
                        size={17}
                        className={
                          isFavorite
                            ? "fill-dressed-pink-strong text-dressed-pink-strong"
                            : "text-dressed-muted"
                        }
                      />
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      aria-label={`Delete ${item.name}`}
                      className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-dressed-muted shadow-sm transition hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="px-1 pb-1 pt-3">
                    <h3 className="truncate text-sm font-semibold">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-dressed-muted">
                      {item.subcategory}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <Card className="mt-8 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dressed-pink-light text-dressed-pink-dark">
              {items.length === 0 ? (
                <Shirt size={30} />
              ) : showFavorites ? (
                <Heart size={28} />
              ) : (
                <Search size={28} />
              )}
            </div>

            <h2 className="mt-5 font-serif text-2xl">
              {items.length === 0
                ? "Your closet is waiting."
                : showFavorites
                  ? "No favorites yet."
                  : "No items found."}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-dressed-muted">
              {items.length === 0
                ? "Start adding your clothes, shoes and accessories to build your digital closet."
                : showFavorites
                  ? "Your favorite pieces will appear here when you mark them with a heart."
                  : "Try another search or choose a different category."}
            </p>

            {items.length === 0 && (
              <Button className="mt-6" onClick={openForm}>
                <Plus size={16} />
                Add your first item
              </Button>
            )}
          </Card>
        )}
      </div>

      {/* ADD ITEM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-dressed-text/40 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg rounded-[28px] border border-dressed-border bg-white p-6 shadow-2xl sm:p-8">

            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="pink">NEW ADDITION</Badge>

                <h2 className="mt-3 font-serif text-3xl">
                  Add to my closet.
                </h2>

                <p className="mt-2 text-sm text-dressed-muted">
                  Give your wardrobe a little update.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dressed-pink-light text-dressed-pink-dark transition hover:bg-dressed-pink-soft"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="mt-7 space-y-5">

              {/* IMAGE */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Item image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-dressed-pink-medium bg-dressed-pink-light transition hover:bg-dressed-pink-soft">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Item preview"
                      className="h-52 w-full object-contain p-3"
                    />
                  ) : (
                    <div className="flex flex-col items-center py-10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-dressed-pink-dark">
                        <ImagePlus size={24} />
                      </div>

                      <p className="mt-3 text-sm font-semibold">
                        Upload an image
                      </p>

                      <p className="mt-1 text-xs text-dressed-muted">
                        Choose an image from your device
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>

                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(imagePreview);
                      setImagePreview("");
                    }}
                    className="mt-2 text-xs font-semibold text-dressed-pink-dark hover:underline"
                  >
                    Remove image
                  </button>
                )}
              </div>

              {/* NAME */}
              <div>
                <label
                  htmlFor="item-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Item name
                </label>

                <input
                  id="item-name"
                  type="text"
                  required
                  value={itemName}
                  onChange={(event) => setItemName(event.target.value)}
                  placeholder="e.g. Pink oversized blazer"
                  className="w-full rounded-xl border border-dressed-border bg-white px-4 py-3 text-sm outline-none transition focus:border-dressed-pink-strong"
                />
              </div>

              {/* MAIN CATEGORY */}
              <div>
                <label
                  htmlFor="item-category"
                  className="mb-2 block text-sm font-semibold"
                >
                  Main category
                </label>

                <select
                  id="item-category"
                  value={itemCategory}
                  onChange={(event) => {
                    const newCategory = event.target.value;

                    setItemCategory(newCategory);
                    setItemSubcategory(categoryData[newCategory][0]);
                  }}
                  className="w-full rounded-xl border border-dressed-border bg-white px-4 py-3 text-sm outline-none transition focus:border-dressed-pink-strong"
                >
                  {mainCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* SUBCATEGORY */}
              <div>
                <label
                  htmlFor="item-subcategory"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subcategory
                </label>

                <select
                  id="item-subcategory"
                  value={itemSubcategory}
                  onChange={(event) =>
                    setItemSubcategory(event.target.value)
                  }
                  className="w-full rounded-xl border border-dressed-border bg-white px-4 py-3 text-sm outline-none transition focus:border-dressed-pink-strong"
                >
                  {formSubcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                >
                  Cancel
                </Button>

                <Button type="submit">
                  <Plus size={16} />
                  Add to closet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
