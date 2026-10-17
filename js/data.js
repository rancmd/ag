// ── Helper: Extract YouTube ID from any YouTube URL or raw ID ──
function extractYouTubeId(str) {
  if (!str) return '';
  str = String(str).trim();
  const mShorts = str.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (mShorts) return mShorts[1];
  const mWatch = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (mWatch) return mWatch[1];
  const mYoutu = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (mYoutu) return mYoutu[1];
  const mEmbed = str.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (mEmbed) return mEmbed[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  return '';
}

// ── Built-in Default Dataset (7 Artists, 7 YouTube Videos) ──
// Serves as immediate render data and zero-setup offline fallback.
const ARTISTS = {

  chommang: {
    id: 'chommang',
    name: 'Chommang',
    handle: '@chommang',
    craft: 'Figure Drawing & Illustration',
    bio: 'Korean artist known for expressive figure studies and body drawings. Every line is intentional, every gesture captured with confidence. Sharing the full creative process — one drawing at a time.',
    location: 'Seoul, South Korea',
    avatarInitial: 'C',
    avatarColor: '#A083D5',
    tags: ['figure', 'drawing', 'illustration', 'sketch', 'anatomy', 'body'],
    followersCount: 142800,
    social: {
      youtube: 'https://www.youtube.com/@Chommang/shorts',
      patreon: '',
      kofi: '',
    },
    videos: [
      {
        id: 'chommang-v1',
        artistId: 'chommang',
        title: 'Body Drawing Process',
        description: 'Watching a full figure emerge from simple gesture lines to refined form.',
        src: 'https://www.youtube.com/shorts/Bo9o37kYm-0',
        type: 'youtube',
        youtubeId: 'Bo9o37kYm-0',
        thumbnail: 'https://img.youtube.com/vi/Bo9o37kYm-0/hqdefault.jpg',
        tags: ['figure', 'body', 'process', 'drawing'],
        duration: '0:45',
        likes: 8420,
      }
    ],
    gallery: [
      { id: 'cg1', title: 'Standing Figure Study', medium: 'Digital Drawing', year: 2024, gradient: 'linear-gradient(145deg,#A083D5,#5B3F8A)' },
      { id: 'cg2', title: 'Movement Series #3', medium: 'Digital Illustration', year: 2024, gradient: 'linear-gradient(145deg,#7B5EA7,#3D2660)' },
      { id: 'cg3', title: 'Body in Motion', medium: 'Digital Drawing', year: 2023, gradient: 'linear-gradient(145deg,#C4A8E8,#8A60C0)' },
      { id: 'cg4', title: 'Figure Composition', medium: 'Digital Drawing', year: 2023, gradient: 'linear-gradient(145deg,#9370CE,#4A2880)' },
    ],
    materials: [
      { name: 'Procreate', brand: 'Savage Interactive', type: 'App', description: 'Primary digital canvas for all illustrations', link: 'https://procreate.com', icon: '🎨' },
      { name: 'iPad Pro 12.9"', brand: 'Apple', type: 'Hardware', description: 'The main drawing surface', link: 'https://apple.com/ipad-pro', icon: '📱' },
      { name: 'Apple Pencil Pro', brand: 'Apple', type: 'Hardware', description: 'Precision and pressure sensitivity for natural drawing', link: 'https://apple.com/apple-pencil', icon: '✏️' },
      { name: 'Copic Multiliners', brand: 'Copic', type: 'Traditional', description: 'For occasional traditional sketching sessions', link: 'https://www.amazon.com/s?k=copic+multiliner', icon: '🖊️' },
    ],
    books: [
      { title: "Figure Drawing for All It's Worth", author: 'Andrew Loomis', description: 'The definitive guide to drawing the human figure. A must-have for any serious artist.', link: 'https://www.amazon.com/s?k=figure+drawing+andrew+loomis', type: 'book' },
      { title: 'Dynamic Figure Drawing', author: 'Burne Hogarth', description: 'Master the anatomy of movement and dynamic poses.', link: 'https://www.amazon.com/s?k=dynamic+figure+drawing+hogarth', type: 'book' },
      { title: 'Line of Action — Practice Tool', author: 'Line of Action', description: 'Free online tool for daily gesture drawing practice with timed sessions.', link: 'https://line-of-action.com', type: 'resource' },
    ],
    shop: [
      { id: 'cs1', item: 'Figure Study Digital Print Pack', price: '$12', description: '10 high-res digital prints of curated figure studies. Instant download.', link: '#', category: 'Digital' },
      { id: 'cs2', item: 'Procreate Gesture Brush Set', price: '$8', description: 'Custom brushes optimized for fast, expressive gesture drawing.', link: '#', category: 'Digital' },
    ],
    supportUrl: null,
    supportNote: 'Follow on YouTube and share the videos to support the channel.',
  },

  drewscape: {
    id: 'drewscape',
    name: 'Drewscape',
    handle: '@drewscape',
    craft: 'Watercolor & Urban Sketching',
    bio: 'Urban sketcher and watercolor artist documenting life through paint and paper. Cafes, street corners, and quiet moments — all become art. Based in Singapore.',
    location: 'Singapore',
    avatarInitial: 'D',
    avatarColor: '#3B82F6',
    tags: ['watercolor', 'urban sketching', 'travel', 'plein air', 'illustration', 'cafe'],
    followersCount: 89400,
    social: {
      youtube: 'https://www.youtube.com/@Drewscape-art/shorts',
      patreon: 'https://www.patreon.com/cw/Drewscape',
      kofi: '',
    },
    videos: [
      {
        id: 'drewscape-v1',
        artistId: 'drewscape',
        title: 'Drawing with Watercolors at a Cafe',
        description: 'A relaxed afternoon painting session capturing the scene with fluid watercolor washes.',
        src: 'https://www.youtube.com/shorts/I8SazY9yaLg',
        type: 'youtube',
        youtubeId: 'I8SazY9yaLg',
        thumbnail: 'https://img.youtube.com/vi/I8SazY9yaLg/hqdefault.jpg',
        tags: ['watercolor', 'cafe', 'plein air', 'urban'],
        duration: '1:10',
        likes: 14200,
      }
    ],
    gallery: [
      { id: 'dg1', title: 'Singapore Cafe Corner', medium: 'Watercolor on paper', year: 2024, gradient: 'linear-gradient(145deg,#60A5FA,#1D4ED8)' },
      { id: 'dg2', title: 'Morning Light Study', medium: 'Watercolor on paper', year: 2024, gradient: 'linear-gradient(145deg,#F4E064,#EFCF20)' },
      { id: 'dg3', title: 'The Old Street', medium: 'Watercolor & Ink', year: 2023, gradient: 'linear-gradient(145deg,#93C5FD,#3B82F6)' },
      { id: 'dg4', title: 'Rainy Day Palette', medium: 'Watercolor on paper', year: 2023, gradient: 'linear-gradient(145deg,#BAE6FD,#0EA5E9)' },
    ],
    materials: [
      { name: 'W&N Professional Watercolors', brand: 'Winsor & Newton', type: 'Paint', description: 'Artist-grade watercolors with excellent pigment quality and lightfastness', link: 'https://www.amazon.com/s?k=winsor+newton+professional+watercolor', icon: '🎨' },
      { name: 'Fabriano Artistico 300gsm', brand: 'Fabriano', type: 'Paper', description: '100% cotton paper that handles multiple wet washes beautifully without buckling', link: 'https://www.amazon.com/s?k=fabriano+artistico+300gsm', icon: '📄' },
      { name: 'Da Vinci Maestro Brushes', brand: 'Da Vinci', type: 'Brushes', description: 'Kolinsky sable brushes — sizes 6, 10, and 14 cover everything', link: 'https://www.amazon.com/s?k=da+vinci+maestro+brushes', icon: '🖌️' },
      { name: 'Lamy Safari Fountain Pen', brand: 'Lamy', type: 'Pen', description: 'For ink line work before adding watercolor washes on top', link: 'https://www.amazon.com/s?k=lamy+safari+fountain+pen', icon: '🖊️' },
    ],
    books: [
      { title: 'The Urban Sketcher', author: 'Marc Taro Holmes', description: 'Techniques for drawing on location in any city in the world. Changed how I sketch.', link: 'https://www.amazon.com/s?k=the+urban+sketcher+marc+taro+holmes', type: 'book' },
      { title: 'Watercolor Essentials', author: 'Rachel Rubin Wolf', description: 'Foundational techniques that apply to every watercolor painting.', link: 'https://www.amazon.com/s?k=watercolor+essentials', type: 'book' },
      { title: 'Patreon — Monthly Process Videos', author: 'Drewscape', description: 'Extended process videos, tutorials, and behind-the-scenes content every month.', link: 'https://www.patreon.com/cw/Drewscape', type: 'course' },
    ],
    shop: [
      { id: 'ds1', item: 'Singapore Streets — Print Series', price: '$28', description: 'Set of 4 A4 fine art prints of Singapore street scenes. Signed and shipped.', link: '#', category: 'Prints' },
      { id: 'ds2', item: 'Original Cafe Watercolor', price: '$180', description: 'Original watercolor painting on Fabriano 200gsm. 15cm x 20cm. Framed.', link: '#', category: 'Original' },
      { id: 'ds3', item: 'Urban Sketching Starter Guide', price: '$9', description: 'PDF guide: what to pack, what to look for, and how to start sketching on location.', link: '#', category: 'Digital' },
    ],
    supportUrl: 'https://www.patreon.com/cw/Drewscape',
    supportNote: 'Support Drewscape on Patreon and get access to extended process videos, exclusive tutorials, and behind-the-scenes content.',
  },

  mmmmonexx: {
    id: 'mmmmonexx',
    name: 'Mmmmonexx',
    handle: '@mmmmonexx',
    craft: 'Sketch & Illustration',
    bio: 'Dedicated to the art of the sketch. Fast lines, expressive marks, and the beauty of imperfection. Drawing daily and sharing the full process — no filters.',
    location: 'Online',
    avatarInitial: 'M',
    avatarColor: '#F59E0B',
    tags: ['sketch', 'drawing', 'illustration', 'figure', 'character', 'daily'],
    followersCount: 67200,
    social: {
      youtube: 'https://www.youtube.com/@Mmmmonexx/shorts',
      patreon: 'https://www.patreon.com/mmmmonexx',
      kofi: '',
    },
    videos: [
      {
        id: 'mmmmonexx-v1',
        artistId: 'mmmmonexx',
        title: 'Drawing Class Process',
        description: 'Continuous linework and thoughtful proportions from imagination to paper.',
        src: 'https://www.youtube.com/shorts/jHwt9qabetA',
        type: 'youtube',
        youtubeId: 'jHwt9qabetA',
        thumbnail: 'https://img.youtube.com/vi/jHwt9qabetA/hqdefault.jpg',
        tags: ['drawing', 'class', 'process', 'sketch'],
        duration: '0:55',
        likes: 6800,
      }
    ],
    gallery: [
      { id: 'mg1', title: 'Character Study #12', medium: 'Digital Illustration', year: 2024, gradient: 'linear-gradient(145deg,#FCD34D,#D97706)' },
      { id: 'mg2', title: 'Sketch Book — Expressions', medium: 'Pencil on paper', year: 2024, gradient: 'linear-gradient(145deg,#FDE68A,#F59E0B)' },
      { id: 'mg3', title: 'Figure Composition', medium: 'Digital Drawing', year: 2024, gradient: 'linear-gradient(145deg,#FDBA74,#EA580C)' },
    ],
    materials: [
      { name: 'Faber-Castell 9000 Pencil Set', brand: 'Faber-Castell', type: 'Pencils', description: 'HB to 6B range for all traditional sketching work', link: 'https://www.amazon.com/s?k=faber+castell+9000+pencil+set', icon: '✏️' },
      { name: 'Strathmore 400 Sketch Pad', brand: 'Strathmore', type: 'Paper', description: 'Great texture and weight for pencil sketching — smooth enough for fine lines', link: 'https://www.amazon.com/s?k=strathmore+400+series+sketch+pad', icon: '📒' },
      { name: 'Pentel Graph Gear Mechanical Pencil', brand: 'Pentel', type: 'Pencil', description: 'Precise mechanical pencil for detailed technical linework', link: 'https://www.amazon.com/s?k=pentel+graph+gear', icon: '✏️' },
    ],
    books: [
      { title: 'Drawing on the Right Side of the Brain', author: 'Betty Edwards', description: 'The essential guide to shifting how you see and draw. Completely changed my approach.', link: 'https://www.amazon.com/s?k=drawing+on+the+right+side+of+the+brain', type: 'book' },
      { title: 'The Natural Way to Draw', author: 'Kimon Nicolaïdes', description: 'A structured study program for the dedicated artist.', link: 'https://www.amazon.com/s?k=natural+way+to+draw+nicolaides', type: 'book' },
    ],
    shop: [
      { id: 'ms1', item: 'Sketch Collection Vol. 1 — PDF', price: '$10', description: '50-page digital sketchbook of curated original drawings. High resolution, instant download.', link: '#', category: 'Digital' },
      { id: 'ms2', item: 'Drawing Fundamentals Mini Course', price: '$24', description: 'Self-paced video course covering line, form, value, and composition basics.', link: '#', category: 'Course' },
    ],
    supportUrl: 'https://www.patreon.com/mmmmonexx',
    supportNote: 'Support on Patreon for exclusive sketching content, extended process videos, and monthly drawing challenges.',
  },

  nisu: {
    id: 'nisu',
    name: 'Nisu',
    handle: '@nisufilm',
    craft: 'Portrait & Figure Drawing',
    bio: 'Portrait artist exploring the human face through pencil and charcoal. Each drawing is a study in observation — light, shadow, and expression. Sharing honest process videos for those who love to watch and learn.',
    location: 'Online',
    avatarInitial: 'N',
    avatarColor: '#059669',
    tags: ['portrait', 'figure', 'pencil', 'charcoal', 'realism', 'loomis', 'face'],
    followersCount: 54700,
    social: {
      youtube: 'https://www.youtube.com/@nisufilm',
      patreon: '',
      kofi: 'https://ko-fi.com/artbynisu',
    },
    videos: [
      {
        id: 'nisu-v1',
        artistId: 'nisu',
        title: 'How I Draw Portrait Using the Loomis Method',
        description: 'Master the Loomis method step-by-step for accurate portrait construction.',
        src: 'https://www.youtube.com/shorts/4aeeQsaP2uk',
        type: 'youtube',
        youtubeId: '4aeeQsaP2uk',
        thumbnail: 'https://img.youtube.com/vi/4aeeQsaP2uk/hqdefault.jpg',
        tags: ['portrait', 'loomis', 'drawing', 'pencil'],
        duration: '0:55',
        likes: 11400,
      }
    ],
    gallery: [
      { id: 'ng1', title: 'Portrait Study — Natural Light', medium: 'Graphite on paper', year: 2024, gradient: 'linear-gradient(145deg,#6EE7B7,#059669)' },
      { id: 'ng2', title: 'The Loomis Head — Final', medium: 'Pencil on paper', year: 2024, gradient: 'linear-gradient(145deg,#34D399,#047857)' },
      { id: 'ng3', title: 'Eyes — Detail Study', medium: 'Graphite', year: 2024, gradient: 'linear-gradient(145deg,#A7F3D0,#10B981)' },
    ],
    materials: [
      { name: 'Nitram Charcoal', brand: 'Nitram', type: 'Charcoal', description: 'Premium vine charcoal — the gold standard for portrait and figure work', link: 'https://www.amazon.com/s?k=nitram+charcoal', icon: '✏️' },
      { name: 'Fabriano Toned Gray Paper', brand: 'Fabriano', type: 'Paper', description: 'Toned paper for charcoal — provides a built-in middle value', link: 'https://www.amazon.com/s?k=fabriano+toned+gray+paper', icon: '📄' },
      { name: 'Staedtler Mars Pencils', brand: 'Staedtler', type: 'Pencils', description: 'H to 2B range for construction lines and portrait refinement', link: 'https://www.amazon.com/s?k=staedtler+mars+pencils', icon: '✏️' },
      { name: 'Kneaded Eraser', brand: 'General Pencil', type: 'Tool', description: 'For lifting highlights in charcoal portraits — essential', link: 'https://www.amazon.com/s?k=kneaded+eraser', icon: '⬜' },
    ],
    books: [
      { title: 'Drawing the Head and Hands', author: 'Andrew Loomis', description: 'The ultimate reference for portrait artists. Every serious artist needs this on their shelf.', link: 'https://www.amazon.com/s?k=drawing+head+hands+loomis', type: 'book' },
      { title: 'Portrait Drawing: Step-by-Step', author: 'Carole Katchen', description: 'Practical, clear techniques for capturing likeness and expression.', link: 'https://www.amazon.com/s?k=portrait+drawing+step+by+step', type: 'book' },
      { title: 'Ko-fi — Support & Exclusive Content', author: 'Nisu', description: 'Get access to hi-res reference photos and extended process videos on Ko-fi.', link: 'https://ko-fi.com/artbynisu', type: 'resource' },
    ],
    shop: [
      { id: 'ns1', item: 'Portrait Reference Photo Pack', price: '$6', description: '20 high-quality portrait reference photos for practice. Royalty-free, instant download.', link: '#', category: 'Digital' },
      { id: 'ns2', item: 'Graphite Portrait — Original', price: '$220', description: 'Original 40x50cm graphite portrait on Fabriano toned paper. Shipped with care.', link: '#', category: 'Original' },
    ],
    supportUrl: 'https://ko-fi.com/artbynisu',
    supportNote: 'Support Nisu on Ko-fi to help fund more process videos, art supplies, and exclusive reference packs for supporters.',
  },

  akihito: {
    id: 'akihito',
    name: 'Akihito Yoshitomi',
    handle: '@akihitoyoshitomi',
    craft: 'Manga & Character Design',
    bio: 'Manga artist and character designer bringing detailed illustrations to life. Meticulous linework, expressive characters, and a deep love for the craft of traditional manga art.',
    location: 'Japan',
    avatarInitial: 'A',
    avatarColor: '#EC4899',
    tags: ['manga', 'illustration', 'character design', 'japanese', 'ink', 'linework', 'comic'],
    followersCount: 31900,
    social: {
      youtube: 'https://www.youtube.com/@akihitoyoshitomi3758',
      patreon: '',
      kofi: '',
    },
    videos: [
      {
        id: 'akihito-v1',
        artistId: 'akihito',
        title: '2-Minute Human Figure Drawing Challenge!',
        description: 'Fast gesture and anatomy drawing challenge captured in under two minutes.',
        src: 'https://www.youtube.com/shorts/0cwa8eCYT0o',
        type: 'youtube',
        youtubeId: '0cwa8eCYT0o',
        thumbnail: 'https://img.youtube.com/vi/0cwa8eCYT0o/hqdefault.jpg',
        tags: ['figure', 'speed', 'challenge', 'drawing'],
        duration: '0:58',
        likes: 6100,
      }
    ],
    gallery: [
      { id: 'ag1', title: 'Character Design Sheet #08', medium: 'Ink on paper', year: 2024, gradient: 'linear-gradient(145deg,#F9A8D4,#DB2777)' },
      { id: 'ag2', title: 'The Swordsman — Final', medium: 'Ink & Watercolor', year: 2024, gradient: 'linear-gradient(145deg,#FBCFE8,#EC4899)' },
      { id: 'ag3', title: 'Expression Study — 12 Panels', medium: 'Ink on paper', year: 2023, gradient: 'linear-gradient(145deg,#FDA4AF,#E11D48)' },
    ],
    materials: [
      { name: 'Tachikawa G-Pen Nib', brand: 'Tachikawa', type: 'Pen Nib', description: 'Classic manga G-pen for expressive, variable line weight — the essential manga tool', link: 'https://www.amazon.com/s?k=tachikawa+g+pen+nib', icon: '🖊️' },
      { name: 'Kuretake Manga Ink', brand: 'Kuretake', type: 'Ink', description: 'Deep black, waterproof ink that scans and photographs perfectly', link: 'https://www.amazon.com/s?k=kuretake+manga+ink', icon: '🖋️' },
      { name: 'Deleter Kent Paper', brand: 'Deleter', type: 'Paper', description: 'Standard manga paper with the ideal surface for dip pen nibs', link: 'https://www.amazon.com/s?k=deleter+kent+paper', icon: '📄' },
      { name: 'Clip Studio Paint EX', brand: 'Celsys', type: 'Software', description: 'Industry-standard software for manga and comic illustration', link: 'https://www.clipstudio.net', icon: '💻' },
    ],
    books: [
      { title: 'How to Draw Manga: Basics and Beyond', author: 'Hikaru Hayashi', description: 'Technical foundations of manga art from a professional illustrator working in the industry.', link: 'https://www.amazon.com/s?k=how+to+draw+manga+basics+beyond', type: 'book' },
      { title: 'Manga in Theory and Practice', author: 'Hirohiko Araki', description: "The JoJo's Bizarre Adventure creator explains manga storytelling, composition, and technique.", link: 'https://www.amazon.com/s?k=manga+in+theory+and+practice+araki', type: 'book' },
    ],
    shop: [
      { id: 'as1', item: 'Character Design — A3 Fine Art Print', price: '$18', description: 'Archival print of original character design on premium 200gsm paper. Signed.', link: '#', category: 'Prints' },
      { id: 'as2', item: 'Original Manga Sketch Page', price: '$75', description: 'Original ink sketch page on Deleter Kent paper. Signed and shipped from Japan.', link: '#', category: 'Original' },
    ],
    supportUrl: null,
    supportNote: 'Subscribe on YouTube to support the channel and discover more manga process content.',
  },

  sofia: {
    id: 'sofia',
    name: 'Sofia Carbone',
    handle: '@sofiacarbone',
    craft: 'Charcoal & Life Drawing',
    bio: 'Traditional artist working with charcoal and the human figure. Studying form through slow observation and deliberate mark-making. Based in Rome. Every drawing is a meditation on light and form.',
    location: 'Rome, Italy',
    avatarInitial: 'S',
    avatarColor: '#7C3AED',
    tags: ['charcoal', 'life drawing', 'figure', 'traditional', 'realism', 'portrait', 'italy'],
    followersCount: 22100,
    social: {
      youtube: 'https://www.youtube.com/@sofiacarbone',
      patreon: '',
      kofi: '',
    },
    videos: [
      {
        id: 'sofia-v1',
        artistId: 'sofia',
        title: '60 Second Charcoal Drawing',
        description: 'Bold expressive marks and deep velvety darks in a 60-second figure study.',
        src: 'https://www.youtube.com/shorts/yBY7ZAf2tYY',
        type: 'youtube',
        youtubeId: 'yBY7ZAf2tYY',
        thumbnail: 'https://img.youtube.com/vi/yBY7ZAf2tYY/hqdefault.jpg',
        tags: ['charcoal', 'figure', 'speed', 'traditional'],
        duration: '1:00',
        likes: 9800,
      }
    ],
    gallery: [
      { id: 'sg1', title: 'Life Study — Standing Pose', medium: 'Charcoal on paper', year: 2024, gradient: 'linear-gradient(145deg,#A78BFA,#7C3AED)' },
      { id: 'sg2', title: 'Torso — Natural Light', medium: 'Charcoal on newsprint', year: 2024, gradient: 'linear-gradient(145deg,#C4B5FD,#6D28D9)' },
      { id: 'sg3', title: 'The Roman Afternoon', medium: 'Charcoal on Strathmore', year: 2023, gradient: 'linear-gradient(145deg,#8B5CF6,#4C1D95)' },
    ],
    materials: [
      { name: 'Vine Charcoal Sticks', brand: 'General Pencil', type: 'Charcoal', description: 'Soft vine charcoal for broad initial marks and tonal blocking in life drawing', link: 'https://www.amazon.com/s?k=vine+charcoal+sticks', icon: '✏️' },
      { name: 'Compressed Charcoal', brand: 'Conté', type: 'Charcoal', description: 'Dense, rich compressed charcoal for deep, velvety darks', link: 'https://www.amazon.com/s?k=conte+compressed+charcoal', icon: '✏️' },
      { name: 'Newsprint Pad 18x24"', brand: 'Strathmore', type: 'Paper', description: 'Large newsprint for warm-up gesture work and experimental drawing', link: 'https://www.amazon.com/s?k=strathmore+newsprint+pad', icon: '📄' },
      { name: 'Chamois Cloth', brand: 'Various', type: 'Tool', description: 'For blending and creating soft mid-tones in charcoal life drawings', link: 'https://www.amazon.com/s?k=chamois+cloth+drawing', icon: '🧤' },
    ],
    books: [
      { title: 'The Practice and Science of Drawing', author: 'Harold Speed', description: 'A classic text on the theory and practice of drawing from life. Still essential today.', link: 'https://www.amazon.com/s?k=practice+science+drawing+harold+speed', type: 'book' },
      { title: 'Natural Light Figure Drawing', author: 'Jake Spicer', description: 'Mastering the figure in the studio using natural window light as the only illumination.', link: 'https://www.amazon.com/s?k=natural+light+figure+drawing+spicer', type: 'book' },
    ],
    shop: [
      { id: 'ss1', item: 'Life Study — Original Charcoal', price: '$150', description: 'Original 50x70cm life drawing on Strathmore paper. Ships carefully from Rome, Italy.', link: '#', category: 'Original' },
      { id: 'ss2', item: 'Studio Session Prints (Set of 3)', price: '$32', description: 'Fine art prints of 3 selected life drawings. A4 size, archival quality paper.', link: '#', category: 'Prints' },
    ],
    supportUrl: null,
    supportNote: 'Follow, share, and explore the shop. Originals and prints available — each one ships from my studio in Rome.',
  },

  rancmd: {
    id: 'rancmd',
    name: 'rancmd',
    handle: '@rancmd',
    craft: 'sketch',
    bio: 'character design',
    location: 'Israel',
    avatarInitial: 'R',
    avatarColor: '#F00025',
    tags: ['sketch', 'pen and paper', 'character'],
    followersCount: 99999,
    social: {
      youtube: 'https://www.youtube.com/@rancmd',
      patreon: '',
      kofi: '',
    },
    videos: [
      {
        id: 'rancmd-v1',
        artistId: 'rancmd',
        title: 'How to Sketch #drawing',
        description: 'Dynamic character sketching and quick anatomy study with pen and paper.',
        src: 'https://www.youtube.com/shorts/uFDX87NJ37g',
        type: 'youtube',
        youtubeId: 'uFDX87NJ37g',
        thumbnail: 'https://img.youtube.com/vi/uFDX87NJ37g/hqdefault.jpg',
        tags: ['sketch', 'drawing', 'character', 'pen'],
        duration: '1:00',
        likes: 9999,
      }
    ],
    gallery: [],
    materials: [],
    books: [],
    shop: [],
    supportUrl: null,
    supportNote: 'Follow on YouTube and share the videos to support the channel.',
  },

};

// ── Feed order: The 7 YouTube Shorts requested by user ───────
const FEED_VIDEO_IDS = [
  'nisu-v1',
  'rancmd-v1',
  'sofia-v1',
  'akihito-v1',
  'chommang-v1',
  'mmmmonexx-v1',
  'drewscape-v1'
];

// ── Search categories ────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',        label: 'All',            icon: '✦' },
  { id: 'drawing',    label: 'Drawing',         icon: '✏️' },
  { id: 'watercolor', label: 'Watercolor',      icon: '💧' },
  { id: 'charcoal',   label: 'Charcoal',        icon: '◼' },
  { id: 'figure',     label: 'Figure',          icon: '🧍' },
  { id: 'portrait',   label: 'Portrait',        icon: '👤' },
  { id: 'manga',      label: 'Manga',           icon: '🎌' },
  { id: 'sketch',     label: 'Sketch',          icon: '📐' },
  { id: 'urban',      label: 'Urban Sketching', icon: '🏙️' },
  { id: 'illustration',label: 'Illustration',   icon: '🖼️' },
  { id: 'traditional',label: 'Traditional',     icon: '🖌️' },
];

