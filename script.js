function openLink(url) {
  window.open(url, "_blank");
}

document.getElementById("share-button").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Check out this page!",
        url: window.location.href,
      });
      console.log("Page shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    const url = window.location.href;
    const textarea = document.createElement("textarea");
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    //cooler notification
    showNotification("URL copied to clipboard!");
  }
});

// Cool notification function
function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: rgba(214, 189, 152, 0.95);
      color: #1A3636;
      padding: 1rem 1.5rem;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      font-weight: 600;
      animation: slideInNotification 0.5s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutNotification 0.5s ease-in";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

//notification animations to CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInNotification {
      from {
          transform: translateX(100%);
          opacity: 0;
      }
      to {
          transform: translateX(0);
          opacity: 1;
      }
  }
  
  @keyframes slideOutNotification {
      from {
          transform: translateX(0);
          opacity: 1;
      }
      to {
          transform: translateX(100%);
          opacity: 0;
      }
  }
`;
document.head.appendChild(style);

// magnetic effect to cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    card.style.transform = `translateY(-15px) scale(1.05) rotateX(${
      deltaY * 10
    }deg) rotateY(${deltaX * 10}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1) rotateX(0deg) rotateY(0deg)";
  });
});

//parallax effect to profile image
let mouseX = 0,
  mouseY = 0;
let profileImg = document.querySelector(".profile img");

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;

  if (profileImg) {
    profileImg.style.transform = `translate(${mouseX * 10}px, ${
      mouseY * 10
    }px)`;
  }
});

//scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});
