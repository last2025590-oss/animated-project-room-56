// @ts-nocheck -- imported as-is from the original portfolio repo
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        
<a href="/#" className="navbar-title logo-link" data-cursor="disable">
  <svg
    className="animated-logo"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Ezadin logo"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
      <clipPath id="logoBadgeClip">
        <rect x="6" y="6" width="88" height="88" rx="26" />
      </clipPath>
    </defs>

    <rect x="6" y="6" width="88" height="88" rx="26" fill="url(#logoGradient)" />

    <g clipPath="url(#logoBadgeClip)">
      <g transform="rotate(20 50 50)">
        <rect
          className="logo-sheen"
          x="-30"
          y="-45"
          width="16"
          height="190"
          fill="#ffffff"
          opacity="0.25"
        />
      </g>
    </g>

    <path
      d="M68 28 H32 V72 H68"
      fill="none"
      stroke="#0b080c"
      strokeWidth="11"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 50 H56"
      fill="none"
      stroke="#0b080c"
      strokeWidth="11"
      strokeLinecap="round"
    />
  </svg>

  <span className="logo-text">EZADIN<span>.</span></span>
</a>

        <a
          href="mailto:ezadinbadru55@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          ezadinbadru55@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a href="/">
              <HoverLinks text="ROOM" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
