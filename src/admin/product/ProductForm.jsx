import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../../api/productsApi";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllCategories } from "../../api/categoriesApi";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import IncField from "../components/DynamicTextFields";
import DynamicTextFields from "../components/DynamicTextFields";

export default function ProductForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "combo",
    subCategory: "combo",
    tags: [""],
    price: "",
    thumbnail: "",
    images: [""],
    colors: [""],
    sizes: [""],
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    isFeatured: false,
    isActive: true,
  });

  const mutation = useMutation({
    mutationFn: addProduct, // ✅ Replace with your real endpoint
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setFormData({ name: "", price: "", category: "", image: "" });
    },
  });

  const { data: categories, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  console.log("categoryQuery:", categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (text, field, collection, index = null) => {
    console.log(collection);
    console.log(index);
    console.log(collection[index - 1]);
    setFormData((prev) => {
      collection[index] = text;
      return { ...prev, [field]: collection };
    });
  };

  console.log(formData["tags"]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow space-y-4 max-h-80 overflow-scroll"
      >
        <h2 className="text-xl font-medium">Add Product</h2>
        <div className="flex flex-wrap gap-4 flex-col items-start ">
          {Object.keys(formData).map((field) => {
            if (typeof formData[field] === "string")
              return (
                <TextField
                  key={field}
                  value={formData[field]}
                  onChange={(e) => {
                    setFormData({ ...formData, [field]: e.target.value });
                  }}
                  variant="outlined"
                  label={field}
                />
              );
            if (formData[field] === "combo")
              return isSuccess ? (
                <Autocomplete
                  key={field}
                  value={formData[field]}
                  onChange={(e) => {
                    setFormData({ ...formData, [field]: e.target.value });
                  }}
                  disablePortal
                  options={categories[field]}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label={field} />
                  )}
                />
              ) : (
                <TextField key={field} disabled label={field} />
              );
            if (Array.isArray(formData[field])) {
              console.log("yes");
              return (
                <DynamicTextFields
                  value={formData[field]}
                  handleChange={handleChange}
                  key={field}
                  field={field}
                />

                // <div key={`${field}-count`} className="flex items-center">
                //   <IconButton onClick={() => {}}>
                //     <AddBoxIcon />
                //   </IconButton>
                //   <TextField label={field} />
                //   <IconButton onClick={() => {}}>
                //     <RemoveCircleIcon />
                //   </IconButton>
                // </div>
              );
            }
          })}
        </div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {mutation.isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </>
  );
}
