import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return rss({
    title: "jinzhe.io — Blog",
    description: "Articles, retrospectives, and engineering notes.",
    site: "https://jinzhe.io",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}`,
    })),
  });
}
