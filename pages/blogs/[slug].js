import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import styles from "../../styles/blogs.module.scss";
import { useRouter } from "next/router";
const Index = ({ frontMatter, content, mdxSource }) => {
  // console.log(frontMatter, content, mdxSource, "mdxSource");
  return (
    <div>
      <Head>
        <title>{frontMatter?.title}</title>
        <meta name="description" content={frontMatter?.description} />
      </Head>
      <div className={`${styles.__blogSlugPageContainer} ${styles.max_width_1280}`}>
        <MDXRemote {...mdxSource} />
      </div>
    </div>
  );
};

export default Index;
// export async function getServerSideProps({ params, query }) {
//   const { slug, category } = query;
//   const filePath = path.join(process.cwd(), `./MDX/blogs/Categories/${category}`, `${slug}.mdx`);
//   if (!fs.existsSync(filePath)) {
//     return {
//       notFound: true,
//     };
//   }
//   const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
//   const { data: frontMatter, content } = matter(markdownWithMeta);
//   const mdxSource = await serialize(content);
//   return {
//     props: {
//       frontMatter: frontMatter,
//       content: content,
//       mdxSource: mdxSource,
//     },
//   };
// }
export async function getStaticPaths() {
  const categories = ["AI", "Networking", "Software Development", "UI UX"];
  let paths = [];

  for (const category of categories) {
    const categoryPath = path.join(process.cwd(), `./mdxData/blogs/Categories/${category}`);
    const files = fs.readdirSync(categoryPath);

    files.forEach((file) => {
      const slug = file.replace(".mdx", "");
      const combinedSlug = `${category}-${slug}`;
      paths.push({ params: { slug: combinedSlug } }); // Use 'slug' instead of 'combinedSlug' here

    });
  }
  console.log(paths,"paths");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [category, slug] = params?.slug?.split("-");

  const filePath = path.join(process.cwd(), `./mdxData/blogs/Categories/${category}`, `${slug}.mdx`);

  const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      mdxSource,
    },
  };
}
