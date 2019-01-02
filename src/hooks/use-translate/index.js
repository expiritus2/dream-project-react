import { useCallback, useContext } from "react";
import TranslationContext from "context/translation";
import translations from "../../translations";

export default () => {
  const translationContext = useContext(TranslationContext);

  const translate = useCallback(
    (key, interpolation) => {
      if (typeof key !== "string") {
        throw new Error("A key with type string must be specified");
      }
      const keys = key.split(".");
      let index = 0;
      let currentKey = translations[translationContext.locale];
      while (keys.length !== index) {
        currentKey = currentKey[keys[index]] ? currentKey[keys[index]] : key;
        index += 1;
      }
      if (typeof interpolation !== "undefined") {
        if (typeof interpolation !== "object") {
          throw new Error("Interpolation must be an object");
        }
        Object.keys(interpolation).forEach(interKey => {
          currentKey = currentKey.replace(
            new RegExp(`%{${interKey}}`),
            interpolation[interKey],
          );
        });
      }
      return currentKey || key;
    },
    [translationContext],
  );

  return [translate, translationContext];
};
