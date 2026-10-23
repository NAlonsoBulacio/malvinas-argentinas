import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { profId } = await params;
  redirect("/salud/turno/" + profId);
}
