import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import { LogIn, XCircle } from "lucide-react";
import {
  deleteProductById,
  getAllProducts,
  updateProduct,
} from "../../../api/productsApi";
import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { empty_form } from "./values";
import { getAllCategories } from "../../../api/categoriesApi";
import DynamicTextFields from "../components/DynamicTextFields";
import AdminProductTable from "./AdminProductTable";

export default function ProductTable() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: Infinity,
  });

  const [formData, setFormData] = useState({ ...empty_form });

  const [open, setOpen] = useState(false);
  const handleOpen = (product) => {
    setOpen(true);
    setFormData((prev) => {
      Object.keys(product).filter((key) => {
        if (Array.isArray(product[key]) && product[key].length === 0)
          product[key] = [""];
      });
      return { ...prev, ...product };
    });
  };

  console.log(formData);
  const handleClose = () => setOpen(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    staleTime: Infinity,
    queryFn: getAllCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleDelete = (productId) => {
    deleteMutation.mutate(productId);
  };

  const updateMutation = useMutation({
    mutationFn: ({ productId, product }) => updateProduct(productId, product),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  // console.log("modal: ", formData);

  const handleUpdate = (e, product) => {
    e.preventDefault();

    const { _id, ...prodData } = product;
    console.log("handleUpdate: ", _id, prodData);
    updateMutation.mutate({
      productId: _id,
      product: { ...prodData },
    });
    setOpen(false);
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

  if (isLoading)
    return (
      <div className="flex w-full gap-4">
        <div className="grow">
          <Skeleton className="py-2" />
          <Skeleton className="py-2" />
          <Skeleton className="py-2" />
          <Skeleton className="py-2" />
          <Skeleton className="py-2" />
        </div>
        <div className="grow">
          <Skeleton className="py-2" />
          <Skeleton className="py-2" />
          <Skeleton className="py-2" />
          <Skeleton className="py-2" />
          <Skeleton className="py-2" />
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="flex flex-col items-center text-black bg-white rounded shadow p-4">
        <XCircle size={50}></XCircle>
        <h3 className="text-2xl font-semibold text-center">
          Failed to load Products
        </h3>
      </div>
    );

  if (isSuccess)
    return (
      <div className="overflow-x-auto bg-white rounded shadow text-black">
        <AdminProductTable
          handleDelete={handleDelete}
          handleOpen={handleOpen}
          data={data}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center text-black"
        >
          <div className="bg-white p-4  w-fit rounded">
            <form
              onSubmit={(e) => {
                handleUpdate(e, formData);
              }}
              className="p-4 bg-white rounded shadow space-y-4 max-h-80 overflow-scroll"
            >
              <h2 className="text-xl font-medium">Update Product</h2>
              <div className="flex flex-wrap gap-4 flex-col items-start ">
                {Object.keys(formData).map((field) => {
                  if (field === "_id") return;
                  if (
                    typeof formData[field] === "string" &&
                    !["category", "subCategory"].includes(field)
                  )
                    return (
                      <TextField
                        key={field}
                        value={formData[field]}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [field]: e.target.value,
                          });
                        }}
                        variant="outlined"
                        label={field}
                      />
                    );
                  if (["category", "subCategory"].includes(field))
                    return (
                      <Autocomplete
                        key={field}
                        value={
                          categories?.[field]?.find(
                            (opt) => opt._id === formData[field]
                          ) || null
                        }
                        onChange={(e, val) => {
                          setFormData({
                            ...formData,
                            [field]: val ? val._id : "",
                          });
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
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <button
                type="submit"
                disabled={updateMutation.isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {updateMutation.isLoading ? "Updating..." : "Update Product"}
              </button>
            </form>
          </div>
        </Modal>
        {/* TODO: Add pagination and delete/edit actions */}
      </div>
    );
}
