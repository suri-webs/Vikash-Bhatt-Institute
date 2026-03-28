import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import CoursesSection from "@/components/home/course";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Navbar from "@/components/home/navbar";
import StudentBenefits from "@/components/home/student-benefits";
import Testmonilas from "@/components/home/testmonilas";
import WhyChooseUs from "@/components/home/why-choose-us";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <CoursesSection />
      <WhyChooseUs />
      <StudentBenefits />
      <Testmonilas />
      <Contact />
      <Footer />

    </>
  );
}
