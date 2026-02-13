const noBtn = document.getElementById("noBtn"); // / select No button
const yesBtn = document.getElementById("yesBtn"); // / select Yes button
const message = document.getElementById("message"); // / select message area

const noMessages = [
  "Are you sure you want to click No? 😢",
  "Wo, so you hate me? 💔",
  "You still want to say no if I buy you ice cream? 🍦",
  "What if I buy you chocolates too? 🍫",
  "Okay okay... last chance... 😭"
]; // / messages shown when No is clicked

let noCount = 0; // / counts No clicks

function rectanglesOverlap(r1, r2) {
  // / returns true if two rectangles overlap
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

function moveNoButtonAvoidingYes(padding = 10, maxTries = 30) {
  const playground = document.querySelector(".buttons"); // / movement boundary

  const playgroundRect = playground.getBoundingClientRect(); // / boundary size
  const noRect = noBtn.getBoundingClientRect(); // / No button size

  // / Try multiple random positions until we find one that doesn't overlap Yes
  for (let i = 0; i < maxTries; i++) {
    const maxX = playgroundRect.width - noRect.width - padding; // / max left
    const maxY = playgroundRect.height - noRect.height - padding; // / max top

    const x = Math.random() * Math.max(0, maxX); // / random left
    const y = Math.random() * Math.max(0, maxY); // / random top

    noBtn.style.left = x + "px"; // / temporarily apply position
    noBtn.style.top = y + "px";

    // / after moving, re-measure rectangles
    const newNoRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // / if no overlap, stop trying
    if (!rectanglesOverlap(newNoRect, yesRect)) {
      return;
    }
  }

  // / if it fails after many tries, push No to a safe spot on the right
  noBtn.style.left = "260px";
  noBtn.style.top = "140px";
}

noBtn.addEventListener("click", () => {
  // / show next message
  message.innerHTML = noMessages[noCount % noMessages.length];
  noCount++;

  // / move No to a position that doesn't overlap Yes
  moveNoButtonAvoidingYes(10, 40);
});

yesBtn.addEventListener("click", () => {
  message.innerHTML = "Yay! 💖 I knew you’d say yes! 😍";
});
