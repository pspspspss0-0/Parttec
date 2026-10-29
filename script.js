"use strict";

/* =========================================
   PARTTEC — COMPLETE INTERACTION ENGINE
   Hero + Story + Technology + Neon Road
========================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smooth = (value) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

const range = (value, start, end) =>
  smooth((value - start) / (end - start));

const mix = (a, b, progress) =>
  a + (b - a) * progress;


/* =========================================
   SHARED SCROLL SCENE ENGINE
========================================= */

function createScrollScene(element, render) {
  if (!element) return;

  let frame = null;

  function update() {
    frame = null;

    const rect = element.getBoundingClientRect();
    const distance = element.offsetHeight - window.innerHeight;

    const progress = distance > 0
      ? clamp(-rect.top / distance)
      : 0;

    render(progress);
  }

  function requestUpdate() {
    if (frame !== null) return;
    frame = requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestUpdate, {
    passive: true
  });

  update();
}


/* =========================================
   01 — HERO / GEARS / PARTTEC BRAND
========================================= */

const hero = $("#home");

const gearOne = $(".gear-one");
const gearTwo = $(".gear-two");

const gearWheelOne = $(".gear-one .gear-wheel");
const gearWheelTwo = $(".gear-two .gear-wheel");

const heroBrand = $("#heroBrand");
const heroProgress = $("#heroProgress");
const heroPercent = $("#heroPercent");
const heroHint = $("#heroHint");
const heroGlow = $(".hero-glow");

createScrollScene(hero, (progress) => {

  /* Rotate gears in opposite directions */

  const rotation = progress * 1080;

  if (gearWheelOne) {
    gearWheelOne.style.transform =
      `rotate(${rotation}deg)`;
  }

  if (gearWheelTwo) {
    gearWheelTwo.style.transform =
      `rotate(${-rotation}deg)`;
  }

  /* Move gears away from the center */

  const reveal = range(progress, 0.12, 0.82);

  const shift = reveal * (
    window.innerWidth <= 650 ? 60 : 80
  );

  const scale = 1 - reveal * 0.20;

  if (gearOne) {
    gearOne.style.transform =
      `translate(${-shift}%, -50%) scale(${scale})`;
  }

  if (gearTwo) {
    gearTwo.style.transform =
      `translate(${shift}%, -50%) scale(${scale})`;
  }

  /* Reveal PARTTEC */

  const brandReveal = range(progress, 0.28, 0.66);

  if (heroBrand) {
    heroBrand.style.opacity = brandReveal;

    heroBrand.style.filter =
      `blur(${(1 - brandReveal) * 12}px)`;

    heroBrand.style.transform =
      `translate(-50%, calc(-50% + ${(1 - brandReveal) * 22}px))
             scale(${0.9 + brandReveal * 0.1})`;
  }

  /* Background glow */

  if (heroGlow) {
    heroGlow.style.transform =
      `scale(${1 + progress * 0.35})`;

    heroGlow.style.opacity =
      0.3 + brandReveal * 0.7;
  }

  /* Progress indicators */

  if (heroProgress) {
    heroProgress.style.transform =
      `scaleX(${progress})`;
  }

  if (heroPercent) {
    heroPercent.textContent =
      `${Math.round(progress * 100)}%`;
  }

  if (heroHint) {
    if (progress < 0.1) {
      heroHint.textContent = "SCROLL TO ACTIVATE";
    } else if (progress < 0.6) {
      heroHint.textContent = "AWAKEN THE MACHINE";
    } else if (progress < 0.95) {
      heroHint.textContent = "REVEAL PARTTEC";
    } else {
      heroHint.textContent = "ENTER THE EXPERIENCE";
    }
  }
});


/* =========================================
   02 — STORY / INTRO / TWO CARDS
========================================= */

const story = $("#story");

const storyIntro = $("#storyIntro");
const storyCardA = $("#storyCardA");
const storyCardB = $("#storyCardB");
const storyProgress = $("#storyProgress");

const ambientA = $(".ambient-a");
const ambientB = $(".ambient-b");

