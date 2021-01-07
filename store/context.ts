import { UserAccess } from './loginInterfaces';
import { createContext } from "react";
import { userDefaultValue } from './initialInterfaceValues';

const StoreContext = createContext<UserAccess>(userDefaultValue);

export default StoreContext;
