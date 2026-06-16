import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Headers from "./Headers";
import { useEffect } from "react";
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type !== "application/pdf") {
      setError("Only PDF files are allowed!");
      setFile(null);
    } else {
      setError("");
      setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a PDF file first!");
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(
        "https://resume-in-backend.onrender.com/resume/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        },
      );

      const data = await res.json();
      if (!res.ok) {
        return setError(data.message);
      }
      navigate("/result", { state: { result: data.resume } });
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderUploadResume = () => (
    <div className="border border-[#1e1e2e70] w-full m-2 md:w-[60%] lg:w-[50%] rounded-2xl p-6 shadow-sm">
      <p className="text-md font-medium text-black mb-4">Upload your resume</p>

      <label
        htmlFor="resume-upload"
        className="flex flex-col hover:border-[#534AB7] items-center justify-center border-2 border-dashed border-[#00000449] rounded-xl p-10 cursor-pointer transition mb-4"
      >
        <div className="w-12 h-12 bg-[#1a1a2e13] rounded-xl flex items-center justify-center mb-3">
          <span className="text-2xl">📂</span>
        </div>
        <p className="text-sm text-gray-800 mb-1">Drop your PDF here</p>
        <p className="text-xs text-gray-600">or click to browse · max 5MB</p>
        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {file && (
        <div className="flex items-center gap-3 bg-[#0d0d1a] border border-[#1e1e2e] rounded-xl px-4 py-3 mb-4">
          <div className="w-8 h-8 bg-[#1a1a2e] rounded-lg flex items-center justify-center">
            <span className="text-sm">📄</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-300">{file.name}</p>
            <p className="text-xs text-gray-600">
              {(file.size / 1024).toFixed(0)} KB · Ready to analyze
            </p>
          </div>
          <span className="bg-green-700 text-white text-xs px-3 py-1 rounded-full">
            Ready
          </span>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="w-full bg-[#B500B2] hover:bg-[#4238a0] text-white py-3 rounded-xl text-sm font-medium transition disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "⏳ Analyzing..." : "🤖 Analyze Resume"}
      </button>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50">
      <Headers />

      <div className="mt-24 px-4">
        <div className="max-w-2xl mx-auto mb-6 bg-linear-to-r from-[#B500B2] to-[#7F77DD] rounded-2xl p-6 md:w-[50%] text-white">
          <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
            AI Resume Analyzer
          </p>
          <h1 className="text-xl font-semibold mb-1">
            Analyze your resume instantly ⚡
          </h1>
          <p className="text-sm opacity-70">
            Upload your PDF and get AI feedback in seconds
          </p>
        </div>

        <div className="flex w-full items-center justify-center">
          {renderUploadResume()}
        </div>

        <div className="max-w-2xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: "📊", label: "Score /100" },
            { icon: "🛠️", label: "Skills detected" },
            { icon: "✅", label: "Strengths" },
            { icon: "💡", label: "Suggestions" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm hover:border-[#B500B2] transition"
            >
              <span className="text-2xl block mb-2">{icon}</span>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <button
            onClick={() => navigate("/past-analyses")}
            className="w-full bg-white border border-gray-200 hover:border-[#B500B2] hover:text-[#B500B2] text-gray-500 py-3 rounded-xl text-sm transition cursor-pointer shadow-sm"
          >
            View past analyses →
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Dashboard;
