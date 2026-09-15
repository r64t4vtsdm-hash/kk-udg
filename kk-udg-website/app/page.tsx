import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Players from "@/components/Players";
import Staff from "@/components/Staff";
import Schedule from "@/components/Schedule";
import News from "@/components/News";
import Partners from "@/components/Partners";
import Support from "@/components/Support";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

export const revalidate = 0;

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header />
      <Hero tagline={content.homepage.heroTagline} photoUrl={content.homepage.heroPhotoUrl} />
      <Stats />
      <About
        title={content.homepage.aboutTitle}
        text1={content.homepage.aboutText1}
        text2={content.homepage.aboutText2}
        photoUrl={content.homepage.aboutPhotoUrl}
      />
      <Players players={content.players} />
      <Staff staff={content.staff} />
      <Schedule firstLeg={content.fixtures.firstLeg} secondLeg={content.fixtures.secondLeg} />
      <News news={content.news} />
      <Partners partners={content.partners} />
      <Support support={content.support} />
      <Footer contact={content.contact} />
    </>
  );
}
