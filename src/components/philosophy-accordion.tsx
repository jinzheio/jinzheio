"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { philosophyThemes } from "@/content/philosophy";

export function PhilosophyAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {philosophyThemes.map((theme) => (
        <AccordionItem key={theme.id} value={theme.id}>
          <AccordionTrigger className="text-left font-display text-lg text-graphite">
            {theme.title}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 text-sm text-muted-foreground">
            <p>{theme.summary}</p>
            <ul className="space-y-2">
              {theme.questions.map((question) => (
                <li key={question} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-brand" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
