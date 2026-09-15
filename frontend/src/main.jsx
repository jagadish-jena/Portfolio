import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ExternalLink,
  Code2,
  ShieldCheck,
  Database,
  Wrench,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import "./index.css";
import profileImage from "./assets/profile.jpg";

const links = {
  resume:
    "https://drive.google.com/file/d/1kTfIITwIXigTY7dG6MQiSa2Ghrw8w00z/view?usp=drive_link",
  github: "https://github.com/jagadish-jena",
  linkedin: "https://www.linkedin.com/in/jagadish2408/",
};

const skills = [
  {
    icon: Code2,
    title: "Programming Languages",
    items: ["Java", "Python", "JavaScript", "HTML", "CSS"],
  },
  {
    icon: ShieldCheck,
    title: "Libraries / Frameworks",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Express.js",
      "Node.js",
      "Django",
      "JDBC"
    ],
  },
  {
    icon: Wrench,
    title: "Tools / Platforms",
    items: ["Git", "GitHub", "VS Code", "Postman"],
  },
  { icon: Database, title: "Databases", items: ["MySQL", "MongoDB"] },
];

const projects = [
  {
    number: "01",
    title: "Personal Finance Tracker",
    description:
      "A monthly personal finance tracker with budgeting features. Users can select a month, record expenses, review spending and keep track of their budget in one place.",
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
    github: "https://github.com/jagadish-jena/Finance-Tracker-With-Budget",
    live: "https://finance-tracker-with-budget.vercel.app/login",
  },
  {
    number: "02",
    title: "Password Manager",
    description:
      "A clean password-management application built with React, designed to make organizing credentials simple while keeping the user experience straightforward and focused.",
    stack: ["ReactJS","Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/jagadish-jena/Password_Manager",
    live: "https://password-manager-one-liart.vercel.app/",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submitForm = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Unable to send message.");

      setStatus({
        type: "success",
        message: "Message sent successfully. Thanks for reaching out!",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-100">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-[calc(100%-28px)] max-w-6xl items-center justify-between md:h-20">
          <button
            onClick={() => go("home")}
            className="flex items-center gap-3 font-bold text-white"
            aria-label="Go to home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 font-bold shadow-lg shadow-cyan-500/10">
              JJ
            </span>
            <span className="font-[Space_Grotesk] text-lg">Portfolio</span>
          </button>

          <nav
            className={`${menuOpen ? "flex" : "hidden"} absolute left-3 right-3 top-[72px] flex-col rounded-xl border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-black/40 md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white md:py-2"
              >
                {item === "contact"
                  ? "Contact Me"
                  : item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-200 md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28 md:pt-32"
        >
          <div className="pointer-events-none absolute -left-56 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-64 bottom-0 h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="mx-auto grid w-[calc(100%-28px)] max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
            <div className="relative z-10 text-center lg:text-left">
              <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-cyan-400">
                HELLO, I'M
              </p>
              <h1 className="font-[Space_Grotesk] text-5xl font-bold leading-[.98] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-[82px]">
                Jagadish <span className="text-cyan-400">Jena</span>
              </h1>
              <h2 className="mt-5 text-lg font-semibold text-slate-200 md:text-xl">
                CSE Student &amp; Aspiring Web Developer
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 lg:mx-0">
                Computer Science student specializing in Cybersecurity,
                passionate about web development and building practical, clean
                and user-friendly applications.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                <button
                  onClick={() => go("projects")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  View Projects <ArrowRight size={18} />
                </button>
                <a
                  href={links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[.07]"
                >
                  <Download size={17} /> Resume
                </a>
                <button
                  onClick={() => go("contact")}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[.03] px-5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[.07]"
                >
                  Contact Me
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500 lg:justify-start">
                <span>Find me on</span>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                >
                  <Github size={20} />
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                >
                  <Linkedin size={20} />
                </a>
                <button
                  onClick={() => go("contact")}
                  aria-label="Email"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                >
                  <Mail size={20} />
                </button>
              </div>
            </div>

            <div className="relative mx-auto flex min-h-[390px] w-full max-w-md items-center justify-center lg:min-h-[520px]">
              <div className="absolute h-[310px] w-[310px] rounded-full border border-cyan-400/20 shadow-[0_0_100px_rgba(34,211,238,.08)] md:h-[420px] md:w-[420px]" />
              <div className="relative z-10 aspect-[.78] w-[275px] overflow-hidden rounded-3xl border border-white/15 bg-blue-500 shadow-2xl shadow-black/40 md:w-[370px]">
                <img
                  src={profileImage}
                  alt="Jagadish Jena"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="absolute bottom-7 left-0 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-2xl backdrop-blur-xl md:bottom-12">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <ShieldCheck size={20} />
                </span>
                <span>
                  <strong className="block text-xs text-white">
                    Cybersecurity
                  </strong>
                  <small className="block text-[10px] text-slate-400">
                    Specialization
                  </small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="border-y border-white/10 bg-slate-900/70 py-24 md:py-28"
        >
          <div className="mx-auto w-[calc(100%-28px)] max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-cyan-400">
                ABOUT ME
              </p>
              <h2 className="font-[Space_Grotesk] text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Turning curiosity into{" "}
                <span className="text-cyan-400">real projects.</span>
              </h2>
            </div>

            <div className="max-w-4xl">
              <p className="text-lg leading-8 text-slate-200 md:text-xl">
                I am a Computer Science and Engineering student with a
                specialization in Cybersecurity, interested in web development
                and modern software technologies.
              </p>
              <p className="mt-5 leading-7 text-slate-400">
                I enjoy learning by building. From frontend interfaces to
                full-stack applications, I like turning ideas into useful
                products with simple, responsive and intuitive experiences.
              </p>
              <p className="mt-4 leading-7 text-slate-400">
                Alongside web development, I am strengthening my understanding
                of cybersecurity, databases, programming and software
                engineering fundamentals. I’m always looking for opportunities
                to learn, collaborate and build something meaningful.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  ["03+", "Projects"],
                  ["10+", "Technologies"],
                  ["∞", "Learning"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="min-w-28 rounded-xl border border-white/10 bg-white/[.02] px-5 py-4"
                  >
                    <strong className="block font-[Space_Grotesk] text-2xl text-cyan-400">
                      {value}
                    </strong>
                    <span className="text-xs text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="bg-slate-950 py-24 md:py-28">
          <div className="mx-auto w-[calc(100%-28px)] max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-cyan-400">
                MY SKILLS
              </p>
              <h2 className="font-[Space_Grotesk] text-4xl font-bold tracking-tight text-white md:text-5xl">
                Technologies I <span className="text-cyan-400">work with.</span>
              </h2>
              <p className="mt-4 text-slate-400">
                My current technical toolkit across programming, development,
                tools and databases.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {skills.map(({ icon: Icon, title, items }) => (
                <article
                  key={title}
                  className="min-h-60 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.045] to-white/[.01] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-sm font-bold text-white">{title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/[.03] px-2.5 py-1.5 text-[11px] text-slate-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="border-y border-white/10 bg-slate-900/70 py-24 md:py-28"
        >
          <div className="mx-auto w-[calc(100%-28px)] max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-cyan-400">
                PROJECTS
              </p>
              <h2 className="font-[Space_Grotesk] text-4xl font-bold tracking-tight text-white md:text-5xl">
                Things I’ve <span className="text-cyan-400">built.</span>
              </h2>
              <p className="mt-4 text-slate-400">
                A couple of projects that represent what I’m currently learning
                and building.
              </p>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <article
                  key={project.number}
                  className="grid gap-5 rounded-2xl border border-white/10 bg-white/[.02] p-6 transition hover:border-cyan-400/25 md:grid-cols-[90px_1fr] md:p-8"
                >
                  <div className="font-[Space_Grotesk] text-base font-bold text-cyan-400/60">
                    {project.number}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h3 className="font-[Space_Grotesk] text-2xl font-bold text-white">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Project GitHub"
                          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-cyan-400"
                        >
                          <Github size={18} />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Live project"
                          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-cyan-400"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                    <p className="mt-3 max-w-4xl leading-7 text-slate-400">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 bg-white/[.03] px-2.5 py-1.5 text-[11px] text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-slate-950 py-24 md:py-28">
          <div className="mx-auto grid w-[calc(100%-28px)] max-w-6xl items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-cyan-400">
                CONTACT ME
              </p>
              <h2 className="font-[Space_Grotesk] text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Let’s make something{" "}
                <span className="text-cyan-400">great together.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                Have a project idea, internship opportunity, or just want to say
                hello? Send me a message and I’ll get back to you.
              </p>

              <a
                href="mailto:jenasuraj218@gmail.com"
                className="mt-8 flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/[.02] px-4 py-3 transition hover:border-cyan-400/30"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Mail size={20} />
                </span>
                <span>
                  <small className="block text-[10px] text-slate-500">
                    Email me at
                  </small>
                  <strong className="text-sm text-white">
                    jenasuraj218@gmail.com
                  </strong>
                </span>
              </a>

              <div className="mt-5 flex gap-5 text-sm text-slate-400">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 transition hover:text-cyan-400"
                >
                  <Github size={19} /> GitHub
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 transition hover:text-cyan-400"
                >
                  <Linkedin size={19} /> LinkedIn
                </a>
              </div>
            </div>

            <form
              onSubmit={submitForm}
              className="rounded-2xl border border-white/10 bg-white/[.025] p-5 shadow-2xl shadow-black/30 sm:p-7"
            >
              <div className="grid gap-0 sm:grid-cols-2 sm:gap-4">
                <label className="mb-4 block text-xs font-semibold text-slate-200 sm:mb-5">
                  Name
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/5"
                  />
                </label>
                <label className="mb-4 block text-xs font-semibold text-slate-200 sm:mb-5">
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/5"
                  />
                </label>
              </div>

              <label className="mb-5 block text-xs font-semibold text-slate-200">
                Subject
                <input
                  required
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  placeholder="Project / Opportunity"
                  className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/5"
                />
              </label>

              <label className="mb-5 block text-xs font-semibold text-slate-200">
                Message
                <textarea
                  required
                  rows="7"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell me a little about your idea..."
                  className="mt-2 block min-h-40 w-full resize-y rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/5"
                />
              </label>

              <button
                disabled={status.type === "loading"}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-70"
              >
                {status.type === "loading" ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Send size={17} />
                )}
                {status.type === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status.type === "success" && (
                <div className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-emerald-400">
                  <CheckCircle2 size={17} /> {status.message}
                </div>
              )}
              {status.type === "error" && (
                <div className="mt-3 text-center text-xs text-red-400">
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex min-h-[76px] w-[calc(100%-28px)] max-w-6xl flex-wrap items-center justify-center gap-5 text-xs text-slate-600 md:justify-between">
          <p className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 text-[9px] font-bold text-white">
              JJ
            </span>
            Jagadish Jena
          </p>
          <p>
            © {new Date().getFullYear()} Jagadish Jena. Built with React &amp;
            Tailwind CSS.
          </p>
          <div className="flex gap-3">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400"
            >
              <Github size={17} />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400"
            >
              <Linkedin size={17} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
