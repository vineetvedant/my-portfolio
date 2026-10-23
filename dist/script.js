/**
 * ALEJANDROHA.COM AESTHETIC — KINETIC TYPOGRAPHY, CAROUSEL & TRANSITIONS
 * Full-Screen Diagonal Blue Wipe · Kinetic Text Scatter · Carousel Controls · GitHub Integration
 */

// 1. Full-Screen Diagonal Wipe Page Transition (Electric Blue)
function initPageTransitions() {
  const overlay = document.querySelector('.page-wipe-overlay');
  if (!overlay) return;

  // On page load, play entrance transition
  overlay.classList.add('is-active');
  requestAnimationFrame(() => {
    setTimeout(() => {
      overlay.classList.add('is-leaving');
      setTimeout(() => {
        overlay.classList.remove('is-active', 'is-leaving');
      }, 700);
    }, 150);
  });

  // Intercept navigation links for smooth wipe transitions
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') {
      return;
    }

    link.addEventListener('click', (e) => {
      // Internal page navigation
      e.preventDefault();
      overlay.classList.remove('is-leaving');
      overlay.classList.add('is-active');

      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  });
}

// 2. Kinetic Typography Engine (Scatter & Blur on Scroll)
function initKineticTypography() {
  const kineticHeaders = document.querySelectorAll('.kinetic-header');

  kineticHeaders.forEach(header => {
    // Break content into words and characters
    const originalText = header.innerText.trim();
    const words = originalText.split(/\s+/);
    header.innerHTML = '';

    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'kinetic-word';

      const chars = word.split('');
      chars.forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'kinetic-char';
        charSpan.textContent = char;

        // Randomized initial scatter offsets (proportional to viewport to prevent overflow)
        const isSmallScreen = window.innerWidth <= 768;
        const maxScatterX = isSmallScreen ? 18 : 55;
        const maxScatterY = isSmallScreen ? 20 : 40;
        const randomX = (Math.random() - 0.5) * maxScatterX;
        const randomY = (Math.random() - 0.5) * maxScatterY;
        const randomRotate = (Math.random() - 0.5) * 28;

        charSpan.style.setProperty('--x', `${randomX}px`);
        charSpan.style.setProperty('--y', `${randomY}px`);
        charSpan.style.setProperty('--r', `${randomRotate}deg`);

        wordSpan.appendChild(charSpan);
      });

      header.appendChild(wordSpan);

      // Add trailing space between words
      if (wordIdx < words.length - 1) {
        header.appendChild(document.createTextNode(' '));
      }
    });

    header.classList.add('is-scrambled');

    // Scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          header.classList.add('is-in-view');
          header.classList.remove('is-scrambled');
        } else {
          header.classList.remove('is-in-view');
          header.classList.add('is-scrambled');
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(header);
  });
}

// 3. Featured Projects Horizontal Carousel Controls
function initProjectCarousel() {
  const viewport = document.querySelector('.carousel-viewport');
  const prevBtn = document.querySelector('#carouselPrev');
  const nextBtn = document.querySelector('#carouselNext');
  const counterCurrent = document.querySelector('#carouselCurrent');
  const counterTotal = document.querySelector('#carouselTotal');
  const cards = document.querySelectorAll('.carousel-card');

  if (!viewport || cards.length === 0) return;

  if (counterTotal) {
    counterTotal.textContent = String(cards.length).padStart(2, '0');
  }

  // Update counter & button states on scroll
  const updateCarouselState = () => {
    const scrollLeft = viewport.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 32; // including gap
    const activeIndex = Math.round(scrollLeft / cardWidth);

    if (counterCurrent) {
      counterCurrent.textContent = String(Math.min(activeIndex + 1, cards.length)).padStart(2, '0');
    }

    if (prevBtn) {
      prevBtn.disabled = activeIndex <= 0;
    }
    if (nextBtn) {
      nextBtn.disabled = activeIndex >= cards.length - 1;
    }
  };

  viewport.addEventListener('scroll', updateCarouselState, { passive: true });
  updateCarouselState();

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 32;
      viewport.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 32;
      viewport.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }

  // Drag-to-scroll support for desktop mouse
  let isDown = false;
  let startX;
  let scrollLeftPos;

  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    viewport.style.cursor = 'grabbing';
    startX = e.pageX - viewport.offsetLeft;
    scrollLeftPos = viewport.scrollLeft;
  });

  viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.style.cursor = 'default';
  });

  viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.style.cursor = 'default';
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.5;
    viewport.scrollLeft = scrollLeftPos - walk;
  });
}

