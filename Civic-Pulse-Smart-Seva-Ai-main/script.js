function getStarted() {
  const complaintForm = document.getElementById("complaintForm");

  if (complaintForm) {
    complaintForm.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


// ==========================================
// OPEN LOGIN
// ==========================================

function openLogin() {
  const loginPanel = document.getElementById("loginPanel");

  if (!loginPanel) return;

  loginPanel.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

  document.getElementById("loginEmail")?.focus({
    preventScroll: true
  });
}


// ==========================================
// CLOSE LOGIN
// ==========================================

function closeLogin() {
  const loginPanel = document.getElementById("loginPanel");

  if (loginPanel) {
    loginPanel.hidden = true;
  }

  document.getElementById("home")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// ==========================================
// SHOW SIGN UP
// ==========================================

function showSignup(event) {
  event.preventDefault();

  document.getElementById("loginPanel").classList.add("signup-mode");

  document.getElementById("loginForm").hidden = true;
  document.getElementById("signupForm").hidden = false;

  document.getElementById("loginPrompt").hidden = true;
  document.getElementById("signupPrompt").hidden = false;

  document.getElementById("loginTitle").textContent =
    "Create your CPSSAI account";

  document.querySelector(".login-kicker").textContent =
    "Join CPSSAI";

  document.getElementById("signupName").focus({
    preventScroll: true
  });
}


// ==========================================
// SHOW SIGN IN
// ==========================================

function showSignin(event) {
  event.preventDefault();

  document.getElementById("loginPanel").classList.remove("signup-mode");

  document.getElementById("signupForm").hidden = true;
  document.getElementById("loginForm").hidden = false;

  document.getElementById("signupPrompt").hidden = true;
  document.getElementById("loginPrompt").hidden = false;

  document.getElementById("loginTitle").textContent =
    "Sign in to CPSSAI";

  document.querySelector(".login-kicker").textContent =
    "Welcome back";

  document.getElementById("loginEmail").focus({
    preventScroll: true
  });
}


// ==========================================
// FORGOT PASSWORD
// ==========================================

function showLoginNotice(event) {
  event.preventDefault();

  const message = document.getElementById("loginMessage");

  if (message) {
    message.textContent =
      "Password recovery will be available soon.";
  }
}


// ==========================================
// SCROLL TO SECTION
// ==========================================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


// ==========================================
// PAGE LOADED
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  const loadingScreen =
    document.getElementById("loadingScreen");

  const loginPanel =
    document.getElementById("loginPanel");

  const complaintForm =
    document.getElementById("complaintForm");

  const chatInput =
    document.getElementById("chatInput");

  const sendChat =
    document.getElementById("sendChat");

  const chatMessages =
    document.getElementById("chatMessages");

  const loginForm =
    document.getElementById("loginForm");

  const signupForm =
    document.getElementById("signupForm");

  // ==========================================
  // LOADING SCREEN → LOGIN
  // ==========================================

  if (loadingScreen) {

    // Keep login hidden during loading
    if (loginPanel) {
      loginPanel.hidden = true;
    }

    // Loading duration
    window.setTimeout(() => {

      loadingScreen.classList.add("is-complete");

      // Wait for loading animation
      window.setTimeout(() => {

        loadingScreen.remove();

        // Show login after loading
        if (loginPanel) {
          loginPanel.hidden = false;
        }

        window.scrollTo({
          top: 0,
          behavior: "auto"
        });

        document.getElementById("loginEmail")?.focus({
          preventScroll: true
        });

      }, 700);

    }, 4400);

  } else if (loginPanel) {

    loginPanel.hidden = false;

  }


  // ==========================================
  // SIGN IN
  // ==========================================

  if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const email =
        document.getElementById("loginEmail").value.trim();

      const password =
        document.getElementById("loginPassword").value;

      const message =
        document.getElementById("loginMessage");

      const account =
        JSON.parse(
          localStorage.getItem("cpssaiAccount") || "null"
        );


      // Empty fields
      if (!email || !password) {

        message.textContent =
          "Please enter email and password.";

        return;
      }


      // Check saved account
      if (
        account &&
        (
          account.email !== email ||
          account.password !== password
        )
      ) {

        message.textContent =
          "Email or password is incorrect.";

        return;
      }


      // Successful login
      message.textContent =
        `Welcome back, ${account?.name || email}.`;


      // Show homepage
      document.body.classList.add("logged-in");

      // Hide login panel
      document.getElementById("loginPanel").hidden = true;

      // Go to homepage
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  // ==========================================
  // SIGN UP
  // ==========================================

  if (signupForm) {

    signupForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const name =
        document.getElementById("signupName").value.trim();

      const email =
        document.getElementById("signupEmail").value.trim();

      const password =
        document.getElementById("signupPassword").value;

      const confirmPassword =
        document.getElementById(
          "signupConfirmPassword"
        ).value;

      const message =
        document.getElementById("signupMessage");

      // Password check
      if (password !== confirmPassword) {

        message.textContent =
          "Passwords do not match.";

        return;
      }


      // Save account
      localStorage.setItem(
        "cpssaiAccount",
        JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      );


      // Put email into sign in
      document.getElementById("loginEmail").value =
        email;

      document.getElementById("loginPassword").value =
        "";


      // Show message
      document.getElementById("loginMessage").textContent =
        `Account created for ${name}. Please sign in.`;


      // Go back to sign in
      showSignin({
        preventDefault() {}
      });

    });

  }


  // ==========================================
  // COMPLAINT FORM
  // ==========================================

  if (complaintForm) {

    complaintForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const name =
        document.getElementById("name").value.trim();

      const serviceType =
        document.getElementById("serviceType").value;

      const issue =
        document.getElementById("issue").value.trim();


      if (!name || !serviceType || !issue) {

        alert(
          "Please complete all fields before submitting your complaint."
        );

        return;
      }


      alert(
        `Thank you, ${name}! Your ${serviceType.toLowerCase()} complaint has been submitted successfully.`
      );


      complaintForm.reset();

    });

  }


  // ==========================================
  // AI CHATBOT
  // ==========================================

  if (
    chatInput &&
    sendChat &&
    chatMessages
  ) {

    const botReplies = [

      "Please select the service type and describe the issue in detail. We will route it to the right department.",

      "You can track progress through the “Track” section after filing your complaint.",

      "For urgent problems like water leaks or power outages, include the exact location and urgency in your message.",

      "Our AI assistant can help you understand eligibility, steps, and the best next action."

    ];


    function addMessage(text, type) {

      const msg =
        document.createElement("div");

      msg.className =
        `message ${type}`;

      msg.textContent =
        text;

      chatMessages.appendChild(msg);

      chatMessages.scrollTop =
        chatMessages.scrollHeight;

    }


    // Send message
    sendChat.addEventListener("click", () => {

      const value =
        chatInput.value.trim();

      if (!value) {
        return;
      }


      // User message
      addMessage(value, "user");

      chatInput.value = "";


      // Random bot reply
      const reply =
        botReplies[
          Math.floor(
            Math.random() * botReplies.length
          )
        ];


      setTimeout(() => {

        addMessage(reply, "bot");

      }, 500);

    });


    // Enter key
    chatInput.addEventListener("keydown", (event) => {

      if (event.key === "Enter") {

        event.preventDefault();

        sendChat.click();

      }

    });

  }

});