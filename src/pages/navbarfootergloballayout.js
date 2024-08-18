'use client';
import NavbarFooter from "./navbarfooter"
import {Footer} from "./navbarfooter"

export default function Layout(props) {
    return (
        <>
            <NavbarFooter />
            <main>{props.children}</main>
            <Footer />
        </>
    );
}