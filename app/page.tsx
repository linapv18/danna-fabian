import { getInvitation } from "@/lib/invitations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { referrer: "no-referrer", robots: { index: false, follow: false } };
import InvitationCover from "@/components/InvitationCover";
import Gifts from "@/components/Gifts";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import QuickLinks from "@/components/QuickLinks";
import Quote from "@/components/Quote";
import RSVPBanner from "@/components/RSVPBanner";
import Schedule from "@/components/Schedule";
import StoryPreview from "@/components/StoryPreview";
import VenueDetails from "@/components/VenueDetails";

export default async function Home({ searchParams }: { searchParams: Promise<{ token?: string; abierta?: string }> }) {
  const { token, abierta } = await searchParams;
  const invitation = token ? await getInvitation(token) : null;
  if (token && !invitation) notFound();
  if (invitation && token && abierta !== "1") return <InvitationCover invitation={invitation} token={token} />;
  return (
    <div className="relative">
      <NavBar />
      <Hero />
      <StoryPreview />
      <Schedule />
      <VenueDetails />
      <Quote />
      <QuickLinks />
      <Gifts />
      <RSVPBanner invitation={invitation} />
      <Footer />
    </div>
  );
}
