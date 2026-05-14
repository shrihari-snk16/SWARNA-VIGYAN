import { motion } from 'framer-motion';
import { Volume2, VolumeX, BookOpen, ExternalLink, Activity, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Home.css';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynth(window.speechSynthesis);
    }
    return () => {
      if (synth) synth.cancel();
    };
  }, []);

  const paragraphText = "Gold making processes in ancient India represent a profound convergence of spirituality and empirical science. Evolving formally around the 8th to 9th centuries CE, early metallurgists went beyond mere extraction, attempting to transmute base metals and purify raw gold through complex laboratory techniques. They crafted specialized crucibles and downward distillation furnaces, achieving metallurgical mastery centuries before the rest of the world.";

  const handleAudioToggle = () => {
    if (!synth) return;
    
    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(paragraphText);
      utterance.rate = 0.9;
      utterance.pitch = 1.1; // Slightly higher pitch for female bias
      
      // Try to explicitly find an English female voice
      const voices = synth.getVoices();
      const femaleVoice = voices.find(v => 
        v.lang.includes('en') && 
        (v.name.toLowerCase().includes('female') || 
         v.name.toLowerCase().includes('zira') || 
         v.name.toLowerCase().includes('samantha') || 
         v.name.toLowerCase().includes('victoria'))
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      utterance.onend = () => setIsPlaying(false);
      synth.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <motion.div 
      className="page-wrapper home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* HERO SECTION */}
      <div className="hero-section container">
        {/* Dynamic Background Image */}
        <div className="hero-bg-image">
          <div className="hero-bg-overlay"></div>
        </div>

        <div className="hero-grid">
          <div className="hero-content-left">
            <motion.h4 
              className="eyebrow cinzel"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              The Heritage of Ancient Forges
            </motion.h4>
            <motion.h1 
              className="title cinzel"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Gold Making Processes <br/><span className="gold-text">in Ancient India</span>
            </motion.h1>
            
            <motion.div 
              className="text-block"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="audio-control" onClick={handleAudioToggle}>
                {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
                <span className="inter">{isPlaying ? 'Stop Listening' : 'Listen to History'}</span>
              </div>
              
              <p className="inter lead-text">
                {paragraphText}
              </p>
            </motion.div>

            <motion.div 
              className="citation-block"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="citation-trigger">
                <BookOpen size={18} />
                <span className="cinzel">Hover for Source</span>
                
                <div className="citation-popover">
                  <p className="cinzel source-title">Rasaratna Samuccaya (Verse 1.25)</p>
                  <p className="inter source-text">
                    "As the impurity of minerals is removed by fire and herbs, so the impurities of the mind are destroyed by Rasayana."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="hero-content-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="hero-image-wrapper">
              <img src="/img/title_img.webp" alt="Ancient Indian Engineering" className="hero-image" />
              <div className="hero-image-glow"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* EDITORIAL CONTENT SECTION */}
      <div className="editorial-section container">
        <div className="editorial-block">
          <div className="editorial-text">
            <h2 className="cinzel">The Origins in the Vedic Forges</h2>
            <p className="inter">
              The roots of Indian gold metallurgy stretch back to the Indus Valley Civilization and the Vedic period. Early texts not only distinguished between common metals but explored the purification of <strong>Suvarna</strong> (gold). These empirical practices evolved into formalized extractive sciences, where the physical manipulation of ores and metals was fused with deep philosophical and spiritual underpinnings. The ancient laboratories were not merely places of commerce, but sacred spaces where the transformation of matter mirrored the enlightenment of the soul.
            </p>
          </div>
          <div className="editorial-image">
            <img src="/img/ancient_vedic_forge.png" alt="Ancient Vedic Forge" />
          </div>
        </div>

        <div className="editorial-block reverse">
          <div className="editorial-text">
            <h2 className="cinzel">The Nanotechnology of the Ancients</h2>
            <p className="inter">
              One of the most astonishing achievements of ancient Indian gold processing is the creation of <em>Swarna Bhasma</em> (gold ash). Rather than merely extracting gold for wealth, Indian sages sought to refine it into a bio-available form. Through a grueling, repeated process of heating, cooling, and herbal trituration known as <strong>Marana</strong> (calcination), they reduced raw gold into non-toxic powders. Modern electron microscopy has revealed that <em>Swarna Bhasma</em> consists of pure globular gold nanoparticles, typically measuring between 50 to 100 nanometers—predating modern nanotechnology by a millennium.
            </p>
          </div>
          <div className="editorial-image">
            <img src="/img/ancient_bhasma_powder.png" alt="Golden dust representing Swarna Bhasma" />
          </div>
        </div>

        <div className="editorial-block">
          <div className="editorial-text">
            <h2 className="cinzel">The Crucible of Time</h2>
            <p className="inter">
              The precision of ancient gold making relied heavily on highly specialized furnaces called <em>Koshthis</em>. To achieve temperatures high enough to smelt and purify noble metals alongside volatile elements like zinc, Indian metallurgists at Zawar invented the downward distillation technique. They crafted robust crucibles (<em>Mushas</em>) made from bio-ceramic composites of earth, iron rust, and hemp, capable of withstanding extreme thermal shocks. These ancient metallurgical laboratories laid the foundational principles for modern physical chemistry and extractive metallurgy.
            </p>
          </div>
          <div className="editorial-image">
            <img src="/img/ancient_crucible_zinc.png" alt="Glowing forge and crucible" />
          </div>
        </div>
      </div>

      {/* SUMMARY GRID SECTION */}
      <div className="details-section container">
        <div className="details-header">
          <h2 className="cinzel">The Dual Objectives of Ancient Metallurgy</h2>
          <div className="gold-divider"></div>
        </div>

        <div className="details-grid">
          {/* Card 1 */}
          <motion.div className="detail-card" whileHover={{ y: -5 }}>
            <div className="card-icon"><Flame size={32} /></div>
            <h3 className="cinzel">Dhatu Vada (Metallurgy)</h3>
            <p className="inter">
              The rigorous physical extraction and purification of gold and noble metals, resulting in legendary achievements and highly optimized smelting processes.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div className="detail-card" whileHover={{ y: -5 }}>
            <div className="card-icon"><Activity size={32} /></div>
            <h3 className="cinzel">Deha Vada (Medicine)</h3>
            <p className="inter">
              The transformation of pure gold into bio-available therapeutic compounds (Swarna Bhasma) utilizing meticulous calcination techniques for human longevity.
            </p>
          </motion.div>
        </div>

        {/* References Section */}
        <div className="references-section">
          <h3 className="cinzel ref-title">Further Reading & Web Resources</h3>
          <ul className="ref-links inter">
            <li>
              <a href="https://en.wikipedia.org/wiki/Rasashastra" target="_blank" rel="noreferrer">
                <ExternalLink size={16} /> Wikipedia: Rasashastra
              </a>
            </li>
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3665096/" target="_blank" rel="noreferrer">
                <ExternalLink size={16} /> NIH Study: Bhasmas as Nanomedicine
              </a>
            </li>
            <li>
              <a href="https://www.ancient-origins.net/history-ancient-traditions/alchemy-india-0010078" target="_blank" rel="noreferrer">
                <ExternalLink size={16} /> Ancient Origins: Alchemy in India
              </a>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
