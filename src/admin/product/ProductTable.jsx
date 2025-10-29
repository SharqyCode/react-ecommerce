import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import { LogIn, XCircle } from "lucide-react";
import {
  deleteProductById,
  getAllProducts,
  updateProduct,
} from "../../api/productsApi";
import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";

export default function ProductTable() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = (product) => {
    setOpen(true);
    setFormData({ ...product });
  };
  const handleClose = () => setOpen(false);

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
      <div className="flex flex-col items-center bg-white rounded shadow p-4">
        <XCircle size={50}></XCircle>
        <h3 className="text-2xl font-semibold text-center">
          Failed to load Products
        </h3>
      </div>
    );

  if (isSuccess)
    return (
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Category</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr
                key={product._id}
                className=" odd:bg-gray-200 hover:bg-blue-200"
              >
                <td className="p-3">{product.name}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.category.name}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      handleOpen(product);
                    }}
                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 cursor-pointer"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <div className="bg-white p-4  w-fit rounded">
            <form
              onSubmit={(e) => {
                handleUpdate(e, formData);
              }}
              className="p-4 bg-white rounded space-y-4"
            >
              <h2 className="text-xl font-medium">Update Product</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="border-b p-2 bg-gray-100"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  className="border-b p-2 bg-gray-100"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
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
