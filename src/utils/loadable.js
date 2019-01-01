import loadable from "react-loadable";
import { Spinner } from "components";

export default componentImport =>
  loadable({ loader: componentImport, loading: Spinner });