createScrollScene(story, (progress) => {

  /* Intro moves upward */

  const introOut = range(progress, 0.02, 0.25);

  if (storyIntro) {
    storyIntro.style.opacity = 1 - introOut;

    storyIntro.style.filter =
      `blur(${introOut * 8}px)`;

    storyIntro.style.transform =
      `translate(-50%, calc(-50% - ${introOut * 100}px))
             scale(${1 - introOut * 0.06})`;

    storyIntro.style.pointerEvents =
      introOut > 0.95 ? "none" : "auto";
  }

  /* Right card */

  const cardAProgress = range(progress, 0.23, 0.51);

  if (storyCardA) {
    storyCardA.style.opacity = cardAProgress;

    storyCardA.style.visibility =
      cardAProgress > 0.001 ? "visible" : "hidden";

    const shift = (1 - cardAProgress) * 90;
    const scale = 0.92 + cardAProgress * 0.08;

    storyCardA.style.transform =
      window.innerWidth <= 650
        ? `translate(-50%, -50%) translateX(${shift}px) scale(${scale})`
        : `translate(${shift}px, -50%) scale(${scale})`;

    storyCardA.style.pointerEvents =
      cardAProgress > 0.95 ? "auto" : "none";
  }

  /* Left card */

  const cardBProgress = range(progress, 0.51, 0.80);

  if (storyCardB) {
    storyCardB.style.opacity = cardBProgress;

    storyCardB.style.visibility =
      cardBProgress > 0.001 ? "visible" : "hidden";

    const shift = (1 - cardBProgress) * 90;
    const scale = 0.92 + cardBProgress * 0.08;

    storyCardB.style.transform =
      window.innerWidth <= 650
        ? `translate(-50%, -50%) translateX(${-shift}px) scale(${scale})`
        : `translate(${-shift}px, -50%) scale(${scale})`;

    storyCardB.style.pointerEvents =
      cardBProgress > 0.95 ? "auto" : "none";
  }

  /* Ambient movement */

  if (ambientA) {
    ambientA.style.transform =
      `translate(${-progress * 60}px, ${progress * 30}px)`;
  }

  if (ambientB) {
    ambientB.style.transform =
      `translate(${progress * 50}px, ${-progress * 35}px)`;
  }

  if (storyProgress) {
    storyProgress.style.transform =
      `scaleX(${progress})`;
  }
});


/* =========================================
   03 — TECHNOLOGY PANELS
========================================= */

const technology = $("#technology");

const techHeading = $("#techHeading");
const techUniverse = $("#techUniverse");

const panelSoftware = $("#panelSoftware");
const panelElectronics = $("#panelElectronics");
const panelEngineering = $("#panelEngineering");

const techStatus = $("#techStatus");

function setTechPanel(panel, opacity, x, y = 0) {
  if (!panel) return;

  panel.style.opacity = opacity;

  panel.style.visibility =
    opacity > 0.001 ? "visible" : "hidden";

  panel.style.transform =
    window.innerWidth <= 650
      ? `translate(-50%, ${y}px)`
      : `translate(${x}px, ${y}px)`;

  panel.style.pointerEvents =
    opacity > 0.95 ? "auto" : "none";
}

createScrollScene(technology, (progress) => {

  const headingOut = range(progress, 0.02, 0.25);

  if (techHeading) {
    techHeading.style.opacity = 1 - headingOut;

    techHeading.style.transform =
      `translate(-50%, ${-headingOut * 60}px)`;
  }

  if (techUniverse) {
    const scale = mix(0.8, 1.05, range(progress, 0, 0.5));
    const rotation = progress * 28;

    techUniverse.style.transform =
      `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;

    techUniverse.style.opacity =
      1 - range(progress, 0.83, 1) * 0.35;
  }

  const software = range(progress, 0.20, 0.43);
 const engineering = range(progress, 0.66, 0.88);

  setTechPanel(
    panelSoftware,
    software,
    (1 - software) * 65
  );

  setTechPanel(
    panelElectronics,
    electronics,
    -(1 - electronics) * 65
  );

  setTechPanel(
    panelEngineering,
    engineering,
    0,
    (1 - engineering) * 45
  );

  if (techStatus) {
    if (progress < 0.20) {
      techStatus.textContent = "INITIALIZING SYSTEM";
    } else if (progress < 0.43) {
      techStatus.textContent = "01 / DIGITAL SYSTEMS";
    } else if (progress < 0.66) {
      techStatus.textContent = "02 / ELECTRONICS";
    } else if (progress < 0.88) {
      techStatus.textContent = "03 / SMART ENGINEERING";
    } else {
      techStatus.textContent = "SYSTEM READY";
    }
  }
});


/* =========================================
   04 — PROJECT CARD REVEALS
========================================= */

const projectCards = document.querySelectorAll(".project-card");

if ("IntersectionObserver" in window) {
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("project-visible");
      projectObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.15
  });

  projectCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    card.style.transition =
      "opacity 700ms ease, transform 700ms ease";

    projectObserver.observe(card);
  });

  const projectStyle = document.createElement("style");

  projectStyle.textContent = `
        .project-card.project-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

  document.head.appendChild(projectStyle);
}


/* =========================================
   05 — ACTIVE NAVIGATION
========================================= */

const navLinks = document.querySelectorAll(".nav-links a");

const sections = [
  $("#story"),
  $("#technology"),
  $("#projects"),
  $("#contact")
].filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const active =
          link.getAttribute("href") === `#${entry.target.id}`;

        link.style.color = active ? "#50d9ff" : "";
      });
    });
  }, {
    rootMargin: "-35% 0px -45% 0px"
  });

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


