import Terminal from "@/components/Terminal";
import StatusDot from "@/components/ui/StatusDot";
import Icon from "@/components/ui/Icon";
import { dashboardProjects, dashboardStats, heroTerminal } from "@/lib/content";

/**
 * Die grosse Glaskarte im Hero — ein abstrahiertes Projekt-Dashboard.
 *
 * Bewusst kein echtes Kundensystem, sondern ein Bild davon: die Zahlen sind
 * redaktioneller Inhalt aus lib/content.ts. Was es zeigt, entspricht dem, was
 * Nova Host verspricht — schnelle Seiten, laufende Betreuung und ein sichtbar
 * begrenztes Aenderungskontingent.
 *
 * Die Projektzeilen tragen absichtlich Branchen statt erfundener Firmennamen
 * oder Domains: das waeren Referenzen, die es nicht gibt.
 *
 * Die Karte selbst ist eine Server Component; nur die bewegten Teile
 * (Terminal, Balken) bringen Client-Code mit.
 */
export default function HeroDashboard() {
  return (
    <div className="glass glass-edge sheen relative rounded-panel p-6 max-[520px]:p-4.5">
      {/* Kopfzeile */}
      <div className="relative z-[1] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-chip bg-[linear-gradient(140deg,var(--color-nh-blue),var(--color-nh-cyan))] text-white shadow-[0_8px_20px_-10px_color-mix(in_oklab,var(--color-nh-blue)_90%,transparent)]">
            <Icon name="design" className="h-[19px] w-[19px]" />
          </span>

          <div>
            <div className="font-display text-[15px] leading-none font-bold text-nh-ink">
              Eure Website
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-nh-mute">
              nova-host · betreuung plus
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-chip border border-nh-line bg-nh-surface/70 px-3 py-1.5">
          <StatusDot />
          <span className="font-mono text-[11px] whitespace-nowrap text-nh-ok">
            live
          </span>
        </div>
      </div>

      {/* Kennzahlen */}
      <div className="relative z-[1] mt-6 grid grid-cols-4 gap-3 max-[520px]:grid-cols-2">
        {dashboardStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-card border border-nh-line bg-nh-surface/55 px-3.5 py-3"
          >
            <div className="font-mono text-[10.5px] tracking-[0.14em] text-nh-mute uppercase">
              {stat.label}
            </div>

            <div className="mt-1.5 font-display text-[21px] leading-none font-extrabold text-nh-ink">
              {stat.value}
              <span className="text-[13px] font-bold text-nh-blue">{stat.unit}</span>
            </div>

            <div
              className="meter mt-2.5"
              style={{ "--fill": stat.fill } as React.CSSProperties}
            >
              <span />
            </div>
          </div>
        ))}
      </div>

      {/* Laufende Projekte */}
      <div className="relative z-[1] mt-3 rounded-card border border-nh-line bg-nh-surface/55 p-3.5">
        <div className="mb-2.5 flex items-center justify-between font-mono text-[10.5px] tracking-[0.14em] text-nh-mute uppercase">
          <span>Projekte</span>
          <span>Stand</span>
        </div>

        <ul className="flex flex-col gap-2">
          {dashboardProjects.map((project) => (
            <li
              key={project.name}
              className="flex items-center gap-3 font-mono text-[11.5px]"
            >
              <StatusDot tone={project.done ? "ok" : "warn"} />

              <span className="min-w-0 flex-1 truncate text-nh-ink">
                {project.name}
              </span>

              <span className={project.done ? "text-nh-ok" : "text-nh-mute"}>
                {project.stage}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Kleines Terminal am Fuss der Karte */}
      <Terminal
        compact
        lines={heroTerminal}
        title="nova-cli"
        className="relative z-[1] mt-3"
      />
    </div>
  );
}