// 4. Floating Pill Navigation & Active Tracker
function initFloatingNav() {
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinksPill = document.querySelector('.nav-links-pill');
  const backdrop = document.querySelector('.mobile-nav-backdrop');

  const closeMenu = () => {
    if (navLinksPill) navLinksPill.classList.remove('mobile-open');
    if (mobileToggle) {
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    if (backdrop) backdrop.classList.remove('is-active');
    document.body.classList.remove('nav-locked');
  };

  const openMenu = () => {
    if (navLinksPill) navLinksPill.classList.add('mobile-open');
    if (mobileToggle) {
      mobileToggle.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    if (backdrop) backdrop.classList.add('is-active');
    document.body.classList.add('nav-locked');
  };

  if (mobileToggle && navLinksPill) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinksPill.classList.contains('mobile-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    navLinksPill.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinksPill.classList.contains('mobile-open')) {
        closeMenu();
      }
    });

    // Close on window resize above tablet breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960 && navLinksPill.classList.contains('mobile-open')) {
        closeMenu();
      }
    });
  }

  // Active section tracker
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('is-active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('is-active');
      }
    });
  }, { passive: true });
}

// 5. Preserved Live GitHub Integration (Fallback Cache Protected)
async function initGitHubIntegration() {
  const GITHUB_API_URL = 'https://api.github.com/users/vineetvedant/repos';
  const FALLBACK_CACHE_URL = 'github-data.json';

  try {
    let repoDataMap = {};
    let isLive = false;

    // Public API fetch with timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(GITHUB_API_URL, {
        signal: controller.signal,
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const repos = await res.json();
        repos.forEach(r => {
          repoDataMap[r.name.toLowerCase()] = {
            stars: r.stargazers_count,
            forks: r.forks_count,
            updated_at: r.updated_at ? r.updated_at.split('T')[0] : null,
            language: r.language
          };
        });
        isLive = true;
      }
    } catch (apiErr) {
      // Fallback silently if offline or rate-limited
    }

    // Load fallback cache if live fetch timed out
    if (!isLive) {
      try {
        const cacheRes = await fetch(FALLBACK_CACHE_URL);
        if (cacheRes.ok) {
          const cacheData = await cacheRes.json();
          const allRepos = [...(cacheData.featured || []), ...(cacheData.secondary || [])];
          allRepos.forEach(r => {
            repoDataMap[r.repo_name.toLowerCase()] = {
              stars: r.stars,
              forks: 0,
              updated_at: r.updated_at,
              language: r.language
            };
          });
        }
      } catch (cacheErr) {
        // Static DOM fallback remains untouched
      }
    }

    // Populate DOM metrics
    document.querySelectorAll('[data-repo]').forEach(el => {
      const repoKey = el.getAttribute('data-repo').toLowerCase();
      const metrics = repoDataMap[repoKey];
      if (metrics) {
        const starEl = el.querySelector('.repo-stars-val');
        if (starEl && metrics.stars !== undefined) {
          starEl.textContent = metrics.stars;
        }
        const updatedEl = el.querySelector('.repo-updated-val');
        if (updatedEl && metrics.updated_at) {
          updatedEl.textContent = metrics.updated_at;
        }
      }
    });

  } catch (err) {
    // Preserve UI stability
  }
}

