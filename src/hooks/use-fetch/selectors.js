import { getQueryParam, setQueryParam } from "./utils";

export const getUrlParams = (query, location, options) => {
  const { filter, sort, range, include } = query;
  const { shouldListenToSearch, usePagination } = options;

  const params = shouldListenToSearch
    ? new URLSearchParams(location.search)
    : new URLSearchParams();

  if (shouldListenToSearch) {
    const defaultRange = usePagination ? [0, 10] : null;

    const filterQuery = getQueryParam(params, "filter", {});
    const sortQuery = getQueryParam(params, "sort");
    const rangeQuery = getQueryParam(params, "range", defaultRange);
    const includeQuery = getQueryParam(params, "include");

    if (filter && Object.keys(filter).length) {
      Object.keys(filter).forEach(key => {
        if (!filterQuery[key]) filterQuery[key] = filter[key];
      });
    }

    setQueryParam(params, "filter", filter, filterQuery);
    setQueryParam(params, "sort", sort, sortQuery);
    setQueryParam(params, "range", range, rangeQuery);
    setQueryParam(params, "include", include, includeQuery);
  } else {
    setQueryParam(params, "filter", filter);
    setQueryParam(params, "sort", sort);
    setQueryParam(params, "range", range);
    setQueryParam(params, "include", include);
  }

  return params.toString();
};
