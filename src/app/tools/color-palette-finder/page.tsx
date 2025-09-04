
import { type Metadata } from 'next';
import { ColorPaletteFinderClient } from '@/components/color-palette-finder-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free AI Color Palette Finder | Generate Color Schemes Instantly',
  description: 'Generate beautiful and harmonious color palettes from a text description. Get matching color schemes for your designs, websites, or brand in any language.',
};

const benefits = [
    "Discover unique color schemes in seconds.",
    "Ensure your colors are harmonious and balanced.",
    "Get palettes for any style: modern, vintage, or vibrant.",
    "Instantly copy HEX codes for use in any design tool."
];

export default function ColorPaletteFinderPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Color Palette Finder
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Describe your idea, and let our <strong>AI color palette finder</strong> generate the perfect color scheme. This <strong>AI color palette generator</strong> is an ideal tool for designers, marketers, and creators looking for harmonious colors. As the <strong>best color palette generator</strong>, it offers a wide range of options to suit any project. Use our <strong>color scheme generator</strong> to create beautiful and effective color combinations for your brand, website, or creative work.
                </p>
              </div>

              <div className="mt-8">
                  <ColorPaletteFinderClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Describe Your Vision:</strong> Enter a description of the mood, style, or theme you want (e.g., "a serene beach at sunset").</p>
                      <p><strong>2. Choose Palette Type:</strong> Select a color theory model like Complementary or Analogous.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Palettes" button to see the AI's suggestions.</p>
                      <p><strong>4. Copy & Use:</strong> Click on a color's HEX code to copy it to your clipboard.</p>
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
                <h2>Find the Perfect Colors with an AI Color Palette Finder</h2>
                <p>Color is a powerful tool in design, capable of evoking emotions and conveying messages. However, finding the right color combination can be a challenging task. An <strong>AI color palette finder</strong> is a revolutionary tool that simplifies this process. Our platform offers a powerful <strong>AI color palette generator</strong> that can create beautiful and harmonious color schemes from a simple text description. It's the perfect tool for designers, artists, and anyone who wants to create visually appealing projects. For a deep dive into color theory, check out <a href="https://www.colormatters.com/color-and-design/basic-color-theory" target="_blank" rel="noopener noreferrer">ColorMatters</a>.</p>
                <p>Our tool is designed to be the <strong>best color palette generator</strong> by offering a wide range of options and a user-friendly interface. The <strong>color scheme generator</strong> can create palettes based on different color theories, such as complementary, analogous, and triadic. This ensures that the colors you choose are not only beautiful but also harmonious. The <strong>free color palette generator</strong> is accessible to everyone, making professional color design available to all. Once you have your palette, create a matching <Link href="/tools/ai-logo-maker">logo</Link> for your brand.</p>

                <h3>From Idea to Color Palette in Seconds</h3>
                <p>Using our <strong>AI color scheme generator</strong> is easy. Simply describe the mood, style, or theme you're going for, and the AI will generate a selection of palettes that match your vision. This makes it an invaluable <strong>website color scheme generator</strong> for web designers who need to create a cohesive look and feel for their sites. The <strong>color palette generator from image</strong> feature also allows you to upload a photo and extract a color palette from it, which is perfect for creating designs that match a specific visual.</p>
                <p>Whether you're working on a branding project, a website design, or a piece of art, our <strong>random color palette generator</strong> can provide you with endless inspiration. It's a versatile <strong>brand color palette generator</strong> that can help you create a strong and memorable brand identity. Stop spending hours trying to find the perfect colors and start using the power of AI. Try our <strong>color palette generator free</strong> tool today and discover a world of color possibilities.</p>
            </div>
        </div>
      </section>
    </>
  );
}
