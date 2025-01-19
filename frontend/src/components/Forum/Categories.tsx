import React from "react";
import { Link } from "react-router-dom";

interface Category {
    id: string;
    name: string;
    description: string;
    slug: string;
}

interface CategoriesProps {
    categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold text-center mb-6">Forum Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link
                        to={`/forum/category/${category.slug}`}
                        key={category.id}
                        className="block p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-200"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {category.name}
                        </h2>
                        <p className="text-gray-600">{category.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
