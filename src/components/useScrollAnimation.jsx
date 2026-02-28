import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (
  containerRef,
  textWrapperRef,
  carRef,
  baseHeadlineRef,
  revealHeadlineRef,
  glowHeadlineRef,
  headlineGroupRef
) => {
  useLayoutEffect(() => {
    if (
      !containerRef.current ||
      !textWrapperRef.current ||
      !carRef.current ||
      !baseHeadlineRef.current ||
      !revealHeadlineRef.current ||
      !glowHeadlineRef.current ||
      !headlineGroupRef.current
    ) {
      return;
    }

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([textWrapperRef.current, carRef.current, headlineGroupRef.current], {
          clearProps: "all",
        });
        gsap.set(revealHeadlineRef.current, { clipPath: "inset(0 0% 0 0)" });
        gsap.set(glowHeadlineRef.current, { opacity: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const baseLetters = textWrapperRef.current.querySelectorAll(".base-letter");
        const stats = textWrapperRef.current.querySelectorAll(".stat-card");
        const baseHeadline = baseHeadlineRef.current;
        const revealHeadline = revealHeadlineRef.current;
        const glowHeadline = glowHeadlineRef.current;
        const headlineGroup = headlineGroupRef.current;
        const car = carRef.current;
        const scrollIndicator = containerRef.current.querySelector(".scroll-indicator");
        const scrollDot = containerRef.current.querySelector(".scroll-dot");
        const viewportWidth = window.innerWidth;
        const driveX =
          viewportWidth < 640 ? "86vw" : viewportWidth < 1024 ? "80vw" : "76vw";
        const driveY = viewportWidth < 640 ? "1vh" : "2vh";
        const scrollDistance = viewportWidth < 640 ? "+=160%" : "+=180%";
        const updateRevealFromCar = () => {
          const carRect = car.getBoundingClientRect();
          const headlineRect = headlineGroup.getBoundingClientRect();
          const noseX = carRect.right - 6;
          const revealProgress = gsap.utils.clamp(
            0,
            1,
            (noseX - headlineRect.left) / headlineRect.width
          );
          const rightInset = 100 - revealProgress * 100;
          gsap.set(revealHeadline, { clipPath: `inset(0 ${rightInset}% 0 0)` });
        };

        gsap.set(revealHeadline, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(glowHeadline, { opacity: 0 });
        gsap.set(baseHeadline, { opacity: 0.16 });
        gsap.set(headlineGroup, { scale: 1 });
        gsap.set(car, { x: 0, y: 0, force3D: true, willChange: "transform" });
        gsap.set(stats, {
          opacity: 0,
          y: 60,
          boxShadow: "0 0 0 rgba(249,115,22,0)",
        });

        gsap.set([baseLetters], {
          willChange: "transform, opacity",
          force3D: true,
        });

        const initTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        initTl
          .fromTo(
            baseLetters,
            { yPercent: 80, opacity: 0, rotateX: -70 },
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              stagger: 0.045,
              duration: 1,
              ease: "expo.out",
            }
          )
          .fromTo(
            car,
            { x: -120, opacity: 0, rotate: 0 },
            { x: 0, opacity: 1, rotate: 0, duration: 1.05, ease: "expo.out" },
            "-=0.95"
          );

        gsap.to(scrollDot, {
          y: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 1.2,
        });

        const driveTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: scrollDistance,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onUpdate: updateRevealFromCar,
            onRefresh: updateRevealFromCar,
          },
        });

        updateRevealFromCar();

        driveTl
          .addLabel("drive", 0)
          .to(
            car,
            {
              x: driveX,
              y: driveY,
              rotate: 0,
              duration: 1,
              ease: "none",
            },
            "drive"
          )
          .to(
            stats,
            {
              opacity: 1,
              y: 0,
              boxShadow: "0 0 24px rgba(249,115,22,0.2)",
              stagger: {
                each: 0.2,
              },
              duration: 0.35,
              ease: "none",
            },
            "drive+=0.05"
          )
          .to(
            revealHeadline,
            {
              opacity: 1,
              duration: 0.9,
              ease: "none",
            },
            "drive-=0.02"
          )
          .to(
            baseHeadline,
            {
              opacity: 0.5,
              duration: 1,
              ease: "none",
            },
            "drive"
          )
          .to(
            glowHeadline,
            {
              opacity: 0.75,
              duration: 0.92,
              ease: "none",
            },
            "drive+=0.08"
          )
          .to(
            headlineGroup,
            {
              scale: 1.045,
              duration: 1,
              ease: "none",
            },
            "drive"
          )
          .to(
            scrollIndicator,
            {
              opacity: 0,
              y: -20,
              ease: "none",
            },
            0.05
          );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [
    containerRef,
    textWrapperRef,
    carRef,
    baseHeadlineRef,
    revealHeadlineRef,
    glowHeadlineRef,
    headlineGroupRef,
  ]);
};
