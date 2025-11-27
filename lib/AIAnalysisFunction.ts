'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
if (!apiKey) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function getAiAnalysis(data: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
      Tu es un consultant expert en gestion financière personnelle et optimisation budgétaire.
      Les données suivantes représentent les dépenses par catégorie sur une période donnée :

      Données : ${JSON.stringify(data)}

      Ta mission est de fournir une analyse claire, concise et orientée action pour un utilisateur non technicien.

      Tâches :
      1. Identifie les catégories où l’utilisateur dépense le plus et explique pourquoi ces montants peuvent être élevés (habitudes, besoins essentiels, achats impulsifs, récurrence, inflation, etc.).
      2. Repère les catégories où les dépenses sont faibles et propose des explications possibles (catégorie peu utilisée, dépenses reportées, optimisation naturelle, budget maîtrisé, etc.).
      3. Donne des recommandations concrètes pour réduire les dépenses élevées :
        - ajustements simples du comportement,
        - limites budgétaires personnalisées,
        - alternatives moins coûteuses,
        - suppression d’achats non essentiels.
      4. Propose des conseils pratiques pour optimiser les catégories déjà maîtrisées (suivi mensuel, maintien d’habitudes efficaces, objectifs d’économie).
      5. Si les données sont vides, analyse la situation (ex : aucune dépense enregistrée, problème de saisie, période anormale) et propose des actions pour améliorer le suivi.
      6. Sois concis (moins de 100 mots), percutant, professionnel et pragmatique.

      Donne directement ton analyse, sans salutation, sans transition, sans titre, et assure-toi que le lecteur ressente immédiatement la valeur de tes conseils.
      La devise est le FCFA.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}