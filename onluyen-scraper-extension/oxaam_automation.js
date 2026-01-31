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
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;800&display=swap');
                    
                    @keyframes oxaam-ultra-enter {
                        0% { opacity: 0; transform: translateX(-50%) scale(0.85) translateY(60px) rotateX(-15deg); filter: blur(20px); }
                        100% { opacity: 1; transform: translateX(-50%) scale(1) translateY(0) rotateX(0); filter: blur(0); }
                    }
                    @keyframes mesh-float {
                        0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                        100% { transform: translate(5%, 10%) rotate(10deg) scale(1.05); }
                    }
                    @keyframes oxaam-shine {
                        0% { transform: translateX(-100%) rotate(45deg); }
                        100% { transform: translateX(200%) rotate(45deg); }
                    }
                    
                    .oxaam-glass {
                        background: rgba(255, 255, 255, 0.85) !important;
                        backdrop-filter: blur(24px) saturate(180%) !important;
                        -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
                    }
                    
                    .oxaam-field {
                        background: rgba(249, 250, 251, 0.6);
                        padding: 18px 20px;
                        border-radius: 24px;
                        margin-bottom: 16px;
                        text-align: left;
                        border: 1.5px solid #f1f5f9;
                        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                        position: relative;
                        overflow: hidden;
                    }
                    .oxaam-field:hover {
                        border-color: #6366f1;
                        background: #ffffff;
                        box-shadow: 0 12px 24px -10px rgba(99, 102, 241, 0.15);
                        transform: translateY(-2px);
                    }
                    
                    .oxaam-copy-mini {
                        position: absolute;
                        right: 12px;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 44px;
                        height: 44px;
                        background: #ffffff;
                        border: 1.5px solid #f1f5f9;
                        border-radius: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #6366f1;
                        cursor: pointer;
                        opacity: 0;
                        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    }
                    .oxaam-field:hover .oxaam-copy-mini {
                        opacity: 1;
                    }
                    .oxaam-copy-mini:hover {
                        background: #6366f1;
                        color: white;
                        border-color: #6366f1;
                        transform: translateY(-50%) scale(1.1);
                    }
                    
                    .oxaam-btn-primary {
                        flex: 2; padding: 18px; 
                        background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); 
                        color: white; border: none; border-radius: 20px; cursor: pointer; 
                        font-weight: 800; font-size: 15px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                        box-shadow: 0 8px 24px -6px rgba(99, 102, 241, 0.5);
                        position: relative; overflow: hidden;
                        display: flex; align-items: center; justify-content: center; gap: 10px;
                    }
                    .oxaam-btn-primary:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 12px 30px -8px rgba(99, 102, 241, 0.6);
                    }
                    .oxaam-btn-primary:active { transform: translateY(-1px); }
                    
                    .oxaam-btn-secondary {
                        flex: 1; padding: 18px; background: #f3f4f6; color: #4b5563; border: none; 
                        border-radius: 20px; cursor: pointer; font-weight: 700; font-size: 15px;
                        transition: all 0.2s;
                    }
                    .oxaam-btn-secondary:hover { background: #e5e7eb; color: #111827; }
                `;
                document.head.appendChild(style);
            }

            const overlay = document.createElement('div');
            overlay.id = 'oxaam-scraper-overlay';
            Object.assign(overlay.style, {
                position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)',
                zIndex: '2147483647',
                padding: '0', borderRadius: '32px', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.35)',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif", width: '420px', 
                textAlign: 'center', overflow: 'hidden',
                animation: 'oxaam-ultra-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            });
            overlay.classList.add('oxaam-glass');

            const meshBg = `
                <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; z-index: -1; pointer-events: none; opacity: 0.15;
                    background: radial-gradient(circle at 30% 20%, #6366f1 0%, transparent 40%),
                                radial-gradient(circle at 70% 60%, #10b981 0%, transparent 40%),
                                radial-gradient(circle at 40% 90%, #f59e0b 0%, transparent 40%);
                    animation: mesh-float 20s infinite alternate ease-in-out;">
                </div>
            `;

            const iconCopy = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
            const iconCheck = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
            const iconShield = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
            const iconLink = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

            const htmlContent = `
                ${meshBg}
                <div id="oxaam-drag-handle" style="padding: 28px; cursor: move; color: #1e293b; display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid rgba(229, 231, 235, 0.4);">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="background: #6366f1; color: white; padding: 10px; border-radius: 16px; box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.4);">
                            ${iconShield}
                        </div>
                        <div style="text-align: left;">
                            <span style="display: block; font-weight: 800; font-size: 19px; letter-spacing: -0.6px; color: #111827;">Tài Khoản ${service || 'Premium'}</span>
                            <span style="font-size: 11px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">Hệ thống an toàn</span>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 32px;">
                    <!-- Email Field -->
                    <div class="oxaam-field">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; opacity: 0.6;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #111827;">Email đăng nhập</span>
                        </div>
                        <div style="padding-right: 50px;">
                            <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 16px; color: #111827; word-break: break-all; font-weight: 800; line-height: 1.3;">${email}</p>
                        </div>
                        <button class="oxaam-copy-mini" title="Copy Email" onclick="navigator.clipboard.writeText('${email}'); this.innerHTML='${iconCheck}'; this.style.background='#10b981'; this.style.color='white'; setTimeout(()=>{this.innerHTML='${iconCopy}'; this.style.background='#ffffff'; this.style.color='#6366f1'}, 1500)">
                            ${iconCopy}
                        </button>
                    </div>
                    
                    <!-- Password Field -->
                    <div class="oxaam-field">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; opacity: 0.6;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #111827;">Mật khẩu / OTP</span>
                        </div>
                        <div style="padding-right: 50px;">
                            <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 16px; color: #111827; word-break: break-all; font-weight: 800; line-height: 1.3;">${password}</p>
                        </div>
                        <button class="oxaam-copy-mini" title="Copy Mật khẩu" onclick="navigator.clipboard.writeText('${password}'); this.innerHTML='${iconCheck}'; this.style.background='#10b981'; this.style.color='white'; setTimeout(()=>{this.innerHTML='${iconCopy}'; this.style.background='#ffffff'; this.style.color='#6366f1'}, 1500)">
                            ${iconCopy}
                        </button>
                    </div>

                    <!-- OTP Link Section -->
                    ${authLink ? `
                    <div style="background: rgba(239, 68, 68, 0.05); padding: 22px; border-radius: 28px; margin-bottom: 32px; text-align: left; border: 1.5px solid rgba(239, 68, 68, 0.15); position: relative;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                            <div style="background: #ef4444; color: white; padding: 6px; border-radius: 10px;">
                                ${iconLink}
                            </div>
                            <span style="font-size: 12px; color: #ef4444; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em;">Lấy Mã Xác Thực (OTP)</span>
                        </div>
                        <a href="${authLink}" target="_blank" style="display: block; font-size: 14px; color: #ef4444; font-weight: 800; text-decoration: none; word-break: break-all; line-height: 1.5; padding: 14px; border-radius: 18px; background: white; border: 1.5px solid rgba(239, 68, 68, 0.1); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.05); transition: all 0.2s;">
                            ${authLink}
                        </a>
                    </div>
                    ` : ''}

                    <!-- Buttons Section -->
                    <div style="display: flex; gap: 14px;">
                        <button id="oxaam-copy-btn" class="oxaam-btn-primary">
                            ${iconCopy} Copy Toàn Bộ
                        </button>
                        <button id="oxaam-close-btn" class="oxaam-btn-secondary">Đóng</button>
                    </div>
                    
                    <!-- Footer -->
                    <div style="margin-top: 32px; display: flex; align-items: center; justify-content: center; gap: 10px; opacity: 0.8;">
                        <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 12px #10b981;"></div>
                        <p style="margin: 0; font-size: 12px; color: #4b5563; font-weight: 700;">Đảm bảo bởi <span style="color: #6366f1; font-weight: 800;">ADMIN onluyenscraper</span></p>
                    </div>
                </div>
            `;

            overlay.innerHTML = htmlContent;
            document.body.appendChild(overlay);

            document.getElementById('oxaam-copy-btn').onclick = function() {
                var text = 'Email: ' + email + '\nPassword: ' + password + (authLink ? '\nLink xác thực: ' + authLink : '');
                navigator.clipboard.writeText(text);
                var btn = document.getElementById('oxaam-copy-btn');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = iconCheck + ' Đã Copy Thành Công!';
                btn.style.background = '#10b981';
                btn.style.boxShadow = '0 8px 24px -6px rgba(16, 185, 129, 0.5)';
                setTimeout(function() {
                    btn.innerHTML = originalHTML;
                    btn.style.background = 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)';
                    btn.style.boxShadow = '0 8px 24px -6px rgba(99, 102, 241, 0.5)';
                }, 2000);
            };

            document.getElementById('oxaam-close-btn').onclick = function() { 
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateX(-50%) scale(0.9) translateY(40px)';
                overlay.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => overlay.remove(), 400);
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

            overlay.innerHTML = htmlContent;
            document.body.appendChild(overlay);

            document.getElementById('oxaam-copy-btn').onclick = function() {
                var text = 'Email: ' + email + '\nPassword: ' + password + (authLink ? '\nLink xác thực: ' + authLink : '');
                navigator.clipboard.writeText(text);
                var btn = document.getElementById('oxaam-copy-btn');
                btn.innerText = 'ĐÃ COPY THÀNH CÔNG!';
                btn.style.background = '#10b981';
                setTimeout(function() {
                    btn.innerText = 'Copy Toàn Bộ';
                    btn.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
                }, 2000);
            };

            document.getElementById('oxaam-close-btn').onclick = function() { 
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateX(-50%) scale(0.9) translateY(40px)';
                overlay.style.transition = 'all 0.4s cubic-bezier(0.2, 1, 0.2, 1)';
                setTimeout(() => overlay.remove(), 400);
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