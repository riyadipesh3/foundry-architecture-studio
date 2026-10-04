import { useEffect, useRef, useState, type ReactNode } from 'react'

/* Shared primitives. Scroll reveal uses IntersectionObserver, never a scroll
   listener, and collapses to fully visible under prefers-reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Section heading. Stacked vertically, never a split header. Kicker is the
   budgeted micro label; the accent tick is the cheaper alternative device and
   carries the sections that do not spend one. */
function SectionHead({
  kicker,
  title,
  body,
}: {
  kicker?: string
  title: string
  body?: string
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? <p className="micro mb-6">{kicker}</p> : <span className="tick mb-7" />}
      <h2 className="display display-md">{title}</h2>
      {body ? <p className="lede mt-6">{body}</p> : null}
    </div>
  )
}

const NAV = ['Practice', 'Projects', 'Services', 'Contact']

/* Seeds were picked from a contact sheet of picsum candidates and each one
   checked against the photograph it actually returns, so the alt text below
   describes the real image rather than the brief. */
const PROJECTS = [
  {
    name: 'Kverna Footbridge',
    place: 'Kverna, Bristol',
    scope: 'Pedestrian bridge, river crossing, public realm',
    year: '2025',
    seed: 'foundry-roofline-city-01',
    alt: 'Timber footbridge deck with chain-linked posts running out over open water',
    span: 'lg:col-span-7',
    ratio: 'aspect-4/3',
    w: 1400,
    h: 1050,
  },
  {
    name: 'Ridley Civic Library',
    place: 'St Werburghs, Bristol',
    scope: 'New build library, reading room, civic plaza',
    year: '2024',
    seed: 'foundry-window-reveal-06',
    alt: 'Library reading room interior with a copper pendant lamp and long banquette seating',
    span: 'lg:col-span-5 lg:mt-24',
    ratio: 'aspect-3/4',
    w: 1050,
    h: 1400,
  },
  {
    name: 'Halvard Court',
    place: 'Old Market, Bristol',
    scope: 'Courtyard housing, 34 homes, shared threshold',
    year: '2023',
    seed: 'foundry-concrete-formwork-13',
    alt: 'White rendered building with a square corner tower and arched doorway above a parapet',
    span: 'lg:col-span-8 lg:col-start-5',
    ratio: 'aspect-16/10',
    w: 1440,
    h: 900,
  },
]

const SERVICES = [
  {
    n: '01',
    title: 'Feasibility and site appraisal',
    body: 'We test what a site can carry before anyone draws a plan. Massing, daylight, servicing, and a cost band you can take to a funder.',
  },
  {
    n: '02',
    title: 'New build and extension',
    body: 'Houses, libraries, workshops, and small civic buildings, taken from planning through to the last threshold detail.',
  },
  {
    n: '03',
    title: 'Adaptive reuse',
    body: 'Existing structures measured, stripped back, and kept where they earn their place. New work is held to a clear minority.',
  },
  {
    n: '04',
    title: 'Public realm and landscape',
    body: 'Streets, courtyards, and the space between buildings, detailed alongside the architecture rather than handed off at the end.',
  },
  {
    n: '05',
    title: 'Conservation and listed work',
    body: 'Repair-led projects on listed fabric, from condition recording through consent, with the fabric team in the room early.',
  },
]

