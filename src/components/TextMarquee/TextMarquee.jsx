import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './TextMarquee.css';

export default function TextMarquee({ text = "Crunch jo roz yaad aaye", speed = 30 }) {
    const marqueeRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        // Clone content for seamless loop
        const clone = content.cloneNode(true);
        content.parentNode.appendChild(clone);

        // Get width for animation
        const contentWidth = content.offsetWidth;

        // Animate marquee
        gsap.to([content, clone], {
            x: -contentWidth,
            duration: speed,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
            }
        });

    }, [speed]);

    return (
        <div ref={marqueeRef} className="text-marquee">
            <div className="marquee-track">
                <div ref={contentRef} className="marquee-content">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="marquee-item">
                            <span className="marquee-text">{text}</span>
                            <span className="marquee-separator">✦</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
