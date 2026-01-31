import { getLandingPageContent } from "@/lib/cms/getLandingPageContent";
import LandingClient from "./LandingClient";

export default async function LandingPage() {
  const cms = await getLandingPageContent();

  return (
    <section className="max-w-7xl mx-auto px-6">
      <LandingClient cms={cms} />
    </section>
  );
}
