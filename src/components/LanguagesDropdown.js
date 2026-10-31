import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { lang } from "../constants/lang";

const LanguagesDropdown = ({ value, onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={lang}
      styles={customStyles}
      value={value}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
