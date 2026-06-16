import Footer from "./Footer";
import Headers from "./Headers";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const renderNotFound = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl font-bold text-[#EEEDFE] mb-4">404</p>

        <div className="w-16 h-16 bg-[#EEEDFE] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🔍</span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Page not found
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#534AB7] hover:bg-[#4238a0] text-white py-3 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-white border border-gray-200 hover:border-[#534AB7] hover:text-[#534AB7] text-gray-500 py-3 rounded-xl text-sm transition cursor-pointer"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Headers />
      {renderNotFound()}
      <Footer />
    </>
  );
};

export default NotFound;
