import { get } from "lodash-es";

export const getMappedState = (state, mapState) => {
  if (typeof mapState === "string" && mapState) return get(state, mapState);
  if (typeof mapState === "function") return mapState(state);

  if (Array.isArray(mapState)) {
    return mapState.map(mapStateItem => {
      const stateValue = get(state, mapStateItem);
      if (typeof stateValue === "string") return stateValue;
      if (Array.isArray(stateValue)) return [...stateValue];
      return { ...stateValue };
    });
  }

  return null;
};
