import Image from "next/image";
import FadeInView from "./FadeInView";
import { urlFor } from "@/lib/sanity";
import type { SanityAuthor } from "@/lib/sanity";

// Colour rotation for author avatars
const AVATAR_COLOURS = [
  { bg: "#2AA090", text: "#fff" },
  { bg: "#E87030", text: "#fff" },
  { bg: "#1A3028", text: "#FAF5EC" },
];

const hardcodedAuthors: SanityAuthor[] = [
  { _id: "ds", name: "Dada Sadananda",         role: "Senior teacher · DharmaDeha founder", bio: "Named and founded the DharmaDeha concept. Author of the Yama and Niyama course.", initials: "DS" },
  { _id: "dn", name: "Dada Nityabodha",         role: "Teacher",                             bio: "Author of the Fundamental Philosophy course.", initials: "DN" },
  { _id: "ssa", name: "Shrii Shrii Anandamurti", role: "Our Guru",                            bio: "The source of all wisdom.", initials: "SSA" },
];

export default function Authors({ sanityData }: { sanityData?: SanityAuthor[] | null }) {
  const authors = sanityData && sanityData.length > 0 ? sanityData : hardcodedAuthors;

  return (
    <section id="mentors" style={{ backgroundColor: "#FAF5EC" }} className="py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4 md:mb-5"
            style={{ color: "#2AA090" }}
          >
            Taught by
          </p>
          <h2 className="mb-10 md:mb-16">
            <span
              className="block"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                color: "#1A3028",
                lineHeight: 1.1,
              }}
            >
              Voices behind
            </span>
            <span
              className="block italic"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                color: "#E87030",
                lineHeight: 1.1,
              }}
            >
              the curriculum.
            </span>
          </h2>
        </FadeInView>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {authors.map((author, i) => {
            const { bg, text } = AVATAR_COLOURS[i % AVATAR_COLOURS.length];
            const photoUrl = author.photo ? urlFor(author.photo).width(192).height(192).url() : null;

            return (
              <FadeInView key={author._id} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  {/* Avatar — photo if available, initials fallback */}
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4 md:mb-5 shrink-0 overflow-hidden"
                    style={{ backgroundColor: bg }}
                  >
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={author.name}
                        width={96}
                        height={96}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    ) : (
                      <span
                        className="text-lg md:text-xl font-medium"
                        style={{ color: text, fontFamily: "var(--font-dm-serif)" }}
                      >
                        {author.initials || author.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-lg md:text-xl mb-1"
                    style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
                  >
                    {author.name}
                  </h3>
                  <p className="text-sm font-medium mb-2 md:mb-3" style={{ color: "#2AA090" }}>
                    {author.role}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(26,48,40,0.68)" }}>
                    {author.bio}
                  </p>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
