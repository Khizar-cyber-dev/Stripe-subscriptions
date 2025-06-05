import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";

export default async function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Pricing />
      </div>
    </main>
  );
}
