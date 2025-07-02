document.getElementById("shareButton").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Indrajit Roy - Digital Portfolio",
        text: "Check out my professional profile and connect with me!",
        url: window.location.href,
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        fallbackShare();
      }
    }
  } else {
    fallbackShare();
  }
});

function fallbackShare() {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      showNotification("Profile link copied to clipboard!");
    })
    .catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showNotification("Profile link copied to clipboard!");
    });
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  // Trigger animation
  requestAnimationFrame(() => {
    notification.classList.add("show");
  });

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 400);
  }, 3000);
}

// Smooth scroll for keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
});

// Preload images for better performance
const profileImage = document.querySelector(".profile-image");
const img = new Image();
img.src = profileImage.src;


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".username").forEach((elem) => {
    elem.addEventListener("click", () => {
      const rawText = elem.textContent.trim();
      const cleanedText = rawText.startsWith("@") ? rawText.slice(1) : rawText;

      const searchQuery = encodeURIComponent(cleanedText);
      if (searchQuery) {
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
      }
    });
  });
});

