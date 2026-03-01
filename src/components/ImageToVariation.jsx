import React from 'react';

const ImageToVariation = ({
    uploadedImage,
    onFileChange,
    onAnalyze,
    imageAnalysis,
    onGenerateVariation,
    imageLoading,
    imageError,
    variationImage,
    fileInputRef
}) => {
    return (
        <div className="card" id="image-to-variation">
            <div className="card-badge">Workflow 2</div>
            <h2 className="card-title">Image Variation</h2>
            <p className="card-desc">Upload an image, analyze it, then create a variation.</p>

            <div className="input-field">
                <label>Select an image</label>
                <div
                    className="drop-zone"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {uploadedImage ? (
                        <div className="preview-container">
                            <img src={uploadedImage} alt="Uploaded" className="preview-img" />
                            <span className="file-name">Selected file ready</span>
                        </div>
                    ) : (
                        <>
                            <span className="drop-icon">⬆</span>
                            <span className="drop-hint">Click or drag a file here</span>
                            <span className="drop-types">PNG, JPG, WEBP</span>
                        </>
                    )}
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden-input"
                />
            </div>

            <button
                className="btn primary"
                onClick={onAnalyze}
                disabled={!uploadedImage || !!imageLoading}
            >
                {imageLoading === 'Analyzing image…' ? <><span className="spinner" /> Analyzing...</> : '🔍 Analyze Image'}
            </button>

            {imageAnalysis && (
                <div className="result-panel">
                    <div className="result-header">
                        <span>Image Analysis</span>
                        <span className="badge">Vision AI</span>
                    </div>
                    <p className="result-content">{imageAnalysis}</p>
                    <button
                        className="btn secondary mt"
                        onClick={onGenerateVariation}
                        disabled={!!imageLoading}
                    >
                        {imageLoading === 'Generating variation…' ? <><span className="spinner" /> Generating...</> : '🎨 Generate Variation'}
                    </button>
                </div>
            )}

            {imageError && <div className="error-panel">{imageError}</div>}

            {variationImage && (
                <div className="image-panel">
                    <img src={variationImage} alt="Generated result" className="display-img" />
                    <a href={variationImage} target="_blank" rel="noreferrer" className="img-action">View Full Size ↗</a>
                </div>
            )}
        </div>
    );
};

export default ImageToVariation;
