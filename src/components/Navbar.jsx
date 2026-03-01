import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="brand-icon">✦</span>
                    <span className="brand-name">AI Studio</span>
                </div>
                <div className="navbar-links">
                    <button
                        className={`nav-btn ${activeTab === 'text-to-image' ? 'active' : ''}`}
                        onClick={() => setActiveTab('text-to-image')}
                    >
                        Image Generator
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'image-to-variation' ? 'active' : ''}`}
                        onClick={() => setActiveTab('image-to-variation')}
                    >
                        Image Variation
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
