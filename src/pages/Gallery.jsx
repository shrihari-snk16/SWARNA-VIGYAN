import { motion } from 'framer-motion';
import './Gallery.css';

const galleryProcesses = [
  {
    title: "The Kasauti",
    subtitle: "Testing the Purity",
    description: "Before any gold could be used or minted, the 'Akaradhyaksha' (Director of Mines) tested its exact karat purity using a black slate touchstone (Kasauti). By rubbing the gold on the stone, they compared the color of the streak against standard gold needles, an ingenious and non-destructive testing method.",
    image: "/img/gallery/kasauti.png"
  },
  {
    title: "Placer Mining",
    subtitle: "River Sand Extraction",
    description: "Long before deep vein mining, ancient metallurgists extracted massive amounts of gold dust by panning the sands of rivers like the Indus. Water was used to wash away the lighter silt, leaving the heavy, gleaming raw gold dust behind.",
    image: "/img/gallery/placer.png"
  },
  {
    title: "The Koshthi",
    subtitle: "The Roaring Furnace",
    description: "To melt gold, metallurgists constructed massive, highly specialized furnaces (Koshthi) from brick and fire-clay. Utilizing bellows to pump air, they achieved and sustained the extreme 1064°C temperatures required to reduce raw ore into molten gold.",
    image: "/img/gallery/koshthi.png"
  },
  {
    title: "The Bio-Ceramic Musha",
    subtitle: "Indestructible Crucibles",
    description: "The 'Musha' (crucible) was the heart of the Rasashala. Crafted from a specialized mix of earth, iron rust, and organic binders like hemp and horse dung, these bioceramic vessels were designed to withstand massive thermal shock without cracking.",
    image: "/img/gallery/musha.png"
  },
  {
    title: "Sodhana",
    subtitle: "Extreme Purification",
    description: "Raw gold often contained impurities. Sodhana involved boiling the gold in acidic herbal juices, salts, and sometimes cow urine. This complex chemical wash stripped away base metals and toxins, resulting in spiritually and physically pure gold.",
    image: "/img/gallery/sodhana.png"
  },
  {
    title: "Cementation",
    subtitle: "Silver Separation",
    description: "When gold was found alloyed with silver (electrum), ancient Indians used an advanced cementation process. Layers of gold sheets were stacked with salt and brick dust inside a heated furnace. The salt chemically drew the silver out of the gold, leaving 24-karat purity.",
    image: "/img/gallery/cementation.png"
  },
  {
    title: "Tiryak Patana Yantra",
    subtitle: "Downward Distillation",
    description: "For highly complex ores containing volatile metals like zinc, metallurgists used interconnected clay pots. By heating the ore in the upper pot, the volatile metals vaporized and condensed in the cooler lower pot, perfectly separating from the gold.",
    image: "/img/gallery/yantra.png"
  },
  {
    title: "Marana",
    subtitle: "Gold Nanoparticles (Bhasma)",
    description: "The ultimate alchemical achievement. Through rigorous, repeated cycles of calcination (Marana) with mercury and sulfur, pure gold was incinerated into 'Swarna Bhasma'—a microscopic red ash of colloidal gold nanoparticles used for extreme human longevity.",
    image: "/img/gallery/marana.png"
  }
];

export default function Gallery() {
  return (
    <motion.div 
      className="page-wrapper gallery-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="gallery-header">
        <h2 className="cinzel text-center mb-4">Processes & Tools</h2>
        <p className="inter text-center mb-12 text-dim">
          Explore the ingenious techniques and specialized apparatus used by ancient Indian metallurgists to extract, purify, and transmute gold.
        </p>
      </div>

      {galleryProcesses.map((item, index) => (
        <div className={`gallery-layout mb-12 ${index % 2 !== 0 ? 'reverse' : ''}`} key={item.title}>
          <div className="gallery-content">
            <h2 className="cinzel">{item.title}</h2>
            <h4 className="inter subtitle">{item.subtitle}</h4>
            
            <div className="description-block">
              <p className="inter">{item.description}</p>
            </div>
          </div>

          <div className="gallery-image-container">
            <img src={item.image} alt={item.title} className="gallery-image" />
            <div className="image-glow"></div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
