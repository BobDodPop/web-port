// ipad-utilities.js - iPad Detection and Device-Specific Utilities
class IPadUtilities {
  static get isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }
  
  static get isIPad() {
    return /iPad/.test(navigator.userAgent);
  }
  
  static get isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  static get isLandscape() {
    return window.innerWidth > window.innerHeight;
  }
  
  static initializeIPadMode() {
    if (!this.isIPad) return;
    
    document.body.classList.add('ipad-mode');
    
    // Prevent pinch zoom
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.handleOrientationChange();
      }, 100);
    });
  }
  
  static handleOrientationChange() {
    // Dispatch custom event that pages can listen to
    window.dispatchEvent(new Event('ipadOrientationChange'));
    
    // Refresh iframe sizes if present
    const frames = document.querySelectorAll('iframe');
    frames.forEach(frame => {
      frame.style.height = (window.innerHeight - 56) + 'px';
    });
  }
  
  static enableFullscreen() {
    if (this.isIPad) {
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }
  }
  
  static disableScrollBounce() {
    if (this.isIPad) {
      document.addEventListener('touchmove', (e) => {
        if (e.target === document.body || e.target === document.documentElement) {
          e.preventDefault();
        }
      }, { passive: false });
    }
  }
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    IPadUtilities.initializeIPadMode();
    IPadUtilities.disableScrollBounce();
  });
} else {
  IPadUtilities.initializeIPadMode();
  IPadUtilities.disableScrollBounce();
}
