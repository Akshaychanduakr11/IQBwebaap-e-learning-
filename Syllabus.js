// Data
const syllabusData = {
  "essential-chemistry": `
    <h3>UNIT 1: Battery Technology</h3>
    <p><strong>A.</strong> Electrochemical & Galvanic Series, Electrochemical & Electrolytic cells. Battery: Introduction, types-primary, secondary and reserve, Lithium-cobalt oxide and metal air batteries - characteristics, components/materials, working and applications.</p>
    <p><strong>B.</strong> Super capacitors: Introduction, types (EDLC, pseudo and asymmetric capacitor) with examples and applications. Energy conversion devices: Introduction, characteristics, materials, working and applications of H2-O2 fuel cells, amorphous Si and quantum dye sensitized solar cells.</p>
    <h3>UNIT 2: Rare earth elements and E-wastes management</h3>
    <p><strong>A.</strong> Rare earth elements: Properties, applications in electronics. Lanthanide contraction. Types of E-wastes, environmental and health risks, segregation and recycling (Hydrometallurgical, pyrometallurgical and direct recycling), Extraction of rare earth and precious metals from e-wastes.</p>
    <p><strong>B.</strong> Twelve principles of Green Chemistry. Green Computing, Role of Green Computing in Environment and Research, Green devices and Green data Servers.</p>
    <h3>UNIT 3: Nanomaterials</h3>
    <p>Introduction, classification, size dependent properties, surface area, optical and catalytic properties, Synthesis methods of nanomaterials – Top down and bottom-up approach. Carbon nanomaterials: Types, properties and applications of CNT and graphene. Applications of nanomaterials.</p>
    <h3>UNIT 4: Material Characterization Techniques</h3>
    <p><strong>A.</strong> Principles and applications of Electronic Spectroscopy (Beer-Lambert’s law and its numerical), Infra-Red spectroscopy and Nuclear Magnetic Resonance spectroscopy.</p>
    <p><strong>B.</strong> Thermal analysis (Thermogravimetry, Differential Thermal Analysis, Differential Scanning Calorimetry), Scanning Electron Microscopy, Transmission Electron Microscopy, Atomic Force Microscopy, Brunauer-Emmett-Teller (BET) surface area analysis, X-ray Diffraction Analysis, particle size analyser (Dynamic Light Scattering), High Performance Liquid Chromatography and Gas Chromatography.</p>
  `,

  "applied-algebra": `
    <h3>UNIT I : Linear Algebra I</h3>
    <p>Linear dependence of vectors, Eigen values and Eigen vectors, Reduction to diagonal form, Largest Eigen value and its corresponding Eigen vector by iteration method, Gaussian elimination, LU Decomposition (Crout’s method).</p>
    <h3>UNIT II : Linear Algebra II</h3>
    <p>Vector Space; Subspaces; Basis; Dimension; Linear transformation; Range Space and Rank; Null Space and Nullity; Rank nullity theorem, Matrix Representation of a linear transformation; Inner Product Spaces: Norm; Orthonormal Sets, Positive definite matrices, Singular Value Decomposition, Gram-Schmidt process.</p>
    <h3>UNIT III : Differential Calculus</h3>
    <p>Successive differentiation: Leibnitz’s Rule, Taylor’s and Maclaurin’s series for function of one variable, Indeterminate forms and L’Hospital’s Rule, Maxima and Minima for function of one variable, continuity of functions; differentiability, Rolle's theorem, Mean value theorem.</p>
    <h3>UNIT IV : Integral Calculus</h3>
    <p>Beta and Gamma functions and their properties. Curve Tracing: Tracing of curves (Cartesian), Applications of definite integrals to find length of the curve, area, volume & surface area of revolution.</p>
    <h3>UNIT V : Sequence and Series</h3>
    <p>Sequence, types of sequence, test of convergence of sequences, Cauchy sequence, infinite series, power series, Alternating series, tests of convergence and absolute convergence of series.</p>
  `,

  "electrical-engineering": `
    <h3>UNIT I : Introduction to Electronic components and Analog Electronics</h3>
    <p>Importance of Electronics in Computer Science and engineering, voltage, Current, and Resistance, Passive Components (Resistors, Capacitors, Inductors), Active Components (Diodes, Transistors), Operational Amplifiers (Op-Amps), Amplifiers and Oscillators. Simple op-amp applications.</p>
    <h3>UNIT II : Digital Logic and Circuits</h3>
    <p>Binary Number System, Logic Gates (AND, OR, NOT, XOR), Combinational Circuits, Sequential Circuits, Flip-Flops (RS and J-K) and Registers, truth table, Half Adder and Full Adder, Multiplexer and decoder, Shift registers, Building Simple Digital Circuits (Basic synchronous counter design).</p>
    <h3>UNIT III : Introduction to Microcontrollers</h3>
    <p>Introduction to Microcontrollers, Arduino Platform, Interfacing Electronics with Microcontrollers, Analog-to-Digital and Digital-to-Analog Conversion, Types of Sensors (Temperature, Light, Proximity, etc.).</p>
    <h3>UNIT IV : Introduction to Embedded system and IoT</h3>
    <p>Introduction to embedded system and types, Sensor Interfacing, Actuators (Motors, LEDs, Relays), Practical Applications, Building Simple microcontroller and Embedded Systems, Introduction to IoT system and its architecture, Design of simple IoT system.</p>
    <h3>UNIT V : Introduction to Communication Systems</h3>
    <p>Introduction to Communication Systems, Analog and Digital Communication, Serial and Parallel Communication, Wireless Communication, Wireless Network Topologies, Networking Basics, Building Simple Communication Systems, Cellular Wireless Networks - Introduction, Cellular system, cellular concept and frequency reuse. Wireless Network Topologies – Fourth Generation (4G) Technology and introduction to 5G , CDMA Technology, Wireless LAN, Introduction to Bluetooth technology.</p>
  `,

  "problem-solving-c": `
    <h3>UNIT I : Introduction to Programming</h3>
    <p>Importance of C, Basic Structure of C Programs, Programming Style, Executing a C Program. Constants, Variables, and Data Types, Character Set, C Tokens, Keywords and Identifiers, Constants, Variables, Data Types, Declaration of Variables, Assigning Values to Variables, Defining Symbolic Constants.</p>
    <p>Managing Input and Output Operations: Reading a Character, Writing a Character, Formatted Input, Formatted Output.</p>
    <p>Operators and Expressions: Arithmetic, Relational, Logical, Assignment, Increment/Decrement, Conditional, Bitwise Operators. Evaluation, Precedence, Type Conversions.</p>
    <h3>UNIT II : Decision Making and Looping</h3>
    <p>Decision Making with IF, IF-ELSE, ELSE IF Ladder, Switch statement. Looping with WHILE, DO, FOR statements. Jumps in loops.</p>
    <h3>UNIT III : Arrays</h3>
    <p>One-dimensional and Two-dimensional Arrays, Declaration, Initialization. Programs: Linear search, Binary search, Bubble sort, Selection sort, Matrix Multiplication, Transpose of a matrix.</p>
    <h3>UNIT IV : Character Arrays and Strings & Pointers</h3>
    <p>String operations, Reading/Writing strings, Built-in string functions (strlen, strcpy, strcmp, strcat, strrev), Two-dimensional character arrays. Introduction to Pointers, Pointer variables, accessing variables through pointers, pointer arithmetic, arrays with pointers.</p>
    <h3>UNIT V : User-defined Functions</h3>
    <p>Definition, return types, function calls, arguments, recursion (factorial, X^n, Fibonacci), passing arrays to functions.</p>
  `,

  "communication-skill": `
    <h3>UNIT I : Grammar</h3>
    <p>Tenses and its types, sentences and its Types, Transformation of Sentences (Assertive, Affirmative, Negative, Interrogative, Exclamatory), Reported speech.</p>
    <h3>UNIT II : Introduction to Communication</h3>
    <p>Importance of communication, Types of communication - Verbal and Non-verbal (Kinesics, Vocalics, Chronemics, Haptics, Proxemics), Barriers to communication and methods to overcome them.</p>
    <h3>UNIT III : LSRW Skills</h3>
    <p>Listening Skills: Importance, types, barriers and solutions. Speaking Skills: Public speaking components, essential steps, overcoming stage fear, Do’s and Don’ts.</p>
    <h3>UNIT IV : Reading & Writing Skills</h3>
    <p>Reading: Importance, types, comprehending passages. Writing: Effective writing, paragraph writing, email etiquettes.</p>
  `
};

