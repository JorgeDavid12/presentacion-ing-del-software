/* =========================================================
   Presentación: Administración de la Calidad del Software
   JavaScript modular para Reveal.js, Mermaid e interacción.
   ========================================================= */

const QualityDeck = (() => {
  const state = {
    canvas: null,
    ctx: null,
    particles: [],
    animationId: null,
    width: 0,
    height: 0,
    pixelRatio: 1
  };

  const init = async () => {
    initParticles();
    await initReveal();
    initMermaid();
    initInteractiveQuestion();
    activateCurrentSlide();
  };

  const initReveal = async () => {
    if (!window.Reveal) {
      document.body.classList.add("reveal-unavailable");
      return;
    }

    await Reveal.initialize({
      hash: true,
      controls: true,
      progress: true,
      slideNumber: "c/t",
      center: true,
      width: 1280,
      height: 720,
      margin: 0.045,
      minScale: 0.25,
      maxScale: 1.35,
      transition: "convex",
      backgroundTransition: "fade",
      controlsTutorial: false,
      plugins: window.RevealNotes ? [RevealNotes] : []
    });

    Reveal.on("ready", activateCurrentSlide);
    Reveal.on("slidechanged", activateCurrentSlide);
    Reveal.on("fragmentshown", activateCurrentSlide);
  };

  const initMermaid = () => {
    if (!window.mermaid) return;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "dark",
      themeVariables: {
        background: "transparent",
        primaryColor: "#0a1824",
        primaryTextColor: "#f8fbff",
        primaryBorderColor: "#2efcff",
        lineColor: "#56ff8e",
        secondaryColor: "#102032",
        tertiaryColor: "#09111a",
        fontFamily: "Inter, sans-serif"
      },
      flowchart: {
        curve: "basis",
        htmlLabels: true
      }
    });

    mermaid.run({ querySelector: ".mermaid" }).catch((error) => {
      console.warn("Mermaid no pudo renderizar un diagrama:", error);
    });
  };

  const initParticles = () => {
    state.canvas = document.getElementById("tech-canvas");
    if (!state.canvas) return;

    state.ctx = state.canvas.getContext("2d");
    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
  };

  const resizeCanvas = () => {
    state.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    state.canvas.width = Math.floor(state.width * state.pixelRatio);
    state.canvas.height = Math.floor(state.height * state.pixelRatio);
    state.canvas.style.width = `${state.width}px`;
    state.canvas.style.height = `${state.height}px`;
    state.ctx.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
  };

  const createParticles = () => {
    const count = Math.max(42, Math.floor((state.width * state.height) / 28000));
    state.particles = Array.from({ length: count }, () => ({
      x: Math.random() * state.width,
      y: Math.random() * state.height,
      vx: (Math.random() - 0.5) * 0.36,
      vy: (Math.random() - 0.5) * 0.36,
      radius: Math.random() * 1.7 + 0.8,
      hue: Math.random() > 0.72 ? "86, 255, 142" : "46, 252, 255"
    }));
  };

  const animateParticles = () => {
    const { ctx, width, height, particles } = state;
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particle.hue}, 0.72)`;
      ctx.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const target = particles[next];
        const dx = particle.x - target.x;
        const dy = particle.y - target.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 135) {
          const alpha = 1 - distance / 135;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = `rgba(46, 252, 255, ${alpha * 0.17})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    state.animationId = requestAnimationFrame(animateParticles);
  };

  const activateCurrentSlide = () => {
    const current = window.Reveal?.getCurrentSlide?.();
    if (!current) return;

    document.querySelectorAll(".kpi-card").forEach((card) => {
      card.classList.remove("is-active");
    });

    current.querySelectorAll(".kpi-card").forEach((card) => {
      const fill = card.getAttribute("data-fill") || "0";
      card.style.setProperty("--fill", fill);
      requestAnimationFrame(() => card.classList.add("is-active"));
    });

    current.querySelectorAll(".progress-track i").forEach((bar) => {
      bar.style.willChange = "width";
    });
  };

  const initInteractiveQuestion = () => {
    const input = document.getElementById("appInput");
    const button = document.getElementById("addAppIssue");
    const tags = document.getElementById("issueTags");

    if (!input || !button || !tags) return;

    const addIssue = () => {
      const value = input.value.trim();
      if (!value) {
        input.focus();
        return;
      }

      const tag = document.createElement("span");
      tag.textContent = value;
      tag.className = "new-issue";
      tags.prepend(tag);
      input.value = "";
      input.focus();
      pulsePainMap();
    };

    button.addEventListener("click", addIssue);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addIssue();
      }
    });
  };

  const pulsePainMap = () => {
    const rows = document.querySelectorAll(".quality-pain-map .pain-row i");
    rows.forEach((row) => {
      const next = Math.floor(45 + Math.random() * 48);
      row.style.setProperty("--w", `${next}%`);
      row.animate(
        [
          { filter: "brightness(1)", transform: "scaleX(1)" },
          { filter: "brightness(1.45)", transform: "scaleX(1.02)" },
          { filter: "brightness(1)", transform: "scaleX(1)" }
        ],
        { duration: 520, easing: "ease-out" }
      );
    });
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", QualityDeck.init);
