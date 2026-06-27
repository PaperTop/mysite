import StatsDashboard from "../../components/StatsDashboard";
import { PageHero } from "../../components/ui";

export default function BrainPage() {
  return (
    <>
      <PageHero eyebrow="📊 Brain" title="North Pole Command Center" body="Every cheerful metric, tracked in real time and rendered in 3D." />
      <StatsDashboard />
    </>
  );
}
