body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

@font-face {
  font-family: 'Alba';
  src: url('ALBA____.TTF') format('truetype');
}

@font-face {
  font-family: 'Albas';
  src: url('ALBAS___.TTF') format('truetype');
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  margin-top: 5%;
  transition: all 0.3s ease;
}

.header {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  border-radius: 0 0 15px 15px;
}

.headertxt {
  margin-top: 7%;
  font-size: 30px;
  transition: all 0.3s ease;
  color: #fff;
}

.header h1 {
  margin: 0;
}

.content {
  background-color: #fff;
  padding: 28px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 32px;
  padding-bottom: 50px;
}

.btn {
  display: inline-block;
  backdrop-filter: blur(2px) saturate(200%);
  -webkit-backdrop-filter: blur(2px) saturate(200%);
  background-color: rgba(111, 110, 110, 0.23);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  margin-right: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 8px 15px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.btn:hover {
  backdrop-filter: blur(2px) saturate(200%);
  -webkit-backdrop-filter: blur(2px) saturate(200%);
  background-color: rgba(0, 0, 0, 0.23);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-box {
  margin-top: 20px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 150px;
  background-color: #fff;
}

.mainlinks {
  text-align: center;
  margin-top: 20px;
}

.footer {
  color: #fff;
  text-align: center;
  padding: 2px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: height 0.3s ease-in-out;
  border-radius: 25px 25px 0 0;
  overflow: hidden;
  backdrop-filter: blur(2px) saturate(200%);
  -webkit-backdrop-filter: blur(2px) saturate(200%);
  background-color: rgba(255, 255, 255, 0.23);
}

.footer a {
  color: #fff;
  text-decoration: none;
}

.searchbar {
  font-size: 14px;
  font-family: arial, sans-serif;
  color: #202124;
  display: flex;
  z-index: 3;
  height: 44px;
  background: white;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 24px;
  margin: 0 auto;
  width: auto;
  max-width: 90%;
}

.searchbar:hover {
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
  border-color: rgba(223,225,229,0);
}

.searchbar-wrapper {
  flex: 1;
  display: flex;
  padding: 5px 8px 0 14px;
}

.searchbar-left {
  font-size: 14px;
  font-family: arial, sans-serif;
  color: #202124;
  display: flex;
  align-items: center;
  padding-right: 13px;
  margin-top: -5px;
}

.search-icon-wrapper {
  margin: auto;
}

.search-icon {
  margin-top: 3px;
  color: #9aa0a6;
  height: 20px;
  line-height: 20px;
  width: 20px;
}

.searchbar-icon {
  display: inline-block;
  fill: currentColor;
  height: 24px;
  line-height: 24px;
  position: relative;
  width: 24px;
}

.searchbar-center {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}

.searchbar-input-spacer {
  color: transparent;
  flex: 100%;
  white-space: pre;
  height: 34px;
  font-size: 16px;
}

.searchbar-input {
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, .87);
  word-wrap: break-word;
  outline: none;
  display: flex;
  flex: 100%;
  margin-top: -37px;
  height: 34px;
  font-size: 16px;
  max-width: 100%;
  width: 100%;
}

.searchbar-right {
  display: flex;
  flex: 0 0 auto;
  margin-top: -5px;
  align-items: stretch;
  flex-direction: row
}

.searchbar-clear-icon {
  margin-right: 12px
}

.voice-search {
  flex: 1 0 auto;
  display: flex;
  cursor: pointer;
  align-items: center;
  border: 0;
  background: transparent;
  outline: none;
  padding: 0 8px;
  width: 2.8em;
}

a {
  color: white;
  text-decoration: none;
}

a:visited {
  color: white;
}

a:hover {
  color: #ffffff;
}

@media screen and (max-width: 600px) {

  .searchbar {
    font-size: 8px;
    font-family: arial, sans-serif;
    color: #202124;
    display: flex;
    z-index: 3;
    height: 39px;
    background: white;
    border: 1px solid #dfe1e5;
    box-shadow: none;
    border-radius: 24px;
    margin: 0 auto;
    width: auto;
    max-width: 70%;
  }
  
  .searchbar:hover {
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
    border-color: rgba(223,225,229,0);
  }
  
  .searchbar-wrapper {
    flex: 1;
    display: flex;
    padding: 5px 8px 0 14px;
  }
  
  .searchbar-left {
    font-size: 14px;
    font-family: arial, sans-serif;
    color: #202124;
    display: flex;
    align-items: center;
    padding-right: 13px;
    margin-top: -5px;
  }
  
  .search-icon-wrapper {
    margin: auto;
  }
  
  .search-icon {
    margin-top: 3px;
    color: #9aa0a6;
    height: 20px;
    line-height: 20px;
    width: 20px;
  }
  
  .searchbar-icon {
    display: inline-block;
    fill: currentColor;
    height: 24px;
    line-height: 24px;
    position: relative;
    width: 24px;
  }
  
  .searchbar-center {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  }
  
  .searchbar-input-spacer {
    color: transparent;
    flex: 100%;
    white-space: pre;
    height: 34px;
    font-size: 16px;
  }
  
  .searchbar-input {
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, .87);
    word-wrap: break-word;
    outline: none;
    display: flex;
    flex: 100%;
    margin-top: -37px;
    height: 34px;
    font-size: 16px;
    max-width: 100%;
    width: 100%;
  }
  
  .searchbar-right {
    display: flex;
    flex: 0 0 auto;
    margin-top: -5px;
    align-items: stretch;
    flex-direction: row
  }
  
  .searchbar-clear-icon {
    margin-right: 12px
  }
  
  .voice-search {
    flex: 1 0 auto;
    display: flex;
    cursor: pointer;
    align-items: center;
    border: 0;
    background: transparent;
    outline: none;
    padding: 0 8px;
    width: 2.8em;
  }

  .container {
    max-width: 90%;
    padding: 20px;
  }
  .btn {
    padding: 5px 4px;
    font-size: 16px;
  }
  .headertxt {
    font-size: 20px;
  }
  .container {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    margin-top: 5%;
  }
}

