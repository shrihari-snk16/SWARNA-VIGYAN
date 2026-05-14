import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './Timeline.css';

const timelineData = [
  {
    period: "3300 BCE – 1300 BCE",
    era: "Indus Valley Civilization",
    title: "The Dawn of Gold Working",
    description: "Early gold artifacts, beads, and ornaments discovered at Harappa and Mohenjo-Daro reveal that early metallurgists were already panning for placer gold and creating intricate jewelry, marking the dawn of noble metallurgy.",
    element: "Raw Gold (Suvarna)"
  },
  {
    period: "1500 BCE – 500 BCE",
    era: "Vedic Period",
    title: "The Golden Hymns",
    description: "The Rigveda frequently mentions 'Suvarna' and 'Hiranya' (gold). Gold was considered the seed of Agni (fire). Early Vedic priests used gold not just for wealth, but as a spiritually pure metal essential for sacred rituals and offerings.",
    element: "Hiranya (Vedic Gold)"
  },
  {
    period: "600 BCE – 322 BCE",
    era: "Mahajanapadas Era",
    title: "The First Standardized Gold",
    description: "As urbanization spread, the early republics began using standardized weights of gold, such as the 'Nishka' and 'Suvarna', laying the groundwork for complex economic metallurgy and the purification of raw ore.",
    element: "Nishka (Gold Weight)"
  },
  {
    period: "322 BCE – 185 BCE",
    era: "Maurya Empire",
    title: "The Director of Mines",
    description: "Kautilya's Arthashastra details state-sponsored mining operations. It describes the 'Akaradhyaksha' (Director of Mines) who oversaw the extraction of gold from ores, river sands, and the complex testing of gold purity using touchstones.",
    element: "Tested Gold"
  },
  {
    period: "1st Century CE – 3rd Century CE",
    era: "Kushan Empire",
    title: "The Golden Coinage",
    description: "The Kushans introduced widespread, high-purity gold coinage (Dinaras) to India. This required massive scaling in gold smelting, refining (Sodhana), and precise alloying techniques to mass-produce standardized currency.",
    element: "Gold Dinara"
  },
  {
    period: "3rd Century CE – 6th Century CE",
    era: "Gupta Empire",
    title: "The Zenith of Metallurgy",
    description: "Known as the Golden Age of India, metallurgical sciences flourished. While the Iron Pillar was forged, goldsmiths perfected the 'Kundan' technique of setting stones with highly refined, 24-karat gold foils at room temperature.",
    element: "24K Gold Foil"
  },
  {
    period: "8th Century CE – 12th Century CE",
    era: "The Rasashastra Era",
    title: "The Birth of Gold Alchemy",
    description: "Metallurgy merged with medicine. Sages developed 'Marana'—the rigorous calcination of gold using mercury and sulfur to create 'Swarna Bhasma' (colloidal gold nanoparticles) for extreme human longevity and rejuvenation.",
    element: "Swarna Bhasma (Gold Ash)"
  },
  {
    period: "13th Century CE – 16th Century CE",
    era: "Medieval Synthesis",
    title: "Mastery of Downward Distillation",
    description: "Complex texts like the Rasaratna Samuccaya were compiled. The use of robust bio-ceramic crucibles (Mushas) and specialized furnaces allowed metallurgists to perfectly extract gold from complex sulfide ores containing volatile metals.",
    element: "Refined Gold Extract"
  },
  {
    period: "16th Century CE – 18th Century CE",
    era: "The Mughal Era",
    title: "Imperial Goldsmithing",
    description: "The Imperial Karkhanas (workshops) fused indigenous gold purification techniques with Persian aesthetics, perfecting 'Meenakari' (enameling on gold) and 'Zardozi' (pure gold thread embroidery) using extremely ductile drawn gold.",
    element: "Drawn Gold Thread"
  },
  {
    period: "19th Century CE",
    era: "Kolar Rediscovery",
    title: "Unearthing Ancient Shafts",
    description: "Modern engineers arriving at the Kolar Gold Fields discovered ancient, fire-set mining shafts reaching over 300 meters deep. This validated the massive scale and extreme depth of ancient Indian gold mining operations.",
    element: "Deep Vein Gold"
  }
];

export default function Timeline() {
  const containerRef = useRef(null);

  const handleWheel = (e) => {
    if (containerRef.current) {
      // Map vertical scroll (deltaY) to horizontal scrolling (scrollLeft)
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <motion.div 
      className="page-wrapper timeline-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="timeline-header container">
        <h2 className="cinzel timeline-title">Chronicles of Fire & Ore</h2>
        <p className="inter timeline-subtitle">Scroll horizontally to traverse through time</p>
      </div>

      <section 
        className="horizontal-scroll-section" 
        ref={containerRef} 
        onWheel={handleWheel}
      >
        <div className="timeline-container">
          {timelineData.map((item, index) => (
            <div key={index} className="timeline-card">
              <div className="timeline-marker"></div>
              <div className="card-content">
                <span className="inter card-period">{item.period}</span>
                <h3 className="cinzel card-era">{item.era}</h3>
                <h4 className="inter card-title">{item.title}</h4>
                <p className="inter card-desc">{item.description}</p>
                <div className="card-element cinzel">
                  {item.element}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
