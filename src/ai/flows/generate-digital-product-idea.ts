'use server';

/**
 * @fileOverview Generates a digital product idea with a basic structure using AI.
 *
 * - generateDigitalProductIdea - A function that generates a digital product idea.
 * - GenerateDigitalProductIdeaInput - The input type for the generateDigitalProductIdea function.
 * - GenerateDigitalProductIdeaOutput - The return type for the generateDigitalProductIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDigitalProductIdeaInputSchema = z.object({
  userProfile: z.string().describe('Description of the user profile and their interests.'),
  niche: z.string().describe('The specific niche or area of interest for the product.'),
});
export type GenerateDigitalProductIdeaInput = z.infer<typeof GenerateDigitalProductIdeaInputSchema>;

const GenerateDigitalProductIdeaOutputSchema = z.object({
  productName: z.string().describe('The name of the digital product.'),
  productDescription: z.string().describe('A detailed description of the digital product.'),
  suggestedStructure: z
    .string()
    .describe('A suggested basic structure or outline for the product.'),
});
export type GenerateDigitalProductIdeaOutput = z.infer<typeof GenerateDigitalProductIdeaOutputSchema>;

export async function generateDigitalProductIdea(
  input: GenerateDigitalProductIdeaInput
): Promise<GenerateDigitalProductIdeaOutput> {
  return generateDigitalProductIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDigitalProductIdeaPrompt',
  input: {schema: GenerateDigitalProductIdeaInputSchema},
  output: {schema: GenerateDigitalProductIdeaOutputSchema},
  prompt: `You are an AI assistant designed to help users generate digital product ideas.

  Based on the user profile and niche provided, suggest a digital product idea with a basic structure.

  User Profile: {{{userProfile}}}
  Niche: {{{niche}}}

  Consider the following when generating the idea:
  - Practicality: The idea should be easy to implement and launch.
  - Target Audience: The product should cater to beginners in the specified niche.

  Format your response as follows:
  Product Name: [Product Name]
  Product Description: [Detailed Description]
  Suggested Structure: [Basic Structure or Outline]
  `,
});

const generateDigitalProductIdeaFlow = ai.defineFlow(
  {
    name: 'generateDigitalProductIdeaFlow',
    inputSchema: GenerateDigitalProductIdeaInputSchema,
    outputSchema: GenerateDigitalProductIdeaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
