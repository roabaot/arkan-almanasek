import Container from "@/app/[locale]/components/common/Container";
import Loading from "@/app/[locale]/loading";

const BlogDetailsLoading = () => {
  return (
    <section className="section-gap">
      <Container className="relative min-h-[50vh]">
        <Loading className="absolute inset-0" />
      </Container>
    </section>
  );
};

export default BlogDetailsLoading;
