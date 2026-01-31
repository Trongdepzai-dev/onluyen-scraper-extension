(function() {
    'use strict';

    if (window.chatgptAutomationLoaded) return;
    window.chatgptAutomationLoaded = true;

    console.log("ChatGPT Automation: Script started at", window.location.href);

    function findElementByText(selector, text) {
        return Array.from(document.querySelectorAll(selector)).find(el => {
            const content = el.textContent.trim().toLowerCase();
            return content.includes(text.toLowerCase());
        });
    }

    function waitAndClick(selector, text, callback) {
        const interval = setInterval(() => {
            let element = document.querySelector(selector);
            if (!element && text) {
                element = findElementByText(selector.split(',')[0], text);
            }
            if (element && element.offsetParent !== null) { // Check if visible
                console.log("ChatGPT Automation: Clicking", element);
                clearInterval(interval);
                element.click();
                if (callback) callback();
            }
        }, 800);
        setTimeout(() => clearInterval(interval), 20000);
    }

    function waitAndFill(selector, value, callback) {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element && element.offsetParent !== null) {
                console.log("ChatGPT Automation: Filling field", selector);
                clearInterval(interval);
                element.value = value;
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
                if (callback) callback();
            }
        }, 800);
        setTimeout(() => clearInterval(interval), 20000);
    }

    // Logic chính
    function runAutomation() {
        chrome.storage.local.get(['chatgpt_credentials'], (data) => {
            if (!data.chatgpt_credentials) {
                console.log("ChatGPT Automation: No credentials found in storage.");
                return;
            }

            const credentials = data.chatgpt_credentials;
            const url = window.location.href;

            // BƯỚC 1: Ở trang chủ ChatGPT, nhấn Đăng nhập
            if (url.includes('chatgpt.com') && !url.includes('/auth/')) {
                const loginBtn = document.querySelector('button[data-testid="login-button"]');
                if (loginBtn) {
                    loginBtn.click();
                } else {
                    waitAndClick('button[data-testid="login-button"], a[href*="/auth/login"], button', "Đăng nhập");
                }
            }

            // BƯỚC 2: Trang nhập Email
            if (url.includes('auth.openai.com') || url.includes('/auth/login')) {
                const emailInput = document.querySelector('input#email, input#username, input[name="email"], input[name="username"]');
                if (emailInput) {
                    if (emailInput.value !== credentials.email) {
                        waitAndFill('input#email, input#username, input[name="email"], input[name="username"]', credentials.email, () => {
                            setTimeout(() => {
                                waitAndClick('button[type="submit"], button', "Tiếp tục");
                            }, 500);
                        });
                    }
                }
            }

            // BƯỚC 3: Trang nhập Mật khẩu (thường cùng URL hoặc chuyển tiếp)
            const pwdInput = document.querySelector('input#password, input[name="password"], input[type="password"]');
            if (pwdInput && pwdInput.offsetParent !== null) {
                waitAndFill('input#password, input[name="password"], input[type="password"]', credentials.password, () => {
                    setTimeout(() => {
                        waitAndClick('button[type="submit"], button[name="action"][value="default"], button', "Tiếp tục", () => {
                            // Xoá credentials sau khi hoàn tất nhấn nút cuối
                            setTimeout(() => chrome.storage.local.remove(['chatgpt_credentials']), 5000);
                        });
                    }, 500);
                });
            }
        });
    }

    // Chạy ngay và chạy lại khi DOM thay đổi (vì ChatGPT là SPA)
    runAutomation();
    const observer = new MutationObserver(runAutomation);
    observer.observe(document.body, { childList: true, subtree: true });

})();