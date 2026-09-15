import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

export const revalidate = 0;

export default async function NewsArticlePage({
  params,
}: {
  params: { index: string };
}) {
  const content = await getContent();
  const index = Number(params.index);
  const item = Number.isInteger(index) ? content.news[index] : undefined;

  if (!item) return notFound();

  return (
    <>
      <Header />
      <article className="article">
        <div className="wrap article-wrap">
          <Link href="/#vijesti" className="article-back">
            ← Sve vijesti
          </Link>
          {item.date && <span className="news-date">{item.date}</span>}
          <h1 className="article-title">{item.title}</h1>
          {item.photoUrl && (
            <div className="article-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.photoUrl} alt={item.title} />
            </div>
          )}
          <div className="article-body">
            {item.text
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
          </div>
        </div>
      </article>
      <Footer contact={content.contact} udgLogoUrl={content.homepage.udgLogoUrl} />
    </>
  );
}
