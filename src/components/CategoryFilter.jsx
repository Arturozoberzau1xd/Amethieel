function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "filter-button active"
              : "filter-button"
          }
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;