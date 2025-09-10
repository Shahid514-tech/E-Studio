import { dark } from "@clerk/themes";
import { UserButton } from "@clerk/clerk-react";
import { Home, SwatchBook } from "lucide-react";
import { NavLink } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useContext } from "react";
import { UserContext } from "@/components/data/UserContext";

export const Sidebar = () => {
  const { user } = useContext(UserContext);

  const navLinks = [
    {
      link: "/home",
      icon: <Home className="w-6 h-6" />,
      linkName: "Home",
    },
    {
      link: "/courses",
      icon: <SwatchBook className="w-6 h-6" />,
      linkName: "Courses",
    },
  ];

  return (
    <section className="bg-black h-full w-20 p-4 flex flex-col justify-center items-center">
      <section className="logo w-full h-max self-start text-violet-600 flex justify-center items-center">
        <img src="/logo.png" className="w-12 h-auto" />
      </section>
      <section className="sidebar h-full w-full flex flex-col justify-center items-center">
        <ul className="list-none flex flex-col justify-center items-center gap-3 w-full">
          {navLinks.map((navLink, index) => {
            return (
              <NavLink to={navLink.link} key={index}>
                {({ isActive }) => (
                  <div className="w-full h-auto flex flex-col justify-center items-center font-body gap-1">
                    <li
                      className={`flex flex-col w-12 h-12 items-center justify-center gap-1 text-sm 
                      transition-all duration-300 ease-in-out transform
                      ${
                        isActive
                          ? "text-violet-500 bg-violet-700/25 border-2 border-violet-500 rounded-4xl translate-y-0 opacity-100"
                          : "text-zinc-500 opacity-70 border-2 border-transparent"
                      }`}
                    >
                      {navLink.icon}
                    </li>
                  </div>
                )}
              </NavLink>
            );
          })}
        </ul>
      </section>
      <section className="profile flex justify-center items-center w-full h-max self-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer">
              <UserButton
                appearance={{
                  baseTheme: dark,
                  variables: {
                    colorPrimary: "#8b5cf6",
                    colorTextOnPrimary: "#ffffff",
                    colorBackground: "#0a0a0a",
                    colorInputBackground: "#111111",
                    colorAlphaShade: "#1c1c1e",
                    colorText: "#f9fafb",
                    colorTextSecondary: "#c4b5fd",
                    colorInputText: "#ffffff",
                    colorBorder: "#5b21b6",
                    colorShadow: "#00000088",
                    colorDanger: "#ef4444",
                    colorSuccess: "#22c55e",
                  },
                }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black">
            <p>{user?.fullName}</p>
          </TooltipContent>
        </Tooltip>
      </section>
    </section>
  );
};
