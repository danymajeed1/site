// src/components/AiStagingSection.jsx
import React, { useState } from 'react';

const VARIANTS = {
  staging: {
    label: 'AI Staging',
    description:
      'Empty rooms turned into fully furnished spaces. Perfect for helping buyers imagine themselves in the home.',
    before: '/ai-staging-before.jpg',
    after: '/ai-staging-after.jpg',
  },
  twilight: {
    label: 'Virtual Twilight',
    description:
      'Transform daytime exteriors into golden-hour or blue-hour hero shots without needing a second shoot.',
    before: '/twilight-before.jpg',
    after: '/twilight-after.jpg',
  },
  cleanup: {
    label: 'Object Cleanup',
    description:
      'Cables, clutter, signs—removed or minimized so the focus stays on the property or subject.',
    before: '/cleanup-before.jpg',
    after: '/cleanup-after.jpg',
  },
  concept: {
    label: 'Concept Edits',
    description:
      'Moodier grades, sky replacements, stylistic color work—tailored to the story you want to tell.',
    before: '/concept-before.jpg',
    after: '/concept-after.jpg',
  },
};

const variantKeys = Object.keys(VARIANTS);

function AiStagingSection() {
  const [activeKey, setActiveKey] = useState('staging');
  const [sliderValue, setSliderValue] = useState(55);

  const active = VARIANTS[activeKey];

  return (
    <section className="ai-staging">
      <div className="ai-staging-inner">
        {/* LEFT: TEXT + TABS */}
        <div className="ai-staging-text">
          <p className="ai-kicker">Enhancements & Post-Production</p>
          <h2>More than a shutter click.</h2>
          <p className="ai-lead">
            Beyond capturing the scene, I use editing, AI-assisted tools, and
            manual retouching to make images feel intentional, clean, and ready
            to sell or share.
          </p>

          <div className="ai-tabs">
            {variantKeys.map((key) => (
              <button
                key={key}
                className={`ai-tab ${key === activeKey ? 'active' : ''}`}
                onClick={() => setActiveKey(key)}
              >
                {VARIANTS[key].label}
              </button>
            ))}
          </div>

          <p className="ai-description">{active.description}</p>
        </div>

        {/* RIGHT: BEFORE / AFTER SLIDER */}
        <div className="ai-staging-visual">
          <div className="ai-compare">
            <div className="ai-image-wrapper">
              {/* AFTER (full background) */}
              <img src={active.after} alt="After edit" className="ai-img base" />
              {/* BEFORE (clipped on top) */}
              <div
                className="ai-before-mask"
                style={{ width: `${sliderValue}%` }}
              >
                <img
                  src={active.before}
                  alt="Before edit"
                  className="ai-img before"
                />
              </div>

              {/* Divider line */}
              <div
                className="ai-divider"
                style={{ left: `${sliderValue}%` }}
              >
                <span className="ai-handle" />
              </div>
            </div>

            <div className="ai-slider-row">
              <span>Before</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
              />
              <span>After</span>
            </div>
            <p className="ai-note">
              Drag the slider to compare. These examples are placeholders—you’ll
              plug in your own edits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiStagingSection;
