document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("auth-form");
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");
    const toggleForm = document.getElementById("toggle-form");
    const toggleLink = document.getElementById("toggle-link");
    const successMsg = document.getElementById("success-msg");
  
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");
  
    let isLogin = false;
  
    
    toggleLink.addEventListener("click", () => {
      isLogin = !isLogin;
      formTitle.textContent = isLogin ? "Log In" : "Sign Up";
      submitBtn.textContent = isLogin ? "Log In" : "Sign Up";
      toggleLink.textContent = isLogin ? "Sign Up" : "Log In";
      toggleForm.firstChild.nodeValue = isLogin ? "Don't have an account? " : "Already have an account? ";
      clearMessages();
    });
  
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearMessages();
  
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (isLogin) {
        login(username, password);
      } else {
        signUp(username, password);
      }
    });
  
   
    function signUp(username, password) {
      if (!validateForm(username, password)) return;
  
      
      if (localStorage.getItem(username)) {
        usernameError.textContent = "Username already taken";
      } else {
        localStorage.setItem(username, JSON.stringify({ password }));
        successMsg.textContent = "Account created successfully! Please log in.";
        toggleLink.click();
      }
    }
  
   
    function login(username, password) {
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.password === password) {
          successMsg.textContent = "Login successful!";
          setTimeout(() => {
            alert("Welcome " + username + "!");
            localStorage.setItem("loggedInUser", username);  
            window.location.href = "Book-app.html";  
            clearMessages();
          }, 500);
        } else {
          passwordError.textContent = "Invalid username or password";
        }
      }
      
  
    
    function validateForm(username, password) {
      let isValid = true;
  
      if (username.length < 4) {
        usernameError.textContent = "Username must be at least 4 characters";
        isValid = false;
      }
  
      if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        isValid = false;
      }
  
      return isValid;
    }
  
    
    function clearMessages() {
      usernameError.textContent = "";
      passwordError.textContent = "";
      successMsg.textContent = "";
    }
  });
  