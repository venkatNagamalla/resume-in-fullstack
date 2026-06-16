import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "./Headers";
import Footer from "./Footer";

const Home = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderHome = () => (
    <div className="min-h-screen">
      <section className="px-6 py-24 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 border border-[#2e2e4e5a] rounded-full px-4 py-1.5 text-xs text-[#534AB7] mb-8">
          <span>✨</span>
          <span>Powered by Gemini AI</span>
        </div>

        <h1 className="text-5xl font-medium text-black leading-tight mb-6 tracking-tight">
          Your resume, <span className="text-[#B500B2]">analyzed</span>
          <br />
          by AI in seconds
        </h1>

        <p className="text-base text-gray-800 leading-relaxed max-w-xl mx-auto mb-10">
          Upload your PDF resume and instantly get a score, detected skills,
          strengths, weaknesses and actionable suggestions to land your dream
          job.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#B500B2] hover:bg-[#4238a0] text-white px-8 py-3 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            🚀 Analyze my resume
          </button>
          <button
            onClick={() => navigate("/past-analyses")}
            className="border border-[#1e1e2e] text-black px-8 py-3 rounded-xl text-sm transition cursor-pointer"
          >
            View past analyses →
          </button>
        </div>
      </section>

      <section className="border-t border-b border-[#1e1e2e]">
        <div className="max-w-3xl mx-auto grid grid-cols-3">
          {[
            { num: "10K+", label: "Resumes analyzed" },
            { num: "98%", label: "Accuracy rate" },
            { num: "4.9", label: "User rating" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="py-10 text-center border-r border-[#1e1e2e] last:border-r-0"
            >
              <p className="text-3xl font-medium text-[#B500B2] mb-1">{num}</p>
              <p className="text-xs text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-3 py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-[#B500B2] uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-2xl font-medium text-black">
            Everything you need to improve your resume
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              icon: "🤖",
              title: "AI Analysis",
              desc: "Deep resume analysis powered by Google Gemini AI",
            },
            {
              icon: "📊",
              title: "Score & Insights",
              desc: "Get a score out of 10 with detailed section breakdown",
            },
            {
              icon: "⚡",
              title: "Instant Results",
              desc: "Full analysis delivered in under 10 seconds",
            },
            {
              icon: "🛠️",
              title: "Skills Detection",
              desc: "Automatically detects all your technical skills",
            },
            {
              icon: "💡",
              title: "Suggestions",
              desc: "Actionable tips to make your resume stand out",
            },
            {
              icon: "📁",
              title: "Past Analysis",
              desc: "Track all your past analyses in one place",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="border border-[#1e1e2e71] hover:border-[#534AB7] rounded p-5 transition"
            >
              <div className="w-10 h-10 bg-[#adadc43b] rounded-xl flex items-center justify-center mb-4 text-lg">
                {icon}
              </div>
              <p className="text-sm font-medium text-black mb-1">{title}</p>
              <p className="text-xs text-gray-800 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 border-t border-[#1e1e2e]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-[#B500B2] uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="text-2xl font-medium text-black">
              3 simple steps to a better resume
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                step: "01",
                title: "Upload your resume",
                desc: "Upload your resume in PDF format. Max 5MB.",
                icon: "📂",
              },
              {
                step: "02",
                title: "AI analyzes it",
                desc: "Gemini AI reads your resume and extracts insights.",
                icon: "🤖",
              },
              {
                step: "03",
                title: "Get your results",
                desc: "Receive your score, skills, strengths and suggestions.",
                icon: "📊",
              },
            ].map(({ step, title, desc, icon }) => (
              <div
                key={step}
                className="border border-[#1e1e2e] rounded-2xl p-6 flex items-center gap-6"
              >
                <div className="w-12 h-12 bg-[#adadc43b] rounded-xl flex items-center justify-center text-xl shrink-0">
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black mb-1">{title}</p>
                  <p className="text-xs text-gray-800 leading-relaxed">
                    {desc}
                  </p>
                </div>
                <span className="text-3xl font-medium text-[#1e1e2e]">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-[#1e1e2e]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-medium text-black mb-4">
            Ready to improve your resume?
          </h2>
          <p className="text-sm text-gray-800 mb-8">
            Join thousands of job seekers who got their dream job with ResumeIn
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#B500B2] hover:bg-[#4238a0] text-white px-10 py-3 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            Get started for free →
          </button>
        </div>
      </section>
    </div>
  );

  return (
    <>
      <Headers />
      {renderHome()}
      <Footer />
    </>
  );
};

export default Home;
