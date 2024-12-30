"use client";

import { assets } from "@/assets/Nextjs-blog-assets/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";


const Page = () => {
  const [image, setImage] = useState(false);
  const [data,setData] = useState({
    title:"",
    description:"",
    category:"StartUp",
    author:"John Smith",
    authorImg:"/author_img.png",
  
  });

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData((data) => ({...data, [name]: value }));
    console.log(data)
  }

  const onSubmitHandler= async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image",image);
    const response = await axios.post('/api/blog',formData);
    if(response.data.success){
      console.log('The blog was created successfully')
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title:"",
        description:"",
        category:"StartUp",
        author:"John Smith",
        authorImg:"/author_img.png",
      })
    }
    else{
      toast.error("Error +" + response.data.message);
    }

  }
  return (
    <>
      <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={onSubmitHandler}>
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4 "
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            width={140}
            height={70}
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4 ">Blog title</p>
        <input name="title" onChange={onChangeHandler} value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          type="text"
          placeholder="Type here"
          required
        />
        <p className="text-xl mt-4 ">Blog description</p>
        <textarea name="description" onChange={onChangeHandler} value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          type="text"
          placeholder="write content here"
          rows={6}
          required
        />
        <p className="text-xl mt-4">Blog category</p>
        <select 
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
          name="category" onChange={onChangeHandler} value={data.category}
        >
          <option value="Startup">StartUp</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          Add
        </button>
      </form>
    </>
  );
};

export default Page;
