import React from "react";

const CategoryCard = ({ title, img }) => {
    return (
        <div className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-lg shadow-black/30 transition-transform duration-300 hover:-translate-y-2">
            <img
                src={img}
                alt={title}
                className="w-full h-auto block"
            />
            <h3 className="text-white text-xl font-medium p-5">{title}</h3>
        </div>
    );
};

export default CategoryCard;
