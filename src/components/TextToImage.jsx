import React from 'react';

const TextToImage = ({
    textInput,
    onTextInputChange,
    onEnhance,
    enhancedPrompt,
    onGenerate,
    textLoading,
    textError,
    textImage
}) => {
    return (
        <div className="card" id="text-to-image">
            <div className="card-badge">Workflow 1</div>
            <h2 className="card-title">Image Generator</h2>
            <p className="card-desc">Enter a prompt, enhance it with AI, then generate an image.</p>

            <div className="input-field">
                <label htmlFor="text-input">Describe your image</label>
                <textarea
                    id="text-input"
                    className="textarea"
                    rows={4}
                    placeholder="Describe what you want to create..."
                    value={textInput}
                    onChange={(e) => onTextInputChange(e.target.value)}
                />
            </div>

            <button
                className="btn primary"
                onClick={onEnhance}
                disabled={!textInput.trim() || !!textLoading}
            >
                {textLoading === 'Enhancing prompt…' ? <><span className="spinner" /> Enhancing...</> : '✦ Enhance Prompt'}
            </button>

            {enhancedPrompt && (
                <div className="result-panel">
                    <div className="result-header">
                        <span>Enhanced Prompt</span>
                        <span className="badge">Ready</span>
                    </div>
                    <p className="result-content">{enhancedPrompt}</p>
                    <button
                        className="btn secondary mt"
                        onClick={onGenerate}
                        disabled={!!textLoading}
                    >
                        {textLoading === 'Generating image…' ? <><span className="spinner" /> Generating...</> : '🎨 Generate Image'}
                    </button>
                </div>
            )}

            {textLoading && !enhancedPrompt && textLoading !== 'Generating image…' && (
                <div className="status-row"><span className="spinner" />{textLoading}</div>
            )}

            {textError && <div className="error-panel">{textError}</div>}

            {textImage && (
                <div className="image-panel">
                    <img src={textImage} alt="Generated result" className="display-img" />
                    <a href={textImage} target="_blank" rel="noreferrer" className="img-action">View Full Size ↗</a>
                </div>
            )}
        </div>
    );
};

export default TextToImage;
