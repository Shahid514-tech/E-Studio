import { SignIn } from "@clerk/clerk-react";

export const SingInPage = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-zinc-900">
      <SignIn
        forceRedirectUrl={import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL}
        fallbackRedirectUrl={import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL}
      />
    </main>
  );
};
