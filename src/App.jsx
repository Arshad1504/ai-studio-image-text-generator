import React, { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import StyleSelector from './components/StyleSelector';
import TextToImage from './components/TextToImage';
import ImageToVariation from './components/ImageToVariation';
import './App.css';

const STYLE_OPTIONS = [
  { id: 'photorealistic', label: '📷 Photorealistic', suffix: 'photorealistic, ultra-detailed, 8K resolution, professional photography, sharp focus' },
  { id: 'anime', label: '🎌 Anime', suffix: 'anime style, vibrant colors, Studio Ghibli inspired, cel-shaded, 2D illustration' },
  { id: 'watercolor', label: '🎨 Watercolor', suffix: 'watercolor painting, soft brushstrokes, flowing colors, artistic, traditional media' },
  { id: 'oil-painting', label: '🖼️ Oil Painting', suffix: 'oil painting, classical art style, rich textures, impasto, museum quality, masterpiece' },
  { id: 'cinematic', label: '🎬 Cinematic', suffix: 'cinematic, dramatic lighting, anamorphic lens, movie still, epic composition, film grain' },
];

function App() {
  const [textInput, setTextInput] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [textImage, setTextImage] = useState('');
  const [textLoading, setTextLoading] = useState('');
  const [textError, setTextError] = useState('');

  const [uploadedImage, setUploadedImage] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [imageAnalysis, setImageAnalysis] = useState('');
  const [variationImage, setVariationImage] = useState('');
  const [imageLoading, setImageLoading] = useState('');
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);

  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [activeTab, setActiveTab] = useState('text-to-image');

  const applyStyle = (prompt) => {
    const style = STYLE_OPTIONS.find(s => s.id === selectedStyle);
    return style ? `${prompt}, ${style.suffix}` : prompt;
  };

  const handleEnhance = async () => {
    if (!textInput.trim()) return;
    setTextLoading('Enhancing prompt…');
    setTextError('');
    setEnhancedPrompt('');
    setTextImage('');
    try {
      const { data } = await axios.post('/api/enhance', { text: textInput });
      setEnhancedPrompt(data.enhanced);
    } catch (err) {
      setTextError(err.response?.data?.error || 'Failed to enhance prompt. Please try again.');
    } finally {
      setTextLoading('');
    }
  };

  const handleGenerateFromText = async () => {
    if (!enhancedPrompt.trim()) return;
    setTextLoading('Generating image…');
    setTextError('');
    setTextImage('');
    try {
      const { data } = await axios.post('/api/generate-image', { prompt: applyStyle(enhancedPrompt) });
      setTextImage(data.image);
    } catch (err) {
      setTextError(err.response?.data?.error || 'Failed to generate image. Please try again.');
    } finally {
      setTextLoading('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setImageAnalysis('');
    setVariationImage('');
    setImageError('');
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    setImageLoading('Analyzing image…');
    setImageError('');
    setImageAnalysis('');
    setVariationImage('');
    try {
      const { data } = await axios.post('/api/analyze-image', { imageBase64: uploadedImage });
      setImageAnalysis(data.analysis);
    } catch (err) {
      setImageError(err.response?.data?.error || 'Failed to analyze image. Please try again.');
    } finally {
      setImageLoading('');
    }
  };

  const handleGenerateVariation = async () => {
    if (!imageAnalysis.trim()) return;
    setImageLoading('Generating variation…');
    setImageError('');
    setVariationImage('');
    try {
      const { data } = await axios.post('/api/generate-image', { prompt: applyStyle(imageAnalysis) });
      setVariationImage(data.image);
    } catch (err) {
      setImageError(err.response?.data?.error || 'Failed to generate variation. Please try again.');
    } finally {
      setImageLoading('');
    }
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <StyleSelector
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          options={STYLE_OPTIONS}
        />

        <div className="workflow-sections">
          {activeTab === 'text-to-image' ? (
            <TextToImage
              textInput={textInput}
              onTextInputChange={setTextInput}
              onEnhance={handleEnhance}
              enhancedPrompt={enhancedPrompt}
              onGenerate={handleGenerateFromText}
              textLoading={textLoading}
              textError={textError}
              textImage={textImage}
            />
          ) : (
            <ImageToVariation
              uploadedImage={uploadedImage}
              onFileChange={handleFileChange}
              onAnalyze={handleAnalyze}
              imageAnalysis={imageAnalysis}
              onGenerateVariation={handleGenerateVariation}
              imageLoading={imageLoading}
              imageError={imageError}
              variationImage={variationImage}
              fileInputRef={fileInputRef}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React & OpenAI · 2024</p>
      </footer>
    </div>
  );
}

export default App;
