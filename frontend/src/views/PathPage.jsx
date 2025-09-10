import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { sendPrompt } from "@/api/sendPrompt";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

const EXPERIENCE_LEVELS = ["beginner", "refresher", "professional"];

export const PathPage = () => {
  const [prompt, setPrompt] = useState("");
  const [days, setDays] = useState(30);
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [experience, setExperience] = useState("beginner");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert("Please enter a topic to learn.");
      return;
    }

    const finalPrompt = `I want to learn ${prompt.trim()} in ${days} days, ${hoursPerDay} hours/day as a ${experience}.`;
    setLoading(true);

    try {
      const response = await sendPrompt({ prompt: finalPrompt, email: user?.primaryEmailAddress?.emailAddress });
      // Check if response includes a message, and fallback if it doesn't
      if (response?.success) {
        console.log("Backend response:", response?.id);
        navigate("/courses");
      } else {
        console.warn("No message field in response:", response);
      }
    } catch (error) {
      console.error("Submission error:", error.message || error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-full rounded-xl bg-zinc-950 text-white font-body px-6 py-10 gap-10 relative">
      {isLoading ? (
        <section className="absolute top-0 left-0 w-full h-full bg-zinc-950 flex justify-center items-center">
          <h1 className="text-3xl font-heading font-bold text-white">Creating your Learning Path...</h1>
        </section>
      ) : (
        <div className="w-full max-w-3xl bg-zinc-900 border-2 border-violet-600/40 backdrop-blur rounded-xl p-6 shadow-[0_0_20px_#8b5cf633]">
          <h1 className="text-3xl font-heading font-bold text-violet-400 mb-4">
            Generate Your Personalized Path
          </h1>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to learn... or leave blank and use the tags below."
            className="bg-zinc-800 border border-violet-500/30 placeholder:text-gray-400 text-white resize-none focus:ring-2 focus:ring-violet-500"
            rows={5}
          />

          {/* Tag Controls */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-violet-300 font-medium">
                Duration (days)
              </label>
              <Input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="bg-zinc-800 border border-violet-500/30 text-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-violet-300 font-medium">
                Hours / Day
              </label>
              <Input
                type="number"
                min={1}
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                className="bg-zinc-800 border border-violet-500/30 text-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-violet-300 font-medium">
                Experience Level
              </label>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_LEVELS.map((level) => (
                  <Button
                    key={level}
                    variant="outline"
                    onClick={() => setExperience(level)}
                    className={cn(
                      "text-sm px-4 py-1 border-2 border-violet-700/80 rounded-lg hover:text-white cursor-pointer",
                      experience === level
                        ? "bg-violet-600/30 backdrop-blur-md border border-violet-500/30 text-white hover:bg-violet-600/20"
                        : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                    )}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-right w-full flex flex-row justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded-lg flex flex-row justify-center items-center gap-2 shadow-[0_4px_24px_rgba(139,92,246,0.25)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.3)] transition-all duration-200"
            >
              Generate Path
              <span className="inline-block">🚀</span>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};
