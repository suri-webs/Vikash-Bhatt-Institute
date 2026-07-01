import type { Metadata } from "next";
import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import AboutPage from "@/components/about-page";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about the mission, legacy, and conceptual teaching methodology of Vikas Bhatt Classes (VBC) in Sant Nagar, Burari, Delhi. Guided by founder Vikas Bhatt.",
};

export default function AboutHome() {
    return (
        <>
            <Navbar />
            <AboutPage />
            <Footer />
        </>
    );
}