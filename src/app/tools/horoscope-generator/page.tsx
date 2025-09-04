
import { type Metadata } from 'next';
import { HoroscopeGeneratorClient } from '@/components/horoscope-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Horoscope Generator | Daily, Weekly, Monthly',
  description: 'Get your free, personalized horoscope for any zodiac sign. Our AI generates daily, weekly, and monthly predictions for love, career, and health.',
};

const benefits = [
    "Get personalized daily, weekly, and monthly insights.",
    "Plan your future with predictions for love, career, and health.",
    "Discover your lucky numbers and colors.",
    "Available in multiple languages for a global audience."
];

export default function HoroscopeGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Horoscope Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Select your zodiac sign and timeframe to receive a personalized reading from our <strong>AI horoscope generator</strong>. This tool provides insightful predictions for love, career, and health, along with your lucky numbers and colors. As the <strong>best horoscope generator</strong>, it offers a fun and engaging way to explore your astrological forecast. Use our <strong>free horoscope generator</strong> to get your daily, weekly, or monthly reading in seconds.
                </p>
              </div>

              <div className="mt-8">
                  <HoroscopeGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Select Your Sign:</strong> Choose your zodiac sign from the list.</p>
                      <p><strong>2. Choose Timeframe:</strong> Select whether you want a daily, weekly, or monthly horoscope.</p>
                      <p><strong>3. Select Language:</strong> Pick your preferred language.</p>
                      <p><strong>4. Generate:</strong> Click the "Generate Horoscope" button to get your personalized reading.</p>
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
                <h2>Explore Your Future with an AI Horoscope Generator</h2>
                <p>Astrology has been a source of fascination and guidance for centuries. An <strong>AI horoscope generator</strong> brings this ancient practice into the digital age, offering personalized and insightful readings at the click of a button. Our platform provides a powerful <strong>daily horoscope generator</strong> that can give you a glimpse into your day ahead, covering everything from love and career to health and wellness. It's a fun and engaging way to start your day with a positive outlook.</p>
                <p>Our tool is designed to be the <strong>best horoscope generator</strong> by offering a comprehensive and user-friendly experience. The <strong>free horoscope generator</strong> is accessible to everyone, allowing you to explore your astrological forecast without any cost. Simply select your zodiac sign and desired timeframe, and our <strong>horoscope writer</strong> will provide you with a detailed and personalized reading. It’s a great way to gain a new perspective on your life and the opportunities that lie ahead.</p>
                
                <h3>Your Personalized Astrological Forecast</h3>
                <p>The <strong>AI astrology</strong> technology behind our tool is designed to provide you with accurate and insightful predictions. It analyzes the positions of the stars and planets to generate a horoscope that is unique to your zodiac sign. This makes it a reliable <strong>horoscope content generator</strong> for anyone who is interested in astrology. The <strong>AI generated horoscope</strong> is written in a clear and easy-to-understand language, so you don't need to be an expert to benefit from its wisdom.</p>
                <p>Whether you're looking for your <strong>daily horoscope</strong>, your <strong>weekly horoscope</strong>, or your <strong>monthly horoscope</strong>, our tool has you covered. It's a versatile <strong>zodiac sign generator</strong> that can provide you with a wealth of information about your personality, strengths, and challenges. Stop wondering what the stars have in store for you and start exploring your future with our <strong>free horoscope reading</strong>. Try our <strong>AI horoscope generator</strong> today and unlock the secrets of the cosmos.</p>
            </div>
        </div>
      </section>
    </>
  );
}