export default function App() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="min-h-[100dvh]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-canvas)]"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------------- */}
      {/* NAV - one line at desktop, 72px                                  */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/92 backdrop-blur-sm">
        <div className="shell flex h-[72px] items-center justify-between">
          <a
            href="#top"
            className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em] text-[var(--color-ink)]"
          >
            Foundry
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[0.875rem] font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-accent)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <a href="#contact" className="btn btn-primary hidden md:inline-flex">
            Start a project
          </a>

          <button
            type="button"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-[var(--color-hairline)] text-[var(--color-ink)] md:hidden"
          >
            <span className="flex w-4 flex-col gap-[4px]">
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? 'translate-y-[2.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? '-translate-y-[2.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {navOpen ? (
          <div id="mobile-nav" className="border-t border-[var(--color-hairline)] md:hidden">
            <nav className="shell flex flex-col py-4">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setNavOpen(false)}
                  className="border-b border-[var(--color-hairline)] py-3.5 text-[1rem] font-medium text-[var(--color-ink)] last:border-b-0"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Start a project
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- */}
        {/* HERO - asymmetric split: type block set against an offset image */}
        {/* -------------------------------------------------------------- */}
        <section id="top" className="shell pt-16 pb-16 md:pt-20 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6 lg:self-center lg:pr-10">
              <p className="micro mb-7">Architecture and urban design</p>
              <h1 className="display display-xl">
                Buildings that hold
                <br />
                a street together.
              </h1>
              <p className="lede mt-8">
                Foundry is an architecture and design practice in Bristol. We work
                on buildings, courtyards, and the ground between them.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn btn-primary">
                  Start a project
                </a>
                <a href="#projects" className="btn btn-secondary">
                  Selected projects
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal>
                <div className="frame aspect-4/5 w-full">
                  <img
                    src="https://picsum.photos/seed/foundry-courtyard-gallery-08/1200/1500"
                    alt="Corner of a brick building with a dark green door and deep painted window reveals"
                    loading="eager"
                    width={1200}
                    height={1500}
                  />
                </div>
                <p className="mt-4 text-[0.8125rem] text-[var(--color-mute)]">
                  Ridley Civic Library, front elevation detail
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* PRACTICE - stacked statement with an inline fact rail           */}
        {/* -------------------------------------------------------------- */}
        <section id="practice" className="shell py-24 md:py-28">
          <Reveal>
            <p className="micro mb-6">The practice</p>
            <h2 className="display display-lg">
              Drawn in the city, built by the same team.
            </h2>
          </Reveal>

          <Reveal delay={70}>
            <p className="editorial mt-10 max-w-[52ch] text-[1.375rem] leading-[1.45] md:text-[1.625rem]">
              We keep architects, technologists, and the people who make the
              building in one room, from the first measured survey to the day the
              scaffold comes down.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="mt-16 flex flex-wrap gap-x-16 gap-y-8 border-y border-[var(--color-hairline)] py-8">
              {[
                { k: 'Founded', v: '2011' },
                { k: 'People', v: '34' },
                { k: 'Workshops', v: 'Two, in Bristol' },
                { k: 'Building', v: 'RIBA chartered' },
              ].map((f) => (
                <div key={f.k}>
                  <dt className="text-[0.8125rem] text-[var(--color-mute)]">{f.k}</dt>
                  <dd className="mt-1.5 font-display text-[1.125rem] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={160}>
            <p className="lede mt-10">
              Three quarters of our work is local. We take on a small number of
              buildings each year so that a partner stays on every drawing, and
              we would rather decline a brief than take it at arm&apos;s length.
            </p>
          </Reveal>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* PROJECTS - asymmetric grid, offset rows, real images            */}
        {/* -------------------------------------------------------------- */}
        <section id="projects" className="shell py-24 md:py-28">
          <Reveal>
            <SectionHead
              kicker="Selected projects"
              title="Three buildings from the last four years"
              body="Each one started as a problem with a boundary rather than a brief with a shape."
            />
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-12 lg:gap-y-20">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} className={p.span} delay={i * 70}>
                <article>
                  <div className={`frame ${p.ratio} w-full`}>
                    <img
                      src={`https://picsum.photos/seed/${p.seed}/${p.w}/${p.h}`}
                      alt={p.alt}
                      loading="lazy"
                      width={p.w}
                      height={p.h}
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-[1.125rem] font-semibold tracking-[-0.025em] text-[var(--color-ink)]">
                      {p.name}
                    </h3>
                    <p className="shrink-0 text-[0.8125rem] text-[var(--color-mute)]">
                      {p.year}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                    {p.place}
                  </p>
                  <p className="mt-1 text-[0.875rem] text-[var(--color-mute)]">
                    {p.scope}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* SERVICES - numbered rows, hairlines at the top only            */}
        {/* -------------------------------------------------------------- */}
        <section id="services" className="border-t border-[var(--color-hairline)] py-24 md:py-28">
          <div className="shell">
            <Reveal>
              <SectionHead
                title="What the practice does"
                body="Five kinds of work. Most projects use two or three of them at once."
              />
            </Reveal>

            <ol className="mt-16">
              {SERVICES.map((s, i) => (
                <Reveal key={s.n} delay={i * 60}>
                  <li className="grid gap-3 border-t border-[var(--color-hairline)] py-8 md:grid-cols-12 md:gap-8">
                    <p className="font-display text-[0.9375rem] font-semibold tracking-[0.08em] text-[var(--color-accent)] md:col-span-2">
                      {s.n}
                    </p>
                    <h3 className="font-display text-[1.3125rem] font-semibold tracking-[-0.025em] text-[var(--color-ink)] md:col-span-5 md:text-[1.5rem]">
                      {s.title}
                    </h3>
                    <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)] md:col-span-5">
                      {s.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* DETAIL SPREAD - one project full width, then key values and a  */}
        {/* serif note. Full-bleed band, not another grid cell.             */}
        {/* -------------------------------------------------------------- */}
        <section id="kverna" className="border-t border-[var(--color-hairline)] pt-24 md:pt-28">
          <div className="shell">
            <Reveal>
              <div className="max-w-2xl">
                <span className="tick mb-7" />
                <h2 className="display display-md">
                  Kverna Footbridge, built 2024 to 2025
                </h2>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="frame mt-14 aspect-16/7 w-full">
              <img
                src="https://picsum.photos/seed/foundry-architectural-render-12/1800/788"
                alt="Cable stayed bridge deck viewed head on, vertical hangers against a city skyline"
                loading="lazy"
                width={1800}
                height={788}
              />
            </div>
          </Reveal>

          <div className="shell">
            <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <dl className="grid grid-cols-2 gap-x-8 gap-y-7 lg:grid-cols-1">
                  {[
                    { k: 'Client', v: 'Bristol City Council' },
                    { k: 'Span', v: '84 m' },
                    { k: 'Structure', v: 'Weathering steel' },
                    { k: 'Contractor', v: 'Ardmore Build' },
                    { k: 'Engineer', v: 'Halstead Structures' },
                    { k: 'Cost', v: 'GBP 6.4m' },
                  ].map((row) => (
                    <div key={row.k}>
                      <dt className="text-[0.8125rem] text-[var(--color-mute)]">
                        {row.k}
                      </dt>
                      <dd className="mt-1.5 font-display text-[1rem] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal className="lg:col-span-6 lg:col-start-7" delay={80}>
                <p className="editorial text-[1.25rem] leading-[1.5]">
                  The old crossing carried cars and had no place to stop. We
                  widened the deck, set the parapet at a single line so nothing
                  interrupts the view downstream, and put the whole structure on
                  four piers instead of a river wall.
                </p>
                <p className="lede mt-7">
                  Winter flooding took two summers of testing. The finished
                  bridge opens at dawn and stays open after dark, and the
                  abutments are finished in a brick that matches the wharf wall
                  two hundred metres downstream.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* QUOTE - single pull quote, serif, three lines, full attribution */}
        {/* -------------------------------------------------------------- */}
        <section className="shell py-24 md:py-28">
          <Reveal>
            <figure className="mx-auto max-w-3xl">
              <blockquote className="editorial text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.3] tracking-[-0.01em]">
                &ldquo;They spent a winter arguing about drainage with us and
                saved the scheme a year. Nobody else had the patience.&rdquo;
              </blockquote>
              <figcaption className="mt-7 text-[0.9375rem] text-[var(--color-mute)]">
                Douglas Erskine, estates director at Severn Housing Trust
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* CONTACT - label above input, no placeholder-as-label            */}
        {/* -------------------------------------------------------------- */}
        <section id="contact" className="border-t border-[var(--color-hairline)] py-24 md:py-28">
          <div className="shell">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <span className="tick mb-7" />
                <h2 className="display display-lg">
                  Bring us the
                  <br />
                  awkward site.
                </h2>
                <p className="lede mt-7">
                  Send a paragraph about the building. We reply within three
                  working days, including when the honest answer is that you do
                  not need a practice.
                </p>
                <dl className="mt-10 grid gap-6">
                  <div>
                    <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                      Studio
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem]">
                      Foundry, 14 Wapping Wharf, Bristol BS1 6UD
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                      Email
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem]">studio@foundry.build</dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                      Telephone
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem]">+44 117 496 0231</dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal className="lg:col-span-6 lg:col-start-7" delay={90}>
                <form className="grid gap-6" noValidate>
                  {[
                    {
                      id: 'name',
                      label: 'Name',
                      type: 'text',
                      hint: 'Who we should reply to.',
                    },
                    {
                      id: 'email',
                      label: 'Email',
                      type: 'email',
                      hint: 'Used only to answer you.',
                    },
                    {
                      id: 'brief',
                      label: 'About the site',
                      type: 'textarea',
                      hint: 'Location, consent status, and what is already fixed.',
                    },
                  ].map((f) => (
                    <div key={f.id} className="grid gap-2">
                      <label
                        htmlFor={f.id}
                        className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                      >
                        {f.label}
                      </label>
                      {f.type === 'textarea' ? (
                        <textarea
                          id={f.id}
                          name={f.id}
                          rows={5}
                          aria-describedby={`${f.id}-hint`}
                          className="field"
                        />
                      ) : (
                        <input
                          id={f.id}
                          name={f.id}
                          type={f.type}
                          aria-describedby={`${f.id}-hint`}
                          className="field"
                        />
                      )}
                      <p id={`${f.id}-hint`} className="text-[0.8125rem] text-[var(--color-mute)]">
                        {f.hint}
                      </p>
                    </div>
                  ))}

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button type="submit" className="btn btn-primary">
                      Send enquiry
                    </button>
                    <p className="text-[0.8125rem] text-[var(--color-mute)]">
                      We reply within three working days.
                    </p>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER - one Diya Developers credit, small and understated        */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-[var(--color-hairline)] py-12">
        <div className="shell grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
              Foundry
            </p>
            <p className="mt-2 text-[0.875rem] text-[var(--color-body)]">
              14 Wapping Wharf, Bristol BS1 6UD
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-2 md:col-span-4">
            {NAV.map((i) => (
              <a
                key={i}
                href={`#${i.toLowerCase()}`}
                className="text-[0.875rem] text-[var(--color-body)] transition-colors hover:text-[var(--color-accent)]"
              >
                {i}
              </a>
            ))}
          </nav>

          <p className="text-[0.8125rem] text-[var(--color-body)] md:col-span-3 md:text-right">
            Developed by{' '}
            <a
              href="https://thediyadevelopers.com"
              rel="noreferrer"
              className="underline decoration-[var(--color-hairline)] underline-offset-[3px] transition-colors hover:decoration-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Diya Developers
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}