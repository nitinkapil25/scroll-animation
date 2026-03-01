import React, { useRef } from "react";
import Stats from "./Stats";
import { useScrollAnimation } from "./useScrollAnimation";

const Hero = () => {
  const containerRef = useRef(null);
  const textWrapperRef = useRef(null);
  const carRef = useRef(null);
  const baseHeadlineRef = useRef(null);
  const revealHeadlineRef = useRef(null);
  const glowHeadlineRef = useRef(null);
  const headlineGroupRef = useRef(null);

  useScrollAnimation(
    containerRef,
    textWrapperRef,
    carRef,
    baseHeadlineRef,
    revealHeadlineRef,
    glowHeadlineRef,
    headlineGroupRef
  );

  const headline = "WELCOME ITZFIZZ";
  const displayHeadline = "W E L C O M E   I T Z F LI Z Z";
  const renderHeadline = (letterClass) =>
    displayHeadline.split("").map((char, index, arr) => {
      if (char === " ") {
        const isWordGap = arr[index - 1] === " " || arr[index + 1] === " ";
        return (
          <span
            key={`${letterClass}-space-${index}`}
            aria-hidden="true"
            className={
              isWordGap
                ? "inline-block w-[0.15em] sm:w-[0.18em] md:w-[0.22em] lg:w-[0.24em]"
                : "inline-block w-[0.09em] sm:w-[0.11em] md:w-[0.14em] lg:w-[0.16em]"
            }
          />
        );
      }
      return (
        <span key={`${letterClass}-char-${index}`} className={`${letterClass} inline-block`}>
          {char}
        </span>
      );
    });

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_50%_20%,#fffaf2_0%,#fff3df_48%,#ffe9cc_100%)] flex items-center justify-center"
    >
      {/* Ambient grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(180,83,9,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(180,83,9,0.16)_1px,transparent_1px)] [background-size:120px_120px]"
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[68vw] h-[68vw] bg-orange-300/25 rounded-full blur-[150px]" />
      </div>

      {/* Headline + stats */}
      <div
        ref={textWrapperRef}
        className="relative z-20 flex flex-col items-center text-center w-full max-w-none px-2 md:px-4"
      >
        <div className="relative translate-y-[-8px] sm:translate-y-[-12px] md:translate-y-0">
          <img
            ref={carRef}
            src="https://paraschaturvedi.github.io/car-scroll-animation/McLaren%20720S%202022%20top%20view.png"
            alt=""
            aria-hidden="true"
            className="absolute z-30 left-[2vw] sm:left-[3vw] md:left-[-120px] lg:left-[-150px] top-[-34px] sm:top-[-36px] md:top-[-42px] w-[170px] sm:w-[220px] md:w-[260px] lg:w-[370px] pointer-events-none will-change-transform select-none"
          />

          <div ref={headlineGroupRef} className="relative origin-center max-w-[96vw] md:max-w-none">
            <h1
              ref={baseHeadlineRef}
              className="text-[1.55rem] sm:text-[1.9rem] md:text-7xl lg:text-8xl font-black uppercase text-orange-500/25 inline-flex flex-nowrap justify-center leading-[1.05] md:leading-[1.04] whitespace-nowrap"
              style={{
                perspective: "1000px",
                textShadow: "0 4px 14px rgba(249,115,22,0.16)",
              }}
              aria-label={headline}
            >
              {renderHeadline("base-letter")}
            </h1>

            <h1
              ref={revealHeadlineRef}
              className="absolute inset-0 text-[1.55rem] sm:text-[1.9rem] md:text-7xl lg:text-8xl font-black uppercase text-orange-500 inline-flex flex-nowrap justify-center leading-[1.05] md:leading-[1.04] whitespace-nowrap"
              style={{
                clipPath: "inset(0 100% 0 0)",
                opacity: 1,
                textShadow: "0 4px 16px rgba(249,115,22,0.2)",
              }}
              aria-hidden="true"
            >
              {renderHeadline("letter")}
            </h1>

            <h1
              ref={glowHeadlineRef}
              className="absolute inset-0 text-[1.55rem] sm:text-[1.9rem] md:text-7xl lg:text-8xl font-black uppercase text-orange-400 inline-flex flex-nowrap justify-center leading-[1.05] md:leading-[1.04] whitespace-nowrap blur-[2px] md:blur-[2.5px] pointer-events-none"
              style={{ opacity: 0 }}
              aria-hidden="true"
            >
              {renderHeadline("glow-letter")}
            </h1>
          </div>
        </div>

        <Stats />
      </div>

      <div className="scroll-indicator absolute z-30 bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <p className="text-[9px] sm:text-[10px] md:text-sm uppercase tracking-[0.34em] md:tracking-[0.42em] text-slate-500">
          Scroll To Explore
        </p>
        <div className="mt-3 w-6 h-12 rounded-full border border-slate-400/80 flex justify-center py-2">
          <span className="scroll-dot w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.85)]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
