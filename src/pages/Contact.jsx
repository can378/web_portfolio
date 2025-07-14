import contactData from "../data/contact";
import defaultData from "../data/default";
import homeStyles from "./Home.module.css";
import contactStyles from "./Contact.module.css";

export default function Contact() {
    return (
        <section id="contact" className={homeStyles.section}>
            <div className={contactStyles.contactContainer}>
                <img 
                    src={defaultData.profileImage} 
                    alt="Profile" 
                    className={contactStyles.profileImage} 
                />
                <p className={contactStyles.greeting}>I’d love to work with you</p>
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
                    <a href={contactData.socialLinks.blog} target="_blank" rel="noopener noreferrer">
                        Blog
                    </a>
                </div>
            </div>
        </section>
    );
}
