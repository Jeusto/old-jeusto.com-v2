import Hero from "@/components/website/Hero/Hero";
import PostsList from "@/components/website/Posts/PostsList";
import MainProjects from "@/components/website/Projects/MainProjects";
import ViewAllButton from "@/components/website/ViewAllButton";
import SectionTitle from "@/components/website/SectionTitle";
import { Flex } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { getAllPosts, getAllProjects } from "@/utils/getData";
import { Project, Post } from "@/utils/types";
import dynamic from "next/dynamic";
import SlideWhenVisible from "@/hooks/SlideWhenVisible";
import PostCard from "@/components/website/Posts/PostCard";

interface IndexProps {
  projects: Project[];
  posts: Post[];
}

const SecondaryProjects = dynamic(
  () => import("@/components/website/Projects/SecondaryProjects"),
  {
    ssr: false,
  }
);

export default function Index({ projects, posts }: IndexProps) {
  const { t } = useTranslation("common");

  return (
    <>
      <Flex
        transition="background-color 200ms linear"
        direction="column"
        m="auto"
        px="10"
        maxW="1000px"
        mb="20"
      >
        <Hero />
        {posts.length > 0 && (
          <>
            <SlideWhenVisible threshold="0.11">
              <SectionTitle title={t("home_blogFeaturedHeading")} />{" "}
            </SlideWhenVisible>
            {posts
              .slice(0, 1)
              .filter((post) => post.isFeatured === true)
              .map((post: any) => (
                <PostCard
                  isFeatured="true"
                  key={post.slug}
                  frontmatter={post}
                />
              ))}
            <ViewAllButton text={t("button_viewAllPosts")} url="/blog" />
          </>
        )}
        {projects.length > 0 && (
          <>
            <SlideWhenVisible threshold="0.11">
              <SectionTitle title={t("home_mainProjectsHeading")} />
            </SlideWhenVisible>
            <MainProjects projects={projects} />
          </>
        )}
        {posts.length > 0 && (
          <>
            <SlideWhenVisible threshold="0.11">
              <SectionTitle title={t("home_blogLatestHeading")} />{" "}
            </SlideWhenVisible>
            <PostsList posts={posts} maxCount={5} />
            <ViewAllButton text={t("button_viewAllPosts")} url="/blog" />
          </>
        )}
        {projects.length > 0 && (
          <>
            <SlideWhenVisible threshold="0.11">
              <SectionTitle title={t("home_secondaryProjectsHeading")} />
            </SlideWhenVisible>
            <SecondaryProjects projects={projects} />
            <ViewAllButton text={t("button_viewAllProjects")} url="/projects" />
          </>
        )}
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const projects = await getAllProjects();
  const posts = await getAllPosts();

  return {
    props: {
      projects,
      posts,
    },
  };
}
