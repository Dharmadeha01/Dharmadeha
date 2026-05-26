import FadeInView from "./FadeInView";

const authors = [
  {
    initials: "DS",
    name: "Dada Sadananda",
    role: "Senior teacher",
    bio: "Named and founded the DharmaDeha concept. Author of the Yama and Niyama course.",
    color: "#2AA090",
    textColor: "#fff",
  },
  {
    initials: "DN",
    name: "Dada Nityabodha",
    role: "Teacher",
    bio: "Author of the Fundamental Philosophy course.",
    color: "#E87030",
    textColor: "#fff",
  },
  {
    initials: "SSA",
    name: "Shrii Shrii Anandamurti",
    role: "Our Guru",
    bio: "The source of all wisdom.",
    color: "#1A3028",
    textColor: "#FAF5EC",
  },
];

export default function Authors() {
  return (
    <section id="mentors" style={{ backgroundColor: "#FAF5EC" }} className="py-12 md:py-24">
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
          {authors.map((author, i) => (
            <FadeInView key={author.name} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4 md:mb-5 shrink-0 text-lg md:text-xl font-medium"
                  style={{
                    backgroundColor: author.color,
                    color: author.textColor,
                    fontFamily: "var(--font-dm-serif)",
                  }}
                >
                  {author.initials}
                </div>
                <h3
                  className="text-lg md:text-xl mb-1"
                  style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
                >
                  {author.name}
                </h3>
                <p
                  className="text-sm font-medium mb-2 md:mb-3"
                  style={{ color: "#2AA090" }}
                >
                  {author.role}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(26,48,40,0.68)" }}
                >
                  {author.bio}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
