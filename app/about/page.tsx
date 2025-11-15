"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                What color is <span className="text-cyan-400">Lowd</span>?
              </h1>
              <p className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed">
                Celebrate Julia's 40th birthday with color theory...
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <Card className="p-3 sm:p-4">
                <div className="flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:space-y-3">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-sm font-medium text-center">Upload a photo</h3>
                </div>
              </Card>

              <Card className="p-3 sm:p-4">
                <div className="flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:space-y-3">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <h3 className="text-sm font-medium text-center">Pick a color</h3>
                </div>
              </Card>

              <Card className="p-3 sm:p-4">
                <div className="flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:space-y-3">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <h3 className="text-sm font-medium text-center">Write a message</h3>
                </div>
              </Card>
            </div>

            {/*What this is about... */}
            <Card className="bg-white/[0.02]">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Background</h2>
                <div className="space-y-4 text-base opacity-80 leading-relaxed">
                  <p>
                    A recent <a href="https://onlinelibrary.wiley.com/doi/10.1111/cogs.70083" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">cognitive science experiment</a> asked people about their association of abstract concepts and colors: What color is anger? What color is math? What color is gricker? (a made up word) What color is loud?
                  </p>
                  <p>
                    The same questions were also posed to large language models (LLMs). The goal of this research is to understand whether interpreting color requires <strong>embodied</strong> sensory experience or if it's just a matter of <strong>statistical</strong> patterns learned from language.
                  </p>
                  <p>
                    In short, <strong>statistical</strong> inference gets you surprisingly far in teaching machines how abstract concepts are related to colors (e.g. anger = red). But the statistical approach is limited when a machine encounters something truly novel or highly abstract (e.g. made up words, or an ineffable woman named Julia).
                  </p>
                  <p>
                    With these results, one could argue that <strong>embodied</strong> experience remains a unique aspect of human cognition. It is what allows us to relate to one another culturally and aesthetically in ways that transcend learned patterns from language.
                  </p>
                  <p>
                    If you occupy a certain corner of the internet that cares about studies like this you could not escape the question "What color is loud?" over the past month. And that is how we got here. We occupy a corner of the internet that wants to share our embodied experience of this delightful human being named Julia Lowd.
                  </p>
                  <p className="font-medium">
                    So the ask is abstract but it is also simple: What color is Lowd?
                  </p>
                  <p>
                    Click the link below - choose a color that represents your particular experience of Julia Lowd and add a birthday message. You can also check back here and see how much we all agree.
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center pt-6">
              <Link href="/">
                <Button size="lg">
                  Add your color
                  <span>→</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
