import { useEffect, useCallback } from "react";

export default (ref, handler, eventNames = ["pointerup", "keyup"]) => {
  if (!ref)
    throw new Error("There is no `ref` in useOutsideClick. It's required.");
  if (!handler)
    throw new Error("There is no `handler` in useOutsideClick. It's required.");
  if (typeof handler !== "function")
    throw new Error("The `handler` not a function in useOutsideClick");

  const handlerWithCheck = useCallback(
    event => {
      if (ref && !ref.current.contains(event.target)) {
        handler(event);
      }
    },
    [ref, handler, eventNames],
  );

  useEffect(
    () => {
      eventNames.forEach(eventName =>
        document.addEventListener(eventName, handlerWithCheck),
      );
      return () =>
        eventNames.forEach(eventName =>
          document.removeEventListener(eventName, handlerWithCheck),
        );
    },
    [handlerWithCheck],
  );
};
