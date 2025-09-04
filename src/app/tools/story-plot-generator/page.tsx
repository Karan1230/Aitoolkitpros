
import { type Metadata } from 'next';
import { StoryPlotGeneratorClient } from '@/components/story-plot-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Story Plot Generator | Create Unique Story Ideas',
  description: 'Generate endless story plots with our free AI tool. Get unique ideas with characters, settings, conflicts, and resolutions for any genre.',
};

const benefits = [
    "Overcome writer's block with endless inspiration.",
    "Develop complex characters and settings effortlessly.",
    "Structure your narrative with a clear plot outline.",
    "Explore different genres and story angles."
];

export default function StoryPlotGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Story Plot Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Never stare at a blank page again with our <strong>AI story plot generator</strong>. Generate unique story ideas, complete with characters, settings, conflict, and resolution for any genre to kickstart your writing. This <strong>AI story generator</strong> is the perfect tool for writers of all levels. As the <strong>best AI story generator</strong>, it provides endless inspiration. Use our <strong>free AI story generator</strong> to craft your next masterpiece.
                </p>
              </div>

              <div className="mt-8">
                  <StoryPlotGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Choose a Genre:</strong> Select the genre that fits your story.</p>
                      <p><strong>2. Select Plot Detail:</strong> Choose how detailed you want the plot to be.</p>
                      <p><strong>3. (Optional) Add Details:</strong> Specify characters, setting, or a theme to guide the AI.</p>
                      <p><strong>4. Generate:</strong> Click the "Generate Plot" button and watch your story come to life.</p>
                  </CardContent>
              </Card>

               <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                      {benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                              <span>{benefit}</span>
                          </div>
                      ))}
                  </CardContent>
              </Card>
          </div>
        </div>
      </div>
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Conquer Writer's Block with an AI Story Plot Generator</h2>
                <p>Every writer knows the feeling of staring at a blank page, waiting for inspiration to strike. An <strong>AI story plot generator</strong> is a powerful tool that can help you overcome writer's block and generate a wealth of creative ideas. Our platform offers a sophisticated <strong>AI story generator</strong> that can create unique plots, characters, and settings for any genre. It's the perfect companion for novelists, screenwriters, and anyone who loves to tell stories.</p>
                <p>Our tool is designed to be the <strong>best AI story generator</strong> by providing detailed and imaginative story elements. The <strong>free AI story generator</strong> is easy to use; simply choose a genre, and the AI will do the rest. This makes it an invaluable <strong>AI story writer</strong> for authors who need a creative spark to get started. The <strong>AI generated stories</strong> are not just random collections of ideas; they are coherent and well-structured narratives that can serve as the foundation for your next masterpiece.</p>
                
                <h3>From a Single Prompt to a Complete Story</h3>
                <p>The <strong>AI story generator from prompt</strong> feature allows you to guide the creative process. You can provide a simple idea or a detailed outline, and the AI will build a story around it. This makes it a versatile <strong>AI short story generator</strong> for creating everything from flash fiction to novellas. The <strong>random story generator</strong> is perfect for when you want to be surprised with a completely new and unexpected idea. Our <strong>AI story creator</strong> is a fun and engaging way to explore your creativity.</p>
                <p>Whether you're writing a fantasy epic, a thrilling mystery, or a heartwarming romance, our <strong>AI novel generator</strong> can help you craft a compelling narrative. It's a powerful <strong>plot generator</strong> that can save you hours of brainstorming and outlining. Stop waiting for your muse and start creating your own inspiration with the power of AI. Try our <strong>best AI story generator free</strong> tool today and unlock your storytelling potential.</p>
            </div>
        </div>
      </section>
    </>
  );
}
