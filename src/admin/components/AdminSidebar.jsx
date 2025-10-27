import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiUsers, FiBox, FiShoppingBag } from "react-icons/fi";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          id="aside-backdrop"
          className="bg-black opacity-20 absolute w-full h-full"
        ></div>
      )}
      <div id="placeholder" className="w-16 bg-white"></div>
      <aside
        className={`${
          isOpen ? "w-64" : "w-16"
        } absolute h-full bg-white border-r border-gray-200 transition-all duration-300 p-4 z-10`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            !isOpen ? "justify-center" : "justify-between"
          } flex items-center  w-full mb-6`}
        >
          <FiMenu className="text-xl cursor-pointer" />
          {isOpen && <span className="font-bold">Admin</span>}
        </button>

        <nav className="flex flex-col gap-4">
          <Link
            to="users"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 hover:text-blue-600`}
          >
            <FiUsers />
            {isOpen && <span>Users</span>}
          </Link>

          <Link
            to="products"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 hover:text-blue-600`}
          >
            <FiBox />
            {isOpen && <span>Products</span>}
          </Link>

          <Link
            to="orders"
            className={`${
              !isOpen ? "justify-center" : "justify-start"
            } flex items-center gap-3 hover:text-blue-600`}
          >
            <FiShoppingBag />
            {isOpen && <span>Orders</span>}
          </Link>
        </nav>
      </aside>
    </>
  );
}