#background-slideshow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease-in-out;
}

.cookie-card {
  max-width: 320px;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 20px 20px 30px rgba(0, 0, 0, .05);
  display: none; /* Hide initially */
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.title {
  font-weight: 600;
  color: rgb(31 41 55);
}

.description {
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(75 85 99);
}

.description a {
  color: rgb(59 130 246);
}

.description a:hover {
  text-decoration: underline;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}

.pref {
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(31 41 55);
  text-decoration: underline;
  border: none;
  background-color: transparent;
}

.pref:hover {
  color: rgb(156 163 175);
}

.accept {
  font-size: 0.75rem;
  line-height: 1rem;
  background-color: rgb(17 24 39);
  font-weight: 500;
  border-radius: 0.5rem;
  color: #fff;
  padding: 0.625rem 1rem;
  border: none;
}

.accept:hover {
  background-color: rgb(55 65 81);
}

body {
  font-family: Arial, sans-serif;
}

.pulsate-border {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Prevent interaction with elements beneath */
  z-index: -1; /* Ensure it's behind all other content */
  animation: fadeIn 1s forwards, fadeOut 1s forwards 2s;
}

.pulsate-border::before, .pulsate-border::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 20px solid transparent;
  border-image: linear-gradient(45deg, rgba(21, 185, 226, 0.5), rgba(12, 97, 224, 0.5), rgba(139, 16, 221, 0.5), rgba(212, 0, 255, 0.5));
  border-image-slice: 1;
  animation: pulsate 3s infinite;
  filter: blur(10px); /* Apply a blur effect */
  box-sizing: border-box;
}

