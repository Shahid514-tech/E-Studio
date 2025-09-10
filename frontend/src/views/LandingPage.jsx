import { useNavigate } from "react-router";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main className="landing-page w-full h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-body">
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-black to-black z-0" />
      <div className="absolute w-72 h-72 bg-violet-600 blur-[120px] opacity-30 rounded-full top-[-5%] left-[-5%] z-0 animate-pulse" />
      <div className="absolute w-96 h-96 bg-violet-500 blur-[150px] opacity-20 rounded-full bottom-[-10%] right-[-10%] z-0 animate-pulse" />

      {/* Heading */}
      <section className="z-10 text-center mb-12" data-aos="fade-up" data-aos-duration="1000">
        <h1 className="text-5xl font-heading font-extrabold tracking-tight mb-4 text-violet-400 drop-shadow-md">
          Welcome to <span className="text-white">UpRoute</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-xl mx-auto font-body">
          Personalized learning paths, just for you. Accelerate your growth with curated milestones and tracked progress.
        </p>
      </section>

      {/* Auth Cards */}
      <section className="z-10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8 px-4" data-aos="fade-up" data-aos-duration="1200">
        {/* Sign In */}
        <div className="backdrop-blur-lg border-2 border-violet-500/40 bg-white/5 p-8 rounded-2xl shadow-lg flex flex-col items-center font-body">
          <h2 className="text-xl font-semibold text-white mb-2">Already on your path?</h2>
          <p className="text-sm text-gray-300 text-center mb-4">Sign in to continue your learning journey and pick up where you left off.</p>
          <button type="button" className="mt-2 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-full transition" onClick={() => navigate('/sign-in')}>
              Sign In
          </button>
        </div>

        {/* Sign Up */}
        <div className="backdrop-blur-lg border-2 border-violet-500/40 bg-white/5 p-8 rounded-2xl shadow-lg flex flex-col items-center font-body">
          <h2 className="text-xl font-semibold text-white mb-2">New to UpRoute?</h2>
          <p className="text-sm text-gray-300 text-center mb-4">Create your account and get a personalized roadmap to master your goals.</p>
          <button type="button" className="mt-2 px-6 py-2 bg-white text-violet-700 hover:bg-gray-200 font-medium rounded-full transition" onClick={() => navigate('/sign-up')}>
              Sign Up
          </button>
        </div>
      </section>
    </main>
  );
};