// ── Helper functions ─────────────────────────────────────────

function getArtist(id) {
  return ARTISTS[id] || null;
}

function getAllArtists() {
  return Object.values(ARTISTS);
}

function getAllVideos() {
  const all = [];
  for (const artist of Object.values(ARTISTS)) {
    for (const video of artist.videos) {
      all.push({ ...video, artist });
    }
  }
  return all;
}

function getVideo(videoId) {
  for (const artist of Object.values(ARTISTS)) {
    const video = artist.videos.find(v => v.id === videoId);
    if (video) return { ...video, artist };
  }
  return null;
}

function getFeedVideos() {
  return FEED_VIDEO_IDS.map(id => getVideo(id)).filter(Boolean);
}

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

function searchContent(query, categoryId = 'all') {
  const q = (query || '').toLowerCase().trim();
  const artists = Object.values(ARTISTS);
  const allVideos = getAllVideos();

  let matchedArtists = artists;
  let matchedVideos = allVideos;

  if (q) {
    matchedArtists = artists.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.craft.toLowerCase().includes(q) ||
      a.bio.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
    matchedVideos = allVideos.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.tags.some(t => t.toLowerCase().includes(q)) ||
      v.artist.name.toLowerCase().includes(q)
    );
  }

  if (categoryId !== 'all') {
    const cat = categoryId.toLowerCase();
    matchedArtists = matchedArtists.filter(a =>
      a.tags.some(t => t.toLowerCase().includes(cat))
    );
    matchedVideos = matchedVideos.filter(v =>
      v.tags.some(t => t.toLowerCase().includes(cat)) ||
      v.artist.tags.some(t => t.toLowerCase().includes(cat))
    );
  }

  return { artists: matchedArtists, videos: matchedVideos };
}

