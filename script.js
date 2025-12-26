let currentIndex = 0;
const images = [
    'image2.jpg',
];
const slideshow = document.getElementById('background-slideshow');

function changeBackground(index) {
    slideshow.style.backgroundImage = `url(${images[index]})`;
    currentIndex = index;
}

function nextBackground() {
    currentIndex = (currentIndex + 1) % images.length;
    changeBackground(currentIndex);
}

changeBackground(0);

setInterval(nextBackground, 5000);

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, .900);
});

async function checkVintiStatus() {
  try {
    const res = await fetch("https://backuppass.github.io/Status-Centre/");
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const vintiCard = Array.from(doc.querySelectorAll(".card.col-12"))
      .find(card => card.querySelector("h2")?.textContent.trim() === "Vinti");

    if (!vintiCard) {
      console.warn("Vinti card not found.");
      return;
    }

    const statusRow = vintiCard.querySelector(".status-row");
    if (!statusRow) {
      console.warn("Status row not found inside Vinti card.");
      return;
    }

    const pill = statusRow.querySelector(".pill");
    if (!pill) {
      console.warn("No status pill found inside Vinti section.");
      return;
    }

    const status = pill.textContent.trim().toLowerCase();
    console.log("Vinti status:", status);

    if (["offline", "downtime", "error"].includes(status)) {
      window.location.href = "https://backuppass.github.io/Vinti-No-Server/";
    }

  } catch (err) {
    console.error("Status check failed:", err);
  }
}

checkVintiStatus();
setInterval(checkVintiStatus, 30000);

setTimeout(function() {
  showCookieNotice();
}, 1000);

function getCookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name, value, maxAgeSeconds) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie =
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
}

function hasAcceptedCookies() {
  return getCookie('cookieAccepted') === 'true';
}

function showCookieNotice() {
  const card = document.getElementById('cookie-card');
  if (!card) return;
  card.style.display = hasAcceptedCookies() ? 'none' : 'block';
}

function acceptCookies() {
  const card = document.getElementById('cookie-card');
  if (card) card.style.display = 'none';

  setCookie('cookieAccepted', 'true', 31536000); // 1 year
}


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(showCookieNotice, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
  const showPopup = document.getElementById('showPopup');
  const popup = document.getElementById('iosPopup');
  const closeBtn = document.querySelector('.popup .close');

  showPopup.addEventListener('click', function() {
    popup.style.display = 'block';
  });

  closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target == popup) {
      popup.style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('accept-cookies');
  if (btn) btn.addEventListener('click', acceptCookies);
});



function $(id) { return document.getElementById(id); }

function setText(id, text) {
  const el = $(id);
  if (el) el.innerText = text;
}

function setVisible(id, show) {
  const el = $(id);
  if (el) el.style.display = show ? "block" : "none";
}

function fetchWithTimeout(url, ms = 9000, extra = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);

  return fetch(url, {
    ...extra,
    signal: ctrl.signal,
    headers: {
      "Accept": "application/json",
      ...(extra.headers || {})
    }
  }).finally(() => clearTimeout(t));
}

function weatherCodeToText(code) {
  const map = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    61: "Rain",
    63: "Heavy rain",
    65: "Very heavy rain",
    71: "Snow",
    73: "Snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Heavy showers",
    82: "Violent showers",
    95: "Thunderstorm",
    96: "Thunderstorm (hail)",
    99: "Thunderstorm (heavy hail)"
  };
  return map[code] || "Unknown";
}

function handleAlerts(alerts) {
  const alertBox = $("weather-alert");
  if (!alertBox) return;

  if (!alerts || !Array.isArray(alerts) || alerts.length === 0) {
    alertBox.innerText = "";
    alertBox.style.display = "none";
    return;
  }

  alertBox.style.display = "block";

  const a = alerts[0] || {};
  const title = a.event || a.headline || a.title || "Weather alert";
  const desc = a.description || a.desc || "";

  alertBox.innerText = desc ? `${title}\n${desc}` : title;
}

function setWeatherLoading() {
  setText("weather-location", "Getting location…");
  setText("weather-temp", "Loading…");
  setText("weather-wind", "");
  setText("weather-condition", "");
  setVisible("weather-alert", false);
}

function setWeatherUnavailable(reason = "Weather unavailable") {
  setText("weather-temp", "—");
  setText("weather-wind", "");
  setText("weather-condition", reason);
}

function getLocation() {
  setWeatherLoading();

  if (!navigator.geolocation) {
    setText("weather-location", "Geolocation not supported");
    setWeatherUnavailable("No location");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      getCity(lat, lon);
      getWeather(lat, lon);
    },
    (err) => {
      console.warn("Geolocation failed:", err);
      setText("weather-location", "Location blocked");
      setWeatherUnavailable("No location");
      setVisible("weather-alert", false);
    },
    {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 60000
    }
  );
}

async function getCity(lat, lon) {
  setText("weather-location", "Finding area…");

  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;

  try {
    const res = await fetchWithTimeout(url, 9000);
    if (!res.ok) throw new Error(`City lookup HTTP ${res.status}`);
    const data = await res.json();

    const addr = data?.address || {};
    const city =
      addr.town ||
      addr.city ||
      addr.village ||
      addr.hamlet ||
      addr.county ||
      addr.state ||
      "Unknown area";

    setText("weather-location", city);
  } catch (err) {
    console.error("getCity failed:", err);
    setText("weather-location", "Area unavailable");
  }
}

