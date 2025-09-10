import AnimatedTabsDemo from "@/components/Tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { DataContext } from "@/components/data/DataContext";
import { useContext, useState } from "react";
import CoursePreviewPanel from "@/components/CoursePreviewPanel";


export const Courses = () => {
  const { paths, loading, error } = useContext(DataContext);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseOpen = (course) => {
    console.log(`Opening course: ${course.title}`);
    setSelectedCourse(course);
  };

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
        <p className="text-xl font-body font-medium">{error}</p>
      </section>
    );
  }
  return (
    <section className="courses w-full h-full bg-transparent rounded-lg font-body flex flex-row justify-center items-center text-black">
      <section className="w-[40%] h-full bg-violet-50 rounded-l-lg p-3 flex flex-col justify-center items-center gap-6 box-border">
        <div className="flex flex-row justify-between items-center w-full h-[10%]">
          <h1 className="text-black font-heading font-bold text-2xl block w-full h-full">
            Courses
          </h1>
          <Button
            variant={"default"}
            className={
              "bg-white h-10 w-auto hover:bg-violet-300 cursor-pointer"
            }
          >
            <Search className="w-4 h-4 text-black" />
          </Button>
        </div>
        <AnimatedTabsDemo
          className={"w-full h-[90%]"}
          paths={paths}
          handleCourseOpen={handleCourseOpen}
        />
      </section>
      <section className="w-[60%] h-full bg-white rounded-r-lg">
          <CoursePreviewPanel course={selectedCourse?.course} />
      </section>
    </section>
  );
};
