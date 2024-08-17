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
    alert("URL copied to clipboard!");
  }
});
