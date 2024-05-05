import Image from "next/image";

export default function Home() {
  return (
    <div className="app_bg">
      <Navbar />
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
