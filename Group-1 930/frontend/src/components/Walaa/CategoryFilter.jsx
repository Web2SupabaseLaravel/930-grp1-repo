
import Dropdown from 'react-bootstrap/Dropdown';

const categories = [
  { key: null, label: 'الكل' },
  { key: 'Category_1', label: 'رياضيات' },
  { key: 'Category_2', label: 'علوم' },
  { key: 'Category_3', label: 'تاريخ' },
  { key: 'Category_4', label: 'تصوير' },
  { key: 'Category_5', label: 'طبخ' },
  { key: 'Programming', label: 'برمجة' }
];

const CategoryFilter = ({ category, setCategory }) => {
  const currentLabel = categories.find(c => c.key === category)?.label || 'اختر التصنيف';

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {currentLabel}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map(cat => (
          <Dropdown.Item
            key={cat.key || 'all'}
            onClick={() => setCategory(cat.key)}
            active={category === cat.key}
          >
            {cat.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryFilter;
