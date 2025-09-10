import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "@/routes/router";
import { dark } from "@clerk/themes";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#8b5cf6", // Violet-500
          colorText: "#f9fafb", // Bright text on dark
          colorBackground: "#0a0a0a", // Deep black background
          colorInputBackground: "#111111", // Inputs stay in theme
          colorBorder: "#5b21b6", // Subtle violet accent
          colorTextOnPrimary: "#ffffff", // White text on buttons
          fontFamily: "Sora, Inter, sans-serif", // Consistent font
        },
      }}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
