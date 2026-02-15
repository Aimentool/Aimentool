import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin, TextPlugin);

type Cleanup = () => void;

const rand = (min: number, max: number) => gsap.utils.random(min, max, 0.01);

const createScramble = (el: HTMLElement, target: string) => {
  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%';
  let frame = 0;
  const total = 36;
  const update = () => {
    const progress = frame / total;
    const keep = Math.floor(target.length * progress);
    const out = target
      .split('')
      .map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < keep) return ch;
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join('');
    el.textContent = out;
    frame += 1;
    if (frame <= total) requestAnimationFrame(update);
  };
  update();
};

const loadLenis = async () => {
  try {
    const dynamicImport = new Function('m', 'return import(m)') as (m: string) => Promise<any>;
    const mod = await dynamicImport('lenis');
    const Lenis = mod.default || mod.Lenis;
    if (!Lenis) return null;
    return new Lenis({
      duration: 1.05,
      wheelMultiplier: 0.92,
      smoothTouch: false,
      lerp: 0.095,
    });
  } catch {
    return null;
  }
};

export const createStoryAnimation = async (rootSelector = '#story-scroll-root'): Promise<Cleanup> => {
  const root = document.querySelector(rootSelector) as HTMLElement | null;
  if (!root) return () => undefined;

  const ctx = gsap.context(() => {
    const phaseTitles = gsap.utils.toArray<HTMLElement>('.story-phase-copy');
    const chaosCards = gsap.utils.toArray<HTMLElement>('.chaos-card');
    const serviceCards = gsap.utils.toArray<HTMLElement>('.service-card');
    const integrationCards = gsap.utils.toArray<HTMLElement>('.integration-card');

    const bg1 = root.querySelector('.story-bg-1');
    const bg2 = root.querySelector('.story-bg-2');
    const bg3 = root.querySelector('.story-bg-3');
    const bg4 = root.querySelector('.story-bg-4');
    const bg5 = root.querySelector('.story-bg-5');
    const grid = root.querySelector('.story-bg-grid');
    const orbA = root.querySelector('.story-orb-a');
    const orbB = root.querySelector('.story-orb-b');
    const orbC = root.querySelector('.story-orb-c');
    const flowPath = root.querySelector<SVGPathElement>('.story-flow-path');

    phaseTitles.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 36,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%' },
      });
    });

    const entropyTitle = root.querySelector<HTMLElement>('[data-entropy-title]');
    if (entropyTitle) {
      const finalText = entropyTitle.dataset.finalText || entropyTitle.textContent || '';
      entropyTitle.textContent = finalText;
      ScrollTrigger.create({
        trigger: '.story-phase-1',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          createScramble(entropyTitle, finalText);
          gsap.fromTo(
            entropyTitle,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          );
        },
      });
    }

    chaosCards.forEach((card) => {
      const drift = () => {
        gsap.to(card, {
          x: rand(-20, 20),
          y: rand(-14, 14),
          rotation: rand(-2.2, 2.2),
          duration: rand(2.4, 4.6),
          ease: 'sine.inOut',
          onComplete: drift,
        });
      };
      drift();
    });

    const handlePointer = (event: PointerEvent) => {
      chaosCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - event.clientX;
        const dy = cy - event.clientY;
        const dist = Math.hypot(dx, dy);
        const threshold = 220;
        if (dist < threshold) {
          const push = (threshold - dist) / threshold;
          gsap.to(card, {
            x: `+=${(dx / dist) * push * 8 || 0}`,
            y: `+=${(dy / dist) * push * 8 || 0}`,
            scale: 1 + push * 0.04,
            duration: 0.25,
            overwrite: 'auto',
          });
        } else {
          gsap.to(card, { scale: 1, duration: 0.35, overwrite: 'auto' });
        }
      });
    };
    root.addEventListener('pointermove', handlePointer, { passive: true });

    gsap.to('.broken-line', {
      strokeDashoffset: 0,
      opacity: 0.9,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.story-phase-2',
        start: 'top 72%',
      },
    });

    const syncGrid = root.querySelector('.sync-grid');
    ScrollTrigger.create({
      trigger: '.story-phase-3',
      start: 'top 70%',
      once: true,
      onEnter: () => {
        if (!syncGrid || chaosCards.length === 0) return;
        const state = Flip.getState(chaosCards);
        chaosCards.forEach((card, i) => {
          const slot = syncGrid.querySelector(`[data-sync-slot="${i}"]`);
          if (slot) slot.appendChild(card);
          card.classList.add('is-synced');
        });
        Flip.from(state, {
          duration: 1.1,
          ease: 'power3.inOut',
          absolute: true,
          stagger: 0.04,
        });
      },
    });

    if (flowPath) {
      const len = flowPath.getTotalLength();
      gsap.set(flowPath, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(flowPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 12%',
          end: 'bottom 88%',
          scrub: true,
        },
      });
    }

    const bgTl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
    bgTl.to(bg2, { opacity: 1, duration: 1 }, 0.14);
    bgTl.to(bg1, { opacity: 0.35, duration: 1 }, 0.14);
    bgTl.to(bg3, { opacity: 1, duration: 1 }, 0.36);
    bgTl.to(bg2, { opacity: 0.4, duration: 1 }, 0.36);
    bgTl.to(bg4, { opacity: 1, duration: 1 }, 0.58);
    bgTl.to(grid, { opacity: 0.55, duration: 1 }, 0.58);
    bgTl.to(bg3, { opacity: 0.38, duration: 1 }, 0.58);
    bgTl.to(bg5, { opacity: 1, duration: 1 }, 0.82);
    bgTl.to(bg4, { opacity: 0.34, duration: 1 }, 0.82);

    [orbA, orbB, orbC].forEach((orb, i) => {
      if (!orb) return;
      gsap.to(orb, {
        xPercent: i === 0 ? 16 : i === 1 ? -14 : -9,
        yPercent: i === 0 ? -20 : i === 1 ? 16 : -12,
        scale: i === 0 ? 1.16 : i === 1 ? 1.22 : 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    });

    const engineCore = root.querySelector('.engine-core-wrap');
    const pathIn = root.querySelector<SVGPathElement>('.engine-path-in');
    const pathIn2 = root.querySelector<SVGPathElement>('.engine-path-in2');
    const pathOut = root.querySelector<SVGPathElement>('.engine-path-out');
    const pathOut2 = root.querySelector<SVGPathElement>('.engine-path-out2');
    const packetA = root.querySelector('.packet-a');
    const packetB = root.querySelector('.packet-b');
    const packetC = root.querySelector('.packet-c');

    const animateEngineLinks = () => {
      [pathIn, pathIn2, pathOut, pathOut2].forEach((p) => {
        if (!p) return;
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' });
      });
    };

    const startPackets = () => {
      if (packetA && pathIn && pathOut) {
        const tlA = gsap.timeline({ repeat: -1 });
        tlA.to(packetA, { motionPath: { path: pathIn, align: pathIn, autoRotate: false }, duration: 1.2, ease: 'none' });
        tlA.to(packetA, { motionPath: { path: pathOut, align: pathOut, autoRotate: false }, duration: 1.4, ease: 'none' });
      }
      if (packetB && pathIn2 && pathOut2) {
        const tlB = gsap.timeline({ repeat: -1, delay: 0.35 });
        tlB.to(packetB, { motionPath: { path: pathIn2, align: pathIn2, autoRotate: false }, duration: 1.3, ease: 'none' });
        tlB.to(packetB, { motionPath: { path: pathOut2, align: pathOut2, autoRotate: false }, duration: 1.5, ease: 'none' });
      }
      if (packetC && pathIn && pathOut2) {
        const tlC = gsap.timeline({ repeat: -1, delay: 0.7 });
        tlC.to(packetC, { motionPath: { path: pathIn, align: pathIn, autoRotate: false }, duration: 1.05, ease: 'none' });
        tlC.to(packetC, { motionPath: { path: pathOut2, align: pathOut2, autoRotate: false }, duration: 1.25, ease: 'none' });
      }
    };

    if (engineCore) {
      gsap.to(engineCore, {
        scale: 1.025,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    ScrollTrigger.matchMedia({
      '(min-width: 900px)': () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.story-phase-4',
            start: 'top top',
            end: '+=145%',
            pin: '.engine-pin-wrap',
            scrub: 1,
          },
        });
        tl.from('.engine-panel', { opacity: 0, y: 26, duration: 0.4, ease: 'power2.out' });
        tl.call(animateEngineLinks, [], 0.18);
        tl.call(startPackets, [], 0.25);
      },
      '(max-width: 899px)': () => {
        ScrollTrigger.create({
          trigger: '.story-phase-4',
          start: 'top 75%',
          once: true,
          onEnter: () => {
            animateEngineLinks();
            startPackets();
          },
        });
      },
    });

    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        const track = root.querySelector('.service-track');
        if (!track) return;
        const cards = gsap.utils.toArray<HTMLElement>('.service-card');
        const shift = Math.max(0, cards.length - 3) * 24;
        gsap.to(track, {
          xPercent: -shift,
          ease: 'none',
          scrollTrigger: {
            trigger: '.story-phase-5',
            start: 'top top',
            end: '+=120%',
            pin: '.service-pin',
            scrub: true,
          },
        });
      },
    });

    gsap.from(serviceCards, {
      opacity: 0,
      y: 26,
      scale: 0.97,
      stagger: 0.08,
      duration: 0.62,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.service-track', start: 'top 84%' },
    });

    gsap.from(integrationCards, {
      opacity: 0,
      y: 22,
      scale: 0.97,
      stagger: 0.1,
      duration: 0.55,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.integration-grid', start: 'top 82%' },
    });
  }, root);

  const lenis = await loadLenis();
  const raf = (time: number) => lenis?.raf(time * 1000);
  if (lenis) gsap.ticker.add(raf);

  return () => {
    if (lenis) {
      gsap.ticker.remove(raf);
      lenis.destroy();
    }
    ctx.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
};
