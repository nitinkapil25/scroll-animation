import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Hero from "./components/Hero";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".feature-card");

      gsap.fromTo(
        ".feature-heading",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 42, scale: 0.96, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: "Engineered Precision",
      body: "Every detail crafted with meticulous attention to performance, aesthetics, and innovation.",
    },
    {
      title: "Seamless Experience",
      body: "Intuitive interactions designed for a fluid, responsive experience across every touchpoint.",
    },
    {
      title: "Future Ready",
      body: "Built with cutting-edge technology to stay ahead of the curve and deliver tomorrow's standards today.",
    },
  ];

  return (
    <main className="bg-[#fff4e6] text-slate-900">
      <Hero />

      <section ref={sectionRef} className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24">
        <h2 className="feature-heading text-center text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-[0.02em] md:tracking-[0.03em] text-slate-900">
          Crafted For Excellence
        </h2>

        <div className="mt-8 sm:mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 max-w-[1080px] mx-auto">
          {cards.map((card) => (
            <article
              key={card.title}
              className="feature-card rounded-[16px] sm:rounded-[20px] border border-orange-100 bg-white/80 px-5 sm:px-7 py-5 sm:py-7 min-h-[180px] sm:min-h-[205px] shadow-[0_10px_36px_rgba(249,115,22,0.08)]"
            >
              <h3 className="text-[1.45rem] sm:text-[1.65rem] md:text-[1.95rem] font-bold text-slate-900">
                {card.title}
              </h3>
              <p className="mt-3 sm:mt-5 text-[1rem]/relaxed md:text-[1.05rem] text-slate-600">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
