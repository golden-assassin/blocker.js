chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      injectScriptIfNeeded(tab);
    });
  });
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    injectScriptIfNeeded(tab);
  }
});
function injectScriptIfNeeded(tab) {
  if (tab.url && tab.url.includes('youtube.com')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        if (!window.scriptInjected) {
          window.scriptInjected = true;
          var video;
          const csslist = [
            'tp-yt-paper-dialog {display: none;}', // ダイアログを非表示
            'tp-yt-paper-dialog:has(yt-share-panel-header-renderer) { display: block; border:blue 5px solid;}', // シェアボタンのみ表示
            'tp-yt-iron-overlay-backdrop {display: none !important; overflow: auto !important;}',
            'top-banner-image-text-icon-buttoned-layout-view-model, square-image-layout-view-model { display: none !important;}' // 動画横のスポンサー広告を削除
          ];
          const style = (clist) => {
            var csstext = '';
            for (const x of clist) {
              csstext += x;
            }
            return csstext;
          }
          const handle = () => {
            console.log("handle",(video) ? true : false) // console
            if (location.pathname === "/watch") {
              video = video || document.querySelector('video.html5-main-video');
              const button = document.querySelector("[id^='skip-button'] button, [class='ytp-skip-ad-button']");
              const text = document.querySelector("[class^='ytp-ad-text']");
              if (text || button) {
                video.muted = true;
                video.playbackRate = 16;
                console.log("muted & x16") // console
                if (video.paused) {
                  console.log("[if] play()") // console
                  video.play()
                };
                if (video && video.duration && video.duration > 60) {
                  console.log("video.duration") // console
                  video.currentTime = video.duration;
                };
                button && button.click();
              } else {
                if (video && video.playbackRate == 16 || video.muted) {
                  console.log("else 16倍速解除 ミュート解除") // console
                  video.playbackRate = 1;
                  video.muted = false;
                  if (video.paused) {
                    console.log("[else] play()") // console
                    video.play()
                  };
                }
              };
              const Id = '114514';
              const ce = () => {
                const s = document.createElement('style');
                s.id = Id;
                s.innerHTML = style(csslist);;
                document.body.appendChild(s);
              };
              const element = document.getElementById(Id);
              !element && ce();
            } else video = null;
          };
          setInterval(handle, 1000);
        } else {
          console.log('スクリプトは既に実行されています');
        }
      },
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error('Script execution error:', chrome.runtime.lastError.message);
      } else {
        console.log('Script executed successfully:', results);
      }
    });
  }
}


