import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import axios from "axios";
const BlogList = () => {
  const [menu, SetMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const FetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  };

  useEffect(() => {
    FetchBlogs();
  }, []);
  return (
    <div>
      <div className="flex justify-center gap-6 my-10 ">
        <button
          onClick={() => SetMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          All
        </button>
        <button
          onClick={() => SetMenu("technology")}
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => SetMenu("StartUp")}
          className={
            menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          StartUp
        </button>
        <button
          onClick={() => SetMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          LifeStyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
       
        { blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            console.log(blogs);
            console.log("Item:", item.category, "Menu:", menu);
            return (
              <BlogItem
                key={index}
                id={item._id}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
