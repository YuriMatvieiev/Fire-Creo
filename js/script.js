let bodyLockStatus = true;

// Toggle body lock/unlock with optional delay
const bodyLockToggle = (delay = 500) => {
  if (document.documentElement.classList.contains("lock")) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};

// Unlock the body with optional delay
const bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout(() => {
      lockPaddingElements.forEach((el) => (el.style.paddingRight = ""));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(() => (bodyLockStatus = true), delay);
  }
};

// Lock the body with optional delay
const bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = `${
      window.innerWidth - document.body.offsetWidth
    }px`;
    lockPaddingElements.forEach(
      (el) => (el.style.paddingRight = lockPaddingValue)
    );
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout(() => (bodyLockStatus = true), delay);
  }
};

// Initialize menu interaction
function menuInit() {
  const menuIcon = document.querySelector(".icon-menu");
  if (menuIcon) {
    document.addEventListener("click", function (e) {
      if (bodyLockStatus && e.target.closest(".icon-menu")) {
        bodyLockToggle();
        document.documentElement.classList.toggle("menu-open");
      }
    });
  }
}

// Open the menu
function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}

// Close the menu
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}

menuInit();
