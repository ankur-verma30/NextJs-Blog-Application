"use client";

import { assets, blog_data } from "@/assets/Nextjs-blog-assets/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  
    const fetchBlogData = async () => {
        const response = await axios.get("/api/blog", { params: { 
          id:params.id,
         }
         });

        setData(response.data);
      
    };

   useEffect(()=>{
    fetchBlogData();
   },[])

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center ">
          <Link href="/">
            <Image
              src={assets.logo}
              alt="Company Logo"
              width={180}
              className="w-[130px] sm:w-auto "
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_-7px_0px+#000000]">
            Get Started <Image src={assets.arrow} alt="" />{" "}
          </button>
        </div>
        <div className="text-center my-24 ">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.authorImg}
            width={100}
            height={100}
            alt=""
            className="mx-auto mt-6 border border-white rounded-full "
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          width={1280}
          height={720}
          alt=""
          className="border-4 border-white"
        />
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.description),
          }}
        ></div>
        <div className="my-24 ">
          <p className="text-black font-semibold my-4 ">
            Share this article on Social Media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="" />
            <Image src={assets.twitter_icon} width={50} alt="" />
            <Image src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div className="text-center py-10">Loading...</div>
  );
};

export default Page;