// ============================================================
// GOOGLE SHEETS LIVE SYNC & EXCEL DATABASE LOADER
// ============================================================

// Your Google Sheet ID (from your share link)
const GOOGLE_SHEET_ID = '1ng734_0I9g6yg5ZJ0rkET6vgawcUW1bc';

function fetchGoogleSheetJSONP(sheetId, sheetName) {
  return new Promise((resolve, reject) => {
    const cb = 'gviz_cb_' + Math.random().toString(36).substring(2, 9);
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Timeout loading ' + sheetName));
    }, 7000);

    function cleanup() {
      clearTimeout(timeout);
      try { delete window[cb]; } catch (e) {}
      if (script && script.parentNode) script.parentNode.removeChild(script);
    }

    window[cb] = (data) => {
      cleanup();
      if (!data || !data.table || !data.table.rows) return resolve([]);
      const cols = data.table.cols.map(c => (c && (c.label || c.id)) || '');
      const rows = data.table.rows.map(r => {
        const row = {};
        if (r && r.c) {
          r.c.forEach((cell, i) => {
            const colName = cols[i];
            if (colName) row[colName] = (cell && cell.v !== undefined) ? cell.v : null;
          });
        }
        return row;
      });
      resolve(rows);
    };

    const script = document.createElement('script');
    script.src = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=responseHandler:${cb}&sheet=${encodeURIComponent(sheetName)}&t=${Date.now()}`;
    script.onerror = () => {
      cleanup();
      reject(new Error('Network error loading ' + sheetName));
    };
    document.head.appendChild(script);
  });
}

function applyLoadedDatabase(artistsRows, videosRows, galleryRows, materialsRows, booksRows, shopRows, sourceName) {
  if (!artistsRows || !artistsRows.length) return false;

  const newArtists = {};
  for (const a of artistsRows) {
    if (!a.id) continue;
    newArtists[a.id] = {
      id: String(a.id),
      name: a.name || '',
      handle: a.handle || '',
      craft: a.craft || '',
      bio: a.bio || '',
      location: a.location || '',
      avatarInitial: a.avatarInitial || (a.name ? a.name.charAt(0).toUpperCase() : '?'),
      avatarColor: a.avatarColor || '#A083D5',
      tags: typeof a.tags === 'string' ? a.tags.split(',').map(t => t.trim()).filter(Boolean) : (Array.isArray(a.tags) ? a.tags : []),
      followersCount: Number(a.followersCount) || 0,
      social: {
        youtube: a.youtube || '',
        patreon: a.patreon || '',
        kofi: a.kofi || ''
      },
      videos: [],
      gallery: [],
      materials: [],
      books: [],
      shop: [],
      supportUrl: a.patreon || a.kofi || null,
      supportNote: a.supportNote || ''
    };
  }

  const newFeedVideoIds = [];
  for (const v of videosRows) {
    if (!v.id || !v.artistId) continue;
    const rawLink = v.src || v.youtubeId || v.link || v.url || '';
    const ytId = extractYouTubeId(rawLink);
    const isYoutube = !!ytId;

    const vidObj = {
      id: String(v.id),
      artistId: String(v.artistId),
      title: v.title || '',
      description: v.description || '',
      src: v.src || (isYoutube ? `https://www.youtube.com/shorts/${ytId}` : ''),
      type: isYoutube ? 'youtube' : (v.type || 'local'),
      tags: typeof v.tags === 'string' ? v.tags.split(',').map(t => t.trim()).filter(Boolean) : (Array.isArray(v.tags) ? v.tags : []),
      duration: v.duration || '1:00',
      likes: Number(v.likes) || 0,
      youtubeId: ytId
    };
    if (isYoutube) {
      vidObj.thumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
    if (newArtists[v.artistId]) {
      newArtists[v.artistId].videos.push(vidObj);
    }
    newFeedVideoIds.push(vidObj.id);
  }

  for (const g of galleryRows) {
    if (newArtists[g.artistId]) {
      newArtists[g.artistId].gallery.push({
        id: g.id || String(Math.random()),
        title: g.title || '',
        medium: g.medium || '',
        year: g.year || new Date().getFullYear(),
        gradient: g.gradient || 'linear-gradient(145deg,#A083D5,#5B3F8A)'
      });
    }
  }

  for (const m of materialsRows) {
    if (newArtists[m.artistId]) {
      newArtists[m.artistId].materials.push({
        name: m.name || '',
        brand: m.brand || '',
        type: m.type || '',
        description: m.description || '',
        link: m.link || '#',
        icon: m.icon || '🎨'
      });
    }
  }

  for (const b of booksRows) {
    if (newArtists[b.artistId]) {
      newArtists[b.artistId].books.push({
        title: b.title || '',
        author: b.author || '',
        description: b.description || '',
        link: b.link || '#',
        type: b.type || 'book'
      });
    }
  }

  for (const s of shopRows) {
    if (newArtists[s.artistId]) {
      newArtists[s.artistId].shop.push({
        id: s.id || String(Math.random()),
        item: s.item || '',
        price: s.price || '$0',
        description: s.description || '',
        link: s.link || '#',
        category: s.category || 'Prints'
      });
    }
  }

  // Replace in-memory data
  Object.keys(ARTISTS).forEach(k => delete ARTISTS[k]);
  Object.assign(ARTISTS, newArtists);
  FEED_VIDEO_IDS.length = 0;
  FEED_VIDEO_IDS.push(...newFeedVideoIds);

  console.log(`[ART GEM] Database live synced from ${sourceName}: ${Object.keys(ARTISTS).length} artists, ${FEED_VIDEO_IDS.length} videos.`);
  document.dispatchEvent(new CustomEvent('artgem:dataloaded', { detail: { source: sourceName, count: Object.keys(ARTISTS).length } }));
  return true;
}

