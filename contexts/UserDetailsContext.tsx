"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LoginUserDetails } from "@/utils/types";

// User details type based on your signup fields
// export type UserDetails = {
//   id?: string;
//   username: string;
//   fullName: string;
//   phone_number: string;
//   email: string;
//   avatar?: string;
// };

// Context type with user details and helper functions
interface UserDetailsContextType {
  user: LoginUserDetails | null;
  setUserDetails: (details: LoginUserDetails) => void;
  clearUserDetails: () => void;
  isLoading: boolean;
}

const USER_STORAGE_KEY = "userDetails";

// Create context with default values
const UserDetailsContext = createContext<UserDetailsContextType | undefined>(
  undefined,
);

// Provider component
export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginUserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user details from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user details from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user details to localStorage and state
  const setUserDetails = (details: LoginUserDetails) => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(details));
      setUser(details);
    } catch (error) {
      console.error("Error saving user details to localStorage:", error);
    }
  };

  // Clear user details from localStorage and state
  const clearUserDetails = () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Error clearing user details from localStorage:", error);
    }
  };

  return (
    <UserDetailsContext.Provider
      value={{
        user,
        setUserDetails,
        clearUserDetails,
        isLoading,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

// Custom hook to use the user details context
export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (context === undefined) {
    throw new Error("useUserDetails must be used within a UserDetailsProvider");
  }
  return context;
};

export default UserDetailsContext;