async function getWeather(lat, lon) {
  const tempEl = $("weather-temp");
  const windEl = $("weather-wind");
  const condEl = $("weather-condition");

  if (tempEl) tempEl.innerText = "Loading…";
  if (windEl) windEl.innerText = "";
  if (condEl) condEl.innerText = "";

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${encodeURIComponent(lat)}` +
    `&longitude=${encodeURIComponent(lon)}` +
    `&current_weather=true` +
    `&alerts=true`;

  try {
    const res = await fetchWithTimeout(url, 9000);
    if (!res.ok) throw new Error(`Weather HTTP ${res.status}`);
    const data = await res.json();

    const w = data?.current_weather;
    if (!w) throw new Error("No current_weather in response");

    setText("weather-temp", `${w.temperature}°C`);
    setText("weather-wind", `Wind: ${w.windspeed} km/h`);
    setText("weather-condition", weatherCodeToText(w.weathercode));

    handleAlerts(data.alerts);
  } catch (err) {
    console.error("getWeather failed:", err);
    setWeatherUnavailable(err && err.name === "AbortError" ? "Timed out" : "Failed to load");
    setVisible("weather-alert", false);
  }
}

(function startSnow() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w = 0, h = 0;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const dpr = window.devicePixelRatio || 1;

  const flakes = Array.from({ length: 120 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: (Math.random() * 2.2 + 0.6) * dpr,
    s: (Math.random() * 0.9 + 0.35) * dpr, 
    d: (Math.random() * 1.2 + 0.2) * dpr,  
    a: Math.random() * Math.PI * 2
  }));

  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.95)';

    for (const f of flakes) {
      f.y += f.s;
      f.a += 0.01;
      f.x += Math.sin(f.a) * f.d;

      if (f.y > h + 10) { f.y = -10; f.x = Math.random() * w; }
      if (f.x > w + 10) f.x = -10;
      if (f.x < -10) f.x = w + 10;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(tick);
  } 
   getLocation();

  tick();
})();


let editTargetLink = null;
let editTargetId = null;

function normalizeUrl(input) {
  const v = (input || "").trim();
  if (!v) return "";
  if (!/^https?:\/\//i.test(v)) return "https://" + v;
  return v;
}

function openEditLinkModal(link, id) {
  editTargetLink = link;
  editTargetId = id;

  const overlay = document.getElementById("edit-link-overlay");
  const nameEl = document.getElementById("edit-link-name");
  const urlEl  = document.getElementById("edit-link-url");

  if (!overlay || !nameEl || !urlEl) return;

  nameEl.value = link.textContent || "";
  urlEl.value  = link.href || "";

  overlay.style.display = "flex";

  setTimeout(() => nameEl.focus(), 0);
}

function closeEditLinkModal() {
  const overlay = document.getElementById("edit-link-overlay");
  if (overlay) overlay.style.display = "none";
  editTargetLink = null;
  editTargetId = null;
}

function saveEditLinkModal() {
  if (!editTargetLink || !editTargetId) return;

  const nameEl = document.getElementById("edit-link-name");
  const urlEl  = document.getElementById("edit-link-url");
  if (!nameEl || !urlEl) return;

  const newName = (nameEl.value || "").trim();
  const newUrl  = normalizeUrl(urlEl.value);

  if (!newName || !newUrl) return; 

  editTargetLink.textContent = newName;
  editTargetLink.href = newUrl;

  localStorage.setItem(
    "vinti_link_" + editTargetId,
    JSON.stringify({ name: newName, url: newUrl })
  );

  closeEditLinkModal();
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("edit-link-overlay");
  const btnSave = document.getElementById("edit-link-save");
  const btnCancel = document.getElementById("edit-link-cancel");

  if (btnSave) btnSave.addEventListener("click", saveEditLinkModal);
  if (btnCancel) btnCancel.addEventListener("click", closeEditLinkModal);

  // click outside card closes
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeEditLinkModal();
    });
  }

  // Escape closes
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEditLinkModal();
  });
});


document.addEventListener("DOMContentLoaded", () => {

  const HOVER_TIME = 3000;
  const LONG_PRESS_TIME = 2000;

  document.querySelectorAll(".editable-link").forEach(link => {
    const id = link.dataset.id;

    const saved = localStorage.getItem("vinti_link_" + id);
    if (saved) {
      const { name, url } = JSON.parse(saved);
      link.textContent = name;
      link.href = url;
    }

    let hoverTimer = null;
    let pressTimer = null;
    let suppressClick = false;
    let editing = false;

    function openEditor(e) {
  suppressClick = true;
  editing = true;
  e?.preventDefault();

  openEditLinkModal(link, id);

  const overlay = document.getElementById("edit-link-overlay");
  const release = () => {
    overlay?.removeEventListener("transitionend", release);
    editing = false;
    setTimeout(() => suppressClick = false, 50);
  };

  setTimeout(release, 100);
}

    function reset() {
      editing = false;
      setTimeout(() => suppressClick = false, 50);
    }

    link.addEventListener("click", e => {
      if (suppressClick || editing) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });

    link.addEventListener("mouseenter", () => {
      hoverTimer = setTimeout(() => openEditor(), HOVER_TIME);
    });

    link.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
    });

    link.addEventListener("pointerdown", e => {
      pressTimer = setTimeout(() => openEditor(e), LONG_PRESS_TIME);
    });

    link.addEventListener("pointerup", () => {
      clearTimeout(pressTimer);
    });

    link.addEventListener("pointerleave", () => {
      clearTimeout(pressTimer);
    });
  });
});
