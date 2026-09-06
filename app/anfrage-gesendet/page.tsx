import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CONFIRMATION_COOKIE } from "@/lib/confirmation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Anfrage gesendet",
  description: "Ihre Anfrage ist bei uns eingegangen.",
  // Eine Bestätigungsseite gehört nicht in den Suchindex: sie ergibt ohne
  // vorherige Anfrage keinen Sinn und würde die Startseite nur verwässern.
  robots: { index: false, follow: false },
};

/** Die Seite hängt vom Kennzeichen ab und darf deshalb nicht vorgerendert werden. */
export const dynamic = "force-dynamic";

const STEPS = [
  {
    num: "01",
    title: "Wir prüfen Ihre Angaben",
    body: "Noch heute oder am nächsten Werktag. Bei einer Website-Analyse schauen wir uns Ihre Seite dabei persönlich an.",
  },
  {
    num: "02",
    title: "Sie hören von uns",
    body: "Innerhalb von zwei Werktagen melden wir uns per E-Mail mit einer ersten Einschätzung und einem Terminvorschlag.",
  },
  {
    num: "03",
    title: "Kostenloses Erstgespräch",
    body: "Rund dreißig Minuten, ohne Verpflichtung. Danach wissen Sie, was Ihre Website braucht und was sie kostet.",
  },
];

export default async function AnfrageGesendetPage() {
  const cookie = (await cookies()).get(CONFIRMATION_COOKIE);

  // Ohne abgeschickte Anfrage gibt es hier nichts zu sehen.
  if (!cookie) redirect("/");

  const istAnalyse = cookie.value === "analyse";

  return (
    <div className="confirm shell">
      <p className="pixel confirm__label">
        <span className="chip__dot" aria-hidden="true" />
        {istAnalyse ? "ANALYSE ANGEFORDERT" : "ANFRAGE EINGEGANGEN"}
      </p>

      <h1 className="confirm__title display">
        DANKE.
        <br />
        <span className="accent">WIR MELDEN UNS.</span>
      </h1>

      <p className="lead confirm__lead">
        {istAnalyse
          ? "Ihre Website-Analyse ist bei uns angekommen. Wir sehen uns Ihre Seite an und melden uns mit einer konkreten Einschätzung - ohne automatisiertes Standard-PDF."
          : "Ihre Anfrage ist bei uns angekommen. Wir sehen sie uns an und melden uns mit einer ersten Einschätzung zu Ihrem Vorhaben."}
      </p>

      <ol className="confirm__steps">
        {STEPS.map((step) => (
          <li className="confirm__step" key={step.num}>
            <span className="confirm__num pixel">{step.num}</span>
            <h2 className="confirm__step-title h3">{step.title}</h2>
            <p className="confirm__step-body">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="confirm__foot">
        <p className="copy">
          Bis dahin: Schauen Sie sich in Ruhe um. Alle Preise und Leistungen stehen offen auf der
          Startseite.
          {site.email ? (
            <>
              {" "}
              Etwas vergessen? Schreiben Sie uns einfach an{" "}
              <a href={`mailto:${site.email}`} className="tlink accent">
                {site.email}
              </a>
              .
            </>
          ) : null}
        </p>

        <div className="btn-row">
          <Link href="/" className="btn btn--primary" data-cursor="LOS">
            <span className="btn__label">Zurück zur Startseite</span>
            <span className="btn__arrow" aria-hidden="true">
              &#8599;
            </span>
          </Link>
          <Link href="/#preise" className="btn btn--ghost">
            <span className="btn__label">Preise ansehen</span>
            <span className="btn__arrow" aria-hidden="true">
              &#8599;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
