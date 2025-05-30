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
const authModal = document.getElementById("authModal");
const accountPopUp = document.getElementById("accountPopUp");
const openModal = document.querySelector('#icons a[href="/auth"]');
const closeModal = document.querySelector('.modal .close');
const accountPopUpCloseModal = document.querySelector('.accountPopUp .close');
const accountContent = document.querySelector(".account-content p");
const logoutButton = document.querySelector(".account-content button");

if (openModal && closeModal && authModal) {
  openModal.addEventListener("click", (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    // already login so open the account details pop up
    if (email) {
      accountContent.innerText = email;
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("email");
        location.reload();
      });
      accountPopUp.style.display = "flex";
      authModal.style.display = "none";
      // need to login
    } else {
      accountPopUp.style.display = "none";
      authModal.style.display = "flex";
    }
  });

  closeModal.addEventListener("click", () => {
    authModal.style.display = "none";
    accountPopUp.style.display = "none";
  });

  accountPopUpCloseModal.addEventListener("click", () => {
    authModal.style.display = "none";
    accountPopUp.style.display = "none"
  });

  window.addEventListener("click", (e) => {
    if (e.target === authModal) {
      authModal.style.display = "none";
      accountPopUp.style.display = "none"
    };
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
    const response = await fetch('http://127.0.0.1:9898/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: email,
        password: password
      })
    });

    const statusCode = response.status;
    const data = await response.json();

    if (statusCode === 200) {
      console.log(`LOGIN SUCCESS: ${data.message}`);
      document.getElementById("authMessage").innerText = `Welcome back, ${data.user.name}!`;

      // Hide modal
      document.getElementById("authModal").style.display = "none";

      // Store email
      localStorage.setItem("email", email);

    } else if (statusCode === 401) {
      console.log(`INVALID CREDENTIALS: ${data.message}`);
      document.getElementById("authMessage").innerText = data.message;
    } else {
      console.log(`UNKNOWN ERROR: ${data.message}`);
      document.getElementById("authMessage").innerText = data.message;
    }

    // Clear inputs
    e.target[0].value = "";
    e.target[1].value = "";

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
    const response = await fetch('http://127.0.0.1:9898/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        id: email,
        password: password
      })
    });

    const statusCode = response.status;
    const data = await response.json();

    // OK
    if (statusCode == 201) {
      // Hide Signup form, show Login form
      document.getElementById("signupForm").classList.remove("active");
      document.getElementById("loginForm").classList.add("active");

      // Toggle button states
      document.getElementById("showSignup").classList.remove("active");
      document.getElementById("showLogin").classList.add("active");

      console.log(`OK: ${data.message}`);
      // Unauthorized
    } else if (statusCode == 404) {
      console.log(`UNAUTHORIZED: ${data.message}`);
      // Account Already Exists
    } else if (statusCode == 409) {
      console.log(`ALREADY EXISTS: ${data.message}`);
      // An Unknown Error
    } else {
      console.log(`UNKNOWN ERROR: ${data.message}`);
    }

    // Clear the values
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";

    document.getElementById("authMessage").innerText = data.message;
  } catch (err) {
    document.getElementById("authMessage").innerText = "Something went wrong.";
  }
});
