(function() {
    'use strict';

    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    
    // 1. Ghi nhớ dịch vụ
    let service = urlParams.get('service');
    if (service) {
        sessionStorage.setItem('oxaam_current_service', service);
    } else {
        service = sessionStorage.getItem('oxaam_current_service');
    }

    if (currentUrl.includes('login.php')) {
        // Tự động đăng nhập
        const emailInput = document.querySelector('#email');
        const passInput = document.querySelector('#password');
        const submitBtn = document.querySelector('button[type="submit"]');

        if (emailInput && passInput && submitBtn) {
            emailInput.value = 'onluyen@binhtrong.com';
            passInput.value = 'onluyen@binhtrong.com';
            submitBtn.click();
        }
    } else if (currentUrl.includes('oxaam.com')) {
        
        const checkAndAct = function() {
            // 2. Tự động tìm và nhấn vào các khối kích hoạt cụ thể
            const summaries = document.querySelectorAll('summary.perk-summary');
            summaries.forEach(function(s) {
                const text = s.innerText.toUpperCase();
                let shouldClick = false;

                if (service === 'ChatGPT Pro' && text.includes('CG-AI')) {
                    shouldClick = true;
                } else if (service === 'Canva Pro' && (text.includes('KAANVAH') || text.includes('CANVA'))) {
                    shouldClick = true;
                } else if (service === 'Perpixel Max' && text.includes('PURPLIXYEE')) {
                    shouldClick = true;
                } else if (service === 'Scribd Pro' && text.includes('SCRIBD')) {
                    shouldClick = true;
                }

                if (shouldClick && s.parentElement && !s.parentElement.hasAttribute('open')) {
                    s.click();
                    console.log('Auto-activated summary for ' + service + ': ' + text);
                }
            });

            // 3. Tìm thông tin tài khoản
            let email = null;
            let password = null;
            let authLink = null;

            // Kiểm tra ID Rand (Cho các dịch vụ Free)
            const emailRand = document.getElementById('rand-email');
            const linkRand = document.getElementById('rand-link');
            
            if (emailRand) {
                email = emailRand.innerText.trim();
                password = 'Dùng Link OTP bên dưới';
                authLink = linkRand ? linkRand.href : null;
            } else {
                // Kiểm tra theo cấu trúc ➜ 
                const rows = document.querySelectorAll('.cred-block .cred-row');
                const authLinkEl = document.querySelector('.cred-block a.primary-link');
                
                // Trích xuất Email từ row đầu tiên có ➜
                for (let row of rows) {
                    const match = row.innerText.match(/Email\s*➜\s*(.*)/i) || row.innerText.match(/➜\s*(.*)/);
                    if (match && !email) {
                        email = match[1].trim();
                    } else if (match && email && !password) {
                        // Nếu đã có email thì cái tiếp theo là password
                        password = match[1].trim();
                    }
                }

                // Nếu là Canva Pro thì password thường là OTP
                if (service === 'Canva Pro' || (email && !password)) {
                    password = password || 'Dùng Link OTP bên dưới';
                }

                authLink = authLinkEl ? authLinkEl.href : null;
            }

            if (email && !document.getElementById('oxaam-scraper-overlay')) {
                showCredentialsOverlay(email, password, authLink);
                return true; 
            }
            return false;
        };

        // 4. Giao diện Overlay
        const showCredentialsOverlay = function(email, password, authLink) {
            const overlay = document.createElement('div');
            overlay.id = 'oxaam-scraper-overlay';
            Object.assign(overlay.style, {
                position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)',
                zIndex: '2147483647', background: 'white',
                padding: '0', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                border: '1px solid #e5e7eb',
                fontFamily: "sans-serif", width: '380px', 
                textAlign: 'center', overflow: 'hidden'
            });

            const htmlContent = [
                '<div id="oxaam-drag-handle" style="background: #6366f1; padding: 16px; cursor: move; color: white; font-weight: 800; font-size: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">',
                '   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
                '   Tài Khoản ' + (service || 'Premium'),
                '</div>',
                '<div style="padding: 24px;">',
                '   <div style="background: #f8fafc; padding: 14px; border-radius: 16px; margin-bottom: 12px; text-align: left; border: 1px solid #f1f5f9;">',
                '       <p style="margin: 0; font-size: 10px; color: #94a3b8; font-weight: 800; text-transform: uppercase;">Email đăng nhập</p>',
                '       <p style="margin: 4px 0 0 0; font-family: monospace; font-size: 14px; color: #1e293b; word-break: break-all; font-weight: 600;">' + email + '</p>',
                '   </div>',
                '   <div style="background: #f8fafc; padding: 14px; border-radius: 16px; margin-bottom: 16px; text-align: left; border: 1px solid #f1f5f9;">',
                '       <p style="margin: 0; font-size: 10px; color: #94a3b8; font-weight: 800; text-transform: uppercase;">Mật khẩu / OTP</p>',
                '       <p style="margin: 4px 0 0 0; font-family: monospace; font-size: 14px; color: #1e293b; word-break: break-all; font-weight: 600;">' + password + '</p>',
                '   </div>',
                authLink ? [
                    '<div style="background: #fff1f2; padding: 14px; border-radius: 16px; margin-bottom: 20px; text-align: left; border: 1px solid #ffe4e6;">',
                    '   <p style="margin: 0; font-size: 10px; color: #e11d48; font-weight: 800; text-transform: uppercase;">Link Lấy Mã Xác Thực (OTP)</p>',
                    '   <a href="' + authLink + '" target="_blank" style="margin: 6px 0 0 0; display: block; font-size: 13px; color: #e11d48; font-weight: 700; text-decoration: underline; word-break: break-all;">' + authLink + '</a>',
                    '</div>'
                ].join('') : '',
                '   <div style="display: flex; gap: 10px;">',
                '       <button id="oxaam-copy-btn" style="flex: 2; padding: 12px; background: #6366f1; color: white; border: none; border-radius: 14px; cursor: pointer; font-weight: 700; font-size: 14px;">Copy Tài Khoản</button>',
                '       <button id="oxaam-close-btn" style="flex: 1; padding: 12px; background: #f1f5f9; color: #64748b; border: none; border-radius: 14px; cursor: pointer; font-weight: 700; font-size: 14px;">Đóng</button>',
                '   </div>',
                '   <p style="margin: 16px 0 0 0; font-size: 11px; color: #94a3b8; font-weight: 600;">Đảm bảo bởi <span style="color: #6366f1;">ADMIN onluyenscraper</span></p>',
                '</div>'
            ].join('');

            overlay.innerHTML = htmlContent;
            document.body.appendChild(overlay);

            document.getElementById('oxaam-copy-btn').onclick = function() {
                var text = 'Email: ' + email + '\nPassword: ' + password + (authLink ? '\nLink xác thực: ' + authLink : '');
                navigator.clipboard.writeText(text);
                var btn = document.getElementById('oxaam-copy-btn');
                btn.innerText = 'Đã Copy!';
                btn.style.background = '#10b981';
                setTimeout(function() {
                    btn.innerText = 'Copy Tài Khoản';
                    btn.style.background = '#6366f1';
                }, 2000);
            };

            document.getElementById('oxaam-close-btn').onclick = function() { overlay.remove(); };

            var dragHandle = document.getElementById('oxaam-drag-handle');
            var isDragging = false;
            var currentX;
            var currentY;
            var initialX;
            var initialY;
            var xOffset = 0;
            var yOffset = 0;

            dragHandle.onmousedown = function(e) {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
                if (e.target === dragHandle || dragHandle.contains(e.target)) {
                    isDragging = true;
                }
            };

            document.onmousemove = function(e) {
                if (isDragging) {
                    e.preventDefault();
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                    xOffset = currentX;
                    yOffset = currentY;
                    overlay.style.transform = 'translate(calc(-50% + ' + currentX + 'px), ' + currentY + 'px)';
                }
            };

            document.onmouseup = function() {
                isDragging = false;
            };
        };

        const interval = setInterval(function() {
            if (checkAndAct()) {
                clearInterval(interval);
                setTimeout(() => sessionStorage.removeItem('oxaam_current_service'), 10000);
            }
        }, 1000);
    }
})();