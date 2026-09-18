export type QuizQuestion = {
  id: string;
  topic: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type StudyModule = {
  id: string;
  subjectId: string;
  title: string;
  topic: string;
  minutes: number;
  intro: string;
  sections: { heading: string; body: string }[];
  keyTerms: { term: string; meaning: string }[];
  quiz: QuizQuestion[];
};

export type Subject = {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
  moduleIds: string[];
};

export const modules: StudyModule[] = [
  {
    id: "cell-division",
    subjectId: "biology",
    title: "Cell Division",
    topic: "Mitosis & Meiosis",
    minutes: 12,
    intro:
      "Cell division is how living things grow, repair damage and reproduce. Every new cell comes from an existing cell splitting in a carefully controlled way.",
    sections: [
      {
        heading: "The cell cycle",
        body: "A cell spends most of its life in interphase, where it grows, copies its DNA and prepares proteins. Interphase has three stages: G1 (growth), S (DNA synthesis) and G2 (final checks). Only after these checks pass does the cell enter division. Checkpoints act like quality control: if DNA is damaged, the cycle pauses until repairs are made.",
      },
      {
        heading: "Mitosis step by step",
        body: "Mitosis produces two identical daughter cells. In prophase the chromosomes condense and the nuclear membrane breaks down. In metaphase the chromosomes line up along the centre of the cell. In anaphase sister chromatids are pulled to opposite poles by spindle fibres. In telophase two new nuclei form, and cytokinesis finally splits the cytoplasm.",
      },
      {
        heading: "Meiosis and variation",
        body: "Meiosis makes sex cells (gametes). It involves two rounds of division and produces four cells, each with half the number of chromosomes. Crossing over during prophase I swaps segments between matching chromosomes, and independent assortment shuffles which chromosome goes where. Together these create genetic variation, which is why siblings are not identical.",
      },
      {
        heading: "Why it matters",
        body: "Uncontrolled cell division is the basis of cancer: checkpoint failures let damaged cells keep dividing. Understanding the cycle explains how chemotherapy drugs work, since many of them target rapidly dividing cells.",
      },
    ],
    keyTerms: [
      { term: "Interphase", meaning: "The growth and DNA-copying stage before division." },
      { term: "Chromatid", meaning: "One of two identical halves of a copied chromosome." },
      { term: "Crossing over", meaning: "Swapping of DNA segments between matching chromosomes in meiosis." },
      { term: "Cytokinesis", meaning: "The final splitting of the cytoplasm into two cells." },
    ],
    quiz: [
      {
        id: "cd1",
        topic: "Cell cycle",
        question: "During which stage of interphase is DNA copied?",
        options: ["G1 phase", "S phase", "G2 phase", "Telophase"],
        answerIndex: 1,
        explanation: "S stands for synthesis — this is when the DNA is replicated.",
      },
      {
        id: "cd2",
        topic: "Mitosis",
        question: "In which phase do chromosomes line up in the middle of the cell?",
        options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
        answerIndex: 1,
        explanation: "Metaphase — think 'middle'. The chromosomes align on the metaphase plate.",
      },
      {
        id: "cd3",
        topic: "Meiosis",
        question: "How many cells does one round of meiosis produce?",
        options: ["Two", "Three", "Four", "Eight"],
        answerIndex: 2,
        explanation: "Two divisions produce four cells, each with half the chromosome number.",
      },
      {
        id: "cd4",
        topic: "Meiosis",
        question: "Which process is the main source of genetic variation in meiosis?",
        options: ["Cytokinesis", "Crossing over", "DNA repair", "Spindle formation"],
        answerIndex: 1,
        explanation: "Crossing over swaps segments between matching chromosomes, creating new combinations.",
      },
      {
        id: "cd5",
        topic: "Cell cycle",
        question: "Why do checkpoints exist in the cell cycle?",
        options: [
          "To speed up division",
          "To stop DNA being copied",
          "To check for damage before the cell divides",
          "To make the cell larger",
        ],
        answerIndex: 2,
        explanation: "Checkpoints pause the cycle so damaged DNA can be repaired before division.",
      },
    ],
  },
  {
    id: "photosynthesis",
    subjectId: "biology",
    title: "Photosynthesis",
    topic: "Energy in plants",
    minutes: 10,
    intro:
      "Photosynthesis is how plants turn light energy into chemical energy stored in glucose. Almost all food chains start here.",
    sections: [
      {
        heading: "The overall reaction",
        body: "Carbon dioxide and water, in the presence of light and chlorophyll, become glucose and oxygen: 6CO2 + 6H2O -> C6H12O6 + 6O2. The energy is not created; it is transferred from sunlight into chemical bonds.",
      },
      {
        heading: "Light-dependent reactions",
        body: "These happen in the thylakoid membranes. Light splits water (photolysis), releasing oxygen as a by-product and producing ATP and NADPH, the energy carriers used in the next stage.",
      },
      {
        heading: "The Calvin cycle",
        body: "In the stroma, carbon dioxide is fixed into organic molecules using the ATP and NADPH made earlier. This light-independent stage builds the sugar that the plant uses for growth and storage.",
      },
      {
        heading: "Limiting factors",
        body: "Light intensity, carbon dioxide concentration and temperature all limit the rate. Increasing one only helps until another becomes the bottleneck — this is why greenhouses control all three.",
      },
    ],
    keyTerms: [
      { term: "Chlorophyll", meaning: "Green pigment that absorbs light energy." },
      { term: "Photolysis", meaning: "Splitting of water molecules using light." },
      { term: "Stroma", meaning: "Fluid inside the chloroplast where the Calvin cycle happens." },
      { term: "Limiting factor", meaning: "The condition that currently caps the rate of a reaction." },
    ],
    quiz: [
      {
        id: "ph1",
        topic: "Reaction",
        question: "Which gas is released as a by-product of photosynthesis?",
        options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
        answerIndex: 2,
        explanation: "Oxygen comes from splitting water during the light-dependent stage.",
      },
      {
        id: "ph2",
        topic: "Light reactions",
        question: "Where do the light-dependent reactions take place?",
        options: ["Stroma", "Thylakoid membranes", "Nucleus", "Mitochondria"],
        answerIndex: 1,
        explanation: "The thylakoid membranes hold the pigments and proteins that capture light.",
      },
      {
        id: "ph3",
        topic: "Calvin cycle",
        question: "What does the Calvin cycle use to build sugars?",
        options: ["ATP and NADPH", "Oxygen and water", "Chlorophyll only", "Light directly"],
        answerIndex: 0,
        explanation: "The energy carriers ATP and NADPH from the light stage power carbon fixation.",
      },
      {
        id: "ph4",
        topic: "Limiting factors",
        question: "A greenhouse has plenty of light but low CO2. What is the limiting factor?",
        options: ["Light", "Carbon dioxide", "Chlorophyll", "Water"],
        answerIndex: 1,
        explanation: "The factor in shortest supply caps the rate — here it is carbon dioxide.",
      },
      {
        id: "ph5",
        topic: "Reaction",
        question: "Which pigment absorbs the light energy used in photosynthesis?",
        options: ["Haemoglobin", "Melanin", "Chlorophyll", "Keratin"],
        answerIndex: 2,
        explanation: "Chlorophyll absorbs mainly red and blue light and reflects green.",
      },
    ],
  },
  {
    id: "genetics-basics",
    subjectId: "biology",
    title: "Genetics Basics",
    topic: "Inheritance",
    minutes: 11,
    intro:
      "Genetics explains how characteristics pass from parents to offspring, and why some traits appear in one generation but not the next.",
    sections: [
      {
        heading: "Genes, alleles and DNA",
        body: "A gene is a section of DNA that codes for a protein. Different versions of the same gene are called alleles. You inherit one allele of each gene from each parent, giving your genotype. The visible result is your phenotype.",
      },
      {
        heading: "Dominant and recessive",
        body: "A dominant allele shows its effect even when only one copy is present. A recessive allele only shows when both copies are recessive. Someone with one of each is a carrier: they do not show the trait but can pass it on.",
      },
      {
        heading: "Punnett squares",
        body: "A Punnett square predicts the probability of offspring genotypes. Crossing two carriers (Aa x Aa) gives 1 AA : 2 Aa : 1 aa — a 25% chance of the recessive phenotype in each pregnancy. Probability resets every time; it is not a guarantee across four children.",
      },
      {
        heading: "Mutations",
        body: "A mutation is a change in the DNA sequence. Most are neutral, some are harmful, and a few are beneficial and drive evolution through natural selection.",
      },
    ],
    keyTerms: [
      { term: "Allele", meaning: "One version of a gene." },
      { term: "Genotype", meaning: "The set of alleles an organism carries." },
      { term: "Phenotype", meaning: "The observable characteristics that result." },
      { term: "Carrier", meaning: "Someone with one recessive allele who does not show the trait." },
    ],
    quiz: [
      {
        id: "ge1",
        topic: "Alleles",
        question: "What is an allele?",
        options: ["A type of cell", "A version of a gene", "A protein", "A chromosome pair"],
        answerIndex: 1,
        explanation: "Alleles are alternative versions of the same gene.",
      },
      {
        id: "ge2",
        topic: "Dominance",
        question: "A recessive trait only appears when the genotype is...",
        options: ["AA", "Aa", "aa", "Any of these"],
        answerIndex: 2,
        explanation: "Two recessive alleles are needed for the recessive phenotype to show.",
      },
      {
        id: "ge3",
        topic: "Punnett squares",
        question: "Crossing Aa x Aa gives what chance of an aa child?",
        options: ["0%", "25%", "50%", "75%"],
        answerIndex: 1,
        explanation: "The square gives 1 AA : 2 Aa : 1 aa, so one in four, or 25%.",
      },
      {
        id: "ge4",
        topic: "Phenotype",
        question: "Your phenotype is best described as...",
        options: [
          "The alleles you carry",
          "Your observable characteristics",
          "Your number of chromosomes",
          "A DNA mutation",
        ],
        answerIndex: 1,
        explanation: "Phenotype is what you can observe; genotype is the underlying alleles.",
      },
      {
        id: "ge5",
        topic: "Mutations",
        question: "Which statement about mutations is correct?",
        options: [
          "All mutations are harmful",
          "Mutations never pass to offspring",
          "Most mutations have no noticeable effect",
          "Mutations only happen in plants",
        ],
        answerIndex: 2,
        explanation: "Most mutations are neutral; a few are harmful and a few are beneficial.",
      },
    ],
  },
  {
    id: "atomic-structure",
    subjectId: "chemistry",
    title: "Atomic Structure",
    topic: "Atoms & electrons",
    minutes: 10,
    intro:
      "Everything is made of atoms. Understanding how their particles are arranged explains almost all of chemistry.",
    sections: [
      {
        heading: "Subatomic particles",
        body: "Protons (positive) and neutrons (neutral) sit in the tiny, dense nucleus. Electrons (negative) move in shells around it. An atom is neutral because protons and electrons balance.",
      },
      {
        heading: "Atomic number and mass number",
        body: "The atomic number is the number of protons and defines the element. The mass number is protons plus neutrons. Isotopes are atoms of the same element with different numbers of neutrons, so they share chemistry but differ in mass.",
      },
      {
        heading: "Electron shells",
        body: "Electrons fill shells from the inside out: 2 in the first, then 8, then 8. The outer shell electrons decide how an element reacts, which is why elements in the same group behave alike.",
      },
    ],
    keyTerms: [
      { term: "Proton", meaning: "Positive particle in the nucleus; sets the element." },
      { term: "Isotope", meaning: "Same element, different neutron count." },
      { term: "Valence electrons", meaning: "Outer-shell electrons that control reactivity." },
    ],
    quiz: [
      {
        id: "as1",
        topic: "Particles",
        question: "Which particle has no electrical charge?",
        options: ["Proton", "Neutron", "Electron", "Ion"],
        answerIndex: 1,
        explanation: "Neutrons are neutral; protons are positive and electrons negative.",
      },
      {
        id: "as2",
        topic: "Atomic number",
        question: "The atomic number of an element equals its number of...",
        options: ["Neutrons", "Protons", "Electron shells", "Isotopes"],
        answerIndex: 1,
        explanation: "Proton count defines the element and is the atomic number.",
      },
      {
        id: "as3",
        topic: "Isotopes",
        question: "Two isotopes of an element differ in...",
        options: ["Protons", "Electrons", "Neutrons", "Charge"],
        answerIndex: 2,
        explanation: "Isotopes share protons but have different numbers of neutrons.",
      },
      {
        id: "as4",
        topic: "Electron shells",
        question: "How many electrons fill the first shell?",
        options: ["2", "6", "8", "18"],
        answerIndex: 0,
        explanation: "The first shell holds a maximum of 2 electrons.",
      },
      {
        id: "as5",
        topic: "Electron shells",
        question: "Which electrons mainly determine how an element reacts?",
        options: ["Inner shell", "Outer shell", "Nucleus electrons", "All equally"],
        answerIndex: 1,
        explanation: "Outer (valence) electrons are involved in bonding.",
      },
    ],
  },
  {
    id: "chemical-bonding",
    subjectId: "chemistry",
    title: "Chemical Bonding",
    topic: "Ionic & covalent bonds",
    minutes: 12,
    intro:
      "Atoms bond to reach a full outer shell. How they do that — giving, taking or sharing electrons — decides the properties of the substance.",
    sections: [
      {
        heading: "Ionic bonding",
        body: "A metal gives electrons to a non-metal. The metal becomes a positive ion, the non-metal negative, and opposite charges attract strongly. Ionic compounds form giant lattices with high melting points and conduct electricity when molten or dissolved.",
      },
      {
        heading: "Covalent bonding",
        body: "Two non-metals share pairs of electrons. Small covalent molecules such as water have weak forces between molecules, so they melt and boil at low temperatures and usually do not conduct electricity.",
      },
      {
        heading: "Metallic bonding",
        body: "Metal atoms sit in a lattice of positive ions surrounded by delocalised electrons. Those free electrons explain why metals conduct heat and electricity, and why they bend rather than shatter.",
      },
    ],
    keyTerms: [
      { term: "Ion", meaning: "An atom that has gained or lost electrons and has a charge." },
      { term: "Lattice", meaning: "A regular repeating 3D arrangement of particles." },
      { term: "Delocalised electron", meaning: "A free electron not tied to one atom." },
    ],
    quiz: [
      {
        id: "cb1",
        topic: "Ionic bonding",
        question: "Ionic bonds usually form between...",
        options: ["Two metals", "A metal and a non-metal", "Two non-metals", "Two gases"],
        answerIndex: 1,
        explanation: "A metal transfers electrons to a non-metal, forming oppositely charged ions.",
      },
      {
        id: "cb2",
        topic: "Covalent bonding",
        question: "In a covalent bond, electrons are...",
        options: ["Transferred", "Shared", "Destroyed", "Delocalised"],
        answerIndex: 1,
        explanation: "Non-metals share electron pairs to complete their outer shells.",
      },
      {
        id: "cb3",
        topic: "Properties",
        question: "Why do ionic compounds have high melting points?",
        options: [
          "They are gases",
          "Strong forces hold the whole lattice together",
          "They contain free electrons",
          "Their molecules are small",
        ],
        answerIndex: 1,
        explanation: "Lots of energy is needed to overcome the strong electrostatic attraction in the lattice.",
      },
      {
        id: "cb4",
        topic: "Metallic bonding",
        question: "Metals conduct electricity because they contain...",
        options: ["Ions only", "Delocalised electrons", "Covalent molecules", "Neutrons"],
        answerIndex: 1,
        explanation: "Delocalised electrons are free to move and carry charge.",
      },
      {
        id: "cb5",
        topic: "Properties",
        question: "When does solid sodium chloride conduct electricity?",
        options: ["Always", "Never", "When molten or dissolved", "Only when cold"],
        answerIndex: 2,
        explanation: "The ions must be free to move, which happens when it melts or dissolves.",
      },
    ],
  },
  {
    id: "acids-bases",
    subjectId: "chemistry",
    title: "Acids & Bases",
    topic: "pH and neutralisation",
    minutes: 9,
    intro:
      "Acids and bases are opposites on the pH scale, and their reactions follow predictable patterns you can rely on in the lab.",
    sections: [
      {
        heading: "The pH scale",
        body: "pH runs from 0 to 14. Below 7 is acidic, 7 is neutral and above 7 is alkaline. The scale is logarithmic: pH 3 is ten times more acidic than pH 4.",
      },
      {
        heading: "What acids and bases do",
        body: "Acids release hydrogen ions (H+) in water. Bases accept them; soluble bases are called alkalis and release hydroxide ions (OH-). Strong acids ionise completely, weak acids only partly.",
      },
      {
        heading: "Neutralisation",
        body: "Acid + base gives salt + water. For example hydrochloric acid and sodium hydroxide give sodium chloride and water. With a carbonate you also get carbon dioxide, which is why fizzing appears.",
      },
    ],
    keyTerms: [
      { term: "pH", meaning: "A measure of hydrogen ion concentration." },
      { term: "Alkali", meaning: "A base that dissolves in water." },
      { term: "Neutralisation", meaning: "Reaction of an acid with a base to make salt and water." },
    ],
    quiz: [
      {
        id: "ab1",
        topic: "pH scale",
        question: "A solution with pH 2 is...",
        options: ["Strongly alkaline", "Neutral", "Strongly acidic", "Weakly alkaline"],
        answerIndex: 2,
        explanation: "Low pH values mean high hydrogen ion concentration — strongly acidic.",
      },
      {
        id: "ab2",
        topic: "Acids",
        question: "Which ion do acids release in water?",
        options: ["OH-", "H+", "Na+", "Cl-"],
        answerIndex: 1,
        explanation: "Acids donate hydrogen ions (H+).",
      },
      {
        id: "ab3",
        topic: "Neutralisation",
        question: "Acid + base gives...",
        options: ["Salt + water", "Salt + hydrogen", "Water only", "Oxygen + water"],
        answerIndex: 0,
        explanation: "Neutralisation always produces a salt and water.",
      },
      {
        id: "ab4",
        topic: "Neutralisation",
        question: "Why does adding acid to a carbonate cause fizzing?",
        options: [
          "Hydrogen is released",
          "Carbon dioxide is released",
          "Oxygen is released",
          "The salt evaporates",
        ],
        answerIndex: 1,
        explanation: "Acid + carbonate gives salt, water and carbon dioxide gas.",
      },
      {
        id: "ab5",
        topic: "pH scale",
        question: "How much more acidic is pH 3 than pH 5?",
        options: ["2 times", "10 times", "100 times", "The same"],
        answerIndex: 2,
        explanation: "Each pH step is a factor of ten, so two steps is 100 times.",
      },
    ],
  },
  {
    id: "newtons-laws",
    subjectId: "physics",
    title: "Newton's Laws",
    topic: "Forces & motion",
    minutes: 11,
    intro:
      "Newton's three laws describe how forces change the way objects move — from a ball rolling to a rocket launching.",
    sections: [
      {
        heading: "First law: inertia",
        body: "An object stays at rest or moves at constant velocity unless a resultant force acts on it. A passenger lurches forward when a bus brakes because their body keeps moving.",
      },
      {
        heading: "Second law: F = ma",
        body: "Resultant force equals mass times acceleration. Double the force and acceleration doubles; double the mass and acceleration halves for the same force.",
      },
      {
        heading: "Third law: action and reaction",
        body: "Every action has an equal and opposite reaction. The pairs act on different objects, which is why they do not cancel out. A rocket pushes gas down, the gas pushes the rocket up.",
      },
    ],
    keyTerms: [
      { term: "Resultant force", meaning: "The single force left after combining all forces." },
      { term: "Inertia", meaning: "The tendency of an object to resist changes in motion." },
      { term: "Acceleration", meaning: "Rate of change of velocity, in m/s²." },
    ],
    quiz: [
      {
        id: "nl1",
        topic: "First law",
        question: "An object with no resultant force acting on it will...",
        options: [
          "Always stop",
          "Keep its current velocity",
          "Accelerate",
          "Change direction",
        ],
        answerIndex: 1,
        explanation: "With zero resultant force, velocity stays constant — at rest or steady speed.",
      },
      {
        id: "nl2",
        topic: "Second law",
        question: "A 4 kg object accelerates at 3 m/s². What force acts on it?",
        options: ["1.3 N", "7 N", "12 N", "0.75 N"],
        answerIndex: 2,
        explanation: "F = ma = 4 × 3 = 12 N.",
      },
      {
        id: "nl3",
        topic: "Second law",
        question: "For a fixed force, doubling the mass will...",
        options: ["Double acceleration", "Halve acceleration", "Not change it", "Stop the object"],
        answerIndex: 1,
        explanation: "a = F/m, so doubling m halves a.",
      },
      {
        id: "nl4",
        topic: "Third law",
        question: "Why don't action and reaction forces cancel out?",
        options: [
          "They are different sizes",
          "They act on different objects",
          "One is always bigger",
          "They act at different times",
        ],
        answerIndex: 1,
        explanation: "The pair acts on two different bodies, so neither object has zero resultant force.",
      },
      {
        id: "nl5",
        topic: "First law",
        question: "A passenger lurches forward when a bus brakes because of...",
        options: ["Gravity", "Inertia", "Friction", "Air resistance"],
        answerIndex: 1,
        explanation: "Their body continues moving until a force acts on it — inertia.",
      },
    ],
  },
  {
    id: "energy-work",
    subjectId: "physics",
    title: "Energy & Work",
    topic: "Energy transfer",
    minutes: 10,
    intro:
      "Energy is never created or destroyed, only transferred between stores. Work is the name we give to energy transferred by a force.",
    sections: [
      {
        heading: "Energy stores",
        body: "Kinetic, gravitational potential, elastic, chemical, thermal and nuclear are the main stores. A falling ball transfers gravitational potential energy to kinetic energy, and some to thermal energy through air resistance.",
      },
      {
        heading: "Calculations",
        body: "Work done = force × distance. Kinetic energy = ½mv². Gravitational potential energy = mgh. Power = energy transferred ÷ time, measured in watts.",
      },
      {
        heading: "Efficiency",
        body: "Efficiency = useful output energy ÷ total input energy. No device is 100% efficient because some energy is always dissipated, usually as heat.",
      },
    ],
    keyTerms: [
      { term: "Work", meaning: "Energy transferred when a force moves an object." },
      { term: "Power", meaning: "Energy transferred per second, in watts." },
      { term: "Dissipated energy", meaning: "Energy spread to the surroundings, usually as heat." },
    ],
    quiz: [
      {
        id: "ew1",
        topic: "Work",
        question: "Work done is calculated as...",
        options: ["Force × distance", "Mass × speed", "Force ÷ time", "Energy × time"],
        answerIndex: 0,
        explanation: "Work = force × distance moved in the direction of the force.",
      },
      {
        id: "ew2",
        topic: "Kinetic energy",
        question: "If speed doubles, kinetic energy...",
        options: ["Doubles", "Halves", "Quadruples", "Stays the same"],
        answerIndex: 2,
        explanation: "KE = ½mv², and v is squared, so doubling v multiplies KE by four.",
      },
      {
        id: "ew3",
        topic: "Power",
        question: "Power is measured in...",
        options: ["Joules", "Newtons", "Watts", "Pascals"],
        answerIndex: 2,
        explanation: "One watt is one joule per second.",
      },
      {
        id: "ew4",
        topic: "Efficiency",
        question: "A motor takes in 200 J and usefully outputs 150 J. Its efficiency is...",
        options: ["50%", "66%", "75%", "133%"],
        answerIndex: 2,
        explanation: "150 ÷ 200 = 0.75, which is 75%.",
      },
      {
        id: "ew5",
        topic: "Energy stores",
        question: "Energy wasted by a machine is usually dissipated as...",
        options: ["Light", "Heat", "Sound only", "Chemical energy"],
        answerIndex: 1,
        explanation: "Most wasted energy ends up warming the surroundings.",
      },
    ],
  },
  {
    id: "waves",
    subjectId: "physics",
    title: "Waves",
    topic: "Wave properties",
    minutes: 9,
    intro:
      "Waves transfer energy without transferring matter. The same rules describe sound, light and ripples on water.",
    sections: [
      {
        heading: "Transverse and longitudinal",
        body: "In transverse waves the vibration is at right angles to the direction of travel — light and water ripples. In longitudinal waves the vibration is along the direction of travel, with compressions and rarefactions — sound is the classic example.",
      },
      {
        heading: "Wave equation",
        body: "Wave speed = frequency × wavelength (v = fλ). Frequency is measured in hertz, the number of waves per second. For a fixed speed, higher frequency means shorter wavelength.",
      },
      {
        heading: "Reflection and refraction",
        body: "Waves reflect off surfaces at the same angle they arrive. They refract, or change direction, when they enter a new medium and change speed — which is why a straw looks bent in water.",
      },
    ],
    keyTerms: [
      { term: "Amplitude", meaning: "Maximum displacement from the rest position." },
      { term: "Frequency", meaning: "Waves passing a point each second, in hertz." },
      { term: "Refraction", meaning: "Change of direction as a wave changes speed in a new medium." },
    ],
    quiz: [
      {
        id: "wv1",
        topic: "Wave types",
        question: "Sound travels as which kind of wave?",
        options: ["Transverse", "Longitudinal", "Electromagnetic", "Standing only"],
        answerIndex: 1,
        explanation: "Sound vibrates along the direction of travel, creating compressions.",
      },
      {
        id: "wv2",
        topic: "Wave equation",
        question: "A wave has frequency 5 Hz and wavelength 2 m. Its speed is...",
        options: ["2.5 m/s", "7 m/s", "10 m/s", "0.4 m/s"],
        answerIndex: 2,
        explanation: "v = fλ = 5 × 2 = 10 m/s.",
      },
      {
        id: "wv3",
        topic: "Wave equation",
        question: "At fixed speed, increasing frequency makes wavelength...",
        options: ["Longer", "Shorter", "Unchanged", "Zero"],
        answerIndex: 1,
        explanation: "Frequency and wavelength are inversely proportional when speed is fixed.",
      },
      {
        id: "wv4",
        topic: "Refraction",
        question: "Refraction happens because waves...",
        options: [
          "Lose all energy",
          "Change speed in a new medium",
          "Stop vibrating",
          "Gain amplitude",
        ],
        answerIndex: 1,
        explanation: "A speed change at a boundary bends the wave's direction.",
      },
      {
        id: "wv5",
        topic: "Wave properties",
        question: "Amplitude of a wave describes its...",
        options: [
          "Speed",
          "Maximum displacement from rest",
          "Number of waves per second",
          "Direction",
        ],
        answerIndex: 1,
        explanation: "Amplitude is the height of the wave from the rest position, linked to energy.",
      },
    ],
  },
];

export const subjects: Subject[] = [
  {
    id: "biology",
    name: "Biology",
    emoji: "🧬",
    blurb: "Cells, energy and inheritance",
    moduleIds: ["cell-division", "photosynthesis", "genetics-basics"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    emoji: "🧪",
    blurb: "Atoms, bonds and reactions",
    moduleIds: ["atomic-structure", "chemical-bonding", "acids-bases"],
  },
  {
    id: "physics",
    name: "Physics",
    emoji: "🔭",
    blurb: "Forces, energy and waves",
    moduleIds: ["newtons-laws", "energy-work", "waves"],
  },
];

export function getModule(id: string) {
  return modules.find((m) => m.id === id);
}

export function getSubject(id: string) {
  return subjects.find((s) => s.id === id);
}

export function getSubjectModules(subjectId: string) {
  return modules.filter((m) => m.subjectId === subjectId);
}

export function moduleNotesText(m: StudyModule) {
  return [m.intro, ...m.sections.map((s) => `${s.heading}. ${s.body}`)].join("\n\n");
}
