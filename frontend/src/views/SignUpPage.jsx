import { SignUp } from "@clerk/clerk-react";

export const SignUpPage = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-zinc-900">
      <SignUp
        forceRedirectUrl={import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL}
        fallbackRedirectUrl={
          import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL
        }
      />
    </main>
  );
};
