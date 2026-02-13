document.addEventListener("DOMContentLoaded", function () {

  var noBtn = document.getElementById("noBtn");
  var yesBtn = document.getElementById("yesBtn");
  var message = document.getElementById("message");

  var noMessages = [
    "Are you sure you want to click No? 😢",
    "Wo, so you hate me? 💔",
    "You still want to say no if I buy you ice cream? 🍦",
    "What if I buy you chocolates too? 🍫",
    "Okay okay... last chance... 😭"
  ];

  var noCount = 0;

  function rectanglesOverlap(r1, r2) {
    return !(
      r1.right < r2.left ||
      r1.left > r2.right ||
      r1.bottom < r2.top ||
      r1.top > r2.bottom
    );
  }

  function moveNoButtonAvoidingYes(padding, maxTries) {
    var playground = document.querySelector(".buttons");
    var playgroundRect = playground.getBoundingClientRect();
    var yesRect = yesBtn.getBoundingClientRect();

    for (var i = 0; i < maxTries; i++) {

      var noRect = noBtn.getBoundingClientRect();

      var maxX = playgroundRect.width - noRect.width - padding;
      var maxY = playgroundRect.height - noRect.height - padding;

      var x = Math.random() * Math.max(0, maxX);
      var y = Math.random() * Math.max(0, maxY);

      noBtn.style.left = x + "px";
      noBtn.style.top = y + "px";

      var newNoRect = noBtn.getBoundingClientRect();

      if (!rectanglesOverlap(newNoRect, yesRect)) return;
    }
  }

  // No button: show message then move
  noBtn.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerHTML = noMessages[noCount % noMessages.length];
    noCount++;

    moveNoButtonAvoidingYes(10, 80);
  });

  // Yes button: keep happy message
  yesBtn.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerHTML = "Yay! 💖 I knew you’d say yes! 😍";
  });

});
