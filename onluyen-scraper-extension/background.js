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
    // URL Localhost (Thay bằng URL production khi deploy)
    const UPDATE_URL = 'http://localhost:3000/update_info.json';
    
    fetch(UPDATE_URL + '?t=' + Date.now(), { cache: 'no-cache' })
      .then(response => response.json())
      .then(data => sendResponse({ success: true, data: data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Giữ kênh tin nhắn mở cho phản hồi bất đồng bộ
  }

  if (request.action === "getPrompt") {
    fetch(chrome.runtime.getURL('PROMPT.md'))
        .then(response => {
            if (!response.ok) throw new Error("Failed to load");
            return response.text();
        })
        .then(text => sendResponse({ success: true, data: text }))
        .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
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