async function loadDatabaseFromGoogleSheets(sheetId = GOOGLE_SHEET_ID) {
  if (!sheetId) return false;
  try {
    const [artistsRows, videosRows, galleryRows, materialsRows, booksRows, shopRows] = await Promise.all([
      fetchGoogleSheetJSONP(sheetId, 'Artists'),
      fetchGoogleSheetJSONP(sheetId, 'Videos'),
      fetchGoogleSheetJSONP(sheetId, 'Gallery').catch(() => []),
      fetchGoogleSheetJSONP(sheetId, 'Materials').catch(() => []),
      fetchGoogleSheetJSONP(sheetId, 'Books').catch(() => []),
      fetchGoogleSheetJSONP(sheetId, 'Shop').catch(() => [])
    ]);

    return applyLoadedDatabase(artistsRows, videosRows, galleryRows, materialsRows, booksRows, shopRows, 'Google Sheets');
  } catch (err) {
    console.warn('[ART GEM] Google Sheets sync not available, trying local database:', err.message);
    return false;
  }
}

async function loadDatabaseFromExcel(excelUrl = 'artgem_database.xlsx') {
  if (typeof XLSX === 'undefined') return false;
  try {
    const res = await fetch(excelUrl + '?v=' + Date.now());
    if (!res.ok) return false;
    const data = await res.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });

    const getSheetRows = (sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) return [];
      return XLSX.utils.sheet_to_json(sheet);
    };

    return applyLoadedDatabase(
      getSheetRows('Artists'),
      getSheetRows('Videos'),
      getSheetRows('Gallery'),
      getSheetRows('Materials'),
      getSheetRows('Books'),
      getSheetRows('Shop'),
      'artgem_database.xlsx'
    );
  } catch (err) {
    console.info('[ART GEM] Local Excel file not found or inaccessible, using built-in data.');
    return false;
  }
}

async function initDatabase() {
  // 1. Try Google Sheets live sync first
  if (GOOGLE_SHEET_ID) {
    const gsOk = await loadDatabaseFromGoogleSheets(GOOGLE_SHEET_ID);
    if (gsOk) return true;
  }
  // 2. Fall back to local Excel file
  const xlOk = await loadDatabaseFromExcel('artgem_database.xlsx');
  if (xlOk) return true;
  // 3. Fall back to built-in dataset
  return false;
}
