if (location.host === "www.youtube.com") {
  function handle() {
    if (location.pathname === "/watch") {
      const content = document.querySelectorAll("[class^='ytp-ad-text']");
      const first = content[0] || false;
      if (first) {
        const select = document.querySelector("[id^='skip-button']");
        const video = document.querySelector('video.html5-main-video');
        video.currentTime = video.duration || 999;
        if (select) {
          const button = select.querySelector("button");
          button && button.click();
        }
      }
    }
  }
  setInterval(handle, 800);
}
