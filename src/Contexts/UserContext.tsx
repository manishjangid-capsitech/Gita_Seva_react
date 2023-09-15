import React, { useState } from "react";

interface IUser {
  id: string;
  name: string;
}

interface IUserContextProps {
  currentUser: IUser | null;
  isLoggedIn: () => boolean;
  logout: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  itemColored: boolean;
  setItemColored: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  phoneModel: boolean;
  setPhoneModel: React.Dispatch<React.SetStateAction<boolean>>;
  fav: boolean;
  setFav: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = React.createContext<IUserContextProps>({} as any);

export function UserProvider(props: { children: any }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [itemColored, setItemColored] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [phoneModel, setPhoneModel] = useState<boolean>(false);
  const [fav, setFav] = useState<boolean>(false);

  const isLoggedIn = () => (currentUser && currentUser.id ? true : false);
  const logout = () => {
    setCurrentUser(null);
  };

  React.useEffect(() => {
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoaded) return null;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        logout,
        setCurrentUser,
        isSelected,
        setIsSelected,
        itemColored,
        setItemColored,
        isOpen,
        setIsOpen,
        phoneModel,
        setPhoneModel,
        fav,
        setFav,
      }}
      {...props}
    />
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}
