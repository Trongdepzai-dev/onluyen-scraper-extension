// Hàm chung để chạy scraper trên tab
async function runScraper(tab) {
  // Kiểm tra tab hợp lệ
  if (!tab || !tab.id || tab.id === chrome.tabs.TAB_ID_NONE) {
    return;
  }

  // Kiểm tra URL tồn tại
  if (!tab.url) {
    return;
  }

  // Kiểm tra các URL không được phép
  const restrictedUrls = [
    'chrome://',
    'chrome-extension://',
    'about:',
    'edge://',
    'brave://'
  ];

  if (restrictedUrls.some(url => tab.url.startsWith(url))) {
    return;
  }

  // Tiêm content script với error handling
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: false },
      files: ["content.js"]
    });
  } catch (error) {
  }
}

// Lắng nghe tin nhắn từ Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkUpdate") {
    fetch('https://scintillating-kangaroo-6a27a8.netlify.app/update_info.json?t=' + Date.now(), {
      cache: 'no-cache'
    })
      .then(response => response.json())
      .then(data => sendResponse({ success: true, data: data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Giữ kênh tin nhắn mở cho phản hồi bất đồng bộ
  }
});

// Lắng nghe sự kiện click vào icon extension
chrome.action.onClicked.addListener(async (tab) => {
  await runScraper(tab);
});

// Lắng nghe keyboard shortcut (Ctrl+Shift+S)
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "run-scraper") {
    // Lấy tab hiện tại đang active
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      await runScraper(tab);
    }
  }
});
