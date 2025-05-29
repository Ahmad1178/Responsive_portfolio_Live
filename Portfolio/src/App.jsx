import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, animateScroll as scroll } from "react-scroll";
import Lottie from "lottie-react";
import webDevAnimation from "./assets/web-dev-animation.json"; // download from LottieFiles
import webDevBg from "./assets/web-dev-bg.jpg";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    AOS.init({ duration: 800, once: true });
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const navLinks = [
    { label: "Home", to: "home" },
    { label: "About", to: "about" },
    { label: "Skills", to: "skills" },
    { label: "Projects", to: "projects" },
    { label: "Contact", to: "contact" },
  ].map(({ label, to }) => (
    <Link
      key={to}
      to={to}
      smooth={true}
      duration={500}
      offset={-70}
      className="cursor-pointer hover:text-blue-500"
      onClick={() => setNavOpen(false)} // close on click
    >
      {label}
    </Link>
  ));

  const themeAndCVButtons = (
    <>
      <a
        href="./My_Resume.pdf"
        download
        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Download CV
      </a>
      <button
        onClick={toggleTheme}
        className="ml-2 p-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-500">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <header className="p-5 bg-gray-100 dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">My Portfolio</h1>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setNavOpen(!navOpen)}
          >
            ☰
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks}
            {themeAndCVButtons}
          </nav>
        </div>

        {/* Mobile Nav */}
        {navOpen && (
          <div className="md:hidden flex flex-col items-start mt-4 space-y-2">
            {navLinks}
            {themeAndCVButtons}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        data-aos="fade-up"
        className="relative flex flex-col items-center justify-center h-screen text-center px-4"
        style={{
          backgroundImage: `url(${webDevBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-90 z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white"
          >
            Hi, I'm Ahmad Gohar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl"
          >
            Full Stack Developer crafting seamless web experiences with React,
            Node.js & Tailwind CSS.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex gap-4 justify-center"
          >
            <Link
              to="projects"
              smooth
              duration={500}
              className="bg-blue-500 text-white px-6 py-3 cursor-pointer rounded-xl shadow-lg hover:bg-blue-600 transition"
            >
              View Projects
            </Link>
            <a
              href="./My_Resume.pdf"
              download
              className="border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition"
            >
              Download CV
            </a>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        data-aos="fade-up"
        className="py-24 px-6 bg-white dark:bg-gray-900"
      >
        <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          About Me
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image or Illustration */}
          <Lottie
            animationData={webDevAnimation}
            loop
            className="w-64 h-64 mx-auto"
          />

          {/* Text Content */}
          <div className="text-gray-700 dark:text-gray-300 text-lg space-y-4">
            <p>
              I'm <strong>Ahmad Gohar</strong>, a Full Stack Developer focused
              on building responsive, scalable, and user-friendly applications.
            </p>
            <p>
              I specialize in <strong>React, Node.js, MongoDB,</strong> and{" "}
              <strong>Tailwind CSS</strong> with a strong interest in solving
              real-world problems through clean and maintainable code.
            </p>
            <p>
              Outside of development, I stay updated with the latest trends,
              contribute to open source, and engage with tech communities.
            </p>

            <Link
              to="contact"
              smooth
              duration={500}
              className="text-blue-500 font-semibold cursor-pointer"
            >
              Let’s build something amazing together!
            </Link>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        data-aos="fade-up"
        className="py-20 px-4 bg-gray-50 dark:bg-gray-800"
      >
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Technical Skills
        </h3>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "HTML5",
              level: 95,
              icon: <i className="devicon-html5-plain colored text-2xl mr-2" />,
            },
            {
              name: "CSS3",
              level: 90,
              icon: <i className="devicon-css3-plain colored text-2xl mr-2" />,
            },
            {
              name: "JavaScript",
              level: 85,
              icon: (
                <i className="devicon-javascript-plain colored text-2xl mr-2" />
              ),
            },
            {
              name: "React",
              level: 85,
              icon: (
                <i className="devicon-react-original colored text-2xl mr-2" />
              ),
            },
            {
              name: "Node.js",
              level: 80,
              icon: (
                <i className="devicon-nodejs-plain colored text-2xl mr-2" />
              ),
            },
            {
              name: "MongoDB",
              level: 75,
              icon: (
                <i className="devicon-mongodb-plain colored text-2xl mr-2" />
              ),
            },
            {
              name: "Tailwind CSS",
              level: 90,
              icon: (
                <i className="devicon-tailwindcss-plain colored text-2xl mr-2" />
              ),
            },
            {
              name: "Git",
              level: 80,
              icon: <i className="devicon-git-plain colored text-2xl mr-2" />,
            },
          ].map(({ name, level, icon }) => (
            <div
              key={name}
              className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-lg font-medium text-gray-800 dark:text-gray-200">
                  {icon}
                  {name}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${level}%` }}
                  transition={{ duration: 1 }}
                  className="h-3 bg-blue-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        data-aos="fade-up"
        className="py-16 px-4 bg-gray-100 dark:bg-gray-900"
      >
        <h3 className="text-3xl font-semibold text-center mb-12">Projects</h3>
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Full Stack Chatt App",
              image:
                "https://plus.unsplash.com/premium_photo-1721922862292-d65035278faa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              description:
                "A full stack chat application built with React and Tailwind CSS along with authentications and many more features.",
              link: "https://github.com/Ahmad1178/fullstack-chat-app-master.git",
            },
            {
              title: "E-Commerce App",
              image:
                "https://images.unsplash.com/photo-1657812159075-7f0abd98f7b8?q=80&w=1577&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              description:
                "A full-stack MERN e-commerce platform with user authentication and shopping cart features.",
              link: "https://github.com/Ahmad1178/ecommerce-app-main.git",
            },
            {
              title: "Inventory Management System",
              image:
                "data:image/jpeg;base64,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",
              description:
                "A blogging platform with markdown support, user accounts, and post management.",
              link: "https://github.com/Ahmad1178/React-Inventory-Management-System.git",
            },
          ].map(({ title, image, description, link }) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={image}
                alt={title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">
                  {description}
                </p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        data-aos="fade-up"
        className="py-16 px-4 bg-gray-50 dark:bg-gray-800"
      >
        <h3 className="text-3xl font-semibold text-center mb-10">Contact</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              name: formData.get("name"),
              email: formData.get("email"),
              message: formData.get("message"),
            };

            try {
              const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                }
              );

              if (response.ok) {
                toast.success("Message sent successfully");
                e.target.reset();
              } else {
                toast.error("Failed to send message");
              }
            } catch (err) {
              console.error(err);
              toast.error("An error occurred. Please try again.");
            }
          }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <input
            name="name"
            required
            placeholder="Name"
            className="w-full p-3 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <input
            name="email"
            required
            type="email"
            placeholder="Email"
            className="w-full p-3 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <textarea
            name="message"
            required
            placeholder="Message"
            className="w-full p-3 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 h-32"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-200 dark:bg-gray-900 dark:text-gray-300">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/Ahmad1178"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Ahmad Gohar. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
