import { supabase } from "./supabase";
import { PortfolioContent } from "./types";
import {
  profile,
  aboutTags,
  techCards,
  experience,
  education,
  projects,
  achievements,
} from "./data";

export const fallbackContent: PortfolioContent = {
  profile: {
    ...profile,
    aboutParagraphs: [
      "I'm a B.Com (Finance) graduate and CFA Level I candidate based in Bengaluru, building toward a career in investment banking — specifically M&A advisory.",
      "I currently work at SPAN.IO Technology India Pvt. Ltd., a US-based R&D firm, where I prepare financial statements across Ind AS and US GAAP, manage cross-currency reporting from INR to USD, and built a Python-automated GST reconciliation workflow from scratch. It's hands-on, deadline-driven work that has sharpened both my technical accuracy and my ability to communicate financial data clearly to senior stakeholders.",
      "Outside the internship, I independently track India's M&A landscape — maintaining a structured deal database, writing strategic deal rationale, and analysing transaction trends across sectors. It's my way of thinking like a banker before I become one.",
      "I'm drawn to M&A because the work sits at the intersection of strategy and valuation — understanding why a deal gets done, whether the price makes sense, and what it signals about a sector is the kind of problem I want to spend my career solving."
    ]
  },
  aboutTags,
  techCards,
  experience: experience as any,
  education: education as any,
  projects: projects as any,
  achievements,
};

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return fallbackContent;
    }
    const { data, error } = await supabase
      .from("portfolio")
      .select("content")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Supabase read error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return fallbackContent;
    }

    if (data && data.content) {
      // Merge fallback content to ensure any newly added structure properties exist
      return {
        ...fallbackContent,
        ...data.content,
      } as PortfolioContent;
    }
  } catch (err) {
    console.error("Database error in getPortfolioContent:", err);
  }
  return fallbackContent;
}

export async function updatePortfolioContent(newContent: PortfolioContent): Promise<boolean> {
  try {
    const { data: existing, error: selectError } = await supabase
      .from("portfolio")
      .select("id")
      .limit(1)
      .maybeSingle();

    const record = {
      content: newContent,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (existing && existing.id) {
      const { error: updateError } = await supabase
        .from("portfolio")
        .update(record)
        .eq("id", existing.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("portfolio")
        .insert([record]);
      error = insertError;
    }

    if (error) {
      console.error("Supabase write error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Database error in updatePortfolioContent:", err);
    return false;
  }
}
