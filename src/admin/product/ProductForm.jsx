import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../../api/productsApi";

export default function ProductForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const mutation = useMutation({
    mutationFn: addProduct, // ✅ Replace with your real endpoint
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setFormData({ name: "", price: "", category: "", image: "" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-xl font-medium">Add Product</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="border-b p-2 bg-gray-100"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="border-b p-2 bg-gray-100"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          className="border-b p-2 bg-gray-100"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <input
          className="border-b p-2 bg-gray-100"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {mutation.isLoading ? "Adding..." : "Add Product"}
      </button>
      {/* TODO: Add form validation and image upload support */}
    </form>
  );
}
