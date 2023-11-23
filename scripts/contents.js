if (location.host === "www.youtube.com") {
  var video;
  const handle = () => {
    if (location.pathname === "/watch") {
      const button = document.querySelector("[id^='skip-button'] button");
      const content = document.querySelectorAll("[class^='ytp-ad-text']");
      if (content[0] || button) {
        video = video || document.querySelector('video.html5-main-video');
        video ? (video.currentTime = video.duration || 999) : null;
        button && button.click();
      }
    } else {
      video = null;
    }
  }
  setInterval(handle, 800);
}
