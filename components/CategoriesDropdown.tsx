import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  parent_id: number | null;  // assuming null for top-level categories
  slug: string;
  subcategories: Category[]; // Nested subcategories for the dropdown
}

const CategoriesDropdown = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:4000/api/v1/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // Function to get the top-level categories and their subcategories
  const getTopLevelCategories = (categories: Category[]) => {
    return categories.filter((category) => category.parent_id === null);
  };

  // Function to get the subcategories of a given category
  const getSubcategories = (parentId: number) => {
    return categories.filter((category) => category.parent_id === parentId);
  };

  return (
    <div className="categories-dropdown">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="space-y-4">
        {getTopLevelCategories(categories).map((category) => (
          <div key={category.id} className="relative group">
            {/* Parent Category */}
            <div className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer text-gray-800">
              {category.name}
            </div>

            {/* Subcategories (shown on hover) */}
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

export default CategoriesDropdown;
