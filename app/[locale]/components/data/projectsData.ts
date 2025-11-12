

export interface Project {
  id: number;
  slug: string;
  title: string;
  image: string;
  description: string;
  category: string;
  startDate: string;
  location: string;
  content: {
    heading: string;
    paragraphs: string[];
    subSections: {
      title: string;
      points?: string[];
      paragraphs?: string[];
    }[];
    gallery: string[];
  };
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "leading-the-way-in-innovation",
    title: "Leading the Way in Innovation",
    image: '/assets/projects/project-1.png',
    description: "Driving technology forward with innovative solutions.",
    category: "Business Consulting",
    startDate: "12 October 2024",
    location: "1901 Thornridge Cir. Shiloh",
    content: {
      heading: "Leading The Way In Innovation",
      paragraphs: [
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
      ],
      subSections: [
        {
          title: "Where Ideas Become Reality",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
        {
          title: "Empowering Your Digital Future",
          points: [
            "Tech Forward. Future Ready. Your Tomorrow, Enhanced Today",
            "Revolutionizing Reality Through Technology. Tech it to the Next Level",
            "Tech-savvy Lives, Brighter Tomorrows. Connect. Create. Transform",
            "The future is tech. Advancing with innovation. Tech excellence at work.",
          ],
        },
        {
          title: "Connecting You To Tomorrow",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
          ],
        },
        {
          title: "Transforming Tech Dreams",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
      ],
      gallery: ['/assets/projects/project-8.png', '/assets/projects/project-9.png'],
    },
  },

  {
    id: 2,
    slug: "empowering-digital-transformation",
    title: "Empowering Digital Transformation",
    image: '/assets/projects/project-2.png',
    description: "Driving technology forward with innovative solutions.",
    category: "Business Consulting",
    startDate: "12 October 2024",
    location: "1901 Thornridge Cir. Shiloh",
    content: {
      heading: "Leading The Way In Innovation",
      paragraphs: [
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
      ],
      subSections: [
        {
          title: "Where Ideas Become Reality",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
        {
          title: "Empowering Your Digital Future",
          points: [
            "Tech Forward. Future Ready. Your Tomorrow, Enhanced Today",
            "Revolutionizing Reality Through Technology. Tech it to the Next Level",
            "Tech-savvy Lives, Brighter Tomorrows. Connect. Create. Transform",
            "The future is tech. Advancing with innovation. Tech excellence at work.",
          ],
        },
        {
          title: "Connecting You To Tomorrow",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
          ],
        },
        {
          title: "Transforming Tech Dreams",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
      ],
      gallery: ['/assets/projects/project-8.png', '/assets/projects/project-9.png'],
    },
  },

  {
    id: 3,
    slug: "building-future-ready-platforms",
    title: "Building Future-Ready Platforms",
    image: '/assets/projects/project-3.png',
    description: "Driving technology forward with innovative solutions.",
    category: "Business Consulting",
    startDate: "12 October 2024",
    location: "1901 Thornridge Cir. Shiloh",
    content: {
      heading: "Leading The Way In Innovation",
      paragraphs: [
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
      ],
      subSections: [
        {
          title: "Where Ideas Become Reality",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
        {
          title: "Empowering Your Digital Future",
          points: [
            "Tech Forward. Future Ready. Your Tomorrow, Enhanced Today",
            "Revolutionizing Reality Through Technology. Tech it to the Next Level",
            "Tech-savvy Lives, Brighter Tomorrows. Connect. Create. Transform",
            "The future is tech. Advancing with innovation. Tech excellence at work.",
          ],
        },
        {
          title: "Connecting You To Tomorrow",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
          ],
        },
        {
          title: "Transforming Tech Dreams",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
      ],
      gallery: ['/assets/projects/project-8.png', '/assets/projects/project-9.png'],
    },
  },

  {
    id: 4,
    slug: "innovating-seamless-experiences",
    title: "Innovating Seamless Experiences",
    image: '/assets/projects/project-4.png',
    description: "Driving technology forward with innovative solutions.",
    category: "Business Consulting",
    startDate: "12 October 2024",
    location: "1901 Thornridge Cir. Shiloh",
    content: {
      heading: "Leading The Way In Innovation",
      paragraphs: [
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
      ],
      subSections: [
        {
          title: "Where Ideas Become Reality",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
        {
          title: "Empowering Your Digital Future",
          points: [
            "Tech Forward. Future Ready. Your Tomorrow, Enhanced Today",
            "Revolutionizing Reality Through Technology. Tech it to the Next Level",
            "Tech-savvy Lives, Brighter Tomorrows. Connect. Create. Transform",
            "The future is tech. Advancing with innovation. Tech excellence at work.",
          ],
        },
        {
          title: "Connecting You To Tomorrow",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
          ],
        },
        {
          title: "Transforming Tech Dreams",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
      ],
      gallery: ['/assets/projects/project-8.png', '/assets/projects/project-9.png'],
    },
  },
  {
    id: 5,
    slug: "connecting-ideas-to-reality",
    title: "Connecting Ideas to Reality",
    image: '/assets/projects/project-5.png',
    description: "Driving technology forward with innovative solutions.",
    category: "Business Consulting",
    startDate: "12 October 2024",
    location: "1901 Thornridge Cir. Shiloh",
    content: {
      heading: "Leading The Way In Innovation",
      paragraphs: [
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
      ],
      subSections: [
        {
          title: "Where Ideas Become Reality",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
        {
          title: "Empowering Your Digital Future",
          points: [
            "Tech Forward. Future Ready. Your Tomorrow, Enhanced Today",
            "Revolutionizing Reality Through Technology. Tech it to the Next Level",
            "Tech-savvy Lives, Brighter Tomorrows. Connect. Create. Transform",
            "The future is tech. Advancing with innovation. Tech excellence at work.",
          ],
        },
        {
          title: "Connecting You To Tomorrow",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
          ],
        },
        {
          title: "Transforming Tech Dreams",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
      ],
      gallery: ['/assets/projects/project-8.png', '/assets/projects/project-9.png'],
    },
  },
  {
    id: 6,
    slug: "pioneering-smart-solutions",
    title: "Pioneering Smart Solutions",
    image: '/assets/projects/project-6.png',
    description: "Driving technology forward with innovative solutions.",
    category: "Business Consulting",
    startDate: "12 October 2024",
    location: "1901 Thornridge Cir. Shiloh",
    content: {
      heading: "Leading The Way In Innovation",
      paragraphs: [
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
        "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
      ],
      subSections: [
        {
          title: "Where Ideas Become Reality",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
        {
          title: "Empowering Your Digital Future",
          points: [
            "Tech Forward. Future Ready. Your Tomorrow, Enhanced Today",
            "Revolutionizing Reality Through Technology. Tech it to the Next Level",
            "Tech-savvy Lives, Brighter Tomorrows. Connect. Create. Transform",
            "The future is tech. Advancing with innovation. Tech excellence at work.",
          ],
        },
        {
          title: "Connecting You To Tomorrow",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology ",
          ],
        },
        {
          title: "Transforming Tech Dreams",
          paragraphs: [
            "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, our world is becoming more connected every day",
          ],
        },
      ],
       gallery: ['/assets/projects/project-8.png', '/assets/projects/project-9.png'],
    },
  },
];
