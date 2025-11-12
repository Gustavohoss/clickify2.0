'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating TikTok content ideas, scripts, and a posting schedule.
 *
 * - generateTikTokContent - A function that orchestrates the TikTok content generation process.
 * - GenerateTikTokContentInput - The input type for the generateTikTokContent function.
 * - GenerateTikTokContentOutput - The return type for the generateTikTokContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTikTokContentInputSchema = z.object({
  topic: z.string().describe('The main topic for the TikTok content.'),
  targetAudience: z.string().describe('Description of the target audience for the TikTok content.'),
  numberOfVideos: z.number().min(1).max(10).default(7).describe('The number of TikTok videos to generate content for (up to 10).'),
});
export type GenerateTikTokContentInput = z.infer<typeof GenerateTikTokContentInputSchema>;

const GenerateTikTokContentOutputSchema = z.object({
  profileBio: z.string().describe('A suggested bio for the TikTok profile.'),
  videoIdeas: z.array(
    z.object({
      title: z.string().describe('A title for the TikTok video.'),
      script: z.string().describe('A script for the TikTok video.'),
      postingSchedule: z.string().describe('Suggested date and time to post the TikTok video.'),
    })
  ).describe('A list of TikTok video ideas, scripts, and posting schedule.'),
});
export type GenerateTikTokContentOutput = z.infer<typeof GenerateTikTokContentOutputSchema>;

export async function generateTikTokContent(input: GenerateTikTokContentInput): Promise<GenerateTikTokContentOutput> {
  return generateTikTokContentFlow(input);
}

const generateTikTokContentPrompt = ai.definePrompt({
  name: 'generateTikTokContentPrompt',
  input: {schema: GenerateTikTokContentInputSchema},
  output: {schema: GenerateTikTokContentOutputSchema},
  prompt: `You are a TikTok content creation expert. Your goal is to generate engaging TikTok content for the user.

  The user will provide you with a topic and target audience. You will generate a TikTok profile bio and a list of TikTok video ideas, scripts, and a posting schedule.

  Topic: {{{topic}}}
  Target Audience: {{{targetAudience}}}
  Number of Videos: {{{numberOfVideos}}}

  Here is the output:
  Profile Bio: A captivating TikTok profile bio tailored to the specified topic and target audience.
  Video Ideas: A list of {{numberOfVideos}} TikTok video ideas, each including:
  - Title: A catchy title for the video.
  - Script: A short and engaging script for the video.
  - Posting Schedule: A suggested date and time to post the video for maximum engagement.
  `,
});

const generateTikTokContentFlow = ai.defineFlow(
  {
    name: 'generateTikTokContentFlow',
    inputSchema: GenerateTikTokContentInputSchema,
    outputSchema: GenerateTikTokContentOutputSchema,
  },
  async input => {
    const {output} = await generateTikTokContentPrompt(input);
    return output!;
  }
);
