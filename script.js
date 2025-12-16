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

