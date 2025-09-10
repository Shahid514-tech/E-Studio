import { useContext } from "react";
import { DataContext } from "@/components/data/DataContext";
import { UserContext } from "@/components/data/UserContext";
import HeaderSection from "@/components/HeaderSection";
import { PathPage } from "./PathPage";

export const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const { paths, loading, error } = useContext(DataContext);
  const { user } = useContext(UserContext);

  if (loading) {
    return (
      <section className="loader w-full h-full bg-transparent text-violet-800 flex flex-col justify-center items-center">
        <p className="text-xl font-body font-medium">
          Fetching your learning paths... 🚀
        </p>
      </section>
    );
  }
  if (error) {
    return (
      <section className="loader w-full h-full bg-transparent text-red-600 flex flex-col justify-center items-center">
        <p className="text-xl font-body font-medium">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="w-full h-full bg-transparent p-1 flex flex-col justify-center items-center rounded-lg">
      <HeaderSection user={user} />
      <section className="w-full bg-transparent h-full">
        <PathPage />
      </section>
      {/* <h1>Your Learning Paths</h1>
      {paths.map((path) => (
        <div key={path.id} className="text-black">
          {path?.extracted?.USER_TOPIC}
        </div>
      ))} */}
    </section>
  );
};
