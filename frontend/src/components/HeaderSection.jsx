import { useEffect, useState } from "react";

const HeaderSection = ({ user }) => {
  const [currentDate, setCurrentDate] = useState({
    day: "",
    date: "",
  });

  useEffect(() => {
    const dateObj = new Date();

    const day = dateObj.getDate();
    const weekday = dateObj.toLocaleDateString("en-GB", { weekday: "long" });
    const monthYear = dateObj.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });

    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    const formattedDate = `${day}${suffix} ${monthYear}`;

    setCurrentDate({
      day: weekday,
      date: formattedDate,
    });
  }, []);

  return (
    <section className="w-full bg-transparent h-40 flex flex-row justify-between items-start px-6 py-4 rounded-t-lg box-border">
      <div className="user-header">
        <h1 className="text-3xl font-semibold font-heading bg-gradient-to-r from-violet-500 via-violet-400 to-violet-600 text-transparent bg-clip-text">
          Welcome back!
        </h1>

        <h2 className="text-xl text-gray-800 mt-1 font-body">
          {user?.fullName}
        </h2>
      </div>
      <div className="date text-right text-md text-violet-700 font-medium mt-2 font-body flex flex-col justify-center items-end gap-1">
        <p className="bg-violet-700/20 p-1 rounded-4xl px-3">
          {currentDate.date}
        </p>
        <p className="bg-violet-700/20 p-1 rounded-4xl px-3">
          {currentDate.day}
        </p>
      </div>
    </section>
  );
};

export default HeaderSection;
