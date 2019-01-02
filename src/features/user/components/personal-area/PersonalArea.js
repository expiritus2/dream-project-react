import React, { useEffect } from "react";
import { useRedux } from "hooks";
import { userMarkers } from "../../modules/actions";
import Map from "../map";

const PersonalArea = () => {
  const [, actions] = useRedux("user", { userMarkers });

  useEffect(() => {
    actions.userMarkers();
    return null;
  }, []);

  return (
    <>
      <Map />
    </>
  );
};

export default PersonalArea;
