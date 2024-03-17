interface Checkbox {
  name: string;
  value: string;
}

interface FilterGroupProps {
  title: string;
  items: Checkbox[];
  name: string;
  selected: string[];
  onChange: (value: string, name: string) => void;
}

const FilterGroup = ({
  title,
  items,
  name,
  selected,
  onChange,
}: FilterGroupProps) => {
  return (
    <div className="block w-full mb-4">
      <h1 className="text-[15px] text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
        {title}
      </h1>
      <div className="border border-yellow-primary py-2.5 px-4 rounded-b-lg w-full">
        <ul>
          {items.map((item) => (
            <li key={item.value}>
              <label
                htmlFor={item.name}
                className="inline-flex items-center space-x-2.5 mb-2 cursor-pointer"
              >
                <input
                  id={item.name}
                  name={item.name}
                  value={item.value}
                  type="checkbox"
                  checked={selected.includes(item.value)}
                  className="w-3.5 h-3.5 text-yellow-primary cursor-pointer rounded-sm"
                  onChange={(e) => onChange(e.target.value, name)}
                />
                <span>{item.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterGroup;
