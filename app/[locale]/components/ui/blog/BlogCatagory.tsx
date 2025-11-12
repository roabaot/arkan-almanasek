
const categories = [
    { title: "Advancing with innovation", number: "01" },
    { title: "Tech excellence at work", number: "02" },
    { title: "Inspiring tech evolution", number: "03" },
    { title: "Your digital companion", number: "04" },
    { title: "Tech-savvy solutions", number: "05" },
  ];
  

const BlogCatagory = () => {
  return (
    <div>
          <div className="bg-white shadow-navbar-shadow rounded-[10px] border-t border-primaryBorder md:p-10 p-7">
  <h4>Catagory</h4>
  <div className="flex flex-col gap-5 mt-6">
    {categories.map((item, index) => (
      <div
        key={index}
        className="bg-[#F2F4F8] rounded-[30px] px-6 py-3 flex justify-between items-center"
      >
        <p>{item.title}</p>
        <p>{item.number}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  )
}

export default BlogCatagory