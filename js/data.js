// ============================================================
// ART GEM — Data Layer
// Replace with API calls for production backend.
// ============================================================

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
    },
    videos: [
      {
        id: 'chommang-v1',
        artistId: 'chommang',
        title: 'Body Drawing Process',
        description: 'Watching a full figure emerge from simple gesture lines to refined form.',
        src: 'assets/videos/video4.mp4',
        type: 'local',
        tags: ['figure', 'body', 'process', 'drawing'],
        duration: '0:45',
        likes: 8420,
      },
      {
        id: 'chommang-v2',
        artistId: 'chommang',
        title: 'Gesture & Form Study',
        description: 'Quick gesture studies building into refined figure drawings.',
        src: 'assets/videos/video4.mp4',
        type: 'local',
        tags: ['gesture', 'figure', 'study'],
        duration: '0:58',
        likes: 5100,
      },
      {
        id: 'chommang-v3',
        artistId: 'chommang',
        title: 'Figure in Motion',
        description: 'Capturing dynamic poses with confidence and speed.',
        youtubeId: 'Bo9o37kYm-0',
        type: 'youtube',
        tags: ['figure', 'motion', 'dynamic', 'shorts'],
        duration: '0:58',
        likes: 12300,
        thumbnail: 'https://img.youtube.com/vi/Bo9o37kYm-0/hqdefault.jpg',
      },
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
    },
    videos: [
      {
        id: 'drewscape-v1',
        artistId: 'drewscape',
        title: 'Watercolors at a Cafe',
        description: 'A quiet afternoon painting session in a Singapore cafe. Watch the scene come to life.',
        src: 'assets/videos/video6.mp4',
        type: 'local',
        tags: ['watercolor', 'cafe', 'urban', 'plein air', 'singapore'],
        duration: '2:15',
        likes: 14200,
      },
      {
        id: 'drewscape-v2',
        artistId: 'drewscape',
        title: 'Street Scene in Watercolor',
        description: 'Capturing the energy of a busy street in quick, confident washes.',
        src: 'assets/videos/video5.mp4',
        type: 'local',
        tags: ['street', 'watercolor', 'urban', 'process'],
        duration: '1:10',
        likes: 9800,
      },
      {
        id: 'drewscape-v3',
        artistId: 'drewscape',
        title: 'Morning Sketch — Watercolor',
        description: 'A relaxed morning sketching session with watercolors on location.',
        youtubeId: 'I8SazY9yaLg',
        type: 'youtube',
        tags: ['watercolor', 'morning', 'sketch', 'shorts'],
        duration: '1:00',
        likes: 7600,
        thumbnail: 'https://img.youtube.com/vi/I8SazY9yaLg/hqdefault.jpg',
      },
    ],
    gallery: [
      { id: 'dg1', title: 'Singapore Cafe Corner', medium: 'Watercolor on paper', year: 2024, gradient: 'linear-gradient(145deg,#60A5FA,#1D4ED8)' },
      { id: 'dg2', title: 'Morning Light Study', medium: 'Watercolor on paper', year: 2024, gradient: 'linear-gradient(145deg,#F4E064,#EFCF20)' },
      { id: 'dg3', title: 'The Old Street', medium: 'Watercolor & Ink', year: 2023, gradient: 'linear-gradient(145deg,#93C5FD,#3B82F6)' },
      { id: 'dg4', title: 'Rainy Day Palette', medium: 'Watercolor on paper', year: 2023, gradient: 'linear-gradient(145deg,#BAE6FD,#0EA5E9)' },
      { id: 'dg5', title: 'Market Scene', medium: 'Watercolor & Pen', year: 2023, gradient: 'linear-gradient(145deg,#A5B4FC,#4F46E5)' },
    ],
    materials: [
      { name: 'W&N Professional Watercolors', brand: 'Winsor & Newton', type: 'Paint', description: 'Artist-grade watercolors with excellent pigment quality and lightfastness', link: 'https://www.amazon.com/s?k=winsor+newton+professional+watercolor', icon: '🎨' },
      { name: 'Fabriano Artistico 300gsm', brand: 'Fabriano', type: 'Paper', description: '100% cotton paper that handles multiple wet washes beautifully without buckling', link: 'https://www.amazon.com/s?k=fabriano+artistico+300gsm', icon: '📄' },
      { name: 'Da Vinci Maestro Brushes', brand: 'Da Vinci', type: 'Brushes', description: 'Kolinsky sable brushes — sizes 6, 10, and 14 cover everything', link: 'https://www.amazon.com/s?k=da+vinci+maestro+brushes', icon: '🖌️' },
      { name: 'Lamy Safari Fountain Pen', brand: 'Lamy', type: 'Pen', description: 'For ink line work before adding watercolor washes on top', link: 'https://www.amazon.com/s?k=lamy+safari+fountain+pen', icon: '🖊️' },
      { name: "Traveler's Notebook", brand: 'Midori', type: 'Sketchbook', description: 'Compact sketchbook perfect for on-location urban sketching sessions', link: 'https://www.amazon.com/s?k=midori+travelers+notebook', icon: '📒' },
    ],
    books: [
      { title: 'The Urban Sketcher', author: 'Marc Taro Holmes', description: 'Techniques for drawing on location in any city in the world. Changed how I sketch.', link: 'https://www.amazon.com/s?k=the+urban+sketcher+marc+taro+holmes', type: 'book' },
      { title: 'Watercolor Essentials', author: 'Rachel Rubin Wolf', description: 'Foundational techniques that apply to every watercolor painting.', link: 'https://www.amazon.com/s?k=watercolor+essentials', type: 'book' },
      { title: 'Patreon — Monthly Process Videos', author: 'Drewscape', description: 'Extended process videos, tutorials, and behind-the-scenes content every month.', link: 'https://www.patreon.com/cw/Drewscape', type: 'course' },
    ],
    shop: [
      { id: 'ds1', item: 'Singapore Streets — Print Series', price: '$28', description: 'Set of 4 A4 fine art prints of Singapore street scenes. Signed and shipped.', link: '#', category: 'Prints' },
      { id: 'ds2', item: 'Original Cafe Watercolor', price: '$180', description: 'Original watercolor painting on Fabriano 200gsm. 15cm × 20cm. Framed.', link: '#', category: 'Original' },
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
    },
    videos: [
      {
        id: 'mmmmonexx-v1',
        artistId: 'mmmmonexx',
        title: 'Drawing Class Process',
        description: 'Full drawing process — from blank page to finished illustration, no commentary.',
        src: 'assets/videos/video5.mp4',
        type: 'local',
        tags: ['drawing', 'class', 'process', 'illustration'],
        duration: '0:55',
        likes: 6800,
      },
      {
        id: 'mmmmonexx-v2',
        artistId: 'mmmmonexx',
        title: 'Sketch Session — No Talking',
        description: 'A complete sketch session. Just the drawing. No commentary.',
        youtubeId: 'jHwt9qabetA',
        type: 'youtube',
        tags: ['sketch', 'process', 'quiet', 'shorts'],
        duration: '0:48',
        likes: 9200,
        thumbnail: 'https://img.youtube.com/vi/jHwt9qabetA/hqdefault.jpg',
      },
      {
        id: 'mmmmonexx-v3',
        artistId: 'mmmmonexx',
        title: 'Character Sketch Study',
        description: 'Building a character from imagination — step by step, mark by mark.',
        src: 'assets/videos/video6.mp4',
        type: 'local',
        tags: ['character', 'sketch', 'design', 'process'],
        duration: '1:50',
        likes: 4500,
      },
    ],
    gallery: [
      { id: 'mg1', title: 'Character Study #12', medium: 'Digital Illustration', year: 2024, gradient: 'linear-gradient(145deg,#FCD34D,#D97706)' },
      { id: 'mg2', title: 'Sketch Book — Expressions', medium: 'Pencil on paper', year: 2024, gradient: 'linear-gradient(145deg,#FDE68A,#F59E0B)' },
      { id: 'mg3', title: 'Figure Composition', medium: 'Digital Drawing', year: 2024, gradient: 'linear-gradient(145deg,#FDBA74,#EA580C)' },
      { id: 'mg4', title: 'Daily Sketch — Vol. 7', medium: 'Pencil on paper', year: 2023, gradient: 'linear-gradient(145deg,#FCA5A5,#DC2626)' },
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
      kofi: 'https://ko-fi.com/artbynisu',
    },
    videos: [
      {
        id: 'nisu-v1',
        artistId: 'nisu',
        title: 'Portrait — Loomis Method',
        description: 'Full portrait drawing process using the Andrew Loomis method — from sphere to finished face.',
        src: 'assets/videos/video1.mp4',
        type: 'local',
        tags: ['portrait', 'loomis', 'method', 'face', 'realism', 'technique'],
        duration: '1:45',
        likes: 11400,
      },
      {
        id: 'nisu-v2',
        artistId: 'nisu',
        title: 'Quick Portrait Sketch',
        description: 'Capturing a face quickly with confident proportions — practice session.',
        src: 'assets/videos/video1.mp4',
        type: 'local',
        tags: ['portrait', 'quick', 'sketch', 'practice'],
        duration: '1:15',
        likes: 5200,
      },
      {
        id: 'nisu-v3',
        artistId: 'nisu',
        title: 'Figure Drawing — No Talking',
        description: 'Full figure drawing session. No tutorial, no commentary. Just the work.',
        youtubeId: 'yBY7ZAf2tYY',
        type: 'youtube',
        tags: ['figure', 'drawing', 'process', 'quiet', 'shorts'],
        duration: '0:52',
        likes: 8700,
        thumbnail: 'https://img.youtube.com/vi/yBY7ZAf2tYY/hqdefault.jpg',
      },
    ],
    gallery: [
      { id: 'ng1', title: 'Portrait Study — Natural Light', medium: 'Graphite on paper', year: 2024, gradient: 'linear-gradient(145deg,#6EE7B7,#059669)' },
      { id: 'ng2', title: 'The Loomis Head — Final', medium: 'Pencil on paper', year: 2024, gradient: 'linear-gradient(145deg,#34D399,#047857)' },
      { id: 'ng3', title: 'Eyes — Detail Study', medium: 'Graphite', year: 2024, gradient: 'linear-gradient(145deg,#A7F3D0,#10B981)' },
      { id: 'ng4', title: 'Three-Quarter Portrait', medium: 'Graphite on toned paper', year: 2023, gradient: 'linear-gradient(145deg,#D1FAE5,#34D399)' },
      { id: 'ng5', title: 'Profile Study', medium: 'Pencil on paper', year: 2023, gradient: 'linear-gradient(145deg,#065F46,#047857)' },
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
      { id: 'ns2', item: 'Graphite Portrait — Original', price: '$220', description: 'Original 40×50cm graphite portrait on Fabriano toned paper. Shipped with care.', link: '#', category: 'Original' },
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
    },
    videos: [
      {
        id: 'akihito-v1',
        artistId: 'akihito',
        title: 'Manga Character — Process',
        description: 'Full character illustration from rough sketch to finished inks.',
        src: 'assets/videos/video2.mp4',
        type: 'local',
        tags: ['manga', 'character', 'process', 'inks', 'design'],
        duration: '1:24',
        likes: 4800,
      },
      {
        id: 'akihito-v2',
        artistId: 'akihito',
        title: 'Ink & Detail Work',
        description: 'The meditative process of adding fine detail and crosshatching to a manga illustration.',
        src: 'assets/videos/video3.mp4',
        type: 'local',
        tags: ['ink', 'detail', 'crosshatch', 'manga', 'process'],
        duration: '0:30',
        likes: 3200,
      },
      {
        id: 'akihito-v3',
        artistId: 'akihito',
        title: '2-Minute Figure Challenge',
        description: 'Speed figure drawing challenge — complete human form in under 2 minutes.',
        src: 'assets/videos/video3.mp4',
        type: 'local',
        tags: ['figure', 'speed', 'challenge', 'drawing'],
        duration: '0:30',
        likes: 6100,
      },
    ],
    gallery: [
      { id: 'ag1', title: 'Character Design Sheet #08', medium: 'Ink on paper', year: 2024, gradient: 'linear-gradient(145deg,#F9A8D4,#DB2777)' },
      { id: 'ag2', title: 'The Swordsman — Final', medium: 'Ink & Watercolor', year: 2024, gradient: 'linear-gradient(145deg,#FBCFE8,#EC4899)' },
      { id: 'ag3', title: 'Expression Study — 12 Panels', medium: 'Ink on paper', year: 2023, gradient: 'linear-gradient(145deg,#FDA4AF,#E11D48)' },
      { id: 'ag4', title: 'Manga Page — Chapter 3', medium: 'Digital Ink', year: 2023, gradient: 'linear-gradient(145deg,#BE185D,#831843)' },
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
    },
    videos: [
      {
        id: 'sofia-v1',
        artistId: 'sofia',
        title: '60-Second Charcoal Drawing',
        description: 'The full weight of a figure captured in 60 seconds of deliberate charcoal marks.',
        src: 'assets/videos/video2.mp4',
        type: 'local',
        tags: ['charcoal', 'figure', 'speed', 'quick', 'process'],
        duration: '1:00',
        likes: 9800,
      },
      {
        id: 'sofia-v2',
        artistId: 'sofia',
        title: '15 Minutes of Sketching Ambience',
        description: 'A quiet Roman studio session. No talking. Just charcoal on paper.',
        youtubeId: '4aeeQsaP2uk',
        type: 'youtube',
        tags: ['sketching', 'ambience', 'quiet', 'studio', 'charcoal', 'shorts'],
        duration: '15:00',
        likes: 4200,
        thumbnail: 'https://img.youtube.com/vi/4aeeQsaP2uk/hqdefault.jpg',
      },
      {
        id: 'sofia-v3',
        artistId: 'sofia',
        title: 'Professional Sketching — 32 Minutes',
        description: 'Extended sketching session. Real time. No edits. Pure observation.',
        youtubeId: '0cwa8eCYT0o',
        type: 'youtube',
        tags: ['sketching', 'professional', 'extended', 'process', 'shorts'],
        duration: '0:58',
        likes: 3600,
        thumbnail: 'https://img.youtube.com/vi/0cwa8eCYT0o/hqdefault.jpg',
      },
    ],
    gallery: [
      { id: 'sg1', title: 'Life Study — Standing Pose', medium: 'Charcoal on paper', year: 2024, gradient: 'linear-gradient(145deg,#A78BFA,#7C3AED)' },
      { id: 'sg2', title: 'Torso — Natural Light', medium: 'Charcoal on newsprint', year: 2024, gradient: 'linear-gradient(145deg,#C4B5FD,#6D28D9)' },
      { id: 'sg3', title: 'The Roman Afternoon', medium: 'Charcoal on Strathmore', year: 2023, gradient: 'linear-gradient(145deg,#8B5CF6,#4C1D95)' },
      { id: 'sg4', title: 'Seated Figure — Study', medium: 'Charcoal on toned paper', year: 2023, gradient: 'linear-gradient(145deg,#DDD6FE,#7C3AED)' },
    ],
    materials: [
      { name: 'Vine Charcoal Sticks', brand: 'General Pencil', type: 'Charcoal', description: 'Soft vine charcoal for broad initial marks and tonal blocking in life drawing', link: 'https://www.amazon.com/s?k=vine+charcoal+sticks', icon: '✏️' },
      { name: 'Compressed Charcoal', brand: 'Conté', type: 'Charcoal', description: 'Dense, rich compressed charcoal for deep, velvety darks', link: 'https://www.amazon.com/s?k=conte+compressed+charcoal', icon: '✏️' },
      { name: 'Newsprint Pad 18×24"', brand: 'Strathmore', type: 'Paper', description: 'Large newsprint for warm-up gesture work and experimental drawing', link: 'https://www.amazon.com/s?k=strathmore+newsprint+pad', icon: '📄' },
      { name: 'Chamois Cloth', brand: 'Various', type: 'Tool', description: 'For blending and creating soft mid-tones in charcoal life drawings', link: 'https://www.amazon.com/s?k=chamois+cloth+drawing', icon: '🧤' },
      { name: 'Drafting Brush', brand: 'Various', type: 'Tool', description: 'For sweeping away charcoal dust cleanly without smearing the drawing', link: 'https://www.amazon.com/s?k=drafting+brush+charcoal', icon: '🖌️' },
    ],
    books: [
      { title: 'The Practice and Science of Drawing', author: 'Harold Speed', description: 'A classic text on the theory and practice of drawing from life. Still essential today.', link: 'https://www.amazon.com/s?k=practice+science+drawing+harold+speed', type: 'book' },
      { title: 'Natural Light Figure Drawing', author: 'Jake Spicer', description: 'Mastering the figure in the studio using natural window light as the only illumination.', link: 'https://www.amazon.com/s?k=natural+light+figure+drawing+spicer', type: 'book' },
    ],
    shop: [
      { id: 'ss1', item: 'Life Study — Original Charcoal', price: '$150', description: 'Original 50×70cm life drawing on Strathmore paper. Ships carefully from Rome, Italy.', link: '#', category: 'Original' },
      { id: 'ss2', item: 'Studio Session Prints (Set of 3)', price: '$32', description: 'Fine art prints of 3 selected life drawings. A4 size, archival quality paper.', link: '#', category: 'Prints' },
    ],
    supportUrl: null,
    supportNote: 'Follow, share, and explore the shop. Originals and prints available — each one ships from my studio in Rome.',
  },

};

// ── Feed order ──────────────────────────────────────────────
// Curated sequence of videos shown in the main discovery feed.
const FEED_VIDEO_IDS = [
  'chommang-v1',
  'drewscape-v1',
  'nisu-v1',
  'sofia-v1',
  'mmmmonexx-v1',
  'akihito-v1',
  'chommang-v2',
  'drewscape-v2',
  'akihito-v3',
  'mmmmonexx-v2',
  'nisu-v2',
  'sofia-v2',
  'akihito-v2',
  'mmmmonexx-v3',
  'chommang-v3',
  'drewscape-v3',
  'nisu-v3',
  'sofia-v3',
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
