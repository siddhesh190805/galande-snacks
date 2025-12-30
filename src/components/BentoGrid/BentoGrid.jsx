import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../ProductCard/ProductCard';
import { featuredProducts } from '../../data/products';
import './BentoGrid.css';

gsap.registerPlugin(ScrollTrigger);

export default function BentoGrid({ onColorChange }) {
    const gridRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Animate grid items
            const cards = gridRef.current.querySelectorAll('.product-card');

            cards.forEach((card, index) => {
                gsap.fromTo(card,
                    {
                        y: 80,
                        opacity: 0,
                        rotation: index % 2 === 0 ? -10 : 10,
                        scale: 0.8
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotation: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

        }, gridRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="products" className="bento-section">
            <div className="container">
                <div ref={titleRef} className="section-header">
                    <span className="section-badge">Our Products</span>
                    <h2 className="section-title">
                        <span className="title-line">Taste the</span>
                        <span className="title-accent">Tradition</span>
                    </h2>
                    <p className="section-subtitle">
                        Handcrafted snacks made with premium ingredients and authentic Maharashtrian recipes
                    </p>
                </div>

                <div ref={gridRef} className="bento-grid">
                    {featuredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={`grid-item grid-item-${index + 1}`}
                        >
                            <ProductCard
                                product={product}
                                onColorChange={onColorChange}
                            />
                        </div>
                    ))}
                </div>

                <div className="view-all-wrapper">
                    <button className="btn btn-secondary view-all-btn">
                        View All Products
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
