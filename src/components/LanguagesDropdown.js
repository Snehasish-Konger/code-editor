import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { lang } from "../constants/lang";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={lang}
      styles={customStyles}
      defaultValue={lang[4]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
