import { getServices } from "@/lib/cms/getServices";
import ServicesClient from "./ServicesClient";

export default async function ServicesPage() {
  const services = await getServices();

  return <ServicesClient services={services} />;
}
