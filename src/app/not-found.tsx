import Link from "next/link";
import { ArrowLeft, Orbit } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[65vh] place-items-center px-4 text-center">
      <div>
        <Orbit className="mx-auto h-10 w-10 text-tide-300" />
        <p className="eyebrow mt-5">Lost orbit</p>
        <h1 className="mt-3 font-display text-5xl font-bold text-white">This page has not formed yet.</h1>
        <p className="mx-auto mt-4 max-w-lg text-slate-400">Return to the normal evolution chain and choose another guide route.</p>
        <Link href="/" className="btn-primary mt-7"><ArrowLeft className="h-4 w-4" />Back home</Link>
      </div>
    </section>
  );
}
