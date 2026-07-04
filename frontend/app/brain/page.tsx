import StatsDashboard from "../../components/StatsDashboard";
import { JournalPreview } from "../../components/brain/JournalPreview";
import { PageHero } from "../../components/ui";

export default function BrainPage() {
  return (
    <>
      <PageHero eyebrow="📊 Brain" title="Personal State Dashboard" body="A compact read on health, work, poker, and recovery signals." />
      <StatsDashboard />
      <JournalPreview />
    </>
  );
}
