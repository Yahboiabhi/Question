const noBtn = document.getElementById("noBtn"); // / select No button
const yesBtn = document.getElementById("yesBtn"); // / select Yes button
const message = document.getElementById("message"); // / select message area
const fullScreenImage = document.getElementById("fullScreenImage"); // / full-screen overlay

const noMessages = [
  "Are you sure you want to click No? 😢",
  "Wo, so you hate me? 💔",
  "You still want to say no if I buy you ice cream? 🍦",
  "What if I buy you chocolates too? 🍫",
  "Okay okay... last chance... 😭"
]; // / messages shown when No is clicked

let noCount = 0; // / counts how many times No is clicked

function rectanglesOverlap(r1, r2) {
  // / returns true if two rectangles overlap
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

function moveNoButtonAvoidingYes(padding = 10, maxTries = 40) {
  const playground = document.querySelector(".buttons"); // / movement boundary
  const playgroundRect = playground.getBoundingClientRect(); // / boundary size
  const yesRect = yesBtn.getBoundingClientRect(); // / Yes button rectangle

  // / try multiple random positions until No does NOT overlap Yes
  for (let i = 0; i < maxTries; i++) {
    const noRectNow = noBtn.getBoundingClientRect(); // / current No size

    const maxX = playgroundRect.width - noRectNow.width - padding; // / max left
    const maxY = playgroundRect.height - noRectNow.height - padding; // / max top

    const x = Math.random() * Math.max(0, maxX); // / random left
    const y = Math.random() * Math.max(0, maxY); // / random top

    noBtn.style.left = x + "px"; // / apply position
    noBtn.style.top = y + "px";

    const newNoRect = noBtn.getBoundingClientRect(); // / re-measure No after move

    if (!rectanglesOverlap(newNoRect, yesRect)) {
      return; // / stop when we find a safe position
    }
  }

  // / fallback if it keeps overlapping (rare)
  noBtn.style.left = "240px";
  noBtn.style.top = "140px";
}

noBtn.addEventListener("click", () => {
  // / when No is clicked: show next teasing message
  message.innerHTML = noMessages[noCount % noMessages.length];
  noCount++;

  // / then move No somewhere else (without covering Yes)
  moveNoButtonAvoidingYes(10, 50);
});

yesBtn.addEventListener("click", () => {
  // / when Yes is clicked: keep your same message
  message.innerHTML = "Yay! 💖 I knew you’d say yes! 😍";

  // / show big image full screen
  fullScreenImage.style.display = "flex";
});

/* / optional: tap/click anywhere on the image to close it */
fullScreenImage.addEventListener("click", () => {
  fullScreenImage.style.display = "none"; // / hide overlay
});
