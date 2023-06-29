import { useState } from "react";

const options = [
  { id: 1, name: "Bisnis" },
  { id: 2, name: "Ekonomi" },
  { id: 3, name: "Teknologi" },
  { id: 4, name: "Olahraga" },
  { id: 5, name: "Kuliner" },
  { id: 6, name: "Internasional" },
  { id: 7, name: "Fiksi" },
];

function SelectCategory() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select
        className="block w-full px-4 py-2 mt-2 text-sm text-gray-600 dark:text-blue-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Choose a category that best represents your creation in any divisions</option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCategory;
