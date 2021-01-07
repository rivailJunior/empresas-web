import Context from "./context";
import {useAccessContext} from './useAccessContext';

const StoreProvider = ({children}) => {
  const useAccessContextValue = useAccessContext();
  return <Context.Provider value={useAccessContextValue}>{children}</Context.Provider>;
};

export default StoreProvider;
