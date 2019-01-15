import React, { useEffect } from "react";
import { useRedux } from "hooks";
import { getUserMarkers, autocompleteNames } from "../../modules/actions";
import Map from "../map";

const PersonalArea = () => {
  const [, actions] = useRedux("user", {
    userMarkers: getUserMarkers,
    autocompleteNames,
  });

  useEffect(() => {
    actions.userMarkers();
    actions.autocompleteNames();
  }, []);

  return (
    <>
      <Map />
    </>
  );
};

export default PersonalArea;
