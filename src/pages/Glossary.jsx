import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import './Glossary.css';

const glossaryElements = [
  {
    id: "parada",
    sanskrit: "Parada",
    english: "Mercury",
    symbol: "☿",
    category: "Maharasa (Amalgamator)",
    description: "Crucial for extracting gold from finely crushed ores. In ancient Indian metallurgy, mercury was used to form an amalgam with raw gold, which was later heated to vaporize the mercury, leaving pure gold behind.",
    image: "/img/glossary/parada.png"
  },
  {
    id: "gandhaka",
    sanskrit: "Gandhaka",
    english: "Sulfur",
    symbol: "🜍",
    category: "Uparasa (Purifier)",
    description: "Used extensively in the purification (Sodhana) of metals. Sulfur was reacted with base metals or impure gold at high temperatures to burn away impurities, leaving refined noble metals.",
    image: "/img/glossary/gandhaka.png"
  },
  {
    id: "swarna",
    sanskrit: "Suvarna / Swarna",
    english: "Gold",
    symbol: "☉",
    category: "Dhatu (Noble Metal)",
    description: "The ultimate noble metal. Ancient Indians not only extracted it, but developed 'Swarna Bhasma' (gold ash)—colloidal gold nanoparticles created through rigorous calcination for medicinal longevity.",
    image: "/img/glossary/suvarna.png"
  },
  {
    id: "rajata",
    sanskrit: "Rajata",
    english: "Silver",
    symbol: "☽",
    category: "Dhatu (Noble Metal)",
    description: "Often found alloyed with gold in electrum ores. Silver was separated from gold using advanced cementation processes utilizing salt and brick dust.",
    image: "/img/glossary/rajata.png"
  },
  {
    id: "tankana",
    sanskrit: "Tankana",
    english: "Borax",
    symbol: "⚗",
    category: "Kshara (Flux)",
    description: "A vital flux used during the smelting of gold. Borax lowers the melting point of ores and removes oxide impurities as a molten slag, ensuring highly pure gold yields.",
    image: "/img/glossary/tankana.png"
  },
  {
    id: "musha",
    sanskrit: "Musha",
    english: "Crucible",
    symbol: "⛊",
    category: "Yantra (Apparatus)",
    description: "Specialized heat-resistant crucibles made from bio-ceramic composites (earth, iron rust, hemp). Crucial for melting gold and withstanding the extreme thermal shocks of downward distillation.",
    image: "/img/glossary/musha.png"
  },
  {
    id: "koshthi",
    sanskrit: "Koshthi",
    english: "Furnace",
    symbol: "♨",
    category: "Yantra (Apparatus)",
    description: "Highly specialized roaring furnaces crafted from brick and fire-clay. These were designed to generate and sustain the extreme, precise temperatures required for complex gold smelting and purification.",
    image: "/img/glossary/koshthi.png"
  },
  {
    id: "yantra",
    sanskrit: "Tiryak Patana Yantra",
    english: "Distillation Apparatus",
    symbol: "⚖",
    category: "Yantra (Apparatus)",
    description: "An intricate setup of interconnected clay pots used for the downward distillation of volatile elements like zinc, preventing them from oxidizing while separating them from noble metals like gold.",
    image: "/img/glossary/yantra.png"
  },
  {
    id: "shilajit",
    sanskrit: "Shilajit",
    english: "Mineral Pitch",
    symbol: "⛰",
    category: "Maharasa (Primary Mineral)",
    description: "A dark, sticky exudate from high mountain rocks. It was used extensively in alchemy to aid in the calcination and purification of heavy metals into bio-available forms.",
    image: "/img/glossary/shilajit.png"
  },
  {
    id: "gairika",
    sanskrit: "Gairika",
    english: "Red Ochre",
    symbol: "▲",
    category: "Uparasa (Secondary Mineral)",
    description: "A rich iron-oxide clay. It was used in paste form to coat the inner walls of crucibles, acting as a protective barrier and flux during the intense heat of gold smelting.",
    image: "/img/glossary/gairika.png"
  }
];

export default function Glossary() {
  const [selectedElement, setSelectedElement] = useState(null);

  // Prevent body scroll when modal is open
  if (typeof window !== 'undefined') {
    if (selectedElement) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  return (
    <motion.div 
      className="page-wrapper glossary-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glossary-header">
        <h2 className="cinzel">The Gold Laboratory</h2>
        <p className="inter">Click on a material or apparatus to reveal its significance in ancient gold making.</p>
      </div>

      <div className="elements-grid">
        {glossaryElements.map((el, idx) => (
          <motion.div 
            key={el.id} 
            className="element-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedElement(el)}
            layoutId={`card-${el.id}`}
          >
            <div className="element-symbol cinzel">{el.symbol}</div>
            <h3 className="element-sanskrit cinzel">{el.sanskrit}</h3>
            <p className="element-english inter">{el.english}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedElement && (
          <div className="modal-overlay" onClick={() => setSelectedElement(null)}>
            <motion.div 
              className="modal-content"
              layoutId={`card-${selectedElement.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setSelectedElement(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-header">
                <div className="modal-symbol cinzel">{selectedElement.symbol}</div>
                <div>
                  <h2 className="cinzel modal-sanskrit">{selectedElement.sanskrit}</h2>
                  <h4 className="inter modal-english">{selectedElement.english}</h4>
                </div>
              </div>
              
              <div className="modal-body-wrapper">
                <div className="modal-image-container">
                  <img src={selectedElement.image} alt={selectedElement.sanskrit} className="modal-image" />
                </div>
                <div className="modal-body">
                  <span className="category-badge">{selectedElement.category}</span>
                  <p className="inter description">{selectedElement.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
