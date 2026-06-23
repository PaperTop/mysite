import StatsDashboard from "../components/StatsDashboard";
import { PageHero } from "../components/portfolio";

export default function StatsPage() {
  return (
    <>
      <PageHero eyebrow="📊 Live" title="North Pole Command Center" body="The brain of the operation — every cheerful metric, tracked in real time and rendered in 3D." />
      <StatsDashboard />
    </>
  );
}
