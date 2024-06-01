(function() {
  if (location.host === "www.youtube.com") {
    var video;
    const handle = () => {
      if (location.pathname === "/watch") {
        const button = document.querySelector("[id^='skip-button'] button, [class='ytp-skip-ad-button']");
        const text = document.querySelector("[class^='ytp-ad-text']");
        if (text || button) {
          video = video || document.querySelector('video.html5-main-video');
          // video ? (video.currentTime = video.duration || 999) : null;
          video.playbackRate = 16;
          button && button.click();
        } else {
          if (video && video.playbackRate == 16) {
            video.playbackRate = 1;
          }
        }
        const style = document.createElement('style');
        const styleId = '114514yaju';
        style.id = styleId;
        style.innerHTML = `
        tp-yt-paper-dialog , tp-yt-iron-overlay-backdrop {
          display: none !important;
        }`;
        const element = document.getElementById(styleId);
        !element && document.body.appendChild(style);
      } else video = null;
    };
    setInterval(handle, 500);
  };
})();

// ぽにーのちんこくっせ！w 
