import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './ProductShowcase.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
    const showcaseRef = useRef(null);
    const sliderRef = useRef(null);
    const activeIndexRef = useRef(0);
    const { addItem } = useCart();

    // Function to update background color
    const updateBackgroundColor = useCallback((index) => {
        const product = featuredProducts[index];
        if (product) {
            document.documentElement.style.setProperty('--bg-showcase', product.bgColor);

            // Also update progress dots
            const dots = document.querySelectorAll('.progress-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }, []);

    useEffect(() => {
        const showcase = showcaseRef.current;
        const slider = sliderRef.current;

        if (!showcase || !slider) return;

        const slides = slider.querySelectorAll('.product-slide');
        const numSlides = slides.length;

        // Set initial background color to first product
        updateBackgroundColor(0);

        const ctx = gsap.context(() => {
            // Calculate total scroll distance
            const getScrollAmount = () => {
                return slider.scrollWidth - window.innerWidth;
            };

            // Horizontal scroll animation
            const scrollTween = gsap.to(slider, {
                x: () => -getScrollAmount(),
                ease: 'none',
                scrollTrigger: {
                    trigger: showcase,
                    start: 'top top',
                    end: () => `+=${getScrollAmount()}`,
                    scrub: 0.5,
                    pin: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // Calculate which slide is currently most visible
                        const progress = self.progress;
                        const slideWidth = 100 / numSlides;

                        // Determine active index based on scroll progress
                        let newIndex = Math.round(progress * (numSlides - 1));
                        newIndex = Math.max(0, Math.min(newIndex, numSlides - 1));

                        // Update color when index changes
                        if (newIndex !== activeIndexRef.current) {
                            activeIndexRef.current = newIndex;
                            updateBackgroundColor(newIndex);
                        }
                    },
                },
            });

            // Animate products on enter
            slides.forEach((slide, index) => {
                const productBag = slide.querySelector('.product-bag-3d');
                const slideInfo = slide.querySelector('.slide-info');

                if (productBag) {
                    gsap.fromTo(productBag,
                        { opacity: 0.3, scale: 0.85 },
                        {
                            opacity: 1,
                            scale: 1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: slide,
                                containerAnimation: scrollTween,
                                start: 'left 80%',
                                end: 'left 30%',
                                scrub: 0.3,
                            },
                        }
                    );
                }

                if (slideInfo) {
                    gsap.fromTo(slideInfo,
                        { opacity: 0, x: 50 },
                        {
                            opacity: 1,
                            x: 0,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: slide,
                                containerAnimation: scrollTween,
                                start: 'left 70%',
                                end: 'left 40%',
                                scrub: 0.3,
                            },
                        }
                    );
                }
            });

        }, showcase);

        // Refresh on resize
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', handleResize);
        };
    }, [updateBackgroundColor]);

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        addItem(product);
    };

    return (
        <section ref={showcaseRef} className="product-showcase">
            {/* Progress indicators */}
            <div className="showcase-progress">
                {featuredProducts.map((product, index) => (
                    <button
                        key={product.id}
                        className={`progress-dot ${index === 0 ? 'active' : ''}`}
                        aria-label={`Go to ${product.name}`}
                        onClick={() => updateBackgroundColor(index)}
                    >
                        <span className="dot-inner" />
                    </button>
                ))}
            </div>

            {/* Horizontal slider */}
            <div ref={sliderRef} className="showcase-slider">
                {featuredProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className="product-slide"
                        data-color={product.bgColor}
                        style={{ '--product-color': product.color }}
                    >
                        {/* Floating particles */}
                        <div className="particles-container">
                            <div className="particle particle-1" style={{ background: product.color }} />
                            <div className="particle particle-2" style={{ background: product.color }} />
                            <div className="particle particle-3" style={{ background: product.color }} />
                            <div className="particle particle-4" style={{ background: product.color }} />
                        </div>

                        {/* Product content wrapper */}
                        <div className="slide-content">
                            {/* Product Bag */}
                            <div className="product-bag-3d">
                                {/* Glow */}
                                <div
                                    className="product-glow"
                                    style={{ background: `radial-gradient(circle, ${product.color}50 0%, transparent 70%)` }}
                                />

                                {/* Bag */}
                                <div
                                    className="bag-visual"
                                    style={{ background: `linear-gradient(145deg, ${product.color}ee, ${product.color})` }}
                                >
                                    <div className="bag-shine" />
                                    <div className="bag-content">
                                        <span className="bag-brand">Galande</span>
                                        <span className="bag-name">{product.name}</span>
                                    </div>
                                    <div className="bag-weight">
                                        <span>Net Wt.</span>
                                        <strong>{product.weight}</strong>
                                    </div>
                                </div>

                                {/* Shadow */}
                                <div className="bag-shadow" />
                            </div>

                            {/* Product Info */}
                            <div className="slide-info">
                                <span className="slide-category">{product.category}</span>
                                <h2 className="product-title">{product.name}</h2>
                                <p className="slide-tagline">{product.tagline}</p>
                                <p className="slide-description">{product.description}</p>

                                <div className="slide-footer">
                                    <div className="slide-price">
                                        <span className="price-label">Price</span>
                                        <span className="price-value">₹{product.price || 'XX'}</span>
                                    </div>
                                    <button
                                        className="add-btn"
                                        onClick={(e) => handleAddToCart(product, e)}
                                    >
                                        Add to Cart
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Slide number */}
                        <div className="slide-number">
                            <span className="current">{String(index + 1).padStart(2, '0')}</span>
                            <span className="separator">/</span>
                            <span className="total">{String(featuredProducts.length).padStart(2, '0')}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll hint */}
            <div className="scroll-hint">
                <span>Scroll to explore</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </div>
        </section>
    );
}
