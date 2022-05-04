(function countDown() {
  const countDownDate = new Date("Oct 12, 2021 21:00:00").getTime();
  const interval = setInterval(function () {
    let currentTime = new Date().getTime();
    let distance = countDownDate - currentTime;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(interval);
      document.querySelector(".offer__date").innerHTML = "Time off";
    } else {
      document.querySelector(".offer__date").innerHTML =
        "Time left " +
        days +
        ":" +
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
    }
  }, 1000);
})();
