/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                    LOADING MANAGER v1.0.0                         ║
 * ║         Quản lý màn hình loading với phần trăm chính xác         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

class LoadingManager {
  constructor(options = {}) {
    this.containerId = options.containerId || 'scraper-initial-loader';
    this.onComplete = options.onComplete || (() => {});
    this.onProgress = options.onProgress || (() => {});
    
    this.steps = [];
    this.currentStepIndex = -1;
    this.progress = 0;
    this.isComplete = false;
    this.loaderElement = null;
    
    // Cấu hình các bước mặc định
    this.defaultSteps = [
      { id: 'init', name: 'Khởi tạo Core', weight: 15 },
      { id: 'styles', name: 'Tải Styles', weight: 10 },
      { id: 'config', name: 'Tải Cấu hình', weight: 20 },
      { id: 'server', name: 'Kết nối Server', weight: 25 },
      { id: 'auth', name: 'Xác thực', weight: 20 },
      { id: 'ready', name: 'Sẵn sàng', weight: 10 }
    ];
  }

  /**
   * Khởi tạo loading screen
   */
  init(customSteps = null) {
    this.steps = customSteps || this.defaultSteps;
    this.show();
    return this;
  }

  /**
   * Hiển thị loading screen
   */
  show() {
    if (document.getElementById(this.containerId)) return;

    this.loaderElement = document.createElement('div');
    this.loaderElement.id = this.containerId;
    
    const appendLoader = () => {
      if (document.body) {
        document.body.appendChild(this.loaderElement);
        this._initializeUI();
        this._startProgressSimulation();
      } else {
        setTimeout(appendLoader, 50);
      }
    };

    Object.assign(this.loaderElement.style, {
      position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
      background: '#030014', zIndex: '2147483647',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: 'white',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      overflow: 'hidden', perspective: '1000px'
    });

    this.loaderElement.innerHTML = this._getHTMLTemplate();
    appendLoader();
  }

