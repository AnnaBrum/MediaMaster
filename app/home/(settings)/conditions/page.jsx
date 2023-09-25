"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./conditions.module.css";


export default function Conditions() {
  const supabase = createClientComponentClient();

  return (
    <div className={styles.wrapper}>
      <h1 className="text-xl">Villkor och sekretess</h1>
      <div className="conditionsIntro">
        <p>Din Integritet är Vår Prioritet. GDPR och WCAG-Överensstämmelse:</p>
        <p>
          I vår strävan efter att säkerställa din integritet och tillgänglighet
          i digitala tjänster har vi utformat vår app med full respekt för både
          EU:s dataskyddsförordning (GDPR) och Web Content Accessibility
          Guidelines (WCAG). Ditt förtroende och rättigheter är av högsta vikt
          för oss. GDPR-Överensstämmelse:
        </p>
        <p>
          Vi tar ansvar för att skydda dina personliga uppgifter. När du
          använder vår app samlar vi in, behandlar och lagrar endast nödvändig
          information i enlighet med GDPR. Här är några sätt vi följer GDPR:
        </p>
      </div>
      <ol>
        <li>
          Samtycke: Vi respekterar ditt samtycke. Innan vi samlar in eller
          behandlar någon personlig information kommer du att tydligt ombedjas
          att ge ditt medgivande. Detta sker enkelt genom att klicka på en knapp
          som anger att du godkänner vår dataskyddspolicy.
        </li>
        <li>
          Transparens: Vi är transparenta om vilka data vi samlar in, varför vi
          samlar in dem och hur de kommer att användas. Du kan när som helst få
          tillgång till dina uppgifter och ändra eller ta bort dem enligt
          GDPR-kraven.
        </li>
        <li>
          Säkerhet: Vi har implementerat starka säkerhetsåtgärder för att skydda
          dina personuppgifter mot obehörig åtkomst, förlust eller stöld.
        </li>
        <li>
          Dataportabilitet: Enligt GDPR har du rätt att få dina uppgifter i ett
          strukturerat, allmänt användbart och maskinläsbart format. Om du
          önskar detta, vänligen kontakta vår support.
        </li>
      </ol>

      <p>
        WCAG-Överensstämmelse: Vi strävar efter att göra vår app tillgänglig för
        alla användare, oavsett eventuella funktionshinder. Vi följer
        WCAG-riktlinjer för att säkerställa webbplatsens tillgänglighet:
      </p>
      <ol>
        <li>
          Användarvänlig design: Vi har utformat vår app med användbarhet i
          åtanke. Vår layout och navigering är enkla och logiska för att hjälpa
          alla användare att enkelt komma åt våra tjänster.{" "}
        </li>
        <li>
          Alternativa texter: Vi inkluderar alternativa texter för alla
          icke-dekorativa bilder för att hjälpa personer med synnedsättning att
          förstå innehållet.
        </li>
        <li>
          Text till tal (TTS): Vi stödjer text till tal-funktioner för att
          hjälpa användare med synnedsättning att lyssna på innehållet.
          Tangentbordsnavigering: Du kan använda tangentbordet för att navigera
          genom appen, vilket är avgörande för personer med motoriska
          funktionshinder.
        </li>
        <li>
          Kontrast och textstorlek: Vi har optimerat färgkontraster och
          möjliggjort textstorleksjusteringar för att passa individuella behov.
        </li>
      </ol>
      <p>
        Vi är stolta över att följa dessa riktlinjer för att säkerställa att vår
        app är användbar för alla användare, och vi arbetar kontinuerligt för
        att förbättra och upprätthålla vår överensstämmelse med GDPR och WCAG.
        Genom att klicka på "Godkänn" nedan ger du ditt samtycke till vår
        dataskyddspolicy och förstår att vi värnar om både din integritet och
        din användarupplevelse. Tack för att du väljer vår app, och om du har
        några frågor eller önskar mer information, är du välkommen att kontakta
        vår support.
      </p>
    </div>
  );
}
