import { FaGithub } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { resumeUrl } from "../data";
import HoverLinks from "./HoverLinks";
import "./styles/SocialIcons.css";
const SocialIcons = () => <div className="icons-section">
  <div className="social-icons" data-cursor="icons" id="social">
    <span><a href="https://github.com/ezadin2" target="_blank" rel="noreferrer" aria-label="Ezadin on GitHub"><FaGithub /></a></span>
    <span><a href="mailto:ezadinbadru55@gmail.com" aria-label="Email Ezadin"><MdOutlineEmail /></a></span>
  </div>
  <a className="resume-button" href={resumeUrl} target="_blank" rel="noreferrer" data-cursor="disable"><HoverLinks text="RESUME" /><TbNotes /></a>
</div>;
export default SocialIcons;
