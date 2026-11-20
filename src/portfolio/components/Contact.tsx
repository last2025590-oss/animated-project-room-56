import { MdArrowOutward, MdCopyright } from "react-icons/md";
import ContactForm from "./ContactForm";
import "./styles/Contact.css";
const Contact = () => <section className="contact-section section-container" id="contact">
  <div className="contact-container"><h3>Contact</h3><div className="contact-flex">
    <div className="contact-box"><h4>Email</h4><p><a href="mailto:ezadinbadru55@gmail.com" data-cursor="disable">ezadinbadru55@gmail.com</a></p>
      <h4>Phone</h4><p><a href="tel:+251940715427" data-cursor="disable">+251 940 715 427</a></p><h4>Location</h4><p>Addis Ababa, Ethiopia</p></div>
    <div className="contact-box"><h4>Find me</h4><a href="https://github.com/ezadin2" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">GitHub <MdArrowOutward /></a></div>
    <div className="contact-box"><h2>Mobile & web development<br />by <span>EZADIN BADIRU</span></h2><h5><MdCopyright /> 2026</h5></div>
  </div><ContactForm /></div>
</section>;
export default Contact;
