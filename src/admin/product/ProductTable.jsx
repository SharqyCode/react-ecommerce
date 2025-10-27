import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import { XCircle } from "lucide-react";
import { getAllProducts } from "../../api/productsApi";

export default function ProductTable() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

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
                <td className="p-3">{product.category}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 cursor-pointer">
                    Update
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* TODO: Add pagination and delete/edit actions */}
      </div>
    );
}
