
import { type Metadata } from 'next';
import { HeartAttackPredictionClient } from '@/components/heart-attack-prediction-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Heart Attack Prediction Tool | AI Toolkit Pro',
  description: 'An AI-powered tool to predict the likelihood of a heart attack based on health data. For informational purposes only.',
};

const benefits = [
    "Explore how different health factors can influence risk.",
    "Raise awareness of key cardiovascular health indicators.",
    "For educational and informational purposes only.",
    "Not a substitute for professional medical advice."
];

export default function HeartAttackPredictionPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                Heart Attack Prediction
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                This tool uses AI to estimate the likelihood of a heart attack based on various health metrics.
              </p>
            </div>
            
            <Alert variant="destructive" className="mt-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Medical Disclaimer</AlertTitle>
              <AlertDescription>
                This tool is for informational and educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </AlertDescription>
            </Alert>

            <div className="mt-8">
                <HeartAttackPredictionClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Your Data:</strong> Input the required health metrics into the form fields.</p>
                    <p><strong>2. Get Prediction:</strong> The tool will analyze the data and provide a risk estimation.</p>
                    <p><strong>3. Disclaimer:</strong> Remember this is an educational tool, not a medical diagnosis. Consult a doctor for health concerns.</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Purpose</CardTitle>
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
  );
}
