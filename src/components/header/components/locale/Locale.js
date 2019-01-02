import React, { useState, useCallback, useContext } from "react";
import TranslationContext from "context/translation";
import Select from "react-select";

const options = [{ value: "en", label: "EN" }, { value: "ru", label: "RU" }];

const savedLocale = {
  value: localStorage.getItem("locale"),
  label: localStorage.getItem("locale").toUpperCase(),
};

const Locale = () => {
  const translationContext = useContext(TranslationContext);
  const [selectedOption, setSelectdOption] = useState(savedLocale);

  const handleChange = useCallback(
    selectedOption => {
      setSelectdOption(selectedOption);
      translationContext.switchLocale(selectedOption.value);
      localStorage.setItem("locale", selectedOption.value);
    },
    [selectedOption],
  );

  return (
    <Select value={selectedOption} onChange={handleChange} options={options} />
  );
};

export default Locale;
