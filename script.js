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

document.getElementById('accept-cookies').addEventListener('click', acceptCookies);

setTimeout(showCookieNotice, 1000);

document.cookie = "username=JohnDoe; path=/; 'sessionCookie=value; secure; HttpOnly";

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


document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, .900);

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});

async function checkVintiStatus() {
  try {

    const res = await fetch("https://backuppass.github.io/Status-Centre/");
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const tagline = doc.querySelector(".status-row .tagline") || doc.querySelector(".tagline");

    if (!tagline) return;

    const text = tagline.textContent || "";

    const match = text.match(/This app is\s+([A-Za-z]+)/i);
    const status = match ? match[1].toLowerCase() : "unknown";

    console.log("Vinti status:", status);

    if (status === "offline" || status === "downtime" || status === "error") {
      window.location.href = "https://backuppass.github.io/Vinti-No-Server/";
    }

  } catch (err) {
    console.error("Status check failed:", err);
  }
}

checkVintiStatus();

setInterval(checkVintiStatus, 30000);

