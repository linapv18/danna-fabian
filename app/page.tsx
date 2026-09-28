import { getInvitation } from "@/lib/invitations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { referrer: "no-referrer", robots: { index: false, follow: false } };
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import QuickLinks from "@/components/QuickLinks";
import Quote from "@/components/Quote";
import RSVPBanner from "@/components/RSVPBanner";
import Schedule from "@/components/Schedule";
import StoryPreview from "@/components/StoryPreview";
import VenueDetails from "@/components/VenueDetails";

export default async function Home({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const invitation = token ? await getInvitation(token) : null;
  if (token && !invitation) notFound();
  return (
    <div className="relative">
      <NavBar />
      <Hero invitation={invitation} />
      <StoryPreview />
      <Schedule />
      <VenueDetails />
      <Quote />
      <QuickLinks />
      <RSVPBanner invitation={invitation} />
      <Footer />
    </div>
  );
}
