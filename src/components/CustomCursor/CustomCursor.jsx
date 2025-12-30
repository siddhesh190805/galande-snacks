import { useEffect, useRef as useReactRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
    const cursorRef = useReactRef(null);
    const cursorDotRef = useReactRef(null);
    const cursorTrailRef = useReactRef(null);
    const cursorTextRef = useReactRef(null);
    const posRef = useReactRef({ x: 0, y: 0 });
    const mouseRef = useReactRef({ x: 0, y: 0 });
    const [cursorState, setCursorState] = useState('default');

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = cursorDotRef.current;
        const trail = cursorTrailRef.current;

        if (!cursor || !dot) return;

        // Trail positions for neon effect
        const trailPositions = [];
        const TRAIL_LENGTH = 8;

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            // Update trail
            trailPositions.unshift({ x: e.clientX, y: e.clientY });
            if (trailPositions.length > TRAIL_LENGTH) {
                trailPositions.pop();
            }
        };

        // Animation loop for smooth following
        const animate = () => {
            // Lerp for smooth cursor
            posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.12;
            posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.12;

            cursor.style.transform = `translate(${posRef.current.x - 30}px, ${posRef.current.y - 30}px)`;
            dot.style.transform = `translate(${mouseRef.current.x - 5}px, ${mouseRef.current.y - 5}px)`;

            // Update trail elements
            if (trail) {
                const trailDots = trail.querySelectorAll('.trail-dot');
                trailDots.forEach((trailDot, index) => {
                    const pos = trailPositions[index] || mouseRef.current;
                    const scale = 1 - (index / TRAIL_LENGTH) * 0.8;
                    const opacity = 1 - (index / TRAIL_LENGTH);
                    trailDot.style.transform = `translate(${pos.x - 3}px, ${pos.y - 3}px) scale(${scale})`;
                    trailDot.style.opacity = opacity * 0.5;
                });
            }

            requestAnimationFrame(animate);
        };

        // Handle magnetic effect for buttons
        const handleMagneticMove = (e) => {
            const target = e.target.closest('[data-magnetic]');
            if (target) {
                const rect = target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;

                gsap.to(target, {
                    x: deltaX * 0.3,
                    y: deltaY * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const resetMagnetic = (e) => {
            const target = e.target.closest('[data-magnetic]');
            if (target) {
                gsap.to(target, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        };

        // Handle hover states
        const handleMouseEnter = (e) => {
            const target = e.target;

            if (target.matches('button, a, .cursor-pointer, [data-cursor]')) {
                const cursorType = target.getAttribute('data-cursor') || 'pointer';
                setCursorState(cursorType);

                gsap.to(cursor, {
                    scale: 1.5,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                cursor.classList.add('hovering');
            }

            if (target.matches('.product-card, .product-3d-container')) {
                setCursorState('view');
                gsap.to(cursor, {
                    scale: 2.5,
                    duration: 0.4,
                    ease: 'power2.out',
                });
                cursorTextRef.current.textContent = 'View';
                cursor.classList.add('show-text');
            }

            if (target.matches('.btn-add-cart, .add-btn')) {
                setCursorState('add');
                gsap.to(cursor, {
                    scale: 2,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                cursorTextRef.current.textContent = '+';
                cursor.classList.add('show-text', 'add-mode');
            }

            if (target.matches('.cart-trigger, .cart-icon')) {
                setCursorState('cart');
                gsap.to(cursor, {
                    scale: 2,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                cursorTextRef.current.textContent = '🛒';
                cursor.classList.add('show-text');
            }
        };

        const handleMouseLeave = (e) => {
            const target = e.target;

            if (target.matches('button, a, .cursor-pointer, .product-card, .cart-trigger, .btn-add-cart, .add-btn, .product-3d-container, .cart-icon, [data-cursor]')) {
                setCursorState('default');
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                cursor.classList.remove('hovering', 'show-text', 'add-mode');
                cursorTextRef.current.textContent = '';
            }
        };

        // Handle mouse down/up
        const handleMouseDown = () => {
            gsap.to(cursor, {
                scale: cursorState === 'default' ? 0.8 : 0.9,
                duration: 0.15,
                ease: 'power2.out',
            });
            gsap.to(dot, {
                scale: 0.5,
                duration: 0.15,
            });
        };

        const handleMouseUp = () => {
            gsap.to(cursor, {
                scale: cursorState === 'default' ? 1 : 1.5,
                duration: 0.4,
                ease: 'elastic.out(1, 0.5)',
            });
            gsap.to(dot, {
                scale: 1,
                duration: 0.3,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousemove', handleMagneticMove);
        document.addEventListener('mouseleave', resetMagnetic);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousemove', handleMagneticMove);
            document.removeEventListener('mouseleave', resetMagnetic);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationId);
        };
    }, [cursorState]);

    return (
        <>
            {/* Trail effect */}
            <div ref={cursorTrailRef} className="cursor-trail">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="trail-dot" />
                ))}
            </div>

            {/* Main cursor ring */}
            <div ref={cursorRef} className={`custom-cursor cursor-${cursorState}`}>
                <span className="cursor-ring"></span>
                <span ref={cursorTextRef} className="cursor-text"></span>
            </div>

            {/* Center dot */}
            <div ref={cursorDotRef} className="cursor-dot"></div>
        </>
    );
}
