import "./App.css";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { LandingPage } from "@/views/LandingPage";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { RedirectIfAuthenticated } from "@/components/auth/RedirectIfAuthenticated";
import { Protect } from "@clerk/clerk-react";
import { Sidebar } from "@/components/Sidebar";
import { UserProvider } from "@/components/data/UserContext";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* Show LandingPage for signed-out users */}
      <SignedOut>
        <LandingPage />
      </SignedOut>

      {/* Show nested routes for signed-in users */}
      <SignedIn>
        <RedirectIfAuthenticated />
        <main className="min-h-screen h-screen flex flex-row items-center justify-between bg-black w-full p-2 gap-1.5">
          {/* Sidebar */}
          <UserProvider>
            <Sidebar />
          </UserProvider>

          {/* Main Section */}
          <section className="h-full w-full bg-white rounded-lg p-2">
            <Protect fallback={() => navigate("/")}>
              <UserProvider>
                <Outlet />
              </UserProvider>
            </Protect>
          </section>
        </main>
      </SignedIn>
    </>
  );
}

export default App;
