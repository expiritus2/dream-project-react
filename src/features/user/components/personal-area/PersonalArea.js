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
      <div>Personal Area</div>
      <Map />
    </>
  );
};

export default PersonalArea;
