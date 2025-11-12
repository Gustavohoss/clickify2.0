'use server';

/**
 * @fileOverview Genkit flow for generating a basic marketing funnel with a landing page and email sequence.
 *
 * - createMarketingFunnel - A function that handles the marketing funnel creation process.
 * - CreateMarketingFunnelInput - The input type for the createMarketingFunnel function.
 * - CreateMarketingFunnelOutput - The return type for the createMarketingFunnel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateMarketingFunnelInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('A brief description of the product.'),
  targetAudience: z.string().describe('The target audience for the product.'),
});
export type CreateMarketingFunnelInput = z.infer<typeof CreateMarketingFunnelInputSchema>;

const CreateMarketingFunnelOutputSchema = z.object({
  landingPageContent: z.string().describe('The generated HTML content for the landing page.'),
  emailSequence: z.string().describe('The generated email sequence for the marketing funnel.'),
});
export type CreateMarketingFunnelOutput = z.infer<typeof CreateMarketingFunnelOutputSchema>;

export async function createMarketingFunnel(input: CreateMarketingFunnelInput): Promise<CreateMarketingFunnelOutput> {
  return createMarketingFunnelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createMarketingFunnelPrompt',
  input: {schema: CreateMarketingFunnelInputSchema},
  output: {schema: CreateMarketingFunnelOutputSchema},
  prompt: `You are an expert marketing funnel creator.

You will generate a landing page and an email sequence for the following product:

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}
Target Audience: {{{targetAudience}}}

Generate an HTML landing page designed to capture leads. Include a compelling headline, a brief description of the product, and a signup form. The landing page should be modern, clean and trustworthy.

Also generate a sequence of 3 emails designed to nurture leads and drive sales. The emails should:

*   Introduce the product and its benefits
*   Address common objections
*   Offer a special promotion or discount

Ensure the landing page content and email sequence are tailored to the target audience and product description. Make the email sequence conversational and engaging.

Output the landing page and email sequence in a clear and well-structured format.

{
  "landingPageContent": "...",
  "emailSequence": "..."
}
`,
});

const createMarketingFunnelFlow = ai.defineFlow(
  {
    name: 'createMarketingFunnelFlow',
    inputSchema: CreateMarketingFunnelInputSchema,
    outputSchema: CreateMarketingFunnelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
