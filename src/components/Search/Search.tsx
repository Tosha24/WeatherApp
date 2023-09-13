import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import toast from "react-hot-toast";

interface Props {
  onSearchChange: (searchData: any) => void;
}

const Search = ({ onSearchChange }: Props) => {
  const [search, setSearch] = useState("ahmedabad");

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue: any) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100&namePrefix=${inputValue}`,
        geoApiOptions
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();

      const options = data.data.map((city: any) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

      return { options };
    } catch (err: any) {
      toast.error(err.message);
      return { options: [] }; // Return an empty array or handle the error gracefully
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for a place"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className="w-[90vw] md:w-[70vw] lg:w-[80vw] xl:w-[90vw]"
      styles={{
        // Styles for the input element
        input: (provided) => ({
          ...provided,
          color: "black",
          borderRadius: "5px", // Adjust border radius as needed
        }),

        // Styles for the container surrounding the dropdown
        menu: (provided) => ({
          ...provided,
          borderRadius: "5px", // Adjust border radius as needed
        }),

        // Styles for each option in the dropdown
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? "lightblue" : "white", // Change background color on hover
          color: "black",
        }),

        // Styles for the dropdown indicator
        dropdownIndicator: (provided) => ({
          ...provided,
          color: "blue", // Change the color of the dropdown indicator
        }),

        // Styles for the clear indicator (if applicable)
        clearIndicator: (provided) => ({
          ...provided,
          color: "red", // Change the color of the clear indicator
        }),

        // Styles for the control (containing the input and indicators)
        control: (provided) => ({
          ...provided,
          borderRadius: "5px", // Adjust border radius as needed
        }),
      }}
    />
  );
};

export default Search;
