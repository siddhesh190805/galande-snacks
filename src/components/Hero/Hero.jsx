import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitTextReveal, magneticEffect } from '../../utils/animations';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const primaryBtnRef = useRef(null);
    const secondaryBtnRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Split text reveal for title lines
            const titleLines = titleRef.current.querySelectorAll('.title-line');
            titleLines.forEach((line, index) => {
                splitTextReveal(line, {
                    duration: 0.6,
                    stagger: 0.03,
                    delay: 0.2 + index * 0.15,
                    y: 80
                });
            });

            // Subtitle animation
            gsap.fromTo(subtitleRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
            );

            // CTA buttons animation
            gsap.fromTo(ctaRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    delay: 1,
                    ease: 'power3.out'
                }
            );

            // Floating particles animation
            const particles = particlesRef.current.querySelectorAll('.hero-particle');
            particles.forEach((particle) => {
                gsap.to(particle, {
                    y: `random(-100, 100)`,
                    x: `random(-50, 50)`,
                    rotation: `random(-180, 180)`,
                    duration: `random(10, 20)`,
                    repeat: -1,
                    yoyo: true,
                    ease: 'none'
                });
            });

            // Parallax on scroll
            gsap.to(titleRef.current, {
                y: 100,
                opacity: 0,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '60% top',
                    scrub: 1,
                },
            });

            // Gradient mesh animation
            gsap.to('.gradient-mesh', {
                backgroundPosition: '100% 100%',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: 'none'
            });

        }, heroRef);

        // Magnetic effect on buttons
        const cleanupPrimary = magneticEffect(primaryBtnRef.current, { strength: 0.4, radius: 120 });
        const cleanupSecondary = magneticEffect(secondaryBtnRef.current, { strength: 0.3, radius: 100 });

        return () => {
            ctx.revert();
            cleanupPrimary?.();
            cleanupSecondary?.();
        };
    }, []);

    return (
        <section ref={heroRef} className="hero hero-futuristic hero-centered">
            {/* Animated gradient mesh background */}
            <div className="gradient-mesh"></div>

            {/* Floating particles */}
            <div ref={particlesRef} className="hero-particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="hero-particle"
                        style={{
                            '--delay': `${i * 0.5}s`,
                            '--size': `${Math.random() * 6 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Neon grid lines */}
            <div className="neon-grid">
                <div className="grid-line horizontal"></div>
                <div className="grid-line horizontal"></div>
                <div className="grid-line vertical"></div>
                <div className="grid-line vertical"></div>
            </div>

            <div className="hero-container">
                <div className="hero-content hero-content--centered">
                    {/* Text Content - Centered */}
                    <div className="hero-text hero-text--centered">
                        <span className="hero-badge">
                            <span className="badge-glow"></span>
                            <span className="badge-text">✦ Premium Quality</span>
                        </span>

                        <h1 ref={titleRef} className="hero-title">
                            <span className="title-line">Authentic</span>
                            <span className="title-line title-accent">Taste of</span>
                            <span className="title-line">Maharashtra</span>
                        </h1>

                        <p ref={subtitleRef} className="hero-subtitle">
                            Premium roasted snacks crafted with love since 1999.
                            Experience the <span className="highlight">perfect crunch</span> in every bite.
                        </p>

                        <div ref={ctaRef} className="hero-cta">
                            <a ref={primaryBtnRef} href="#products" className="btn btn-primary btn-neon">
                                <span className="btn-bg"></span>
                                <span className="btn-text">
                                    Explore Snacks
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </a>
                            <a ref={secondaryBtnRef} href="#story" className="btn btn-secondary btn-glass">
                                <span className="btn-text">Our Story</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator with neon effect */}
            <div className="scroll-indicator scroll-neon">
                <span className="scroll-text">Scroll to explore</span>
                <div className="scroll-line">
                    <div className="scroll-dot"></div>
                </div>
            </div>
        </section>
    );
}
