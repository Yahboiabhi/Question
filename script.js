const noBtn = document.getElementById("noBtn"); // / select No button
const yesBtn = document.getElementById("yesBtn"); // / select Yes button
const message = document.getElementById("message"); // / select message area
const fullScreenImage = document.getElementById("fullScreenImage"); // / overlay

const noMessages = [
  "Are you sure you want to click No? 😢",
  "Wo, so you hate me? 💔",
  "You still want to say no if I buy you ice cream? 🍦",
  "What if I buy you chocolates too? 🍫",
  "Okay okay... last chance... 😭"
]; // / messages shown when No is clicked

let noCount = 0; // / counts No clicks

function rectanglesOverlap(r1, r2) {
  // / true if rectangles overlap
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

function moveNoButtonAvoidingYes(padding = 10, maxTries = 50) {
  const playground = document.querySelector(".buttons"); // / movement boundary
  const playgroundRect = playground.getBoundingClientRect(); // / boundary size
  const yesRect = yesBtn.getBoundingClientRect(); // / yes button rect

  for (let i = 0; i < maxTries; i++) {
    const noRectNow = noBtn.getBoundingClientRect(); // / current No size

    const maxX = playgroundRect.width - noRectNow.width - padding; // / max left
    const maxY = playgroundRect.height - noRectNow.height - padding; // / max top

    const x = Math.random() * Math.max(0, maxX); // / random left
    const y = Math.random() * Math.max(0, maxY); // / random top

    noBtn.style.left = x + "px"; // / set position
    noBtn.style.top = y + "px";

    const newNoRect = noBtn.getBoundingClientRect(); // / re-measure No

    if (!rectanglesOverlap(newNoRect, yesRect)) {
      return; // / stop when No does not overlap Yes
    }
  }

  // / fallback safe position
  noBtn.style.left = "240px";
  noBtn.style.top = "140px";
}

noBtn.addEventListener("click", () => {
  message.innerHTML = noMessages[noCount % noMessages.length]; // / rotate message
  noCount++; // / next message next click
  moveNoButtonAvoidingYes(10, 60); // / move No away without overlap
});

yesBtn.addEventListener("click", () => {
  message.innerHTML = "Yay! 💖 I knew you’d say yes! 😍"; // / yes message
  fullScreenImage.style.display = "flex"; // / show full screen image
});

fullScreenImage.addEventListener("click", () => {
  fullScreenImage.style.display = "none"; // / hide image when tapped/clicked
});