// 6. Section Video Cover & Card Reel Playback Controls
function initSectionVideoControls() {
  const coverVideo = document.querySelector('#sectionCoverVideo');
  const soundToggle = document.querySelector('#coverSoundToggle');
  const playToggle = document.querySelector('#coverPlayToggle');

  if (coverVideo) {
    // Sound Toggle
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        coverVideo.muted = !coverVideo.muted;
        const icon = soundToggle.querySelector('.sound-state-icon');
        const label = soundToggle.querySelector('.sound-state-text');
        if (coverVideo.muted) {
          if (icon) icon.textContent = '🔇';
          if (label) label.textContent = 'SOUND OFF';
          soundToggle.setAttribute('title', 'Unmute sound');
        } else {
          if (icon) icon.textContent = '🔊';
          if (label) label.textContent = 'SOUND ON';
          soundToggle.setAttribute('title', 'Mute sound');
        }
      });
    }

    // Play/Pause Toggle
    if (playToggle) {
      playToggle.addEventListener('click', () => {
        if (coverVideo.paused) {
          coverVideo.play();
          const icon = playToggle.querySelector('.play-state-icon');
          if (icon) icon.textContent = '⏸';
          playToggle.setAttribute('title', 'Pause video');
        } else {
          coverVideo.pause();
          const icon = playToggle.querySelector('.play-state-icon');
          if (icon) icon.textContent = '▶';
          playToggle.setAttribute('title', 'Play video');
        }
      });
    }
  }

  // Ensure all videos play when entering viewport (performance & browser power saving)
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(v => {
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback until user interaction
      });
    }
  });

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const vid = entry.target;
      if (entry.isIntersecting) {
        if (vid.paused) {
          const p = vid.play();
          if (p !== undefined) p.catch(() => {});
        }
      } else {
        if (!vid.paused) {
          vid.pause();
        }
      }
    });
  }, { threshold: 0.15 });

  allVideos.forEach(v => videoObserver.observe(v));
}

// 7. Copyright Year
const yearSpan = document.querySelector('#year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// 8. Hero Headline Photo Time-Loop
function initHeroBackgroundLoop() {
  const slides = document.querySelectorAll('.hero-loop-slide');
  if (slides.length <= 1) return;

  let currentIdx = 0;
  setInterval(() => {
    currentIdx = (currentIdx + 1) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle('is-active', i === currentIdx);
    });
  }, 3500);
}

// 9. Delayed Live Tool Slide-In Notification Popup with Sound
function initLiveToolToast() {
  const toast = document.getElementById('liveToolToast');
  const closeBtn = document.getElementById('closeToastBtn');
  if (!toast) return;

  // ── Audio unlock: create AudioContext once, resume it on first user gesture ──
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;
  let audioBuffer = null;
  let ctxUnlocked = false;

  function getCtx() {
    if (!audioCtx && AudioCtx) audioCtx = new AudioCtx();
    return audioCtx;
  }

  // Pre-fetch and decode the WAV as soon as possible
  function preloadAudio() {
    const ctx = getCtx();
    if (!ctx) return;
    fetch('assets/audio/mixkit-select-click-1109.wav')
      .then(r => r.arrayBuffer())
      .then(buf => ctx.decodeAudioData(buf))
      .then(decoded => { audioBuffer = decoded; })
      .catch(() => {});
  }

  // Unlock AudioContext on first user gesture (required by Chrome/Safari)
  function unlockCtx() {
    if (ctxUnlocked) return;
    ctxUnlocked = true;
    const ctx = getCtx();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    // Play a silent buffer to fully unlock on Safari
    if (ctx) {
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    }
    ['click','touchstart','keydown','scroll','mousemove'].forEach(e =>
      document.removeEventListener(e, unlockCtx)
    );
  }

  ['click','touchstart','keydown','scroll','mousemove'].forEach(e =>
    document.addEventListener(e, unlockCtx, { passive: true })
  );

  function playToastSound() {
    const ctx = getCtx();
    if (ctx && audioBuffer) {
      // Best path: pre-decoded buffer ready to go
      try {
        if (ctx.state === 'suspended') ctx.resume();
        const src = ctx.createBufferSource();
        src.buffer = audioBuffer;
        const gain = ctx.createGain();
        gain.gain.value = 0.85;
        src.connect(gain);
        gain.connect(ctx.destination);
        src.start(0);
        return;
      } catch (e) {}
    }
    // Fallback: plain HTML <audio> element
    const el = document.getElementById('toastNotificationSound');
    if (el) {
      el.currentTime = 0;
      el.volume = 0.85;
      el.play().catch(() => {
        // Last resort: create fresh Audio object
        const a = new Audio('assets/audio/mixkit-select-click-1109.wav');
        a.volume = 0.85;
        a.play().catch(() => {});
      });
    }
  }

  preloadAudio();

  const STORAGE_KEY = 'wordtohtml_popup_seen_v2';

  const triggerToast = () => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, 'true');

    // Show popup
    toast.classList.add('is-visible');

    // Play sound — works if user already interacted; else fires on next gesture
    playToastSound();
  };

  // Fire 3.5 s after page fully loads
  if (document.readyState === 'complete') {
    setTimeout(triggerToast, 3500);
  } else {
    window.addEventListener('load', () => setTimeout(triggerToast, 3500));
  }

  // Dismiss handler
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toast.classList.remove('is-visible');
      toast.classList.add('is-dismissed');
      setTimeout(() => { toast.style.display = 'none'; }, 500);
    });
  }
}

