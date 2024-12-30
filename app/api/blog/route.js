import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModels";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");
const fs = require("fs");

const loadDB = async () => {
  await connectDB();
};

loadDB();

//API endpoint for getting all blog posts
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json( blog );
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

//API endpoint for uploading blogs
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();

  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imageURL = `/${timestamp}_${image.name}`;

  const BlogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imageURL}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  await BlogModel.create(BlogData);
  console.log("Blog created successfully");
  return NextResponse.json({
    success: true,
    msg: "Blog created successfully",
    BlogData,
  });

  return NextResponse.json({ msg: "Image uploaded successfully", imageURL });
}

//creating the api Endpoint to delete a blog
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {}); //this function will delete the image
  await BlogModel.findByIdAndDelete(id); //to delete the image and blog from the database
  return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
  console.log("Blog deleted successfully");
}
