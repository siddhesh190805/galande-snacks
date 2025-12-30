import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
    const loaderRef = useRef(null);
    const progressRef = useRef(null);
    const textRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const duration = 2000; // 2 seconds
        const startTime = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(Math.floor(newProgress));

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                // Complete animation
                setTimeout(() => {
                    const tl = gsap.timeline({
                        onComplete: () => onComplete?.()
                    });

                    tl.to(textRef.current, {
                        scale: 1.5,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.in'
                    })
                        .to(loaderRef.current, {
                            clipPath: 'circle(0% at 50% 50%)',
                            duration: 0.8,
                            ease: 'power3.in'
                        }, '-=0.2');
                }, 200);
            }
        };

        requestAnimationFrame(updateProgress);

        // Entry animation
        gsap.fromTo(textRef.current.querySelector('.loader-brand'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );

        gsap.fromTo(textRef.current.querySelector('.loader-tagline'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
        );

    }, [onComplete]);

    return (
        <div ref={loaderRef} className="loading-screen">
            {/* Animated background */}
            <div className="loader-bg">
                <div className="loader-gradient"></div>
                <div className="loader-particles">
                    {[...Array(30)].map((_, i) => (
                        <div key={i} className="loader-particle" style={{
                            '--x': `${Math.random() * 100}%`,
                            '--y': `${Math.random() * 100}%`,
                            '--delay': `${Math.random() * 2}s`,
                            '--duration': `${2 + Math.random() * 3}s`
                        }} />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div ref={textRef} className="loader-content">
                <div className="loader-brand">
                    <span className="brand-icon">🥜</span>
                    <h1 className="brand-name">Galande</h1>
                    <span className="brand-sub">Snacks</span>
                </div>

                <p className="loader-tagline">Authentic Taste of Maharashtra</p>

                {/* Progress bar */}
                <div className="loader-progress-container">
                    <div
                        ref={progressRef}
                        className="loader-progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                    <span className="loader-progress-text">{progress}%</span>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="loader-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
            </div>
        </div>
    );
}