// 10. Site Entry Sound — plays on load; shows "Click to Enter" overlay if autoplay blocked
function initSiteEntrySound() {
  const overlay = document.getElementById('siteEntryOverlay');
  const audioEl = document.getElementById('siteEntrySound');
  if (!audioEl) return;

  const ENTRY_KEY = 'site_entry_sound_played';
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let ctx = null;
  let decodedBuffer = null;

  function getCtx() {
    if (!ctx && AudioCtx) ctx = new AudioCtx();
    return ctx;
  }

  // Fetch + decode the WAV immediately for zero-lag playback
  function preload() {
    const c = getCtx();
    if (!c) return;
    fetch('assets/audio/mixkit-ending-wind-swoosh-1482.wav')
      .then(r => r.arrayBuffer())
      .then(buf => c.decodeAudioData(buf))
      .then(decoded => { decodedBuffer = decoded; })
      .catch(() => {});
  }

  function playSound() {
    const c = getCtx();
    if (c && decodedBuffer) {
      try {
        if (c.state === 'suspended') c.resume();
        const src = c.createBufferSource();
        src.buffer = decodedBuffer;
        const gain = c.createGain();
        gain.gain.value = 0.75;
        src.connect(gain);
        gain.connect(c.destination);
        src.start(0);
        return Promise.resolve();
      } catch (e) {}
    }
    // Fallback: HTML audio element
    audioEl.currentTime = 0;
    audioEl.volume = 0.75;
    return audioEl.play();
  }

  function dismissOverlay() {
    if (!overlay) return;
    overlay.classList.remove('is-visible');
    overlay.classList.add('is-exiting');
    setTimeout(() => { overlay.style.display = 'none'; }, 520);
  }

  preload();

  const tryAutoplay = () => {
    if (sessionStorage.getItem(ENTRY_KEY)) return;
    sessionStorage.setItem(ENTRY_KEY, 'true');

    playSound()
      .then(() => {
        dismissOverlay();
      })
      .catch(() => {
        // Autoplay blocked — show brutalist "Click to Enter" overlay
        if (overlay) {
          overlay.classList.add('is-visible');
          const enter = () => {
            overlay.removeEventListener('click', enter);
            playSound().catch(() => {});
            dismissOverlay();
          };
          overlay.addEventListener('click', enter);
        }
      });
  };

  if (document.readyState === 'complete') {
    tryAutoplay();
  } else {
    window.addEventListener('load', tryAutoplay);
  }
}

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initKineticTypography();
  initProjectCarousel();
  initFloatingNav();
  initSectionVideoControls();
  initHeroBackgroundLoop();
  initGitHubIntegration();
  initSiteEntrySound();
  initLiveToolToast();
});




