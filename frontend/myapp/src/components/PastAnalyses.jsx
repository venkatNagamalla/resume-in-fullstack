import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Headers from "./Headers";
import Footer from "./Footer";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const PastAnalyses = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [history, setHistory] = useState([]);

  const getPastAnalysis = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const url = "https://resume-in-backend.onrender.com/resume/past-analyses";
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
    setHistory(data.history);
  };

  useEffect(() => {
    getPastAnalysis();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const renderLoader = () => (
    <div className="bg-white border border-gray-200 rounded p-10 text-center shadow-sm">
      <p className="text-gray-800 text-sm">⏳ Loading your analyses...</p>
    </div>
  );

  const renderFailure = () => (
    <div className="bg-red-50 flex flex-col justify-center items-center py-5 border border-red-200 rounded px-4">
      <p className="text-red-500 text-sm">⚠️ Something went wrong!</p>
      <button
        onClick={getPastAnalysis}
        className="border border-red-500 text-red-500 text-xs px-1 py-1 mt-2 rounded cursor-pointer"
      >
        Try Again!
      </button>
    </div>
  );

  const renderSuccess = () =>
    history.length === 0 ? (
      <div className="bg-white border border-gray-200 rounded p-10 text-center shadow-sm">
        <span className="text-4xl mb-4 block">📭</span>
        <p className="text-gray-800 text-sm mb-6">
          No analyses yet. Upload your first resume!
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#534AB7] text-white px-6 py-2 rounded-xl text-sm font-medium cursor-pointer"
        >
          Analyze my resume →
        </button>
      </div>
    ) : (
      <ul className="flex flex-col gap-3">
        {history.map((item) => (
          <li
            key={item.resumeId}
            className="bg-white border border-gray-200 hover:border-[#B500B2] rounded px-5 py-4 shadow-sm transition"
          >
            <Link
              to={`/past-analyses/${item.resumeId}`}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg">📄</span>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 mb-1">
                  {item.fileName}
                </p>
                <p className="text-xs text-gray-600">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  {new Date(item.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div
                className={`border rounded-xl px-4 py-2 text-center ${getScoreBg(item.score)}`}
              >
                <p
                  className={`text-lg font-semibold ${getScoreColor(item.score)}`}
                >
                  {item.score}
                </p>
                <p className="text-xs text-gray-400">/100</p>
              </div>

              <span className="text-gray-300 text-lg">→</span>
            </Link>
          </li>
        ))}
      </ul>
    );

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

  const renderHistory = () => (
    <div className="min-h-screen mt-10 bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Past Analyses 📁
          </h1>
          <p className="text-sm text-gray-700">
            All your previous resume analyses in one place
          </p>
        </div>
        {renderSwitch()}
      </div>
    </div>
  );

  return (
    <>
      <Headers />
      <div>{renderHistory()}</div>
      <Footer />
    </>
  );
};

export default PastAnalyses;
