import React from "react";
// Styles
import styles from "@/styles/privacyPolicy.module.scss";
import footerLinkStyles from "@/styles/footerLinks.module.scss";
// Components
import { BannerWithoutSwiper } from "../../components/Banner";
import { BestGiftingOption, MoreAboutUs } from "../aboutUs";
// MDX Utility
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
// Layout
import FooterLinkLayout from "../../Layout/FooterLinkLayout";

export const MoreAboutOverPrivacyPolicy = () => {
  const data = [
    {
      heading: "Interpretation and Definitions",
      content: [
        {
          subHeading: "Interpretation",
          desc: "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
        },
        {
          subheading: "Definitions",
          desc: "For the purposes of this Privacy Policy:",
          ul: [
            {
              heading: "Account",
              desc: "means a unique account created for You to access our Service or parts of our Service.",
            },
            {
              heading: "Affiliate ",
              desc: "means an entity that controls, is controlled by or is under common control with a party, where 'control' means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.",
            },
            {
              heading: "Company",
              desc: '(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Tranzift, Plot No. 600, G/F, Metro Pillar No. 531, Near Union Bank, Mundka, New Delhi - 110041.',
            },
            {
              heading: "Cookies ",
              desc: "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.",
            },
            {
              heading: "Country ",
              desc: "refers to: Delhi, India",
            },
            {
              heading: "Device ",
              desc: "means any device that can access the Service such as a computer, a cellphone or a digital tablet.",
            },
            {
              heading: "Personal Data",
              desc: "is any information that relates to an identified or identifiable individual.",
            },
            {
              heading: "Service ",
              desc: "refers to the Website.",
            },
            {
              heading: "Service Provider",
              desc: "means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.",
            },
            {
              heading: "Usage Data",
              desc: "refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).",
            },
            {
              heading: "Website ",
              desc: "refers to Tranzift, accessible from https://Tranzift.com/",
            },
            {
              heading: "You ",
              desc: "means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.",
            },
          ],
        },
      ],
    },
    {
      heading: "Collecting and Using Your Personal Data",
      content: [
        {
          heading: "Types of Data Collected",
          subHeading: "Personal Data",
          desc: "While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:",
          ul: [
            {
              desc: "Email address",
            },
            {
              desc: "First name and last name",
            },
            {
              desc: "Phone number",
            },
            {
              desc: "Address, State, Province, ZIP/Postal code, City",
            },
            {
              desc: "Usage Data",
            },
          ],
        },
        {
          subheading: "Usage Data",
          p: [
            "Usage Data is collected automatically when using the Service.",
            "Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.",
            "When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.",
            "We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.",
          ],
        },
        {
          subheading: "Tracking Technologies and Cookies",

          p: [
            "We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:",
          ],
          ul: [
            {
              heading: "Cookies or Browser Cookies. ",
              desc: "A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.",
            },
            {
              heading: "Web Beacons",
              desc: "Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).",
            },
          ],
          p: [
            'Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies on the Free Privacy Policy website article.',
            "We use both Session and Persistent Cookies for the purposes set out below:",
          ],
          ul: [
            {
              heading: "Necessary / Essential Cookies",
            },
            {
              desc: "Type: Session Cookies",
            },
            {
              desc: "Administered by: Us",
            },
            {
              desc: "Purpose: These Cookies identify if users have accepted the use of cookies on the Website",
            },
            {
              heading: "Functionality Cookies",
            },
            {
              desc: "Type: Persistent Cookies",
            },
            {
              desc: "Administered by: Us",
            },
            {
              desc: "Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.",
            },
          ],
        },
        {
          subheading: "Use of Your Personal Data",

          p: ["The Company may use Personal Data for the following purposes:"],
          ul: [
            {
              heading: "To provide and maintain our Service. ",
              desc: "including to monitor the usage of our Service.",
            },
            {
              heading: "To manage Your Account: ",
              desc: "to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.",
            },
            {
              heading: "For the performance of a contract: ",
              desc: "the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.",
            },
            {
              heading: "To contact You: ",
              desc: "To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.",
            },
            {
              heading: "To provide You: ",
              desc: "with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.",
            },
            {
              heading: "To manage Your requests: ",
              desc: "To attend and manage Your requests to Us.",
            },
            {
              heading: "For business transfers: ",
              desc: "We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.",
            },
            {
              heading: "For other purposes: ",
              desc: "We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.",
            },
          ],
          p: ["We may share Your personal information in the following situations:"],
          ul: [
            {
              heading: "With Service Providers: ",
              desc: "We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.",
            },
            {
              heading: "For business transfers: ",
              desc: "We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.",
            },
            {
              heading: "With Affiliates: ",
              desc: "We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.",
            },
            {
              heading: "For other purposes: ",
              desc: "We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.",
            },
            {
              heading: "For other purposes: ",
              desc: "We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.",
            },
          ],
        },
      ],
    },
  ];
  return <div className={styles.__container}></div>;
};
const index = ({ frontMatter, mdxSource }) => {
  const data = {
    title: {
      enableTypewriter: true,
      typewriter: {
        words: ["Privacy Policy"],
        loop: true,
        cursorStyle: "|",
        typeSpeed: 110,
        deleteSpeed: 80,
        delaySpeed: 1000,
      },
      content: "",
    },
    content: {
      paragraph: [
        "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.",
        "We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Free Privacy Policy Generator.",
      ],
    },
    bannerImage: {
      url: "/images/banner/privacy_policy.png",
      alt: "AboutBannerImg",
    },
    button: {
      content: "Contact Us",
      link: "/",
    },
  };

  return (
    <div className={`${styles.__container} ${footerLinkStyles.__container}`}>
      <div className={styles.__banner}>
        <BannerWithoutSwiper data={data} />
      </div>
      <FooterLinkLayout>
        <MDXRemote {...mdxSource} />
      </FooterLinkLayout>
    </div>
  );
};

export default index;
export async function getStaticProps() {
  const filePath = path.join("./mdxData/ourPolicy", "privacyPolicy" + ".mdx");

  const markdownWithMeta = fs.readFileSync(filePath, "utf-8");

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter: frontMatter,
      mdxSource: mdxSource,
    },
  };
}