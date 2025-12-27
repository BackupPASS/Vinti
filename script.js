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

document.addEventListener("DOMContentLoaded", () => {
  const MIN_MS = 650;
  const start = performance.now();

  window.addEventListener("load", () => {
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, MIN_MS - elapsed);

    setTimeout(() => {
      document.body.classList.add("loaded");
    }, remaining);
  });
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

  setCookie('cookieAccepted', 'true', 31536000); 
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

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeEditLinkModal();
    });
  }

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

function isVintiBrowser() {
  return /\bVinti\/[^\s]+/i.test(navigator.userAgent || "");
}

document.addEventListener("DOMContentLoaded", () => {
  const pill = document.getElementById("antimalware-pill");
  if (!pill) return;
  pill.style.display = isVintiBrowser() ? "inline-flex" : "none";
});

(() => {
  const KEY = "vinti_recent_searches_v1";
  const MAX = 5;

  function getEls() {
    const box   = document.getElementById("recent-searches");
    const list  = document.getElementById("recent-list");
    const clear = document.getElementById("recent-clear");
    const title = document.getElementById("recent-title");
    const input = document.querySelector(".searchbar-input");
    const form  = document.querySelector("form.searchbar-wrapper");
    return { box, list, clear, title, input, form };
  }

  function loadRecent() {
    try {
      const raw = localStorage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.filter(x => typeof x === "string") : [];
    } catch {
      return [];
    }
  }

  function saveRecent(arr) {
    try { localStorage.setItem(KEY, JSON.stringify(arr.slice(0, MAX))); } catch {}
  }

  function addRecent(term) {
    const t = (term || "").trim();
    if (!t) return;

    const arr = loadRecent();
    const lower = t.toLowerCase();

    const deduped = arr.filter(x => x.toLowerCase() !== lower);
    deduped.unshift(t);

    saveRecent(deduped.slice(0, MAX));
  }

  function showBox(box) {
    if (box) box.hidden = false;
  }

  function hideBox(box) {
    if (box) box.hidden = true;
  }

  function render(filterText) {
    const { box, list, title } = getEls();
    if (!box || !list || !title) return;

    const all = loadRecent();
    const q = (filterText || "").trim().toLowerCase();

    let items = all;
    if (q) {
      items = all.filter(s => s.toLowerCase().includes(q));
      title.textContent = "Matches";
    } else {
      title.textContent = "Recent";
    }

    if (!q) {
      if (items.length === 0) return hideBox(box);
      list.innerHTML = "";
      for (const text of items) list.appendChild(makeItem(text));
      return showBox(box);
    } else {
      if (items.length === 0) return hideBox(box);
      list.innerHTML = "";
      for (const text of items) list.appendChild(makeItem(text));
      return showBox(box);
    }
  }

  function makeItem(text) {
    const row = document.createElement("div");
    row.className = "recent-item";
    row.setAttribute("role", "option");

    const left = document.createElement("div");
    left.className = "recent-text";
    left.textContent = text;

    const right = document.createElement("div");
    right.className = "recent-go";
    right.textContent = "↵";

    row.appendChild(left);
    row.appendChild(right);

    row.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const { input, form, box } = getEls();
      if (!input) return;

      input.value = text;

      if (form) form.requestSubmit();

    });

    return row;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const { box, clear, input, form } = getEls();
    if (!box || !input || !form || !clear) return;

    input.addEventListener("focus", () => render(input.value));
    input.addEventListener("click", () => render(input.value));

    input.addEventListener("input", () => render(input.value));

    form.addEventListener("submit", () => {
      addRecent(input.value);

    });

    clear.addEventListener("click", () => {
      saveRecent([]);
      hideBox(box);
    });

    document.addEventListener("mousedown", (e) => {
      const searchbar = document.querySelector(".searchbar");
      if (!searchbar) return;
      if (!searchbar.contains(e.target)) hideBox(box);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hideBox(box);
    });
  });
})();
