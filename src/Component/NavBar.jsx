import { useState, useEffect } from "react";
const apiKey = "2384bf88e5a2596a3fde1c921b238f31";

function NavBar() {
  const [city, setcity] = useState("");
  const [temperatureC, settemperatureC] = useState("");
  const [temperatureF, settemperatureF] = useState("");
  const [weatherDescription, setweatherDescription] = useState("");
  const [humidity, sethumidity] = useState("");
  const [wind, setwind] = useState("");
  const [iconurl, seticonurl] = useState("");
  const [visibility, setvisibility] = useState("");
  const [feelLikeC, setFeelLikeC] = useState("");
  const [feelLikeF, setFeelLikeF] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [localTime, setLocalTime] = useState("");
  const [timezoneOffset, setTimezoneOffset] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);


  useEffect(() => {
    if (!timezoneOffset) return;

    const interval = setInterval(() => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert your local time to UTC
      const localTime = new Date(utc + timezoneOffset * 1000); // Add city's offset to UTC

      const formatted = localTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // set false if you want 24-hr
      });

      setLocalTime(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezoneOffset]);

  async function fetchWeatherByCity() {
    if (!city) {
      alert("Please enter a cityname");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        alert("City not found: please enter a valid city!");
        return;
      }
      setcity(data.name);
      seticonurl(
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      setcity(data.name);
      setWeatherCondition(data.weather[0].main); 
      settemperatureC(`${data.main.temp.toFixed(1)}°C`);
      settemperatureF(`${(data.main.temp.toFixed(1) * 9) / 5 + 32}°F`);
      setFeelLikeC(`${data.main.feels_like}°C`);
      setFeelLikeF(`${(data.main.feels_like * 9) / 5 + 32}°F`);
      setweatherDescription(data.weather[0].description);
      sethumidity(`${data.main.humidity}%`);
      setwind(`${data.wind.speed}m/s`);
      setvisibility(`${data.visibility / 1000}km`);
      setTimezoneOffset(data.timezone);
    } catch (error) {
      console.log("Error Fetching Weather:", error);
    }
  }
  async function fetchWeatherByLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;  
  
      
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.cod !== 200) {
            alert("Weather data not found for your location.");
            return;
          }
          seticonurl(
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          );
          setcity(data.name);
          
          settemperatureC(`${data.main.temp.toFixed(1)}°C`);
          settemperatureF(`${(data.main.temp.toFixed(1) * 9) / 5 + 32}°F`);
          setFeelLikeC(`${data.main.feels_like}°C`);
          setFeelLikeF(`${(data.main.feels_like * 9) / 5 + 32}°F`);
          setweatherDescription(data.weather[0].description);
          sethumidity(`${data.main.humidity}%`);
          setwind(`${data.wind.speed}m/s`);
          setvisibility(`${data.visibility / 1000}km`);
          setTimezoneOffset(data.timezone);
        } catch (error) {
          console.log("Error fetching weather data:", error);
          alert("Failed to fetch weather data.");
        }
      },
      (error) => {
        alert("Location access denied. Please enter a city manually.");
        return;
        
      }
    );
  }
  return (
    
    <>
    
      <nav className="w-full bg-gradient-to-r from-blue-400 to-blue-800 text-white border-b border-blue-600 shadow-sm transition-all">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-between items-center px-6 py-4">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setcity(e.target.value)}
            className="flex-1 min-w-[180px] px-4 py-2 rounded-md text-gray-800 placeholder-gray-500"
          />

          <button
            onClick={fetchWeatherByCity}
            className="bg-white text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition"
          >
            Get Weather
          </button>

          <button
            onClick={fetchWeatherByLocation}
            className="bg-white text-blue-800 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition"
          >
            📍 Fetch Location
          </button>

          <button
            className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-md hover:bg-purple-100 transition"
            onClick={() => setIsCelsius(!isCelsius)}
          >
            Toggle °C/°F
          </button>
        </div>
      </nav>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4 transition-all duration-300">
        <main className=" w-full max-w-4xl bg-gradient-to-br from-blue-50 via-blue-100 to-white shadow-2xl rounded-3xl p-10 mt-10 space-y-8 border border-grey-300 transition-all duration-100 hover:shadow-lg ">
          <div className="text-center space-y-3">
            <p className="text-3xl font-bold font-montserrat text-gray-900 drop-shadow-md">
              City Name: {city}
            </p>
            <p className="text-xl text-grey-700 font-roboto">
              Condition: {weatherDescription}
            </p>

            {iconurl && (
              <img
                src={iconurl}
                alt="Weather Icon"
                className="w-28 mx-auto my-4 drop-shadow-lg "
              />
            )}

            <p className="text-lg font-medium">
              🌡️Temperature: {isCelsius ? temperatureC : temperatureF}{" "}
            </p>
            <p className="text-lg font-medium">💧Humidity: {humidity}</p>
            <p className="text-lg font-medium"> 🌬️ Wind Speed: {wind}</p>
            <p className="text-lg font-medium"> 👁️ Visibility: {visibility}</p>
            <p className="text-lg font-medium">
              🤔 Feels Like: {isCelsius ? feelLikeC : feelLikeF}
            </p>
          </div>

          
          
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
  {hourlyData.map((hour, index) => {
    const date = new Date(hour.dt * 1000);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div key={index} className="bg-white p-3 rounded-lg shadow">
        <p className="font-semibold text-blue-900">{time}</p>
        <img
          src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
          alt="icon"
          className="w-10 mx-auto"
        />
        <p className="text-gray-800">🌡️ {hour.temp}°C</p>
        <p className="text-gray-600 text-sm">{hour.weather[0].main}</p>
      </div>
    );
  })}
</div>
         
          <div className="bg-blue-100 p-5 rounded-xl shadow-md text-center">
            <p className=" text-xl font-semibold text-blue-800">
              🕒 Local Time: {localTime || "Loading..."}
            </p>
          </div>
          <div className="bg-blue-100 p-5 rounded-xl shadow-md text-center">
            <div className="bg-blue-100 p-5 rounded-xl shadow-md text-center">
              <p className="text-xl font-semibold text-red-800">
                ⚠️ Weather Alerts:
              </p>
              {alerts.length === 0 ? (
                <p className="text-gray-700 mt-2">
                  No active alerts at the moment.
                </p>
              ) : (
                alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="mt-4 text-left bg-red-100 p-4 rounded-lg shadow-md"
                  >
                    <p className="font-bold text-red-700">🛑 {alert.event}</p>
                    <p className="text-sm text-gray-800 italic">
                      {new Date(alert.start * 1000).toLocaleString()} -{" "}
                      {new Date(alert.end * 1000).toLocaleString()}
                    </p>
                    <p className="mt-2">{alert.description}</p>
                    <p className="mt-1 text-sm text-blue-700">
                      Source: {alert.sender_name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
         
        </main>
      </div>
    </>
  );
}
export default NavBar;
