import React from "react";
import Select from "react-select";
import { useState } from "react";

const options = [
  { value: "ID", label: "ID" },
  { value: "Alphabetically", label: "Alphabetically" },
  { value: "Likes", label: "Likes" },
];

const DropdownMenu = ({ handleCardDataCallback }) => {
  return (
    <Select
      onChange={(event) => handleCardDataCallback(event)}
      options={options}
    />
  );
};

export default DropdownMenu;
