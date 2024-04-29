import React from "react";
import styles from "../../styles/blogs.module.scss";
// import { BannerWithVideo } from "@/components/Banner";
import { FaArrowRight } from "react-icons/fa";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
// import { SearchBoxHeader } from "../career";
import Image from "next/image";
import { useRouter } from "next/router";
export const BlogCards = ({ blogCategories }) => {
  const router = useRouter();
  const blogCard = blogCategories[0].link;
  const RedirectToBlogPage = (data)=>{
    const {category, fileName} = data?.frontMatter?.slug;
    let fileNameWithoutExtension = fileName.split('.')[0];
    const combinedSlug = `${category}-${fileNameWithoutExtension}`;
    router.push(`/blogs/${combinedSlug}`);
  }
  return (
    <ul className={styles.__blogs__cards}>
      {blogCard?.map((item, index) => {
        return (
          <li
            className="shadow-md shadow-gray-300 rounded-md p-4 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105/100 hover:shadow-2xl"
            onClick={()=>RedirectToBlogPage(item)}
            key={index}
          >
            <BlogCard key={index} content={item} />
          </li>
        );
      })}
    </ul>
  );
};
export const BlogCard = ({ content }) => {
  const { name, frontMatter } = content;
  return (
    <>
      <div className={styles.__blogCard}>
        <div className={styles.__blogCard__image}>
          <Image
            src={frontMatter?.cardImage}
            width={500}
            height={500}
            alt={"blog"}
            className="drop-shadow-md"
          />
        </div>
        <div className={styles.__blogCard__content}>
          <p className={styles.__blogCard__content__date}>
            {frontMatter?.date}
          </p>
          <h3 className={styles.__blogCard__content__title}>
            {frontMatter?.title.length > 50
              ? frontMatter?.title?.substring(0, 50) + "..."
              : frontMatter?.title}
          </h3>
          <p className={styles.__blogCard__content__desc}>
            {frontMatter?.description.length > 200
              ? frontMatter?.description?.substring(0, 200) + "..."
              : frontMatter?.description}
          </p>
        </div>
      </div>
    </>
  );
};
export const BlogCategories = ({ Categories }) => {
  return (
    <div className={styles.__blogCategories}>
      {/* <ul className={styles.__blogCategories__list}>
        {Categories?.map((item, index) => {
          return (
            <li key={index}>
              <Link href={"/"}>{item.title}</Link>
            </li>
          );
        })}
        <SearchBoxHeader
          jobCategory={Categories}
          selectedCategory={""}
          handleSelectedCategory={() => {}}
        />
      </ul> */}
    </div>
  );
};
const index = ({ blogCategories }) => {
  const bannerData = {
    title: "Blog",
    subTitle: ["Discover insights,", "inspiration, and innovation"],
    bannerVideo: {
      url: "/video/blog_banner.mp4",
      alt: "Blog video",
    },
  };
  const handleApplyNow = () => {
    console.log("apply now");
  };
  return (
    <div className={styles.__blogsContainer}>
      {/* <BannerWithVideo data={bannerData} applyNow={handleApplyNow} /> */}
      <div className={`${styles.__blogs} ${styles.max_width_1280} `}>
        <div className={styles.__blogs__heading}>
          <h1>Your Trusted Blog Source</h1>
          <p>Stay Ahead of the Curve with Innovative Ideas</p>
        </div>
        <BlogCategories Categories={blogCategories} />
        <BlogCards blogCategories={blogCategories} />
      </div>
    </div>
  );
};

export default index;
export async function getStaticProps() {
  const blogFile = fs.readdirSync(path.join(process.cwd(), "mdxData/blogs/Categories"));

  // map through the main directory to get titles and links
  const blogFileCategory = blogFile.map((item) => {
    const subDirPath = path.join(process.cwd(), "mdxData/blogs/Categories", item);
    const links = fs.readdirSync(subDirPath).map((linkItem) => {
      const filePath = path.join(subDirPath, linkItem);
      const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
      const { data: frontMatter, content } = matter(markdownWithMeta); // convert mdx -> html 

      return {
        name: linkItem.replace(".mdx", ""),
        frontMatter: frontMatter,
        // content: content
      };
    });

    return {
      name: item,
      link: links,
    };
  });
  return {
    props: {
      blogCategories: blogFileCategory,
    },
    revalidate: 1, // This will regenerate the page every second, adjust as needed
  };
}