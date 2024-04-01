const counters = document.querySelectorAll(".count");

counters.forEach((counter) => {
  const minus = counter.parentNode.querySelector(".minus");
  const plus = counter.parentNode.querySelector(".plus");
  let count = 0;

  minus.addEventListener("click", () => {
    if (count <= 0) {
      return;
    }
    count--;
    counter.textContent = count;
  });

  plus.addEventListener("click", () => {
    count++;
    counter.textContent = count;
  });
});
