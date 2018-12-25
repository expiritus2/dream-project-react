import loadable from "react-loadable";
import Spinner from "components/spinner";

export default componentImport =>
  loadable({ loader: componentImport, loading: Spinner });
