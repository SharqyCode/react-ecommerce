import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../../../api/productsApi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllCategories } from "../../../api/categoriesApi";
import DynamicTextFields from "../components/DynamicTextFields";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { empty_form } from "./values";

export default function ProductForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ ...empty_form });

  const mutation = useMutation({
    mutationFn: addProduct, // ✅ Replace with your real endpoint
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setFormData({ ...empty_form });
    },
  });

  const { data: categories, isSuccess } = useQuery({
    queryKey: ["categories"],
    staleTime: Infinity,
    queryFn: getAllCategories,
  });

  console.log("categoryQuery:", categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit:", formData);
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

  // console.log(formData["tags"]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow space-y-4 max-h-80 overflow-scroll"
      >
        <h2 className="text-xl font-medium">Add Product</h2>
        <div className="flex flex-wrap gap-4 flex-col items-start ">
          {Object.keys(formData).map((field) => {
            if (
              typeof formData[field] === "string" &&
              !["category", "subCategory"].includes(field)
            )
              return (
                <TextField
                  key={field}
                  value={formData[field]}
                  sx={{
                    color: "black",
                  }}
                  onChange={(e) => {
                    setFormData({ ...formData, [field]: e.target.value });
                  }}
                  variant="outlined"
                  label={field}
                />
              );
            if (["category", "subCategory"].includes(field))
              return isSuccess ? (
                <Autocomplete
                  key={field}
                  value={
                    categories?.[field]?.find(
                      (opt) => opt._id === formData[field]
                    ) || null
                  }
                  onChange={(e, val) => {
                    setFormData({ ...formData, [field]: val ? val._id : "" });
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id || option._id === value
                  }
                  disablePortal
                  options={categories[field]}
                  getOptionLabel={(option) => option.name}
                  // clearOnEscape
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
          <FormControl>
            <FormLabel>Featured</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={false}
              onChange={(_, val) => {
                setFormData({ ...formData, isFeatured: val });
              }}
              name="radio-buttons-group"
            >
              <FormControlLabel value={false} control={<Radio />} label="No" />
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
            </RadioGroup>
          </FormControl>
        </div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 sticky bottom-0 left-full"
        >
          {mutation.isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </>
  );
}
