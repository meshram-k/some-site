// LOCOMOTIVE SCROLL (Basic Setup)
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// VIDEO PLAY BUTTON ANIMATION
function videoconAnimation() {
  const videocon = document.querySelector("#video-container");
  const playbtn = document.querySelector("#play");

  videocon.addEventListener("mouseenter", () => {
    gsap.to(playbtn, { scale: 1, opacity: 1 });
  });

  videocon.addEventListener("mouseleave", () => {
    gsap.to(playbtn, { scale: 0, opacity: 0 });
  });

  document.addEventListener("mousemove", (e) => {
    gsap.to(playbtn, {
      left: e.clientX - 70,
      top: e.clientY - 80,
    });
  });
}
videoconAnimation();

// LOADING ANIMATION ON PAGE1
function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.6,
    duration: 0.9,
    stagger: 0.3,
  });

  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.3,
  });
}
loadinganimation();

// CUSTOM CURSOR FOLLOW
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    left: e.clientX,
    top: e.clientY,
  });
});

// ENLARGE CURSOR ON HOVER
document.querySelectorAll(".child").forEach((elem) => {
  elem.addEventListener("mouseenter", () => {
    gsap.to("#cursor", {
      transform: "translate(-50%,-50%) scale(1)",
    });
  });
  elem.addEventListener("mouseleave", () => {
    gsap.to("#cursor", {
      transform: "translate(-50%,-50%) scale(0)",
    });
  });
});

// MODAL OPEN / CLOSE
const modal = document.getElementById("authModal");
const openModal = document.querySelector('#icons a[href="/auth"]');
const closeModal = document.querySelector('.modal .close');

if (openModal && closeModal && modal) {
  openModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// TOGGLE BETWEEN LOGIN & SIGNUP
const showLogin = document.getElementById("showLogin");
const showSignup = document.getElementById("showSignup");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

if (showLogin && showSignup && loginForm && signupForm) {
  showLogin.onclick = () => {
    showLogin.classList.add("active");
    showSignup.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
  };

  showSignup.onclick = () => {
    showSignup.classList.add("active");
    showLogin.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
  };
}

// LOGIN FORM SUBMIT
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    document.getElementById("authMessage").innerText = data.success
      ? `Welcome back, ${data.username || "User"}!`
      : data.message;
  } catch (err) {
    document.getElementById("authMessage").innerText = "Something went wrong.";
  }
});

// SIGNUP FORM SUBMIT
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;

  try {
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    document.getElementById("authMessage").innerText = data.success
      ? `Welcome, ${username}!`
      : data.message;
  } catch (err) {
    document.getElementById("authMessage").innerText = "Something went wrong.";
  }
});
