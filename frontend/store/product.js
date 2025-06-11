import { create } from "zustand";

export const useProductStore = create((set) => ({
  // initialize products list
  products: [],
  // allow to set products as a state
  setProduct: (products) => set({ products }),
  //  create product
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }

    if (newProduct.price <= 0) {
      return { success: false, message: "Price must be greater than 0" };
    }
    
    if (typeof newProduct.price !== "number") {
      console.log("Price is a string");
      return { success: false, message: "Price must be a number" };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return { success: true, message: "New Product created" };
  },

  // retrieve products
  getProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    // actually set the products in "data"
    set({ products: data.data });
  },

  // update product
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      console.error("Failed to update product:", data.message);
      return { success: false, message: data.message };
    } else {
      set((state) => ({
        // if the id match the updated it will use the data which is updated 
        products: state.products.map((product) => product._id === id ? data.data : product),
      }));
      return { success: true, message: data.message };
    }
  },

  // delete product
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      // update the UI as product is deleted; without refresh
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: data.message };
    } else {
      console.error("Failed to delete product:", data.message);
      return { success: false, message: data.message };
    }
  },
}));
