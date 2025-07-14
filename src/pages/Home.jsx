import Main from "./Main";
import Goal from "./Goal";
import Project from "./Project";
import History from "./History";
import Contact from "./Contact";
import Introduction from "./Introduction";


export default function Home() {
    return (
        <div>
            <Main />
            <Introduction/>
            <Goal/>
            <History/>
            <Project />
            <Contact />
        </div>
    );
}
