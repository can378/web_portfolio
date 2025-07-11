import contactData from "../data/contact";
import homeStyles from "./Home.module.css";
import contactStyles from "./Contact.modules.css";

export default function Contact() {
    return (
        <section id="contact" className={homeStyles.section}>
            <div className={contactStyles.contactContainer}>
                <img 
                    src={contactData.profileImage} 
                    alt="Profile" 
                    className={contactStyles.profileImage} 
                />
                <h1 className={contactStyles.name}>{contactData.name}</h1>
                <h2 className={contactStyles.title}>{contactData.title}</h2>
                <p className={contactStyles.description}>{contactData.description}</p>
                <div className={contactStyles.socialLinks}>
                    <a href={contactData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href={contactData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a href={`mailto:${contactData.socialLinks.email}`}>
                        Email
                    </a>
                </div>
            </div>
        </section>
    );
}
