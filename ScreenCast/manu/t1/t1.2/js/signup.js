const sign_in_btn = document.querySelector("#signin_btn");
const sign_up_btn = document.querySelector("#signup_btn");
const container1 = document.querySelector(".full-content");

sign_up_btn.addEventListener('click', () => {
  container1.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
  container1.classList.remove("sign-up-mode");
});
