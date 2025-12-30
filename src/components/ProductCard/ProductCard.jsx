import { useRef, useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { holographicShimmer } from '../../utils/animations';
import './ProductCard.css';

export default function ProductCard({ product, onColorChange }) {
    const cardRef = useRef(null);
    const [isAdding, setIsAdding] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const { addItem } = useCart();

    useEffect(() => {
        const cleanup = holographicShimmer(cardRef.current);
        return cleanup;
    }, []);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        setIsAdding(true);
        addItem(product);

        // Reset animation
        setTimeout(() => setIsAdding(false), 800);
    };

    const handleMouseEnter = () => {
        if (onColorChange) {
            onColorChange(product.bgColor);
        }
    };

    // Enhanced 3D Tilt effect with spring physics
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        setTilt({
            x: y * -25,
            y: x * 25,
        });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            className={`product-card product-card-holo ${isAdding ? 'adding' : ''}`}
            style={{
                '--product-color': product.color,
                '--tilt-x': `${tilt.x}deg`,
                '--tilt-y': `${tilt.y}deg`,
                '--holo-x': '50%',
                '--holo-y': '50%',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="view"
        >
            {/* Holographic overlay */}
            <div className="card-holo-overlay"></div>

            {/* Neon border glow */}
            <div className="card-neon-border"></div>

            {/* Glow effect */}
            <div className="card-glow" style={{ background: product.color }} />

            {/* Glass background */}
            <div className="card-glass"></div>

            {/* Product Image/Visual */}
            <div className="product-image">
                <div
                    className="product-bag-visual"
                    style={{
                        background: `linear-gradient(145deg, ${product.color}dd, ${product.color})`
                    }}
                >
                    {/* Holographic shine */}
                    <div className="bag-holo-shine"></div>
                    <div className="bag-shine"></div>
                    <div className="bag-shine-sweep"></div>

                    <div className="bag-label">
                        <span className="label-brand">Galande</span>
                        <span className="label-name">{product.name}</span>
                    </div>

                    {/* Floating particles */}
                    <div className="bag-particles">
                        <span className="mini-particle" style={{ '--delay': '0s' }}>✦</span>
                        <span className="mini-particle" style={{ '--delay': '0.5s' }}>✦</span>
                        <span className="mini-particle" style={{ '--delay': '1s' }}>✦</span>
                    </div>
                </div>

                {/* Weight tag with neon effect */}
                <div className="weight-tag">
                    <span>Net Wt.</span>
                    <strong>{product.weight}</strong>
                </div>

                {/* Category badge with glow */}
                <div className="category-badge">{product.category}</div>
            </div>

            {/* Product Info */}
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-tagline">{product.tagline}</p>
                <p className="product-description">{product.description}</p>

                {/* Price & Add to Cart */}
                <div className="product-footer">
                    <div className="product-price">
                        <span className="price-currency">₹</span>
                        <span className="price-value">{product.price || 'XX'}</span>
                    </div>

                    <button
                        className="btn btn-add-cart"
                        onClick={handleAddToCart}
                        data-magnetic
                    >
                        <span className="btn-content">
                            <svg className="cart-plus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 6h15l-1.5 9h-12z" />
                                <circle cx="9" cy="20" r="1" />
                                <circle cx="18" cy="20" r="1" />
                                <path d="M6 6L5 3H2" />
                                <path d="M12 8v4m-2-2h4" />
                            </svg>
                            <span>Add</span>
                        </span>
                        <span className="btn-success">✓ Added</span>
                    </button>
                </div>
            </div>

            {/* Add animation overlay */}
            <div className="add-animation">
                <span className="add-check">✓</span>
                <div className="add-ripple"></div>
            </div>
        </div>
    );
}
