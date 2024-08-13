import NavbarFooter from "./navbarfooter"
import {Footer, NavigationBar} from "./navbarfooter"

export default function Layout(props) {
    return (
        <>
            <NavbarFooter />
            <NavigationBar />
            <main>{props.children}</main>
            <Footer />
        </>
    );
}