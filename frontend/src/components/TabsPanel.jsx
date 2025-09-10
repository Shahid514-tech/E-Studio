import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Brain, CalendarDaysIcon, ClockIcon, RouteIcon } from "lucide-react";

export const TabsPanel = ({ paths }) => {
  // Helpers
  const ongoingPaths = paths.filter((path) => !path?.path?.isCourseCompleted);
  const completedPaths = paths.filter((path) => path?.path?.isCourseCompleted);

  const renderPathCard = (path, index) => (
    <div
      key={index}
      className="bg-zinc-900 relative p-6 rounded-4xl shadow-md hover:shadow-violet-500/20 border border-zinc-800 transition-all duration-200 w-full h-full flex flex-col justify-between"
    >
      {/* Title */}
      <h4 className="text-xl font-bold text-violet-400 mb-4 flex flex-row justify-start items-center gap-3">
        <RouteIcon className="w-5 h-5 text-white" />
        {path?.extracted?.USER_TOPIC}
      </h4>

      <Button
        variant="default"
        className="absolute top-4 right-4 p-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md border border-violet-200 shadow-[0_4px_12px_rgba(139,92,246,0.25)] hover:bg-violet-100/80 transition-all duration-200 ease-in-out cursor-pointer"
      >
        <ArrowUpRight className="w-5 h-5 text-violet-500 font-bold" />
      </Button>

      {/* Metadata */}
      <div className="text-sm text-gray-300 space-y-1 mb-4 text-left">
        <p className="flex flex-row items-center justify-start mb-1.5">
          <CalendarDaysIcon className="w-5 h-5 text-white mr-3" />
          <span className="font-medium text-white mr-1">Duration:</span>{" "}
          {path?.extracted?.USER_DAYS} days
        </p>
        <p className="flex flex-row items-center justify-start mb-1.5">
          <ClockIcon className="w-5 h-5 text-white mr-3" />
          <span className="font-medium text-white mr-1">Hours/Day:</span>{" "}
          {path?.extracted?.USER_HOURS_PER_DAY}
        </p>
        <p className="flex flex-row items-center justify-start mb-1.5">
          <Brain className="w-5 h-5 text-white mr-3" />
          <span className="font-medium text-white mr-1">Experience Level:</span>{" "}
          {path?.extracted?.USER_EXPERIENCE?.toUpperCase()}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-300 text-sm">Completion</span>
          <span className="text-gray-200 text-sm font-medium">45%</span>{" "}
          {/* Replace 45 with actual % */}
        </div>
        <div className="w-full h-3 bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all duration-300"
            style={{ width: "45%" }} // Replace with actual dynamic % later
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex items-start justify-center fixed top-[13rem] left-0 px-6 z-10">
      <div className="w-full h-[69%] bg-zinc-900 border-2 border-violet-600/50 rounded-xl p-4 overflow-hidden">
        <Tabs defaultValue="ongoing" className="w-full h-full flex flex-col">
          <TabsList className="bg-violet-900 gap-2 w-fit mb-2">
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>

          {/* Ongoing */}
          <TabsContent value="ongoing" className="w-full h-full flex-1">
            <Card className="w-full h-full flex flex-col">
              <CardHeader>
                <CardTitle>Ongoing Paths</CardTitle>
                <CardDescription>
                  Track your progress and resume your journey.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto space-y-4 w-full grid grid-cols-3 gap-4">
                {ongoingPaths.length > 0 ? (
                  ongoingPaths.map(renderPathCard)
                ) : (
                  <p className="text-gray-400">No ongoing paths found.</p>
                )}
              </CardContent>

              <CardFooter className="justify-end">
                <button className="text-sm text-violet-400 hover:underline">
                  View All →
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Completed */}
          <TabsContent value="completed" className="w-full h-full">
            <Card className="w-full h-full flex flex-col">
              <CardHeader>
                <CardTitle>Completed Paths</CardTitle>
                <CardDescription>
                  Great job! You&apos;ve mastered these.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {completedPaths.length > 0 ? (
                  completedPaths.map(renderPathCard)
                ) : (
                  <p className="text-gray-400">
                    You have no completed paths yet.
                  </p>
                )}
              </CardContent>

              <CardFooter />
            </Card>
          </TabsContent>

          {/* Archive (placeholder) */}
          <TabsContent value="archive" className="w-full h-full">
            <Card className="w-full h-full flex flex-col">
              <CardHeader>
                <CardTitle>Archived Paths</CardTitle>
                <CardDescription>
                  These are old or deleted learning paths.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <p className="text-gray-400">No archived paths found.</p>
              </CardContent>
              <CardFooter />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
