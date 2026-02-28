document.addEventListener("DOMContentLoaded", () => {
  // Email Copy Interaction
  const copyEmailBtn = document.getElementById("copyEmail");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = copyEmailBtn.getAttribute("data-email");
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showNotification("Email copied to clipboard!");
          
          // Micro-interaction feedback
          const originalContent = copyEmailBtn.innerHTML;
          copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Email Copied!';
          copyEmailBtn.style.background = "#10b981"; // Success Green
          copyEmailBtn.style.color = "#ffffff";
          
          setTimeout(() => {
            copyEmailBtn.innerHTML = originalContent;
            copyEmailBtn.style.background = ""; // Reset to CSS default
            copyEmailBtn.style.color = ""; // Reset to CSS default
          }, 2000);
        })
        .catch(() => {
          showNotification("Copy failed. Please try manually.");
        });
    });
  }

  // Pre-load Profile Image
  const profileImg = document.querySelector(".profile-image");
  if (profileImg) {
    const img = new Image();
    img.src = profileImg.src;
  }
});

function showNotification(message) {
  let notification = document.querySelector(".notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.className = "notification";
    document.body.appendChild(notification);
  }
  
  notification.textContent = message;

  // Trigger Slide Up Animation
  requestAnimationFrame(() => {
    notification.classList.add("show");
  });

  // Slide Down after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Accessibility: Center focus on Tab navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    setTimeout(() => {
      const activeElement = document.activeElement;
      if (activeElement && activeElement.classList.contains("social-link")) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  }
});
