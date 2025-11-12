

export type BlogItem = {
    id: number;
    slug: string;
    date: string;
    fullDate:string;
    author: string;
    comments: number;
    title: string;
    image: string;
    des:string;
    content: string[];
    highlights: string[];
  };


export const blogData: BlogItem[] = [
    {
      id: 1,
      slug: 'your-tomorrow-enhanced-today',
      date: '10 OCT',
      fullDate: 'October 19, 2025',
      author: 'admin',
      comments: 50,
      title: 'Your Tomorrow, Enhanced Today Tech Forward Empowering with technology',
      image: '/assets/blog/blog-7.png',
      des:'Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines. It drives innovation, efficiency, and connectivity in today digital world author',
      content: [
        "Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines. It drives innovation, efficiency, and connectivity in today's digital world",
        "Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines. It drives innovation, efficiency, and connectivity in today's digital world Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines"
      ],
      highlights: [
        "Tech Forward. Future Ready Your Tomorrow, Enhanced Today",
        "Revolutionizing Reality Through Technology Tech it to the Next Level",
        "Tech-savvy Lives, Brighter Tomorrows Connect Create Transform",
        "The future is tech Advancing with innovation Tech excellence at work."
      ],

    },
    {
      id: 2,
      date: '24 OCT',
      fullDate: 'October 24, 2025',
      slug: 'the-future-is-tech-advancing',
      author: 'admin',
      comments: 20,
      title: 'The future is tech Advancing with innovation Where Ideas Become Reality',
      image: '/assets/blog/blog-8.png',
      des:'Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines. It drives innovation, efficiency, and connectivity in today digital world author',
      content: [
        "Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines. It drives innovation, efficiency, and connectivity in today's digital world",
        "Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines. It drives innovation, efficiency, and connectivity in today's digital world Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines"
      ],
      highlights: [
        "Tech Forward. Future Ready Your Tomorrow, Enhanced Today",
        "Revolutionizing Reality Through Technology Tech it to the Next Level",
        "Tech-savvy Lives, Brighter Tomorrows Connect Create Transform",
        "The future is tech Advancing with innovation Tech excellence at work."
      ]
    },
    
    {
      id: 3,
      date: '16 OCT',
      fullDate: 'October 16, 2025',
      slug: 'vibrant-workspaces-fostering-creativity',
      author: 'admin',
      comments: 0,
      title: 'Empowering Your Digital Future Empowering with technology',
      image: '/assets/blog/blog-9.png',
      des:'Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines. It drives innovation, efficiency, and connectivity in today digital world author',
      content: [
        "Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines. It drives innovation, efficiency, and connectivity in today's digital world",
        "Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines. It drives innovation, efficiency, and connectivity in today's digital world Technology is a vast field that encompasses the design, creation, use, and maintenance of various systems, tools, and machines"
      ],
      highlights: [
        "Tech Forward. Future Ready Your Tomorrow, Enhanced Today",
        "Revolutionizing Reality Through Technology Tech it to the Next Level",
        "Tech-savvy Lives, Brighter Tomorrows Connect Create Transform",
        "The future is tech Advancing with innovation Tech excellence at work."
      ]
    },
  ];