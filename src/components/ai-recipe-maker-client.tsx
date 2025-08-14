"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiRecipeMaker } from '@/ai/flows/ai-recipe-maker';
import type { AiRecipeMakerOutput } from '@/ai/flows/ai-recipe-maker';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, ChefHat, UtensilsCrossed, Salad, Soup } from 'lucide-react';

const cuisines = ["Any", "Italian", "Mexican", "Indian", "Chinese", "Japanese", "Thai", "Mediterranean", "French", "American"];
const mealTypes = ["Any", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const dietaryPreferences = ["None", "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Low-Carb"];

const formSchema = z.object({
  ingredients: z.string().min(3, 'Please list at least one ingredient.'),
  cuisine: z.string().min(1, 'Please select a cuisine type.'),
  mealType: z.string().min(1, 'Please select a meal type.'),
  dietaryPreference: z.string().min(1, 'Please select a dietary preference.'),
  language: z.string().min(1, 'Please select a language.'),
});

type Recipe = AiRecipeMakerOutput['recipes'][0];

export function AiRecipeMakerClient() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: '',
      cuisine: 'Any',
      mealType: 'Any',
      dietaryPreference: 'None',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecipes(null);

    try {
      const result = await aiRecipeMaker(values);
      setRecipes(result.recipes);
    } catch (error) {
      console.error('Recipe generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate recipes. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatRecipeForAction = (recipe: Recipe) => {
    let text = `Title: ${recipe.title}\n`;
    text += `Description: ${recipe.description}\n`;
    text += `Cooking Time: ${recipe.cookingTime}\n`;
    text += `Servings: ${recipe.servingSize}\n\n`;
    text += `Ingredients:\n${recipe.ingredients.join('\n')}\n\n`;
    text += `Instructions:\n${recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n`;
    if (recipe.tips && recipe.tips.length > 0) {
      text += `Tips:\n${recipe.tips.join('\n')}\n`;
    }
    return text;
  };

  const copyToClipboard = (recipe: Recipe) => {
    const text = formatRecipeForAction(recipe);
    navigator.clipboard.writeText(text);
    toast({ title: "Recipe copied to clipboard!" });
  };
  
  const downloadRecipe = (recipe: Recipe) => {
    const text = formatRecipeForAction(recipe);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.title.toLowerCase().replace(/\s/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Recipe downloaded!" });
    };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Available Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., chicken breast, rice, broccoli, soy sauce"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <FormField
                    control={form.control}
                    name="cuisine"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Cuisine</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <UtensilsCrossed className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select cuisine" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {cuisines.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mealType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Meal Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Soup className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select meal type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {mealTypes.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="dietaryPreference"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Dietary Preference</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Salad className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {dietaryPreferences.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Languages className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {languages.map(lang => <SelectItem key={lang.value} value={lang.name}>{lang.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating Recipes...' : 'Generate Recipes'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is cooking up some ideas...
           </div>
        )}

        {recipes && (
          <div className="mt-6 space-y-4">
             <h3 className="text-xl font-headline flex items-center gap-2"><ChefHat />Generated Recipes</h3>
            {recipes.map((recipe, index) => (
              <Card key={index} className="bg-muted/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{recipe.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{recipe.description}</p>
                    </div>
                     <div className="flex gap-2 flex-shrink-0">
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(recipe)}><Copy className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" onClick={() => downloadRecipe(recipe)}><Download className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex gap-4 text-sm text-muted-foreground">
                        <span><strong>Time:</strong> {recipe.cookingTime}</span>
                        <span><strong>Serves:</strong> {recipe.servingSize}</span>
                   </div>
                   <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2">Ingredients</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-2">Instructions</h4>
                            <ol className="list-decimal list-inside space-y-2 text-sm">
                                {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                            </ol>
                        </div>
                   </div>
                   {recipe.tips && recipe.tips.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2">Tips</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {recipe.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                            </ul>
                        </div>
                   )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
