/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { getPaths } from "@/api/getPaths";
import { useUser } from "@clerk/clerk-react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        if (!isLoaded) return;

        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) throw new Error("User email not found");

        const data = await getPaths(email);
        setPaths(data?.paths || []);
      } catch (err) {
        console.error("Failed to load paths:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, [user, isLoaded]);

  return (
    <DataContext.Provider value={{ paths, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
