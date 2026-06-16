const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-black px-6 py-6 mt-10">
      <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white head-font">Resume In</span>
        </div>

        <p className="text-xs text-gray-200">
          Built with ❤️ using <span className="text-[#B500B2]">MERN</span> Stack + Gemini AI
        </p>

        <p className="text-xs text-gray-200">
          © {new Date().getFullYear()} ResumeIn. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;