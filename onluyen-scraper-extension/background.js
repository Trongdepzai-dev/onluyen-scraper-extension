// Lắng nghe sự kiện click vào icon extension
chrome.action.onClicked.addListener(async (tab) => {
  // Kiểm tra tab hợp lệ
  if (!tab || !tab.id || tab.id === chrome.tabs.TAB_ID_NONE) {
    console.log("Tab không hợp lệ");
    return;
  }

  // Kiểm tra URL tồn tại
  if (!tab.url) {
    console.log("Không thể truy cập URL của tab");
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
    console.log("Extension không hoạt động trên trang này");
    return;
  }

  // Kiểm tra domain
  if (!tab.url.includes("onluyen.vn")) {
    console.log("Extension chỉ hoạt động trên OnLuyen.vn");
    return;
  }

  // Tiêm content script với error handling
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: false },
      files: ["content.js"]
    });
    console.log("Content script đã được tiêm thành công!");
  } catch (error) {
    // Xử lý lỗi Frame removed (do tab bị đóng hoặc reload nhanh)
    if (error.message.includes("Frame with ID 0 was removed")) {
      console.log("⚠️ Tab đã thay đổi trạng thái (reload/đóng) trước khi script kịp chạy. Vui lòng thử lại.");
      return;
    }

    console.error("Lỗi khi tiêm script:", error.message);
    
    // Thử reload tab nếu gặp lỗi
    if (error.message.includes("error page") || 
        error.message.includes("Cannot access")) {
      console.log("Trang có thể đang loading hoặc lỗi. Vui lòng thử lại.");
    }
  }
});