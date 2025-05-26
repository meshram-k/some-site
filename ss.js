const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});


// function locomotiveAnimation(){
//   gsap.registerPlugin(ScrollTrigger);

// // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector("#main"),
//   smooth: true
// });
// // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
// locoScroll.on("scroll", ScrollTrigger.update);

// // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
// ScrollTrigger.scrollerProxy(".smooth-scroll", {
//   scrollTop(value) {
//     return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//   }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//   getBoundingClientRect() {
//     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//   },
//   // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//   pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
// });











// // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
// ScrollTrigger.refresh();

// }   
// locomotiveAnimation();

// function navbarAnimation() {
//   gsap.to("#nav-part2 #links", {
//     transform: "translateY(-100%)",
//     opacity: 0,
//     scrollerTrigger: {
//       trigger: "#page1",
//       scroller: "#main",
//       // markers:true,
//       start: "top 0",
//       end: "top -5%",
//       scrub: true
//     }
//   })
// }
// navbarAnimation();

function videoconAnimation() {
  var videocon = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");
  videocon.addEventListener("mouseenter", function () {
    // playbtn.style.opacity = 1
    // playbtn.style.scale = 1
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
    });
  });
  videocon.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
    });
  });
  // niche jo dets use kiye hai uske mtlb function ki detais batata hai
  document.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.x - 70,
      top: dets.y - 80
    });
  });
}
videoconAnimation();

function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.6,
    duration: 0.9,
    stagger: 0.3
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.3,
    // stagger:0.3
  });
}
loadinganimation();





document.addEventListener("mousemove", function (dets) {
  gsap.to("#cursor", {
    left: dets.x,
    top: dets.y,
  });
});

//   var a = document.querySelectorAll(".child").addEventListener("mouseenter",function(){
//   gsap.to("#cursor",{
//     transform: 'translate(-50%,-50%) scale(1)'
//   })
// })

// document.querySelector("#child").addEventListener("mouseleave",function(){
//   gsap.to("#cursor",{
//     transform: 'translate(-50%,-50%) scale(0)'
//   })
// })

document.querySelectorAll(".child")
  .forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)"
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(0)"
      });
    });
  });

  // const authIcon = document.getElementById('auth-icon');
  // const authModal = document.getElementById('auth-modal');
  // const closeModal = document.getElementById('close-modal');
  // const loginToggle = document.getElementById('login-toggle');
  // const signupToggle = document.getElementById('signup-toggle');
  // const loginForm = document.getElementById('login-form');
  // const signupForm = document.getElementById('signup-form');
  // const messageDiv = document.getElementById('message');

  // authIcon.onclick = () => {
  //   authModal.classList.add('active');
  //   showLogin();
  //   messageDiv.textContent = '';
  // };

  // closeModal.onclick = () => {
  //   authModal.classList.remove('active');
  //   messageDiv.textContent = '';
  // };

  // authModal.onclick = e => {
  //   if (e.target === authModal) {
  //     authModal.classList.remove('active');
  //     messageDiv.textContent = '';
  //   }
  // };

  // loginToggle.onclick = () => {
  //   loginForm.style.display = 'flex';
  //   signupForm.style.display = 'none';
  //   loginToggle.classList.add('active');
  //   signupToggle.classList.remove('active');
  //   messageDiv.textContent = '';
  // };

  // signupToggle.onclick = () => {
  //   signupForm.style.display = 'flex';
  //   loginForm.style.display = 'none';
  //   signupToggle.classList.add('active');
  //   loginToggle.classList.remove('active');
  //   messageDiv.textContent = '';
  // };

  // loginForm.onsubmit = async e => {
  //   e.preventDefault();
  //   const res = await fetch('/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       email: loginForm.email.value.trim(),
  //       password: loginForm.password.value.trim()
  //     })
  //   });
  //   const data = await res.json();
  //   messageDiv.style.color = res.ok ? 'green' : 'red';
  //   messageDiv.textContent = data.message;
  //   if (res.ok) setTimeout(() => {
  //     authModal.classList.remove('active');
  //     loginForm.reset();
  //   }, 1500);
  // };

  // signupForm.onsubmit = async e => {
  //   e.preventDefault();
  //   const res = await fetch('/signup', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       username: signupForm.username.value.trim(),
  //       email: signupForm.email.value.trim(),
  //       password: signupForm.password.value.trim()
  //     })
  //   });
  //   const data = await res.json();
  //   messageDiv.style.color = res.ok ? 'green' : 'red';
  //   messageDiv.textContent = data.message;
  //   if (res.ok) setTimeout(() => {
  //     loginToggle.click();
  //     signupForm.reset();
  //   }, 1500);
  // };

  // Modal open/close
  const modal = document.getElementById('authModal');
  const openModal = document.querySelector('#icons a[href="/auth"]');
  const closeModal = document.querySelector('.modal .close');

  openModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Toggle
  const showLogin = document.getElementById('showLogin');
  const showSignup = document.getElementById('showSignup');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  showLogin.onclick = () => {
    showLogin.classList.add('active');
    showSignup.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  };

  showSignup.onclick = () => {
    showSignup.classList.add('active');
    showLogin.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  };

  // Submit handlers
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    document.getElementById('authMessage').innerText = data.success
      ? Welcome back, ${data.username || 'User'}!
      : data.message;
  });

  document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    document.getElementById('authMessage').innerText = data.success
      ? Welcome, ${username}!
      : data.message;
  });
  if (openModal) {
  openModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
  });
}
