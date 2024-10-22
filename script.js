
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
    // Get elements
    const showPopup = document.getElementById('showPopup');
    const popup = document.getElementById('iosPopup');
    const closeBtn = document.querySelector('.popup .close');
  
    // Show popup when the text is clicked
    showPopup.addEventListener('click', function() {
      popup.style.display = 'block';
    });
  
    // Hide popup when the close button is clicked
    closeBtn.addEventListener('click', function() {
      popup.style.display = 'none';
    });
  
    // Hide popup when clicking outside the popup content
    window.addEventListener('click', function(event) {
      if (event.target == popup) {
        popup.style.display = 'none';
      }
    });
  });
  
        

// script.js
document.addEventListener("DOMContentLoaded", function() {
  // Set a timeout to hide the loading screen after 5 seconds
  setTimeout(function() {
    document.body.classList.add('loaded');
  }, 1300); // 5 seconds delay
});
