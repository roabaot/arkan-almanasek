import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import Button from "../../common/Button";
import BlogCardStyle3 from "../../ui/cards/BlogCardStyle3";
import Link from "next/link";

type BlogItem = {
  id: number;
  slug: string;
  date: string;
  author: string;
  comments: number;
  title: string;
  image: string;
};

const blogData: BlogItem[] = [
  {
    id: 1,
    slug: "your-tomorrow-enhanced-today",
    date: "10 OCT",
    author: "admin",
    comments: 50,
    title: "Redefining Tomorrow, One Byte at a Time",
    image: '/assets/blog/blog-4.png',
  },
  {
    id: 2,
    date: "24 OCT",
    slug: "the-future-is-tech-advancing",
    author: "admin",
    comments: 20,
    title: "Smart Solutions for a Smarter World",
    image: '/assets/blog/blog-5.png',
  },

  {
    id: 3,
    date: "16 OCT",
    slug: "vibrant-workspaces-fostering-creativity",
    author: "admin",
    comments: 0,
    title: "Empowering Growth through Technology",
    image: '/assets/blog/blog-6.png',
  },
];

const BlogStyle2 = () => {
  return (
    <div className="section-gap">
      <Container>
        {/* section title */}
        <div className="flex justify-between items-end">
            <SectionTitle
        label="Blog And News"
        title="Smart Solutions for a Smarter World"
        align="left"
      />
               <div className="md:block hidden md:w-[260px] lg:w-auto ml-auto">
               <Link href={'/blog'}> <Button>View All Blog</Button></Link>
               </div>
            </div>

        {/* blog here */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        {blogData.map((blog) => (
    <BlogCardStyle3 key={blog.id} blog={blog} />
  ))}
        </div>

        <div className="md:hidden block mt-10 md:mt-0">
            <div className="flex justify-center items-center">
            <Link href={'/blog'}> <Button>View All Blog</Button></Link>
            </div>
               </div>
      </Container>
    </div>
  );
};

export default BlogStyle2;
