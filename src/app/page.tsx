import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import Billing from "@/components/Billing/Billing";
import Stats from "@/components/Stats/Stats";
import Business from "@/components/Business/Business";
import CardDeal from "@/components/CardDeal/CardDeal";
import Testimonials from "@/components/Testimonials/Testimonials";
import Clients from "@/components/Clients/Clients";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";
export default function Home() {
  return (
    <div className="app_bg">
      {/* <Navbar /> */}
      <Header />
      <Stats />
      <Business />
      <Billing />
      <CardDeal />
      <Testimonials />
      <Clients />
      <CTA />
      <Footer />
    </div>
  );
}
