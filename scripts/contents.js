if (location.host === "www.youtube.com") {
  let video;
  let retry = 0;
  const MAX_RETRY = 5;
  function handle() {
    const content = document.querySelectorAll("[class^='ytp-ad-text']");
    const first = content[0] || false;
    if (first) {
      const selector = document.querySelectorAll("[id^='skip-button']");
      const duration = video.duration || 999;
      video.currentTime = duration;
      if (selector) {
        for (const select of selector) {
          const button = select.querySelector("button");
          button && button.click();
        }
      }
    }
    console.log("handle")
  }
  function waitVideoLoad() {
    (location.pathname === "/watch" && document.readyState === "complete") ?
      (video = document.querySelector('video.html5-main-video')) ?
        (setInterval(handle, 800)) :
        ((retry < MAX_RETRY) ? (retry++, setTimeout(waitVideoLoad, 500)) : null) :
      setTimeout(waitVideoLoad, 1000);
  }
  waitVideoLoad();
}
