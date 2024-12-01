import { Close } from "../../icons";
import filter from "../../data/filter.json";

const SelectedFilter = ({
  selected,
  update,
  clear,
}: {
  selected: Record<string, string[]>;
  update: (value: string, name: string) => void;
  clear: () => void;
}) => {
  return (
    <div className="block w-full mb-4">
      <h1 className="text-[15px] text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
        Bạn chọn
      </h1>
      <div className="border border-yellow-primary py-2.5 px-4 rounded-b-lg w-full">
        <button
          onClick={clear}
          className="flex items-center mb-2.5 hover:text-yellow-primary"
        >
          Bỏ hết
          <Close className="ml-1 w-4 h-4" />
        </button>
        <ul>
          {selected.price.map((value) => (
            <li
              key={value}
              className="mb-4 mr-4 p-1.5 bg-yellow-primary rounded-md inline-block"
            >
              <button
                type="button"
                className="flex items-center"
                onClick={() => update(value, "price")}
              >
                <Close className="w-4 h-4 mr-1" />
                {filter.prices.find((f) => f.value === value)?.name}
              </button>
            </li>
          ))}
          {selected.taste.map((value) => (
            <li
              key={value}
              className="mb-4 mr-4 p-1.5 bg-yellow-primary rounded-md inline-block"
            >
              <button
                type="button"
                className="flex items-center"
                onClick={() => update(value, "taste")}
              >
                <Close className="w-4 h-4 mr-1" />
                {filter.taste.find((f) => f.value === value)?.name}
              </button>
            </li>
          ))}
          {selected.size.map((value) => (
            <li
              key={value}
              className="mb-4 mr-4 p-1.5 bg-yellow-primary rounded-md inline-block"
            >
              <button
                type="button"
                className="flex items-center"
                onClick={() => update(value, "size")}
              >
                <Close className="w-4 h-4 mr-1" />
                {filter.sizes.find((f) => f.value === value)?.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectedFilter;
