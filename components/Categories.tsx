import React, { FC } from 'react';
import { Category } from '../types/Category';

interface CategoriesProps {
  categories: Category[];
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
  const getTopLevelCategories = (categories: Category[]) => {
    return categories.filter((category) => category.parent_id === null);
  };

  const getSubcategories = (parentId: number) => {
    return categories.filter((category) => category.parent_id === parentId);
  };

  return (
    <div className="w-64 bg-white p-4 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Categories</h3>
      <div className="space-y-4">
        {getTopLevelCategories(categories).map((category) => (
          <div key={category.id} className="relative group">
            {/* Parent Category */}
            <div className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer text-gray-800">
              {category.name}
            </div>

            {/* Subcategories (visible on hover) */}
            {category.subcategories.length > 0 && (
              <div className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {category.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-700"
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}

            {/* Rendering subcategories dynamically if any */}
            {getSubcategories(category.id).length > 0 && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {getSubcategories(category.id).map((sub) => (
                  <div
                    key={sub.id}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-700"
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
