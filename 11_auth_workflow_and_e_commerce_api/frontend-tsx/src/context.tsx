import axios from "axios";
import {
  useContext,
  useState,
  useEffect,
  createContext,
  useCallback,
} from "react";

const AppContext = createContext<IAppContext | null>(null);

type TAppContextProviderProps = {
  children: React.ReactNode;
};

export default function AppContextProvider({
  children,
}: TAppContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<IUser | null>(null);

  const saveUser = (user: IUser) => setUser(user);

  const removeUser = () => setUser(null);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/showMe`);
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  }, []);

  const logoutUser = async () => {
    try {
      await axios.delete("/api/v1/auth/logout");
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};
