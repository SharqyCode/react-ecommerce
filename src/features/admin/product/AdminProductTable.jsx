import React from "react";

export default function AdminProductTable({ data, handleDelete, handleOpen }) {
  return (
    <div className="max-h-80 overflow-y-scroll">
      <table className="min-w-full  text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b sticky top-0 w-full z-10">
            <th className="p-3 font-semibold">#</th>
            <th className="p-3 font-semibold">Name</th>
            <th className="p-3 font-semibold">Price</th>
            <th className="p-3 font-semibold">Category</th>
            <th className="p-3 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr
              key={product._id}
              className=" odd:bg-gray-200 hover:bg-blue-200"
            >
              <td className="p-3">{++index}</td>
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
    </div>
  );
}
