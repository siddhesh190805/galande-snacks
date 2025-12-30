import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useCart } from '../../context/CartContext';
import './InteractiveSlider.css';

// Import product images
import saltedPeanuts from '../../assets/products/salted-peanuts.png';
import sabudanaChivda from '../../assets/products/sabudana-chivda.png';
import haldiChana from '../../assets/products/haldi-chana.png';
import friedPeanuts from '../../assets/products/fried-peanuts.png';
import masalaChana from '../../assets/products/masala-chana.png';
import masalaSabudana from '../../assets/products/masala-sabudana.png';
import shingBhujia from '../../assets/products/shing-bhujia.png';
import roastedChana from '../../assets/products/roasted-chana.png';

const products = [
    {
        id: 1,
        name: 'Salted Peanuts',
        image: saltedPeanuts,
        color: '#E8C547',
        bgGradient: 'linear-gradient(145deg, #1a1505 0%, #2d2308 40%, #1f1a06 100%)',
        description: 'Perfectly roasted & lightly salted',
        price: 99,
        weight: '200g'
    },
    {
        id: 2,
        name: 'Sabudana Chivda',
        image: sabudanaChivda,
        color: '#FF7B3D',
        bgGradient: 'linear-gradient(145deg, #1f0f05 0%, #3a1a08 40%, #2a1206 100%)',
        description: 'Crispy & flavorful snack',
        price: 129,
        weight: '180g'
    },
    {
        id: 3,
        name: 'Haldi Chana',
        image: haldiChana,
        color: '#F5D547',
        bgGradient: 'linear-gradient(145deg, #1a1808 0%, #2f2a0a 40%, #1f1a06 100%)',
        description: 'Turmeric infused goodness',
        price: 89,
        weight: '250g'
    },
    {
        id: 4,
        name: 'Fried Peanuts',
        image: friedPeanuts,
        color: '#E85A4F',
        bgGradient: 'linear-gradient(145deg, #1f0808 0%, #3a1212 40%, #2a0c0c 100%)',
        description: 'Crunchy & irresistible',
        price: 109,
        weight: '200g'
    },
    {
        id: 5,
        name: 'Masala Chana',
        image: masalaChana,
        color: '#4CAF50',
        bgGradient: 'linear-gradient(145deg, #081f0a 0%, #0f3a15 40%, #0a2a0d 100%)',
        description: 'Spiced chickpea delight',
        price: 79,
        weight: '250g'
    },
    {
        id: 6,
        name: 'Masala Sabudana',
        image: masalaSabudana,
        color: '#FF6B35',
        bgGradient: 'linear-gradient(145deg, #1f0c05 0%, #3a1808 40%, #2a1006 100%)',
        description: 'Tangy & spicy treat',
        price: 139,
        weight: '180g'
    },
    {
        id: 7,
        name: 'Shing Bhujia',
        image: shingBhujia,
        color: '#D84315',
        bgGradient: 'linear-gradient(145deg, #1f0a0a 0%, #3a1515 40%, #2a0f0f 100%)',
        description: 'Traditional peanut snack',
        price: 119,
        weight: '200g'
    },
    {
        id: 8,
        name: 'Roasted Chana',
        image: roastedChana,
        color: '#A67C52',
        bgGradient: 'linear-gradient(145deg, #1a1008 0%, #2f200d 40%, #1f1506 100%)',
        description: 'Healthy & nutritious',
        price: 69,
        weight: '250g'
    }
];

const InteractiveSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { addItem } = useCart();

    const sliderRef = useRef(null);
    const trackRef = useRef(null);
    const bgTextRef = useRef(null);
    const glowRef = useRef(null);

    const currentProduct = products[currentIndex];

    // Generate particles
    const generateParticles = useCallback(() => {
        const particles = [];
        for (let i = 0; i < 25; i++) {
            particles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 6 + 3,
                delay: Math.random() * 8,
                duration: Math.random() * 15 + 10
            });
        }
        return particles;
    }, []);

    const [particles] = useState(generateParticles);

    // Smooth slide to specific index with TRAVEL animation
    const slideTo = useCallback((newIndex, direction = null) => {
        if (isAnimating || newIndex === currentIndex) return;
        setIsAnimating(true);

        const slideDirection = direction || (newIndex > currentIndex ? 'next' : 'prev');
        const slideOffset = slideDirection === 'next' ? -100 : 100;

        // Create master timeline
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(newIndex);
                setIsAnimating(false);
            }
        });

        // Animate background text - move in direction of slide
        tl.to(bgTextRef.current, {
            x: slideDirection === 'next' ? '-15%' : '15%',
            opacity: 0.3,
            scale: 0.95,
            duration: 0.5,
            ease: 'power3.out'
        }, 0);

        // Animate the entire track sliding
        tl.to(trackRef.current, {
            x: `${slideOffset}%`,
            duration: 0.7,
            ease: 'power3.inOut'
        }, 0);

        // Add rotation effect to cards while sliding
        const cards = trackRef.current?.querySelectorAll('.slide-card');
        if (cards) {
            cards.forEach((card, i) => {
                const rotateAmount = slideDirection === 'next' ? -8 : 8;
                tl.to(card, {
                    rotateY: rotateAmount,
                    scale: 0.9,
                    duration: 0.35,
                    ease: 'power2.in'
                }, 0);
                tl.to(card, {
                    rotateY: 0,
                    scale: 1,
                    duration: 0.35,
                    ease: 'power2.out'
                }, 0.35);
            });
        }

        // Animate glow
        tl.to(glowRef.current, {
            opacity: 0.3,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in'
        }, 0);
        tl.to(glowRef.current, {
            opacity: 0.7,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        }, 0.3);

        // Reset track position after slide completes
        tl.set(trackRef.current, { x: '0%' }, 0.7);

        // Animate background text back
        tl.to(bgTextRef.current, {
            x: '0%',
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out'
        }, 0.5);

    }, [isAnimating, currentIndex]);

    const goToNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % products.length;
        slideTo(nextIndex, 'next');
    }, [currentIndex, slideTo]);

    const goToPrev = useCallback(() => {
        const prevIndex = (currentIndex - 1 + products.length) % products.length;
        slideTo(prevIndex, 'prev');
    }, [currentIndex, slideTo]);

    const goToIndex = useCallback((index) => {
        if (index === currentIndex) return;
        const direction = index > currentIndex ? 'next' : 'prev';
        slideTo(index, direction);
    }, [currentIndex, slideTo]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev]);

    // Touch/Swipe support
    useEffect(() => {
        const slider = sliderRef.current;
        let startX = 0;
        let isDragging = false;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        };

        const handleTouchEnd = (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 80) {
                if (diff > 0) goToNext();
                else goToPrev();
            }
            isDragging = false;
        };

        const handleMouseDown = (e) => {
            startX = e.clientX;
            isDragging = true;
        };

        const handleMouseUp = (e) => {
            if (!isDragging) return;
            const diff = startX - e.clientX;

            if (Math.abs(diff) > 80) {
                if (diff > 0) goToNext();
                else goToPrev();
            }
            isDragging = false;
        };

        slider?.addEventListener('touchstart', handleTouchStart, { passive: true });
        slider?.addEventListener('touchend', handleTouchEnd);
        slider?.addEventListener('mousedown', handleMouseDown);
        slider?.addEventListener('mouseup', handleMouseUp);

        return () => {
            slider?.removeEventListener('touchstart', handleTouchStart);
            slider?.removeEventListener('touchend', handleTouchEnd);
            slider?.removeEventListener('mousedown', handleMouseDown);
            slider?.removeEventListener('mouseup', handleMouseUp);
        };
    }, [goToNext, goToPrev]);

    // Handle Add to Cart
    const handleAddToCart = () => {
        addItem({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            weight: currentProduct.weight
        });
    };

    // Get adjacent products for preview
    const prevProduct = products[(currentIndex - 1 + products.length) % products.length];
    const nextProduct = products[(currentIndex + 1) % products.length];

    return (
        <section
            className="interactive-slider"
            ref={sliderRef}
            style={{
                '--theme-color': currentProduct.color,
                '--bg-gradient': currentProduct.bgGradient
            }}
        >
            {/* Dynamic background */}
            <div className="slider-background" style={{ background: currentProduct.bgGradient }} />

            {/* Animated particles */}
            <div className="slider-particles">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            '--x': `${particle.x}%`,
                            '--y': `${particle.y}%`,
                            '--size': `${particle.size}px`,
                            '--delay': `${particle.delay}s`,
                            '--duration': `${particle.duration}s`,
                            '--color': currentProduct.color
                        }}
                    />
                ))}
            </div>

            {/* Large background text */}
            <div className="slider-bg-text" ref={bgTextRef}>
                <span className="bg-text-main">{currentProduct.name}</span>
            </div>

            {/* Glow effect */}
            <div
                className="slider-glow"
                ref={glowRef}
                style={{
                    background: `radial-gradient(ellipse at center, ${currentProduct.color}50 0%, ${currentProduct.color}20 40%, transparent 70%)`
                }}
            />

            {/* Slider track - contains all visible products */}
            <div className="slider-track" ref={trackRef}>
                {/* Previous product */}
                <div className="slide-card slide-card--prev" onClick={goToPrev}>
                    <div className="slide-card-inner">
                        <img src={prevProduct.image} alt={prevProduct.name} />
                    </div>
                </div>

                {/* Current product */}
                <div className="slide-card slide-card--current">
                    <div className="slide-card-inner">
                        <img
                            src={currentProduct.image}
                            alt={currentProduct.name}
                            className="floating-product"
                        />
                        <div className="product-shadow" />
                    </div>
                </div>

                {/* Next product */}
                <div className="slide-card slide-card--next" onClick={goToNext}>
                    <div className="slide-card-inner">
                        <img src={nextProduct.image} alt={nextProduct.name} />
                    </div>
                </div>
            </div>

            {/* Product info */}
            <div className="product-info">
                <h2 className="product-title">{currentProduct.name}</h2>
                <p className="product-description">{currentProduct.description}</p>
                <div className="product-meta">
                    <span className="product-price">₹{currentProduct.price}</span>
                    <span className="product-weight">{currentProduct.weight}</span>
                </div>
                <div className="product-actions">
                    <button className="btn-add-cart" onClick={handleAddToCart}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M1 1H5L7.68 14.39C7.77 14.83 8.02 15.22 8.38 15.5C8.74 15.78 9.19 15.92 9.64 15.9H19.36C19.81 15.92 20.26 15.78 20.62 15.5C20.98 15.22 21.23 14.83 21.32 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Add to Cart</span>
                    </button>
                    <button className="btn-shop-now">
                        <span>Shop Now</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation arrows */}
            <button className="slider-arrow slider-arrow--prev" onClick={goToPrev} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <button className="slider-arrow slider-arrow--next" onClick={goToNext} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dot indicators */}
            <div className="slider-indicators">
                {products.map((product, index) => (
                    <button
                        key={product.id}
                        className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToIndex(index)}
                        style={{ '--dot-color': product.color }}
                        aria-label={`Go to ${product.name}`}
                    />
                ))}
            </div>

            {/* Slide counter */}
            <div className="slider-counter">
                <span className="counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="counter-divider">/</span>
                <span className="counter-total">{String(products.length).padStart(2, '0')}</span>
            </div>
        </section>
    );
};

export default InteractiveSlider;