// DOM Elements
const homeView = document.getElementById('home-view');
const syllabusView = document.getElementById('syllabus-view');

const subjectCards = document.querySelectorAll('.subject-card');
const subjectTitle = document.getElementById('subjectTitle');
const subjectContent = document.getElementById('subjectContent');

// Buttons
const syllabusBackBtn = document.getElementById('syllabusBackBtn');
const homeBackBtn = document.getElementById('homeBackBtn');

// Functions

// 1. Open Syllabus Page
function openSyllabus(card) {
  const subjectKey = card.getAttribute('data-subject');
  const subjectName = card.querySelector('h2').textContent;

  subjectTitle.textContent = subjectName;
  subjectContent.innerHTML = syllabusData[subjectKey] || "<p>Content not found.</p>";

  // Switch View
  homeView.classList.remove('active');
  homeView.classList.add('hidden');
  
  syllabusView.classList.remove('hidden');
  syllabusView.classList.add('active');

  window.scrollTo(0, 0);
}

// 2. Go Back to Subject List
function goBackToHome() {
  syllabusView.classList.remove('active');
  syllabusView.classList.add('hidden');

  homeView.classList.remove('hidden');
  homeView.classList.add('active');
}

// 3. Go Back from Subject List (Browser History)
function goBackBrowser() {
  // Ye browser ki history check karega aur pichle page par le jayega
  window.history.back();
} 


// Event Listeners
subjectCards.forEach(card => {
  card.addEventListener('click', () => openSyllabus(card));
});

syllabusBackBtn.addEventListener('click', goBackToHome);
homeBackBtn.addEventListener('click', goBackBrowser);