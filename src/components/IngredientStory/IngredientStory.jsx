import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IngredientStory.css';

gsap.registerPlugin(ScrollTrigger);

export default function IngredientStory() {
    const sectionRef = useRef(null);
    const ingredientsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating ingredients animation on scroll
            const ingredients = ingredientsRef.current.querySelectorAll('.floating-ingredient');

            ingredients.forEach((ing, index) => {
                gsap.to(ing, {
                    y: -150 - (index * 50),
                    rotation: 360 * (index % 2 === 0 ? 1 : -1),
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });
            });

            // Text reveal animation
            const textBlocks = sectionRef.current.querySelectorAll('.story-text-block');

            textBlocks.forEach((block, index) => {
                gsap.fromTo(block,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="story" ref={sectionRef} className="ingredient-story">
            {/* Floating ingredients background */}
            <div ref={ingredientsRef} className="ingredients-bg">
                <div className="floating-ingredient ingredient-1">🥜</div>
                <div className="floating-ingredient ingredient-2">🌶️</div>
                <div className="floating-ingredient ingredient-3">🧂</div>
                <div className="floating-ingredient ingredient-4">🥜</div>
                <div className="floating-ingredient ingredient-5">🌿</div>
                <div className="floating-ingredient ingredient-6">🥜</div>
                <div className="floating-ingredient ingredient-7">🌶️</div>
                <div className="floating-ingredient ingredient-8">🥜</div>
            </div>

            <div className="container">
                <div className="story-content">
                    <div className="story-text-block">
                        <span className="story-badge">Since 1999</span>
                        <h2 className="story-title">
                            Crafted with <span className="highlight">Love</span> & <span className="highlight">Tradition</span>
                        </h2>
                    </div>

                    <div className="story-text-block story-paragraph">
                        <p>
                            Every pack of Galande Snacks carries forward a legacy of
                            <strong> 25 years of authentic Maharashtrian flavors</strong>.
                            We source the finest peanuts, the crunchiest sabudana, and
                            the most aromatic spices to create snacks that remind you of home.
                        </p>
                    </div>

                    <div className="story-text-block story-features">
                        <div className="feature">
                            <span className="feature-icon">🥜</span>
                            <div className="feature-text">
                                <h4>Premium Ingredients</h4>
                                <p>Sourced from trusted local farms</p>
                            </div>
                        </div>

                        <div className="feature">
                            <span className="feature-icon">👨‍🍳</span>
                            <div className="feature-text">
                                <h4>Traditional Recipes</h4>
                                <p>Passed down through generations</p>
                            </div>
                        </div>

                        <div className="feature">
                            <span className="feature-icon">✨</span>
                            <div className="feature-text">
                                <h4>Fresh & Crispy</h4>
                                <p>Made in small batches daily</p>
                            </div>
                        </div>
                    </div>

                    <div className="story-text-block">
                        <blockquote className="story-quote">
                            "The perfect crunch that brings back childhood memories"
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}
