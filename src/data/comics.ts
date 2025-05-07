
export interface Comic {
  id: number;
  title: string;
  coverImage: string;
  price: number;
  currency: string;
  previewImages: string[];
}

const comics: Comic[] = [
  {
    id: 1,
    title: "Ma chère grande soeur",
    coverImage: "https://tikroom.net/wp-content/uploads/2025/05/001-12.jpg",
    price: 900,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a57a1fc9e9a/8e20a60e668e407b68cf1f1492d86646/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a57a1fc9e9a/8e20a60e668e407b68cf1f1492d86646/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a57a1fc9e9a/8e20a60e668e407b68cf1f1492d86646/004.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a57a1fc9e9a/8e20a60e668e407b68cf1f1492d86646/005.jpg"
    ]
  },
  {
    id: 2,
    title: "Daddy, un désire fou !",
    coverImage: "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a46f8d487a7/0a917c5a442add41c96a43bbedde7fcc/001.jpg",
    price: 1500,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a46f8d487a7/0a917c5a442add41c96a43bbedde7fcc/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a46f8d487a7/0a917c5a442add41c96a43bbedde7fcc/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a46f8d487a7/0a917c5a442add41c96a43bbedde7fcc/004.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a46f8d487a7/0a917c5a442add41c96a43bbedde7fcc/005.jpg"
    ]
  },
  {
    id: 3,
    title: "C'est plus gros que pour mon copain",
    coverImage: "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_64b2966b1391a/19ee0d7a4635972b3a7311b2f2612197/000.jpg",
    price: 1500,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_64b2966b1391a/19ee0d7a4635972b3a7311b2f2612197/001.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_64b2966b1391a/19ee0d7a4635972b3a7311b2f2612197/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_64b2966b1391a/19ee0d7a4635972b3a7311b2f2612197/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_64b2966b1391a/19ee0d7a4635972b3a7311b2f2612197/004.jpg"
    ]
  },
  {
    id: 4,
    title: "Avec maman, un désire fou !",
    coverImage: "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b735ac97f/27f3b367936b915b3232d32fcda16fb6/001.jpg",
    price: 900,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b735ac97f/27f3b367936b915b3232d32fcda16fb6/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b735ac97f/27f3b367936b915b3232d32fcda16fb6/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b735ac97f/27f3b367936b915b3232d32fcda16fb6/004.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b735ac97f/27f3b367936b915b3232d32fcda16fb6/005.jpg"
    ]
  },
  {
    id: 5,
    title: "Sans façon, dehord !!",
    coverImage: "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c0abb363b/80e4df3465bedde7b9e167752a8cbe13/001.jpg",
    price: 1700,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c0abb363b/80e4df3465bedde7b9e167752a8cbe13/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c0abb363b/80e4df3465bedde7b9e167752a8cbe13/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c0abb363b/80e4df3465bedde7b9e167752a8cbe13/004.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c0abb363b/80e4df3465bedde7b9e167752a8cbe13/006.jpg"
    ]
  },
  {
    id: 6,
    title: "Maman aide moi!",
    coverImage: "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b1bac5eef/69d906bd361f6a6d79f54c1f107c35c1/001.jpg",
    price: 1900,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b1bac5eef/69d906bd361f6a6d79f54c1f107c35c1/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b1bac5eef/69d906bd361f6a6d79f54c1f107c35c1/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b1bac5eef/69d906bd361f6a6d79f54c1f107c35c1/004.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5b1bac5eef/69d906bd361f6a6d79f54c1f107c35c1/005.jpg"
    ]
  },
  {
    id: 7,
    title: "Miranda 01",
    coverImage: "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_65a0e6f4dfc5f/2563ada51e5e47f0b73dba479a93b2b6/001.jpg",
    price: 1300,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_65a0e6f4dfc5f/2563ada51e5e47f0b73dba479a93b2b6/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_65a0e6f4dfc5f/2563ada51e5e47f0b73dba479a93b2b6/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_65a0e6f4dfc5f/2563ada51e5e47f0b73dba479a93b2b6/004.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_65a0e6f4dfc5f/2563ada51e5e47f0b73dba479a93b2b6/005.jpg"
    ]
  },
  {
    id: 8,
    title: "Le beau père à la maison",
    coverImage: "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a57cef12dbe/e71e8883a7c78bf3c3fbfbe330fa3c69/001.jpg",
    price: 1900,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a57cef12dbe/e71e8883a7c78bf3c3fbfbe330fa3c69/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a57cef12dbe/e71e8883a7c78bf3c3fbfbe330fa3c69/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a57cef12dbe/e71e8883a7c78bf3c3fbfbe330fa3c69/004.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a57cef12dbe/e71e8883a7c78bf3c3fbfbe330fa3c69/005.jpg"
    ]
  },
  {
    id: 9,
    title: "Grand mère Partie 2",
    coverImage: "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c3559cdb2/cc999b790c1e28e2cedc4056f9c53049/001.jpg",
    price: 1600,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c3559cdb2/cc999b790c1e28e2cedc4056f9c53049/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c3559cdb2/cc999b790c1e28e2cedc4056f9c53049/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c3559cdb2/cc999b790c1e28e2cedc4056f9c53049/004.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_63a5c3559cdb2/cc999b790c1e28e2cedc4056f9c53049/005.jpg"
    ]
  },
  {
    id: 10,
    title: "Big black cock",
    coverImage: "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_66a40d3e53f76/a5ae80db981eaac2a6e229791136a4bd/001.jpg",
    price: 1500,
    currency: "FCFA",
    previewImages: [
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_66a40d3e53f76/a5ae80db981eaac2a6e229791136a4bd/002.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_66a40d3e53f76/a5ae80db981eaac2a6e229791136a4bd/003.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_66a40d3e53f76/a5ae80db981eaac2a6e229791136a4bd/004.jpg",
      "https://comicsvalley.com/wp-content/uploads/WP-manga/data/manga_66a40d3e53f76/a5ae80db981eaac2a6e229791136a4bd/005.jpg"
    ]
  }
];

export default comics;