/* =========================================
   06 — PARTTEC NEON ROAD
   Canvas-based, wavy, scroll-responsive
========================================= */

(() => {
  const canvas = document.getElementById("parttecNeonRoad");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotion.matches) {
    canvas.style.display = "none";
    return;
  }

  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = null;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    renderRoad();
  }

  /*
   * The road follows absolute document coordinates.
   * Smooth bends replace the repetitive spring pattern.
   */

  function roadX(documentY) {
    const mobile = width <= 650;

    const amplitudeA = width * (mobile ? 0.12 : 0.19);
    const amplitudeB = width * (mobile ? 0.035 : 0.065);

    return width * 0.5
      + Math.sin(documentY * 0.00115) * amplitudeA
      + Math.sin(documentY * 0.00042 + 1.2) * amplitudeB;
  }

  function drawRoadPath(startY, endY, scrollY) {
    if (endY <= startY) return;

    ctx.beginPath();

    const step = 4;
    let first = true;

    for (
      let documentY = startY;
      documentY < endY;
      documentY += step
    ) {
      const x = roadX(documentY);
      const screenY = documentY - scrollY;

      if (first) {
        ctx.moveTo(x, screenY);
        first = false;
      } else {
        ctx.lineTo(x, screenY);
      }
    }

    ctx.lineTo(
      roadX(endY),
      endY - scrollY
    );
  }

  function renderRoad() {
    frame = null;

    ctx.clearRect(0, 0, width, height);

    const scrollY = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    /*
     * Only a short segment ahead of the user is drawn.
     * No complete road or spring is displayed at once.
     */

    const lookAhead = Math.min(height * 0.75, 320);

    const startY = Math.max(0, scrollY - 30);
    const endY = Math.min(
      pageHeight,
      scrollY + height + lookAhead
    );

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    /* Subtle road underneath */

    drawRoadPath(startY, endY, scrollY);

    ctx.strokeStyle = "#50d9ff";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.12;
    ctx.shadowBlur = 0;
    ctx.stroke();

    /* Outer blue glow */

    drawRoadPath(startY, endY, scrollY);

    ctx.strokeStyle = "#168cff";
    ctx.lineWidth = width <= 650 ? 6 : 9;
    ctx.globalAlpha = 0.18;
    ctx.shadowColor = "#168cff";
    ctx.shadowBlur = 18;
    ctx.stroke();

    /* Cyan light */

    drawRoadPath(startY, endY, scrollY);

    ctx.strokeStyle = "#50d9ff";
    ctx.lineWidth = width <= 650 ? 2 : 2.5;
    ctx.globalAlpha = 0.8;
    ctx.shadowColor = "#50d9ff";
    ctx.shadowBlur = 11;
    ctx.stroke();

    /* Fine white-blue center */

    drawRoadPath(startY, endY, scrollY);

    ctx.strokeStyle = "#d9faff";
    ctx.lineWidth = 0.65;
    ctx.globalAlpha = 0.6;
    ctx.shadowBlur = 4;
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  function requestRender() {
    if (frame !== null) return;

    frame = requestAnimationFrame(renderRoad);
  }

  window.addEventListener("scroll", requestRender, {
    passive: true
  });

  window.addEventListener("resize", resizeCanvas, {
    passive: true
  });

  window.addEventListener("load", resizeCanvas, {
    once: true
  });

  resizeCanvas();
})();


/* =========================================
   07 — GLOBAL REDUCED MOTION SUPPORT
========================================= */

const globalReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (globalReducedMotion.matches) {
  document.documentElement.style.scrollBehavior = "auto";
}
