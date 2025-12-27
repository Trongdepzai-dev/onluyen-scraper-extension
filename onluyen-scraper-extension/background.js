chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.id || tab.id === chrome.tabs.TAB_ID_NONE) {
    console.log("Tab không hợp lệ");
    return;
  }

  if (!tab.url) {
    console.log("Không thể truy cập URL của tab");
    return;
  }

  const restrictedUrls = [
    'chrome://',
    'chrome-extension://',
    'about:',
    'edge://',
    'brave://'
  ];

  if (restrictedUrls.some(url => tab.url.startsWith(url))) {
    console.log("Extension không hoạt động trên trang này");
    return;
  }

  if (!tab.url.includes("onluyen.vn")) {
    console.log("Extension chỉ hoạt động trên OnLuyen.vn");
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: false },
      files: ["content.js"]
    });
    console.log("Content script đã được tiêm thành công!");
  } catch (error) {
    if (error.message.includes("Frame with ID 0 was removed")) {
      console.log("⚠️ Tab đã thay đổi trạng thái (reload/đóng) trước khi script kịp chạy. Vui lòng thử lại.");
      return;
    }

    console.error("Lỗi khi tiêm script:", error.message);
    
    if (error.message.includes("error page") || 
        error.message.includes("Cannot access")) {
      console.log("Trang có thể đang loading hoặc lỗi. Vui lòng thử lại.");
    }
  }
});