@keyframes pulsate {
  0%, 100% {
    border-image: linear-gradient(45deg, rgba(21, 185, 226, 0.5), rgba(12, 97, 224, 0.5), rgba(139, 16, 221, 0.5), rgba(212, 0, 255, 0.5));
    border-image-slice: 1;
  }
  50% {
    border-image: linear-gradient(45deg, rgba(212, 0, 255, 0.7), rgba(139, 16, 221, 0.7), rgba(12, 97, 224, 0.7), rgba(21, 185, 226, 0.7));
    border-image-slice: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.pulsate-border.active::before, .pulsate-border.active::after {
  animation: pulsate 3s infinite, fadeIn 1s forwards;
}

.pulsate-border.inactive::before, .pulsate-border.inactive::after {
  animation: fadeOut 1s forwards;
}



.chat-container {
  
  position: fixed;
  bottom: 80px;
  left: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1000; /* Ensure it is on top of other content */
}

.chat-box {
  height: auto;
  width: auto;
  border-radius: 16px;
 background-color: #fff;
margin: 15;
  max-width: 300px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  animation: fadeIn 0.3s ease;
}

.chat-box p {
  margin: 0;
}

.siri-ball {
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
  background: radial-gradient(circle at 20% 30%, rgb(0, 255, 255), transparent 80%),
    radial-gradient(circle at 80% 70%, blue, transparent 80%),
    radial-gradient(circle at 40% 60%, rgb(77, 11, 107), transparent 40%);
  filter: blur(3px);
  transition: transform 0.1s ease-in-out, width 0.1s ease-in-out, height 0.1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes siriGlow {
  from {
    box-shadow: 0 0 20px rgba(0, 122, 255, 0.6);
  }
  to {
    box-shadow: 0 0 40px rgba(0, 122, 255, 1);
  }
}

.siri-ball.active {
  box-shadow: 0 0 40px rgba(0, 122, 255, 1);
  transform: scale(1.2); /* Example: Increase size when active */
}

.siri-ball.spin {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.siri-ball.active::before {
  box-shadow: 0 0 40px rgba(0, 122, 255, 1);
}

textarea#chat-input {
  width: 95%;
  height: 95%;
  padding: 3px;
  border-radius: 16px;
  background-color: #fff;
  border: 0.5px solid #e0e0e0;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  resize: none;
}

textarea#chat-input:focus {
  outline: none;
  border-color: #007aff;
  box-shadow: 0 0 8px rgba(0, 122, 255, 0.6);
}

.popup {
  display: none; /* Initially hidden */
  position: fixed;
  z-index: 1000; /* Above other elements */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 80%;
  max-height: 95%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

.popup-content h2 {
  margin-top: 0;
  font-size: 24px;
  text-align: center;
}

.popup-content p {
  font-size: 16px;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}





.pl {
  width: 10em;
  height: 10em;
}

.pl__ring {
  animation: ringA 2s linear infinite;
}

.pl__ring--a {
  stroke: #f42f25;
}

.pl__ring--b {
  animation-name: ringB;
  stroke: #f49725;
}

.pl__ring--c {
  animation-name: ringC;
  stroke: #255ff4;
}

.pl__ring--d {
  animation-name: ringD;
  stroke: #0a5376;
}

/* Animations */
@keyframes ringA {
  from, 4% {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -330;
  }

  12% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -335;
  }

  32% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -595;
  }

  40%, 54% {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -660;
  }

  62% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -665;
  }

  82% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -925;
  }

  90%, to {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -990;
  }
}

@keyframes ringB {
  from, 12% {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -110;
  }

  20% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -115;
  }

  40% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -195;
  }

  48%, 62% {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  70% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  90% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -305;
  }

  98%, to {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -330;
  }
}

@keyframes ringC {
  from {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: 0;
  }

  8% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -5;
  }

  28% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -175;
  }

  36%, 58% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  66% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  86% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -395;
  }

  94%, to {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -440;
  }
}

@keyframes ringD {
  from, 8% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: 0;
  }

  16% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -5;
  }

  36% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -175;
  }

  44%, 50% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  58% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  78% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -395;
  }

  86%, to {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -440;
  }
}


#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1; /* Initially visible */
  visibility: visible;
  transition: opacity 1s ease-in-out, visibility 1s ease-in-out; /* Add visibility transition */
  z-index: 9999; /* Ensure the loading screen is on top */
}

body.loaded #loading-screen {
  opacity: 0; /* Fade out effect */
  visibility: hidden; /* Ensure it's not interactive after fading out */
}


h1.zoom {
  animation: zoomInOut 7s ease-in-out infinite;
}

@keyframes zoomInOut {
  0%, 20%, 100% {
      transform: scale(1);
  }
  10% {
      transform: scale(1.1); /* Zoom in less (120% of original size) */
  }
}

