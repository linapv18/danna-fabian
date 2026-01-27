import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import QuickLinks from "@/components/QuickLinks";
import Quote from "@/components/Quote";
import RSVPBanner from "@/components/RSVPBanner";
import Schedule from "@/components/Schedule";
import StoryPreview from "@/components/StoryPreview";
import VenueDetails from "@/components/VenueDetails";

export default function Home() {
  return (
    <div className="relative">
      <NavBar />
      <Hero />
      <StoryPreview />
      <Schedule />
      <VenueDetails />
      <Quote />
      <QuickLinks />
      <RSVPBanner />
      <div className="bg-dark h-15">
      </div>
    </div>
  );
}
