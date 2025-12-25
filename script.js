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

function hasAcceptedCookies() {
  return document.cookie.split(';').some((item) => item.trim().startsWith('cookieAccepted='));
}

function showCookieNotice() {
  if (!hasAcceptedCookies()) {
    document.getElementById('cookie-card').style.display = 'block';
  }
}

function acceptCookies() {
  document.getElementById('cookie-card').style.display = 'none'; 

  document.cookie = 'cookieAccepted=true; max-age=31536000'; 
}

setTimeout(showCookieNotice, 1000);

document.cookie = "username=JohnDoe; path=/; max-age=31536000";
document.cookie = "sessionCookie=value; path=/; secure; samesite=lax";

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

function getLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    getCity(lat, lon);
    getWeather(lat, lon);
  }, () => {
    document.getElementById("weather-location").innerText = "Location blocked";
  });
}

function getCity(lat, lon) {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => {
      const city =
        data.address.town ||
        data.address.city ||
        data.address.village ||
        data.address.county;

      document.getElementById("weather-location").innerText = city;
    });
}

function getWeather(lat, lon) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&alerts=true`)
    .then(res => res.json())
    .then(data => {
      const weather = data.current_weather;

      document.getElementById("weather-temp").innerText =
        `${weather.temperature}°C`;

      document.getElementById("weather-wind").innerText =
        `Wind: ${weather.windspeed} km/h`;

      document.getElementById("weather-condition").innerText =
        weatherCodeToText(weather.weathercode);

      handleAlerts(data.alerts);
    });
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
    61: "Rain",
    63: "Heavy rain",
    71: "Snow",
    95: "Thunderstorm"
  };
  return map[code] || "Unknown";
}

function handleAlerts(alerts) {
  const alertBox = document.getElementById("weather-alert");

  if (!alerts || alerts.length === 0) {
    alertBox.style.display = "none";
    return;
  }

  alertBox.style.display = "block";
  alertBox.innerText = alerts[0].event;
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

  tick();
})();

document.addEventListener("DOMContentLoaded", () => {
  getLocation();

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

      const name = prompt("Edit button name:", link.textContent);
      if (!name) return reset();

      const url = prompt("Edit link URL:", link.href);
      if (!url) return reset();

      link.textContent = name;
      link.href = url;

      localStorage.setItem(
        "vinti_link_" + id,
        JSON.stringify({ name, url })
      );

      reset();
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

