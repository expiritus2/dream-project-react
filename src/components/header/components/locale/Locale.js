import React, { useState, useCallback, useContext } from "react";
import TranslationContext from "context/translation";
import ReactFlagsSelect from "react-flags-select";

const savedLocale = () =>
  localStorage.getItem("locale") ? localStorage.getItem("locale") : "US";

const Locale = () => {
  const translationContext = useContext(TranslationContext);
  const [selectedOption, setSelectdOption] = useState(savedLocale);

  const handleChange = useCallback(selectedOption => {
    setSelectdOption(selectedOption);
    translationContext.switchLocale(selectedOption);
    localStorage.setItem("locale", selectedOption);
  }, []);

  return (
    <>
      <ReactFlagsSelect
        defaultCountry={selectedOption}
        countries={["US", "RU"]}
        customLabels={{ US: "US", RU: "RU" }}
        onSelect={handleChange}
      />
    </>
  );
};

export default Locale;
