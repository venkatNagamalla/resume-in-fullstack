import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Headers from "./Headers";
import Result from "./Result";
import Footer from "./Footer";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Report = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [data, setData] = useState("");

  const getData = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const url = `https://resume-in-backend.onrender.com/resume/past-analyses/${resumeId}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      return setApiStatus(apiStatusConstants.failure);
    }
    const data = await response.json();
    setApiStatus(apiStatusConstants.success);
    setData(data.resumeData);
  };

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderLoader = () => (
    <div className="bg-white border border-gray-200 rounded p-10 text-center shadow-sm">
      <p className="text-gray-800 text-sm">⏳ Loading your analyses...</p>
    </div>
  );

  const renderFailure = () => (
    <div className="bg-red-50 flex flex-col justify-center items-center py-5 border border-red-200 rounded px-4">
      <p className="text-red-500 text-sm">⚠️ Something went wrong!</p>
      <button
        onClick={getData}
        className="border border-red-500 text-red-500 text-xs px-1 py-1 mt-2 rounded cursor-pointer"
      >
        Try Again!
      </button>
    </div>
  );

  const renderSuccess = () => {
    const { fileName, analysis, createdAt } = data;
    const {
      improvements,
      score,
      sectionScores,
      skills,
      strengths,
      weaknesses,
      suggestions,
      summary,
    } = analysis;

    const getScoreColor = (score) => {
      if (score >= 80) return "text-green-600";
      if (score >= 60) return "text-yellow-400";
      return "text-red-500";
    };

    const getScoreBg = (score) => {
      if (score >= 80) return "border-green-600";
      if (score >= 60) return "border-yellow-400";
      return "border-red-400";
    };

    const getScoreLabel = (score) => {
      if (score >= 80) return "🔥 Excellent Resume!";
      if (score >= 60) return "👍 Good Resume!";
      return "⚠️ Needs Improvement";
    };

    return (
      <div className="max-w-2xl p-2 md:p-0 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-black mb-1">
            Analysis Result
          </h1>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800 mb-1">
              {data.fileName}
            </p>
            <p className="text-xs text-gray-600">
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              {new Date(data.createdAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded hover:border-[#B500B2] p-6 mb-4 flex flex-col md:flex-row items-center gap-6">
          <div
            className={`w-24 h-24 rounded-full border-4 ${getScoreBg(score)} bg-gray-50 flex flex-col items-center justify-center shrink-0`}
          >
            <span
              className={`text-3xl font-bold leading-none ${getScoreColor(score)}`}
            >
              {score}
            </span>
            <span className="text-xs text-gray-800">/100</span>
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800 mb-2">
              {getScoreLabel(score)}
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">{summary}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded hover:border-[#B500B2] p-6 mb-4 shadow-md">
          <p className="text-sm font-semibold text-gray-black mb-4">
            📊 Section Scores
          </p>
          <div className="flex flex-col gap-4">
            {Object.entries(sectionScores).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-800 uppercase">{key}</span>
                  <span className="text-[#534AB7] font-medium">{value}/10</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#B500B2]"
                    style={{ width: `${value * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border hover:border-[#B500B2] border-gray-200 rounded p-6 mb-4 shadow-md">
          <p className="text-sm font-semibold text-black mb-4">
            🛠️ Skills Detected
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-[#EEEDFE] text-[#534AB7] text-xs px-3 py-1.5 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded p-5 hover:border-[#B500B2] shadow-md">
            <p className="text-sm font-semibold text-green-600 mb-3">
              ✅ Strengths
            </p>
            <div className="flex flex-col gap-2">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                  <p className="text-sm text-gray-800 leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded p-5 shadow-md hover:border-[#B500B2]">
            <p className="text-sm font-semibold text-yellow-500 mb-3">
              ⚠️ Weaknesses
            </p>
            <div className="flex flex-col gap-2">
              {weaknesses.map((w, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                  <p className="text-sm text-gray-800 leading-relaxed">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded hover:border-[#B500B2] p-6 mb-4 shadow-sm">
          <p className="text-sm font-semibold text-black mb-4">
            💡 Suggestions
          </p>
          <div className="flex flex-col gap-3">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#EEEDFE] rounded-full flex items-center justify-center text-[10px] text-[#534AB7] font-semibold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded hover:border-[#B500B2] p-6 mb-6 shadow-sm">
          <p className="text-sm font-semibold text-black mb-4">
            🚀 Improvements
          </p>
          <div className="flex flex-col gap-3">
            {improvements.map((imp, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#534AB7] font-bold shrink-0">→</span>
                <p className="text-sm text-gray-800 leading-relaxed">{imp}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-[#B500B2] hover:bg-[#4238a0] text-white py-3 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            Analyze Another Resume
          </button>
          <button
            onClick={() => navigate("/past-analyses")}
            className="w-full bg-white border border-gray-200 hover:border-[#B500B2] hover:text-[#B500B2] text-gray-800 py-3 rounded-xl text-sm transition cursor-pointer shadow-sm"
          >
            View Past Analyses →
          </button>
        </div>
      </div>
    );
  };
  const renderSwitch = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader();
      case apiStatusConstants.failure:
        return renderFailure();
      case apiStatusConstants.success:
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <>
      <Headers />
      <div className="mt-16 min-h-screen md:mt-24">{renderSwitch()}</div>
      <Footer />
    </>
  );
};

export default Report;
