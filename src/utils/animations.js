/**
 * Advanced Animation Utilities
 * Futuristic GSAP-based animations for Galande Snacks
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Split text reveal animation - animates each character with stagger
 * @param {HTMLElement} element - Target element containing text
 * @param {Object} options - Animation options
 */
export function splitTextReveal(element, options = {}) {
    if (!element) return null;

    const {
        duration = 0.8,
        stagger = 0.02,
        ease = 'power3.out',
        y = 50,
        delay = 0,
        scrollTrigger = null
    } = options;

    // Split text into characters
    const text = element.textContent;
    element.innerHTML = '';

    const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        element.appendChild(span);
        return span;
    });

    const animConfig = {
        y,
        opacity: 0,
        duration,
        stagger,
        ease,
        delay
    };

    if (scrollTrigger) {
        return gsap.from(chars, {
            ...animConfig,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                ...scrollTrigger
            }
        });
    }

    return gsap.from(chars, animConfig);
}

/**
 * Magnetic effect - element gets attracted to cursor
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Effect options
 */
export function magneticEffect(element, options = {}) {
    if (!element) return null;

    const {
        strength = 0.3,
        radius = 100
    } = options;

    const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < radius) {
            const force = (radius - distance) / radius;
            gsap.to(element, {
                x: deltaX * strength * force,
                y: deltaY * strength * force,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };

    const handleMouseLeave = () => {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Return cleanup function
    return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
    };
}

/**
 * Liquid morph transition effect
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Animation options
 */
export function liquidTransition(element, options = {}) {
    if (!element) return null;

    const {
        duration = 1,
        ease = 'power2.inOut',
        scaleX = 1.1,
        scaleY = 0.9
    } = options;

    return gsap.timeline()
        .to(element, {
            scaleX,
            scaleY,
            duration: duration * 0.4,
            ease: 'power2.in'
        })
        .to(element, {
            scaleX: 0.9,
            scaleY: 1.1,
            duration: duration * 0.3,
            ease: 'power2.out'
        })
        .to(element, {
            scaleX: 1,
            scaleY: 1,
            duration: duration * 0.3,
            ease: 'elastic.out(1, 0.5)'
        });
}

/**
 * Pixel dissolve effect
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Animation options
 */
export function pixelDissolve(element, options = {}) {
    if (!element) return null;

    const {
        duration = 0.8,
        direction = 'in' // 'in' or 'out'
    } = options;

    const isIn = direction === 'in';

    return gsap.fromTo(element,
        {
            opacity: isIn ? 0 : 1,
            filter: isIn ? 'blur(10px) saturate(200%)' : 'blur(0px) saturate(100%)',
            scale: isIn ? 1.05 : 1
        },
        {
            opacity: isIn ? 1 : 0,
            filter: isIn ? 'blur(0px) saturate(100%)' : 'blur(10px) saturate(200%)',
            scale: isIn ? 1 : 0.95,
            duration,
            ease: 'power2.out'
        }
    );
}

/**
 * Float animation with physics-like motion
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Animation options
 */
export function floatAnimation(element, options = {}) {
    if (!element) return null;

    const {
        amplitude = 20,
        duration = 3,
        rotation = 5
    } = options;

    return gsap.timeline({ repeat: -1, yoyo: true })
        .to(element, {
            y: -amplitude,
            rotation: rotation,
            duration,
            ease: 'power1.inOut'
        })
        .to(element, {
            y: amplitude,
            rotation: -rotation,
            duration,
            ease: 'power1.inOut'
        });
}

/**
 * Holographic shimmer effect for cards
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Animation options
 */
export function holographicShimmer(element, options = {}) {
    if (!element) return null;

    const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        element.style.setProperty('--holo-x', `${x}%`);
        element.style.setProperty('--holo-y', `${y}%`);
    };

    element.addEventListener('mousemove', handleMouseMove);

    return () => {
        element.removeEventListener('mousemove', handleMouseMove);
    };
}

/**
 * Scroll-triggered reveal animation
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Animation options
 */
export function scrollReveal(element, options = {}) {
    if (!element) return null;

    const {
        y = 80,
        duration = 1,
        ease = 'power3.out',
        start = 'top 85%',
        opacity = 0,
        scale = 0.95
    } = options;

    return gsap.from(element, {
        y,
        opacity,
        scale,
        duration,
        ease,
        scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none reverse'
        }
    });
}

/**
 * Stagger reveal for multiple elements
 * @param {NodeList|Array} elements - Target elements
 * @param {Object} options - Animation options
 */
export function staggerReveal(elements, options = {}) {
    if (!elements || elements.length === 0) return null;

    const {
        y = 60,
        duration = 0.8,
        stagger = 0.1,
        ease = 'power3.out',
        start = 'top 85%'
    } = options;

    return gsap.from(elements, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
            trigger: elements[0],
            start,
            toggleActions: 'play none none reverse'
        }
    });
}

/**
 * Neon pulse effect
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Animation options
 */
export function neonPulse(element, options = {}) {
    if (!element) return null;

    const {
        color = '#00f0ff',
        duration = 2,
        intensity = 20
    } = options;

    return gsap.timeline({ repeat: -1 })
        .to(element, {
            boxShadow: `0 0 ${intensity}px ${color}, 0 0 ${intensity * 2}px ${color}`,
            duration: duration / 2,
            ease: 'power2.inOut'
        })
        .to(element, {
            boxShadow: `0 0 ${intensity / 2}px ${color}, 0 0 ${intensity}px ${color}`,
            duration: duration / 2,
            ease: 'power2.inOut'
        });
}
