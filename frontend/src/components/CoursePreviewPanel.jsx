/* eslint-disable no-unused-vars */
import { Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pin, FileText, Rocket } from "lucide-react";

const CoursePreviewPanel = ({ course }) => {
  if (!course) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-4 text-zinc-500 font-body">
        <p className="text-lg">🧐 No course selected.</p>
        <p className="text-sm italic">
          Select a course to view its schedule and details.
        </p>
      </div>
    );
  }

  const {
    title,
    description,
    level,
    summary,
    schedule,
    suggestion,
    isCourseCompleted,
    isCourseStarted,
  } = course;

  return (
    <div className="w-full h-full box-border px-6 py-3 flex flex-col gap-4 items-center justify-between font-body relative rounded-tr-lg rounded-br-lg">
      <div className="w-full h-60 flex flex-col gap-3 right-0 bg-white z-10 rounded-tr-lg">
        {/* Title & Level */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold font-heading">{title}</h2>
          <p className="text-sm text-zinc-500">{level}</p>
        </div>

        {/* Description */}
        <p className="text-base text-zinc-600 line-clamp-3">{description}</p>

        {/* Summary */}
        <div className="w-full p-2 flex flex-row items-center justify-between gap-4 text-sm text-zinc-700">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Total Hours: {summary?.total_hours_required ?? "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              Your Available: {summary?.user_total_available_hours ?? "N/A"}
            </span>
          </div>
          {summary?.fits_in_schedule !== undefined && (
            <span
              className={
                summary.fits_in_schedule ? "text-green-600" : "text-red-600"
              }
            >
              {summary.fits_in_schedule
                ? "Fits in your schedule ✅"
                : "May need adjustment ❌"}
            </span>
          )}
        </div>

        {/* Suggestion */}
        {suggestion && (
          <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
            💡 {suggestion}
          </div>
        )}
      </div>

      <div className="w-full h-8 bg bg-white">
        <h3 className="text-lg font-semibold w-full">📆 Day-wise Plan</h3>
      </div>

      {/* Schedule */}
      <div className="w-full h-32 bg-white flex-1 relative flex flex-col gap-4">
        <div className="w-full p-4 h-full bg-violet-50 rounded-lg shadow-sm overflow-y-auto">
          {schedule && Object.keys(schedule).length > 0 ? (
            Object.entries(schedule).map(([day, topics], index) => (
              <Accordion
                type="single"
                collapsible
                key={day}
                className="mb-4 rounded-2xl shadow-sm border border-violet-200 bg-white/90 backdrop-blur-sm"
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-none p-2"
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-violet-800 hover:bg-violet-100/70 rounded-xl transition-colors duration-200">
                    {day}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4 space-y-4 bg-white rounded-b-2xl">
                    {topics.map((topic) => (
                      <Card
                        key={topic.phaseId}
                        className="border border-violet-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-white"
                      >
                        <CardHeader>
                          <CardTitle className="text-black font-bold font-heading text-lg">
                            {topic.topic}
                          </CardTitle>
                          <CardDescription className="line-clamp-2 text-sm text-black/50">
                            {topic.phaseSummary}
                          </CardDescription>
                          <div
                            className={`mt-1 w-max text-xs font-medium uppercase tracking-wide inline-block px-2 py-1 rounded-full
                                ${
                                  topic.difficulty.toLowerCase() === "beginner"
                                    ? "bg-green-100 text-green-700"
                                    : topic.difficulty.toLowerCase() ===
                                      "intermediate"
                                    ? "bg-amber-100 text-amber-700"
                                    : topic.difficulty.toLowerCase() ===
                                      "advanced"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-violet-100 text-violet-700"
                                }`}
                          >
                            {topic.difficulty}
                          </div>
                        </CardHeader>
                        <CardContent
                          className={
                            "flex flex-row flex-wrap items-center justify-between"
                          }
                        >
                          <p className="text-violet-800">{topic.phase}</p>
                          <p
                            className={`text-xs italic flex items-center gap-1
                            ${topic.importance.toLowerCase() === "core" ? "font-semibold" : ""}
                            ${topic.importance.toLowerCase() === "advanced" ? "tracking-wide" : ""}`}
                          >
                            {topic.importance.toLowerCase() === "core" && (
                              <Pin size={14} className="shrink-0" />
                            )}
                            {topic.importance.toLowerCase() === "optional" && (
                              <FileText size={14} className="shrink-0" />
                            )}
                            {topic.importance.toLowerCase() === "advanced" && (
                              <Rocket size={14} className="shrink-0" />
                            )}
                            {topic.importance}
                          </p>
                        </CardContent>
                        <CardFooter className="flex flex-wrap items-center gap-2">
                          {topic.skillsLearned.map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-violet-100/50 border-2 border-violet-900/60 text-violet-900 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </CardFooter>
                      </Card>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          ) : (
            <p className="text-sm text-zinc-500 italic">
              No schedule available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewPanel;
