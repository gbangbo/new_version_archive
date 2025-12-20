import { AddBlogCategory, BlogDetails, BlogType } from "../interface/blog";
import { Comments } from "../interface/courses";

export const blogDetails: BlogDetails[] = [
  {
    id: 1,
    image: 'assets/images/blog/blog.jpg',
    date: '25',
    year: ' July 2025',
    comment: 598,
    hits: '02',
    created_by: "William C. Jennings",
    title: 'An Exploration of the Most Entertaining Cities on Earth.',
  },
  {
    id: 2,
    image: 'assets/images/blog/blog-2.jpg',
    date: '02',
    year: ' January 2024',
    created_by: 'Admin',
    hits: '0',
    title: 'Summer Accessories for 2024',
    description: "Accessories your summer look with these must-have pieces. Find this season's best selections, which include stylish hats and sunglasses.",
  },
  {
    id: 3,
    image: 'assets/images/blog/blog-3.jpg',
    date: '03',
    year: ' January 2024',
    created_by: 'Admin',
    hits: '02',
    title: 'Visit in Europe',
    description: "Discover the best-kept secrets in Europe. Discover which places, from charming towns to breathtaking landscapes, ought to be on your vacation itinerary.",
  },
  {
    id: 4,
    image: 'assets/images/blog/blog-5.jpg',
    date: '9 ',
    year: 'April 2024',
    created_by: 'Admin',
    hits: '0',
    title: 'The ideal outfit for occasion, including formal events.',
  },
  {
    id: 5,
    image: 'assets/images/blog/blog-7.jpg',
    date: '9',
    year: 'April 2024',
    created_by: 'Admin',
    hits: '0',
    title: 'Make the transition to fall fashionable with these outfits. ',
  },
  {
    id: 6,
    image: 'assets/images/blog/blog-8.jpg',
    date: '9',
    year: 'April 2024',
    created_by: 'Admin',
    hits: '0',
    title: 'Embrace the sophistication of maxi dresses by using our selections.',
  },
  {
    id: 7,
    image: 'assets/images/blog/blog-6.jpg',
    date: '9',
    year: 'April 2024',
    created_by: 'Admin',
    hits: '0',
    title: 'Spring with these beautiful floral dresses. Perfect for any occasion.',
  },
]

export const blog = {
  image: 'assets/images/blog/blog-single.jpg',
  date: 25,
  year: 'July 2025',
  name: 'William Jennings',
  hits: '02',
  comment: 598,
  text: " Using a camera's lens to record moments in time is the art form known as photography. ",
  description: [
    {
      title: 'To produce aesthetically striking photos, it entails the deft use of light, composition, and subject matter. Technology breakthroughs have made photography more widely available to the public, enabling people to express their creativity and share their own viewpoints with a global audience.They use meticulous attention to details like colour balance, depth of focus, and framing to produce aesthetically stunning photos that arouse feelings and convey tales.'
    },
    {
      title: "There are many diverse genres within the area of photography, such as fashion, landscape, portrait, and documentary photography, each needing a unique blend of technical abilities and creative vision. Expert photographers have a thorough grasp of their gear and know how to get the best results by experimenting with different lenses, lighting setups, and post-processing software."
    }
  ]
}

export const blogComments: Comments[] = [
  {
    image: "assets/images/blog/comment.jpg",
    name: "Selena Levy",
    designation: "Designer",
    hits: 2,
    comments: 598,
    description: "To create aesthetically striking photos, one must have a strong grasp of composition and lighting in addition to technical proficiency and creative vision. A professional photographer has to have an excellent eye for detail and be able to tell stories and convey emotions via their images.",
  },
  {
    image: "assets/images/blog/9.jpg",
    name: "Yara Bravo",
    designation: "Designer",
    hits: 2,
    comments: 398,
    description: "They meticulously plan each shot, considering factors such as lighting, angles, and props to convey the desired message effectively. Commercial photographers are adept at using their technical expertise to highlight the unique features and qualities of their subjects, often manipulating lighting and post-processing techniques to achieve the desired aesthetic.",
    reply: true
  },
  {
    image: "assets/images/blog/4.jpg",
    name: "Fox Rios",
    designation: "Designer",
    hits: 2,
    comments: 598,
    description: "In addition to technical expertise and artistic vision, one needs a firm command of composition and lighting to produce visually arresting images. A professional photographer needs to be incredibly detail-oriented and capable of telling narratives and evoking strong feelings through their photos.",
  },
  {
    image: "assets/images/blog/12.png",
    name: "Jay Dudley",
    designation: "Designer",
    hits: 2,
    comments: 598,
    description: "They meticulously plan each shot, considering factors such as lighting, angles, and props to convey the desired message effectively. Commercial photographers are adept at using their technical expertise to highlight the unique features and qualities of their subjects, often manipulating lighting and post-processing techniques to achieve the desired aesthetic.",
  },
  {
    image: "assets/images/blog/14.png",
    name: "Joe Pena",
    designation: "Designer",
    hits: 2,
    comments: 598,
    description: "Web design is a broad field, thus there are many topics to discuss and factors to take into account. It suggests that the look, layout, overall ambience, content, user experience, and accessibility have all been successfully integrated. To satisfy the timeline and the clients' expectations, hundreds of different yet related jobs must be completed.",
  },
]

export const addBlogCategory: AddBlogCategory[] = [
  {
    value: 'AL',
    label: 'Lifestyle',

  },
  {
    value: 'WY',
    label: 'Travel',
  },
  {
    value: 'FY',
    label: 'Food',

  },
  {
    value: 'PY',
    label: 'Photography',
  },
  {
    value: 'HD',
    label: 'Home Decor',

  },
  {
    value: 'FS',
    label: 'Fitness',
  },
  {
    value: 'ED',
    label: 'Education',

  },
  {
    value: 'BR',
    label: 'Book Reviews',
  },
];

export const blogType: BlogType[] = [
  {
    id: 'edo-ani',
    title: 'Text',
    checked: true
  },
  {
    id: 'edo-ani1',
    title: 'Image',
  },
  {
    id: 'edo-ani2',
    title: 'Audio',
    checked: true
  },
  {
    id: 'edo-ani3',
    title: 'Video',
  }
]