if (location.host === "www.youtube.com") {
  var video;
  const handle = () => {
    if (location.pathname === "/watch") {
      video = video || document.querySelector('video.html5-main-video');
      const button = document.querySelector("[id^='skip-button'] button");
      const content = document.querySelectorAll("[class^='ytp-ad-text']");
      if (content[0] && (video || button)) {
        video.currentTime = video.duration || 999;
        button && button.click();
      }
    } else {
      video = null;
    }
  }
  setInterval(handle, 800);
}
