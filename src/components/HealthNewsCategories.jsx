import React from 'react';

const HealthNewsCategories = ({ setCategory }) => {
  const categories = [
    { label: 'General', value: 'general' },
    { label: 'Mental Health', value: 'mental-health' },
    { label: 'Nutrition', value: 'nutrition' },
    { label: 'Fitness', value: 'fitness' },
    { label: 'Medical', value: 'medical' },
  ];

  return (
    <div className="mb-4">
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HealthNewsCategories;