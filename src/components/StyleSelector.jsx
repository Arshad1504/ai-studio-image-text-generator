import React from 'react';

const StyleSelector = ({ selectedStyle, onStyleChange, options }) => {
    return (
        <div className="style-bar">
            <div className="style-label-group">
                <span className="style-bar-label">Current generation style</span>
                <span className="style-help-text">(Applies to both workflows)</span>
            </div>
            <div className="style-pills">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        className={`style-pill ${selectedStyle === opt.id ? 'active' : ''}`}
                        onClick={() => onStyleChange(opt.id)}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StyleSelector;
