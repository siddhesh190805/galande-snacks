import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose }) {
    const drawerRef = useRef(null);
    const overlayRef = useRef(null);
    const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

    useEffect(() => {
        if (isOpen) {
            // Animate open
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.4,
                ease: 'power3.out',
            });

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Animate close
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
            });
            gsap.to(drawerRef.current, {
                x: '100%',
                duration: 0.3,
                ease: 'power3.in',
            });

            // Restore body scroll
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    return (
        <div className={`cart-drawer-wrapper ${isOpen ? 'open' : ''}`}>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="cart-overlay"
                onClick={onClose}
            />

            {/* Drawer */}
            <aside ref={drawerRef} className="cart-drawer">
                {/* Header */}
                <div className="cart-header">
                    <h2 className="cart-title">
                        Your Cart
                        {totalItems > 0 && (
                            <span className="cart-count-badge">({totalItems})</span>
                        )}
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="cart-items">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <span className="empty-icon">🛒</span>
                            <p>Your cart is empty</p>
                            <span className="empty-subtext">Add some delicious snacks!</span>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="cart-item"
                                style={{ '--item-color': item.color }}
                            >
                                <div
                                    className="item-image"
                                    style={{ background: item.color }}
                                >
                                    <span className="item-initial">{item.name.charAt(0)}</span>
                                </div>

                                <div className="item-details">
                                    <h4 className="item-name">{item.name}</h4>
                                    <p className="item-weight">{item.weight}</p>
                                    <p className="item-price">₹{item.price}</p>
                                </div>

                                <div className="item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            −
                                        </button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery</span>
                                <span className="free-delivery">FREE</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>
                        </div>

                        <button className="checkout-btn">
                            Proceed to Checkout
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>

                        <button className="clear-cart-btn" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </aside>
        </div>
    );
}
