import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  role: 'student' | 'company' | null;
  email: string;
  // Add any other user properties you need
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulating fetching user data from an API or authentication state
    const fetchUser = async () => {
      const loggedInUser: User = {
        email: 'example@bt.iitr.ac.in', // Change this email to simulate different users
        role: null,
      };

      if (loggedInUser.email.endsWith('@bt.iitr.ac.in')) {
        loggedInUser.role = 'student';
      } else if (loggedInUser.email.endsWith('@gmail.com')) {
        loggedInUser.role = 'company';
      }

      setUser(loggedInUser);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
