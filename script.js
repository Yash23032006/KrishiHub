let currentLang = "en";
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API Key

const translations = {
  en: {
    welcome: "Welcome to KrishiHub",
    features: [
      { name: "🌾 Crop Recommendation", id: "crop" },
      { name: "📅 Crop Calendar", id: "calendar" },
      { name: "🏛 Government Schemes", id: "schemes" },
      { name: "💬 Community", id: "community" },
      { name: "📈 Marketing", id: "market" },
      { name: "☁️ Weather Update", id: "weather" },
      { name: "🔊 Voice Assistant", id: "voice" },
      { name: "✉️ SMS Notifications", id: "sms" }
    ]
  },
  hi: {
    welcome: "कृषि हब में आपका स्वागत है",
    features: [
      { name: "🌾 फसल सिफारिश", id: "crop" },
      { name: "📅 फसल कैलेंडर", id: "calendar" },
      { name: "🏛 सरकारी योजनाएँ", id: "schemes" },
      { name: "💬 समुदाय", id: "community" },
      { name: "📈 विपणन", id: "market" },
      { name: "☁️ मौसम अपडेट", id: "weather" },
      { name: "🔊 वॉयस असिस्टेंट", id: "voice" },
      { name: "✉️ एसएमएस सूचनाएं", id: "sms" }
    ]
  }
};

function login() {
  const mobile = document.getElementById("mobile").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!mobile || mobile.length < 10 || !username || !password) {
    alert("Please fill all fields correctly");
    return;
  }
  document.getElementById("login-page").classList.remove("active");
  document.getElementById("language-page").classList.add("active");
}

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById("language-page").classList.remove("active");
  document.getElementById("features-page").classList.add("active");
  loadFeatures();
}

function loadFeatures() {
  document.getElementById("welcome-text").innerText = translations[currentLang].welcome;
  const featuresList = document.getElementById("features-list");
  featuresList.innerHTML = "";
  translations[currentLang].features.forEach(f => {
    const div = document.createElement("div");
    div.className = "feature-card";
    div.innerText = f.name;
    div.onclick = () => openFeature(f.id);
    featuresList.appendChild(div);
  });
}

function openFeature(id) {
  if (id === "crop") openCropForm();
  else if (id === "weather") openWeatherForm();
  else showModal(`<p>🚧 Feature under development</p>`);
}

function openCropForm() {
  const form = `
    <h3>🌾 Crop Recommendation</h3>
    <input type="text" id="city" placeholder="Enter City"><br>
    <select id="soil">
      <option value="">Select Soil Type</option>
      <option value="loamy">Loamy</option>
      <option value="sandy">Sandy</option>
      <option value="clay">Clay</option>
      <option value="silty">Silty</option>
      <option value="alluvial">Alluvial</option>
    </select><br>
    <select id="season">
      <option value="">Select Season</option>
      <option value="kharif">Kharif</option>
      <option value="rabi">Rabi</option>
      <option value="summer">Summer</option>
      <option value="winter">Winter</option>
    </select><br>
    <input type="number" id="area" placeholder="Farm Area (acres)"><br>
    <button class="btn" onclick="recommendCrop()">Get Recommendation</button>
    <div id="crop-result"></div>
  `;
  showModal(form);
}

function recommendCrop() {
  const soil = document.getElementById("soil").value.toLowerCase();
  const season = document.getElementById("season").value.toLowerCase();
  const city = document.getElementById("city").value.trim();
  const area = document.getElementById("area").value.trim();

  if(!soil || !season || !city || !area){
    alert("Please fill all fields");
    return;
  }

  let crop = "";

  if(soil === "clay") {
    if(season === "kharif") crop = "Rice";
    else if(season === "rabi") crop = "Wheat";
  } 
  else if(soil === "loamy") {
    if(season === "kharif") crop = "Maize";
    else if(season === "rabi") crop = "Wheat";
  }
  else if(soil === "sandy") {
    if(season === "rabi") crop = "Chickpea";
    else crop = "Millet";
  }
  else if(soil === "silty") crop = "Rice";
  else if(soil === "alluvial") {
    if(season === "kharif") crop = "Sugarcane";
    else crop = "Wheat";
  }
  else crop = "Wheat";

  document.getElementById("crop-result").innerHTML = `
    ✅ Recommended Crop for <strong>${city}</strong> <br>
    Area: <strong>${area} acres</strong> | Soil: <strong>${soil}</strong> | Season: <strong>${season}</strong><br>
    <span style="font-size:18px; color:#2d572c; font-weight:bold;">${crop}</span>
  `;
}

function openWeatherForm() {
  const form = `
    <h3>☁️ Weather Update</h3>
    <input type="text" id="city" placeholder="Enter City"><br>
    <button class="btn" onclick="getWeather()">Check Weather</button>
    <div id="weather-result"></div>
  `;
  showModal(form);
}

async function getWeather() {
  const city = document.getElementById("city").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${currentLang}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.main) {
      document.getElementById("weather-result").innerText =
        `🌡 Temp: ${data.main.temp}°C | ${data.weather[0].description}`;
    } else {
      document.getElementById("weather-result").innerText = "❌ City not found!";
    }
  } catch {
    document.getElementById("weather-result").innerText = "⚠️ Error fetching weather.";
  }
}

function showModal(content) {
  document.getElementById("modal-body").innerHTML = content;
  document.getElementById("modal").style.display = "flex";
}
function closeModal() { document.getElementById("modal").style.display = "none"; }
function logout() {
  document.getElementById("features-page").classList.remove("active");
  document.getElementById("login-page").classList.add("active");
}
