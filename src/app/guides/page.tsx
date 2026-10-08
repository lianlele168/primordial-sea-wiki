import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Guide corrections — Primordial Sea",
  description: "Review status of this older reference page.",
  alternates: { canonical: "/guides/" },
  robots: { index: false, follow: true },
};
export default function ReviewPage() {
  return <section className="page-section"><div className="page-shell article-body"><h1>Guide corrections</h1><p>The earlier guides page included precise countdown timings, undocumented hazard behavior and guaranteed optimal trajectories. We could not support those claims with the evidence available in this review, so that material has been withdrawn.</p><h2>Current status</h2><p>This page does not claim a complete walkthrough or calculate documented game rewards. This URL records the correction for returning readers. The supported binary-merge tool is available at /merge-planner/.</p><p>Use the <a href="https://float-u-space.itch.io/primordial-sea">official developer page</a> for the current game and published instructions.</p></div></section>;
}
