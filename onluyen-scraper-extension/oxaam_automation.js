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
        
        // 1.5 Modernize Page UI & Add Status
        const modernizePage = function() {
            if (document.getElementById('oxaam-modern-styles')) return;
            const style = document.createElement('style');
            style.id = 'oxaam-modern-styles';
            style.innerHTML = `
                body { background-color: #f1f5f9 !important; font-family: 'Inter', sans-serif !important; }
                .perk-summary { 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                    border-radius: 12px !important; 
                    margin-bottom: 8px !important;
                }
                .perk-summary:hover { background: #eef2ff !important; transform: translateX(5px); color: #6366f1 !important; }
                .cred-block { 
                    border-radius: 20px !important; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
                    border: 1px solid #e2e8f0 !important;
                    overflow: hidden;
                    animation: oxaam-fade-up 0.5s ease-out;
                }
                @keyframes oxaam-fade-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .scraper-status-badge {
                    position: fixed; top: 20px; right: 20px; z-index: 9999;
                    background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px);
                    padding: 8px 16px; border-radius: 99px; border: 1px solid #e2e8f0;
                    display: flex; align-items: center; gap: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    font-size: 12px; font-weight: 700; color: #6366f1;
                    animation: oxaam-entry 0.5s ease-out;
                }
                .scraper-status-dot {
                    width: 8px; height: 8px; background: #6366f1; border-radius: 50%;
                    animation: scraper-pulse 2s infinite;
                }
                @keyframes scraper-pulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
                    70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
                }
            `;
            document.head.appendChild(style);

            const badge = document.createElement('div');
            badge.className = 'scraper-status-badge';
            badge.innerHTML = `<div class="scraper-status-dot"></div> Auto Scraper Active`;
            document.body.appendChild(badge);
        };

        const checkAndAct = function() {
            modernizePage();
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
                    s.style.outline = '3px solid #6366f1';
                    s.style.outlineOffset = '2px';
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
            // Inject Styles
            if (!document.getElementById('oxaam-styles')) {
                const style = document.createElement('style');
                style.id = 'oxaam-styles';
                style.innerHTML = `
                    @keyframes oxaam-entry {
                        0% { opacity: 0; transform: translateX(-50%) scale(0.9) translateY(20px); filter: blur(10px); }
                        100% { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); filter: blur(0); }
                    }
                    .oxaam-field {
                        background: #f8fafc;
                        padding: 14px;
                        border-radius: 16px;
                        margin-bottom: 12px;
                        text-align: left;
                        border: 1px solid #f1f5f9;
                        transition: all 0.2s;
                        position: relative;
                        overflow: hidden;
                    }
                    .oxaam-field:hover {
                        border-color: #e2e8f0;
                        background: #f1f5f9;
                    }
                    .oxaam-copy-mini {
                        position: absolute;
                        right: 8px;
                        top: 50%;
                        transform: translateY(-50%);
                        padding: 6px 12px;
                        background: white;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        font-size: 11px;
                        font-weight: 700;
                        color: #6366f1;
                        cursor: pointer;
                        opacity: 0;
                        transition: all 0.2s;
                    }
                    .oxaam-field:hover .oxaam-copy-mini {
                        opacity: 1;
                    }
                    .oxaam-btn-primary {
                        flex: 2; padding: 14px; background: #6366f1; color: white; border: none; 
                        border-radius: 16px; cursor: pointer; font-weight: 700; font-size: 14px;
                        transition: all 0.2s; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
                    }
                    .oxaam-btn-primary:hover {
                        background: #4f46e5;
                        transform: translateY(-1px);
                        box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
                    }
                    .oxaam-btn-secondary {
                        flex: 1; padding: 14px; background: #f1f5f9; color: #64748b; border: none; 
                        border-radius: 16px; cursor: pointer; font-weight: 700; font-size: 14px;
                        transition: all 0.2s;
                    }
                    .oxaam-btn-secondary:hover {
                        background: #e2e8f0;
                        color: #475569;
                    }
                `;
                document.head.appendChild(style);
            }

            const overlay = document.createElement('div');
            overlay.id = 'oxaam-scraper-overlay';
            Object.assign(overlay.style, {
                position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)',
                zIndex: '2147483647', background: 'white',
                padding: '0', borderRadius: '28px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                fontFamily: "'Inter', sans-serif", width: '400px', 
                textAlign: 'center', overflow: 'hidden',
                animation: 'oxaam-entry 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            });

            const htmlContent = `
                <div id="oxaam-drag-handle" style="background: #6366f1; padding: 20px; cursor: move; color: white; font-weight: 800; font-size: 16px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <span>Tài Khoản ${service || 'Premium'}</span>
                    </div>
                    <div style="opacity: 0.5; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em;">ID: OX-$(Math.floor(Math.random()*999))</div>
                </div>
                <div style="padding: 28px;">
                    <div class="oxaam-field">
                        <p style="margin: 0; font-size: 10px; color: #94a3b8; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Email đăng nhập</p>
                        <p id="oxaam-email-text" style="margin: 6px 0 0 0; font-family: 'JetBrains Mono', monospace; font-size: 15px; color: #1e293b; word-break: break-all; font-weight: 700;">${email}</p>
                        <button class="oxaam-copy-mini" onclick="navigator.clipboard.writeText('${email}'); this.innerText='OK!'; setTimeout(()=>this.innerText='Copy', 1000)">Copy</button>
                    </div>
                    
                    <div class="oxaam-field">
                        <p style="margin: 0; font-size: 10px; color: #94a3b8; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Mật khẩu / OTP</p>
                        <p id="oxaam-pass-text" style="margin: 6px 0 0 0; font-family: 'JetBrains Mono', monospace; font-size: 15px; color: #1e293b; word-break: break-all; font-weight: 700;">${password}</p>
                        <button class="oxaam-copy-mini" onclick="navigator.clipboard.writeText('${password}'); this.innerText='OK!'; setTimeout(()=>this.innerText='Copy', 1000)">Copy</button>
                    </div>

                    ${authLink ? `
                    <div style="background: #fff1f2; padding: 16px; border-radius: 20px; margin-bottom: 24px; text-align: left; border: 1px solid #ffe4e6;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                            <p style="margin: 0; font-size: 10px; color: #e11d48; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Link Lấy Mã Xác Thực (OTP)</p>
                        </div>
                        <a href="${authLink}" target="_blank" style="display: block; font-size: 13px; color: #e11d48; font-weight: 700; text-decoration: none; word-break: break-all; line-height: 1.4; padding: 4px; border-radius: 8px; background: rgba(225, 29, 72, 0.05);">
                            ${authLink}
                        </a>
                    </div>
                    ` : ''}

                    <div style="display: flex; gap: 12px;">
                        <button id="oxaam-copy-btn" class="oxaam-btn-primary">Copy Toàn Bộ</button>
                        <button id="oxaam-close-btn" class="oxaam-btn-secondary">Đóng</button>
                    </div>
                    
                    <div style="margin-top: 24px; display: flex; align-items: center; justify-content: center; gap: 8px; opacity: 0.7;">
                        <div style="width: 6px; height: 6px; background: #10b981; border-radius: 50%;"></div>
                        <p style="margin: 0; font-size: 11px; color: #64748b; font-weight: 700;">Đảm bảo bởi <span style="color: #6366f1;">ADMIN onluyenscraper</span></p>
                    </div>
                </div>
            `;

            overlay.innerHTML = htmlContent;
            document.body.appendChild(overlay);

            document.getElementById('oxaam-copy-btn').onclick = function() {
                var text = 'Email: ' + email + '\nPassword: ' + password + (authLink ? '\nLink xác thực: ' + authLink : '');
                navigator.clipboard.writeText(text);
                var btn = document.getElementById('oxaam-copy-btn');
                btn.innerText = 'Đã Copy!';
                btn.style.background = '#10b981';
                setTimeout(function() {
                    btn.innerText = 'Copy Toàn Bộ';
                    btn.style.background = '#6366f1';
                }, 2000);
            };

            document.getElementById('oxaam-close-btn').onclick = function() { 
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateX(-50%) scale(0.9) translateY(20px)';
                overlay.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => overlay.remove(), 300);
            };

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
                    overlay.style.transition = 'none';
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