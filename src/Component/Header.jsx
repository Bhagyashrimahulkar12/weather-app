import { useEffect, useState } from "react";

function Header() {
  const [isDarkMode, setDarkMode] = useState(true);

  // Apply or remove the dark mode class on the <html> tag
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <header className="w-full bg-white text-gray-800 dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg transition-all duration-300 ease-in-out">
  <div className="max-w-5xl mx-auto flex justify-between items-center p-6">
    <div>
      <h1 className="text-3xl font-extrabold font-montserrat text-blue-700 dark:text-blue-300 drop-shadow-sm">
        DailyForecast 🌈
      </h1>
      <p className="text-gray-600 dark:text-gray-400 font-medium tracking-wide">
        Accurate weather, anytime, anywhere...
      </p>
    </div>
    <button
      onClick={() => setDarkMode(!isDarkMode)}
      className="px-5 py-2 rounded-lg font-semibold transition duration-300 bg-gray-800 text-white dark:bg-white dark:text-gray-900 hover:shadow-md transform hover:scale-105"
    >
  {isDarkMode ? "🌅 Day Mode" : "🌘 Night Mode"}
  </button>
  </div>
</header>


  );
}

export default Header;
