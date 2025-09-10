/* eslint-disable no-unused-vars */
import { updateCourseStatus } from "@/api/updateCourseStatus";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, CheckIcon, Clock } from "lucide-react";
import { memo, useEffect, useState } from "react";

// ✨ Framer Motion Variants
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 🎨 Level Badge
const LevelBadge = ({ level }) => {
  const colors = {
    Beginner: "bg-green-600",
    Intermediate: "bg-yellow-500",
    Advanced: "bg-red-600",
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full text-white font-medium ${
        colors[level] || "bg-gray-500"
      }`}
    >
      {level}
    </span>
  );
};

// 💎 Course Card
const CourseCard = ({ course, onCourseStart, handleCourseOpen }) => {
  const { id, title, description, level, isStarted, isCompleted } = course;

  const [started, setStarted] = useState(isStarted);

  const status = isCompleted ? "Completed" : started ? "In Progress" : "Queued";

  const handleStartCourse = async () => {
    if (started) {
      // Logic to continue the course
      console.log(`Continuing course: ${title}`);
    } else {
      const response = await updateCourseStatus({ courseId: id });
      if (response) {
        setStarted(true);
        onCourseStart?.(id); // 👈 update global state
        console.log(`Started course: ${title}`);
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      transition={{ type: "tween" }}
      className="min-h-[200px] w-full p-4 rounded-xl bg-white backdrop-blur-sm border border-white/20 shadow-md text-black flex flex-col justify-between font-body"
      onClick={() => handleCourseOpen({ course })}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold truncate w-3/4 font-heading">
            {title}
          </h3>
          <LevelBadge level={level} />
        </div>
        <p className="text-sm text-zinc-300 line-clamp-2">{description}</p>
        <p className="text-xs text-zinc-400 mt-1">Status: {status}</p>
      </div>
      <div className="mt-4 flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-center items-center gap-2 text-black/70 font-body text-sm">
          <Clock className="w-5 h-5" />
          <p>Hours Required: {course.hoursRequired} hours</p>
        </div>
        {isCompleted ? (
          <Button
            disabled
            variant="secondary"
            className="text-green-400 cursor-pointer"
          >
            <CheckIcon className="w-4 h-4 mr-1" /> Completed
          </Button>
        ) : (
          <Button
            variant="default"
            className="bg-violet-600 hover:bg-violet-700 cursor-pointer"
            onClick={handleStartCourse}
          >
            <PlayIcon className="w-4 h-4 mr-1" />
            {started ? "Continue" : "Start"}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

// 📚 Animated Course List
const CourseList = ({ courses, onCourseStart, handleCourseOpen }) => (
  <AnimatePresence>
    <motion.div
      className="flex flex-col gap-4 w-full"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={listVariants}
    >
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onCourseStart={onCourseStart}
          handleCourseOpen={handleCourseOpen}
        />
      ))}
    </motion.div>
  </AnimatePresence>
);

// 🚀 Main Tabs Component
function CourseTabs({ paths, handleCourseOpen }) {
  const [courses, setCourses] = useState([]);

  // Filtered Lists
  const activeCourses = courses.filter((c) => c.isStarted && !c.isCompleted);
  const completedCourses = courses.filter((c) => c.isCompleted);
  const queuedCourses = courses.filter((c) => !c.isStarted && !c.isCompleted);

  const handleCourseStart = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, isStarted: true } : course
      )
    );
  };

  useEffect(() => {
    const allPaths = paths.map((path) => ({
      id: path?._id,
      title: path?.path?.courseName,
      description: path?.path?.description,
      level: path?.path?.level,
      isStarted: path?.path?.isCourseStarted,
      isCompleted: path?.path?.isCourseCompleted,
      hoursRequired: path?.path?.summary?.total_hours_required,

      // Add the complete structure needed by your preview component
      summary: path?.path?.summary || {},
      schedule: path?.path?.schedule || {},
      suggestion: path?.path?.suggestion,
    }));
    setCourses(allPaths);
  }, [paths]);

  return (
    <Tabs
      defaultValue="active"
      className="w-full h-[90%] min-h-[90%] flex flex-col justify-start items-center box-border"
    >
      <TabsList className="w-full h-10 grid grid-cols-4 bg-violet-700/10 backdrop-blur-sm rounded-lg p-1 mb-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="queued">Queued</TabsTrigger>
      </TabsList>

      <div className="flex-1 w-full h-full overflow-y-auto p-4 bg-violet-700/10 backdrop-blur-md rounded-xl border border-white/10 shadow-sm inset-shadow-lg">
        <TabsContent value="all">
          <CourseList
            courses={courses}
            onCourseStart={handleCourseStart}
            handleCourseOpen={handleCourseOpen}
          />
        </TabsContent>
        <TabsContent value="active">
          <CourseList
            courses={activeCourses}
            onCourseStart={handleCourseStart}
            handleCourseOpen={handleCourseOpen}
          />
        </TabsContent>
        <TabsContent value="completed">
          <CourseList
            courses={completedCourses}
            onCourseStart={handleCourseStart}
            handleCourseOpen={handleCourseOpen}
          />
        </TabsContent>
        <TabsContent value="queued">
          <CourseList
            courses={queuedCourses}
            onCourseStart={handleCourseStart}
            handleCourseOpen={handleCourseOpen}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default memo(CourseTabs);
