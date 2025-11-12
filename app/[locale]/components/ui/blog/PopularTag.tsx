const popularTags = [
    "Shield Services",
    "Data Surge",
    "Data Surge",
    "Tech Support",
    "Genie",
    "Digital Dynamo",
  ];
  
  const PopularTag = () => {
    return (
      <div>
        <div className="bg-white shadow-navbar-shadow rounded-[10px] border-t border-primaryBorder md:p-10 p-7">
          <h4>Popular Tags</h4>
          <div className="flex flex-wrap gap-6 mt-6">
            {popularTags.map((tag, index) => (
              <div
                key={index}
                className="bg-[#F2F4F8] rounded-[30px] px-3 py-1"
              >
                <p>{tag}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PopularTag;
  