  /**
   * Template HTML cho loading screen
   */
  _getHTMLTemplate() {
    const stepsHTML = this.steps.map((step, index) => `
      <div class="status-step" id="step-${step.id}" style="animation-delay: ${index * 0.3}s">
        <div class="step-icon ${index === 0 ? 'loading' : ''}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${index === 0 
              ? '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>'
              : '<circle cx="12" cy="12" r="10"/>'
            }
          </svg>
        </div>
        <div class="step-content">
          <div class="step-title">${step.name}</div>
          <div class="step-desc">${this._getStepDescription(step.id)}</div>
        </div>
        <span class="step-status ${index === 0 ? 'running' : ''}">${index === 0 ? 'Đang chạy' : 'Chờ'}</span>
      </div>
    `).join('');

    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        .mesh-bg {
          position: absolute; inset: 0;
          background: 
              radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
              radial-gradient(ellipse 60% 60% at 100% 100%, rgba(79, 70, 229, 0.2), transparent),
              radial-gradient(ellipse 40% 40% at 0% 100%, rgba(139, 92, 246, 0.15), transparent),
              linear-gradient(180deg, #030014 0%, #0f0720 50%, #030014 100%);
          z-index: -3;
        }

        .grid-bg {
          position: absolute; inset: 0;
          background-image: 
              linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent);
          animation: grid-move 20s linear infinite;
          z-index: -2;
        }

        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }

        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); opacity: 0.5;
          will-change: transform;
        }

        .orb-1 {
          width: 600px; height: 600px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          top: -20%; left: -15%;
          animation: orb-dance-1 25s ease-in-out infinite;
        }

        .orb-2 {
          width: 500px; height: 500px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          bottom: -15%; right: -10%;
          animation: orb-dance-2 30s ease-in-out infinite;
        }

        .orb-3 {
          width: 300px; height: 300px;
          background: linear-gradient(135deg, #818cf8, #c084fc);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: orb-dance-3 20s ease-in-out infinite;
        }

        @keyframes orb-dance-1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(10%, 10%) scale(1.1) rotate(90deg); }
          50% { transform: translate(-5%, 15%) scale(0.9) rotate(180deg); }
          75% { transform: translate(5%, -5%) scale(1.05) rotate(270deg); }
        }

        @keyframes orb-dance-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15%, -10%) scale(1.15); }
          66% { transform: translate(10%, 5%) scale(0.85); }
        }

        @keyframes orb-dance-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.5; }
        }

        .particles {
          position: absolute; inset: 0;
          z-index: -1; overflow: hidden;
        }

        .particle {
          position: absolute; width: 4px; height: 4px;
          background: rgba(139, 92, 246, 0.6);
          border-radius: 50%;
          animation: particle-float 15s linear infinite;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        @keyframes particle-float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 40px;
          padding: 60px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 35px;
          box-shadow: 
              0 0 0 1px rgba(255, 255, 255, 0.03) inset,
              0 50px 100px -20px rgba(0, 0, 0, 0.5),
              0 30px 60px -30px rgba(79, 70, 229, 0.3);
          animation: card-entrance 1.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
          max-width: 500px;
          width: 90%;
        }

        .glass-card::before {
          content: '';
          position: absolute; inset: -2px;
          border-radius: 42px;
          background: linear-gradient(135deg, 
              rgba(139, 92, 246, 0.4), 
              rgba(99, 102, 241, 0.1), 
              rgba(139, 92, 246, 0.4));
          z-index: -1;
          animation: border-rotate 4s linear infinite;
          background-size: 300% 300%;
          opacity: 0.5;
        }

        @keyframes border-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes card-entrance {
          0% { 
              opacity: 0; 
              transform: translateY(60px) rotateX(10deg) scale(0.9); 
              filter: blur(10px);
          }
          100% { 
              opacity: 1; 
              transform: translateY(0) rotateX(0deg) scale(1); 
              filter: blur(0);
          }
        }

        .logo-container {
          position: relative;
          width: 100px; height: 100px;
          display: flex; align-items: center; justify-content: center;
        }

        .logo-ring {
          position: absolute; inset: 0;
          border-radius: 50%; border: 2px solid transparent;
          border-top-color: rgba(139, 92, 246, 0.8);
          border-right-color: rgba(99, 102, 241, 0.4);
          animation: ring-spin 2s linear infinite;
        }

        .logo-ring:nth-child(2) {
          inset: 8px;
          animation-duration: 3s; animation-direction: reverse;
          border-top-color: rgba(99, 102, 241, 0.6);
          border-right-color: rgba(139, 92, 246, 0.3);
        }

        .logo-ring:nth-child(3) {
          inset: 16px; animation-duration: 4s;
          border-top-color: rgba(167, 139, 250, 0.5);
          border-right-color: rgba(99, 102, 241, 0.2);
        }

        @keyframes ring-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .logo-core {
          width: 60px; height: 60px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.3));
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          animation: core-pulse 3s ease-in-out infinite;
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.2);
        }

        @keyframes core-pulse {
          0%, 100% { 
              transform: scale(1); 
              box-shadow: 0 0 30px rgba(99, 102, 241, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.2);
          }
          50% { 
              transform: scale(1.05); 
              box-shadow: 0 0 50px rgba(99, 102, 241, 0.5), inset 0 0 30px rgba(139, 92, 246, 0.4);
          }
        }

        .rocket-icon {
          color: white;
          filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.8));
          animation: rocket-float 4s ease-in-out infinite;
        }

        @keyframes rocket-float {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }

        .title-section {
          text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px;
        }

        .title-main {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 40px; font-weight: 700; letter-spacing: -0.03em;
          background: linear-gradient(135deg, #ffffff 0%, #c7d2fe 30%, #a5b4fc 60%, #818cf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          text-shadow: 0 0 80px rgba(139, 92, 246, 0.5);
          animation: title-shimmer 3s ease-in-out infinite; background-size: 200% 200%;
        }

        @keyframes title-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .title-sub {
          font-size: 13px; font-weight: 500; color: rgba(167, 139, 250, 0.8);
          letter-spacing: 0.3em; text-transform: uppercase;
        }

        .version-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));
          color: #a5b4fc; padding: 6px 14px; border-radius: 100px;
          border: 1px solid rgba(139, 92, 246, 0.2); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.1);
        }

        .version-dot {
          width: 6px; height: 6px; background: #22c55e; border-radius: 50%;
          animation: dot-pulse 2s ease-in-out infinite; box-shadow: 0 0 10px #22c55e;
        }

        @keyframes dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .loading-section {
          display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100%;
        }

        .progress-container {
          width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 10px;
        }

        .progress-header {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px; color: rgba(167, 139, 250, 0.7); font-weight: 500;
        }

        .progress-percent {
          font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 700; color: #a5b4fc;
        }

        .progress-bar {
          width: 100%; height: 8px; background: rgba(255, 255, 255, 0.05);
          border-radius: 100px; overflow: hidden; position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #8b5cf6, #6366f1);
          background-size: 200% 100%; border-radius: 100px; width: 0%;
          animation: progress-shimmer 2s linear infinite;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
          transition: width 0.3s ease-out;
        }

        @keyframes progress-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .progress-glow {
          position: absolute; top: 0; left: 0; height: 100%; width: 30%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: glow-slide 2s ease-in-out infinite;
        }

        @keyframes glow-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .status-steps {
          display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 320px;
        }

        .status-step {
          display: flex; align-items: center; gap: 12px; padding: 10px 14px;
          background: rgba(255, 255, 255, 0.02); border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          opacity: 0; transform: translateX(-20px);
          animation: step-appear 0.5s ease-out forwards;
          transition: all 0.3s ease;
        }

        .status-step.active {
          background: rgba(99, 102, 241, 0.08);
          border-color: rgba(99, 102, 241, 0.2);
        }

        .status-step.completed {
          background: rgba(34, 197, 94, 0.05);
          border-color: rgba(34, 197, 94, 0.15);
        }

        @keyframes step-appear {
          to { opacity: 1; transform: translateX(0); }
        }

        .step-icon {
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1));
          color: #a5b4fc; transition: all 0.3s ease;
        }

        .step-icon.completed {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
          color: #22c55e;
        }

        .step-icon.loading {
          animation: icon-spin 1s linear infinite;
        }

        @keyframes icon-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .step-content { flex: 1; }
        .step-title { font-size: 12px; font-weight: 600; color: rgba(255, 255, 255, 0.9); }
        .step-desc { font-size: 10px; color: rgba(167, 139, 250, 0.6); margin-top: 2px; }
        .step-status {
          font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 600;
          padding: 3px 8px; border-radius: 6px; background: rgba(99, 102, 241, 0.1); color: #818cf8;
          transition: all 0.3s ease;
        }

        .step-status.running { background: rgba(99, 102, 241, 0.2); color: #a5b4fc; }
        .step-status.done { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
        .step-status.error { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

        .loader-footer {
          display: flex; align-items: center; gap: 24px; margin-top: 8px;
        }

        .footer-link {
          font-size: 11px; color: rgba(167, 139, 250, 0.5); text-decoration: none;
          transition: color 0.3s ease; display: flex; align-items: center; gap: 6px;
        }

        .footer-link:hover { color: #a5b4fc; }

        .corner-decoration {
          position: absolute; width: 80px; height: 80px; pointer-events: none;
        }

        .corner-decoration.top-left {
          top: 20px; left: 20px; border-top: 2px solid rgba(139, 92, 246, 0.2);
          border-left: 2px solid rgba(139, 92, 246, 0.2); border-top-left-radius: 20px;
        }

        .corner-decoration.bottom-right {
          bottom: 20px; right: 20px; border-bottom: 2px solid rgba(139, 92, 246, 0.2);
          border-right: 2px solid rgba(139, 92, 246, 0.2); border-bottom-right-radius: 20px;
        }

        .loading-details {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(167, 139, 250, 0.5);
          text-align: center;
          margin-top: 8px;
        }
      </style>
      
      <div class="mesh-bg"></div>
      <div class="grid-bg"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="particles" id="particles"></div>
      <div class="corner-decoration top-left"></div>
      <div class="corner-decoration bottom-right"></div>
      
      <div class="glass-card" id="glass-card">
          <div class="logo-container">
              <div class="logo-ring"></div>
              <div class="logo-ring"></div>
              <div class="logo-ring"></div>
              <div class="logo-core">
                  <svg class="rocket-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1"/>
                      <path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4"/>
                  </svg>
              </div>
          </div>
          
          <div class="title-section">
              <h1 class="title-main">ONLUYEN SCRAPER</h1>
              <p class="title-sub">Data Extraction Engine</p>
              <div class="version-badge">
                  <span class="version-dot"></span>
                  <span>v${chrome?.runtime?.getManifest?.()?.version || '4.0.0'}</span>
              </div>
          </div>

          <div class="loading-section">
              <div class="progress-container">
                  <div class="progress-header">
                      <span id="progress-text">Đang khởi tạo...</span>
                      <span class="progress-percent" id="progress-percent">0%</span>
                  </div>
                  <div class="progress-bar">
                      <div class="progress-fill" id="progress-fill"></div>
                      <div class="progress-glow"></div>
                  </div>
              </div>

              <div class="status-steps" id="status-steps">
                  ${stepsHTML}
              </div>
              
              <div class="loading-details" id="loading-details"></div>
          </div>

          <div class="loader-footer">
              <span class="footer-link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                  </svg>
                  <span id="elapsed-time">00:00</span>
              </span>
          </div>
      </div>
    `;
  }

  /**
   * Lấy mô tả cho từng bước
   */
  _getStepDescription(stepId) {
    const descriptions = {
      'init': 'Loading core modules',
      'styles': 'Injecting CSS styles',
      'config': 'Loading user settings',
      'server': 'Connecting to API server',
      'auth': 'Verifying credentials',
      'ready': 'Preparing interface'
    };
    return descriptions[stepId] || 'Processing...';
  }

  /**
   * Khởi tạo UI và các hiệu ứng
   */
  _initializeUI() {
    // Tạo particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
      for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${15 + Math.random() * 20}s`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
      }
    }

    // Hiệu ứng 3D cho card
    const card = document.getElementById('glass-card');
    if (card) {
      this._cardMouseMoveHandler = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (y / rect.height) * -5;
        const rotateY = (x / rect.width) * 5;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      this._cardMouseLeaveHandler = () => {
        card.style.transform = 'rotateX(0) rotateY(0)';
      };

      document.addEventListener('mousemove', this._cardMouseMoveHandler);
      document.addEventListener('mouseleave', this._cardMouseLeaveHandler);
    }

    // Bắt đầu đếm thời gian
    this.startTime = Date.now();
    this._updateElapsedTime();
  }

  /**
   * Cập nhật thời gian đã trôi qua
   */
  _updateElapsedTime() {
    if (!this.loaderElement) return;
    
    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    
    const timeEl = document.getElementById('elapsed-time');
    if (timeEl) timeEl.textContent = `${minutes}:${seconds}`;
    
    if (!this.isComplete) {
      this.elapsedTimer = setTimeout(() => this._updateElapsedTime(), 1000);
    }
  }

  /**
   * Bắt đầu mô phỏng tiến trình thông minh
   * Tự động tăng % trong phạm vi của bước hiện tại để tạo cảm giác xử lý realtime
   */
  _startProgressSimulation() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);

    this.simulationInterval = setInterval(() => {
      if (this.isComplete) {
        clearInterval(this.simulationInterval);
        return;
      }

      // Xác định bước đang chạy (nếu chưa bắt đầu bước nào thì là bước 0)
      const activeStepIndex = this.currentStepIndex + 1;
      
      // Nếu đã xong hết các bước thì thôi
      if (activeStepIndex >= this.steps.length) return;

      // Tính tổng weight các bước ĐÃ xong
      let completedWeight = 0;
      for (let i = 0; i < activeStepIndex; i++) {
        completedWeight += this.steps[i].weight;
      }

      // Tính ngưỡng tối đa cho bước ĐANG chạy
      // (Tổng weight cũ + weight bước hiện tại)
      const currentStepWeight = this.steps[activeStepIndex].weight;
      const currentStepMax = completedWeight + currentStepWeight;

      // Đặt ngưỡng chờ (buffer) để không chạy lố 100% của bước đó khi chưa xong
      // Giữ lại khoảng 15% của bước đó để dành cho sự kiện completeStep nhảy nốt
      const buffer = Math.max(1, Math.round(currentStepWeight * 0.15));
      const limit = Math.min(98, currentStepMax - buffer);

      // Tăng từ từ nếu chưa chạm ngưỡng
      if (this.progress < limit) {
        // Tốc độ ngẫu nhiên để trông tự nhiên: 0.05 - 0.25 mỗi lần (chậm lại khi gần đích)
        const distanceToLimit = limit - this.progress;
        const speedFactor = Math.max(0.1, distanceToLimit / 10); // Càng gần càng chậm
        const increment = (Math.random() * 0.2 + 0.05) * speedFactor;
        
        this.progress = Math.min(limit, this.progress + increment);
        
        // Cập nhật UI (chỉ update thanh bar và số %, không đổi text)
        this._updateProgressDisplay(this.progress, null);
      }
    }, 100); // Cập nhật mỗi 100ms
  }

  /**
   * Hoàn thành một bước và cập nhật phần trăm
   */
  completeStep(stepId, success = true, message = null) {
    const stepIndex = this.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return this;

    const step = this.steps[stepIndex];
    const stepEl = document.getElementById(`step-${stepId}`);
    
    if (stepEl) {
      // Cập nhật UI cho bước đã hoàn thành
      stepEl.classList.add('completed');
      stepEl.classList.remove('active');
      
      const icon = stepEl.querySelector('.step-icon');
      const status = stepEl.querySelector('.step-status');
      
      if (icon) {
        icon.classList.remove('loading');
        icon.classList.add('completed');
        icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
      }
      
      if (status) {
        status.textContent = success ? 'Hoàn thành' : 'Lỗi';
        status.classList.add(success ? 'done' : 'error');
        status.classList.remove('running');
      }
    }

    // Kích hoạt bước tiếp theo
    const nextStep = this.steps[stepIndex + 1];
    if (nextStep) {
      const nextStepEl = document.getElementById(`step-${nextStep.id}`);
      if (nextStepEl) {
        nextStepEl.classList.add('active');
        const nextIcon = nextStepEl.querySelector('.step-icon');
        const nextStatus = nextStepEl.querySelector('.step-status');
        
        if (nextIcon) {
          nextIcon.classList.add('loading');
          nextIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
        }
        if (nextStatus) {
          nextStatus.textContent = 'Đang chạy';
          nextStatus.classList.add('running');
        }
      }
    }

    // Tính toán phần trăm dựa trên trọng số các bước
    this.currentStepIndex = stepIndex;
    this.progress = this._calculateProgress();
    
    const progressText = message || (nextStep ? `Đang ${nextStep.name.toLowerCase()}...` : 'Hoàn thành!');
    this._updateProgressDisplay(this.progress, progressText);
    
    // Gọi callback
    this.onProgress({
      step: stepId,
      stepName: step.name,
      progress: this.progress,
      totalSteps: this.steps.length,
      currentStepIndex: stepIndex
    });

    // Kiểm tra nếu tất cả các bước đã hoàn thành
    if (stepIndex === this.steps.length - 1) {
      this._finish();
    }

    return this;
  }

  /**
   * Tính toán phần trăm dựa trên trọng số
   */
  _calculateProgress() {
    let completedWeight = 0;
    for (let i = 0; i <= this.currentStepIndex; i++) {
      completedWeight += this.steps[i].weight;
    }
    return Math.min(100, Math.round(completedWeight));
  }

  /**
   * Cập nhật hiển thị phần trăm
   */
  _updateProgressDisplay(percent, text) {
    const percentEl = document.getElementById('progress-percent');
    const fillEl = document.getElementById('progress-fill');
    const textEl = document.getElementById('progress-text');
    
    if (percentEl) percentEl.textContent = `${Math.floor(percent)}%`;
    if (fillEl) fillEl.style.width = `${percent}%`;
    if (textEl && text) textEl.textContent = text;
  }

  /**
   * Cập nhật chi tiết loading
   */
  updateDetails(detail) {
    const detailsEl = document.getElementById('loading-details');
    if (detailsEl) detailsEl.textContent = detail;
  }

  /**
   * Hoàn thành loading
   */
  _finish() {
    this.isComplete = true;
    this.progress = 100;
    this._updateProgressDisplay(100, 'Sẵn sàng!');
    
    if (this.elapsedTimer) clearTimeout(this.elapsedTimer);
    
    // Đợi một chút rồi ẩn
    setTimeout(() => {
      this.hide();
      this.onComplete({
        duration: Date.now() - this.startTime,
        totalSteps: this.steps.length
      });
    }, 800);
  }

  /**
   * Ẩn loading screen
   */
  hide() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);
    
    // Cleanup event listeners
    if (this._cardMouseMoveHandler) {
      document.removeEventListener('mousemove', this._cardMouseMoveHandler);
    }
    if (this._cardMouseLeaveHandler) {
      document.removeEventListener('mouseleave', this._cardMouseLeaveHandler);
    }

    if (this.loaderElement) {
      this.loaderElement.style.opacity = '0';
      this.loaderElement.style.filter = 'blur(40px)';
      this.loaderElement.style.transform = 'scale(1.05)';
      setTimeout(() => {
        if (this.loaderElement && this.loaderElement.parentNode) {
          this.loaderElement.remove();
        }
        this.loaderElement = null;
      }, 800);
    }
  }

  /**
   * Force complete - hoàn thành ngay lập tức
   */
  forceComplete() {
    this.steps.forEach((step, index) => {
      setTimeout(() => {
        this.completeStep(step.id);
      }, index * 100);
    });
  }
}

// Export cho cả ES module và global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LoadingManager;
}

if (typeof window !== 'undefined') {
  window.LoadingManager = LoadingManager;
}
