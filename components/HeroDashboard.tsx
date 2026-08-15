import Terminal from "@/components/Terminal";
import StatusDot from "@/components/ui/StatusDot";
import Icon from "@/components/ui/Icon";
import { dashboardServices, dashboardStats, heroTerminal } from "@/lib/content";

/**
 * Die grosse Glaskarte im Hero — ein abstrahiertes Infrastruktur-Dashboard.
 *
 * Bewusst kein echtes Monitoring, sondern ein Bild davon: die Zahlen sind
 * redaktioneller Inhalt aus lib/content.ts. Was es zeigt, entspricht dem, was
 * Nova Host verspricht — Standorte, Uptime, Latenz, Systemzustand.
 *
 * Die Karte selbst ist eine Server Component; nur die drei bewegten Teile
 * (Zaehler, Terminal, Auslastungsbalken) sind Client-Komponenten.
 */
export default function HeroDashboard() {
  return (
    <div className="glass glass-edge sheen relative rounded-[26px] p-6 max-[520px]:p-4.5">
      {/* Kopfzeile */}
      <div className="relative z-[1] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[11px] bg-[linear-gradient(140deg,#1a5cff,#00c2e0)] text-white shadow-[0_8px_20px_-10px_rgba(26,92,255,0.9)]">
            <Icon name="cloud" className="h-[19px] w-[19px]" />
          </span>

          <div>
            <div className="font-display text-[15px] leading-none font-bold text-nh-ink">
              Global Network
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-nh-mute">
              nova-host · eu-central
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-nh-line bg-white/70 px-3 py-1.5">
          <StatusDot />
          <span className="font-mono text-[11px] whitespace-nowrap text-nh-ok">
            operational
          </span>
        </div>
      </div>

      {/* Kennzahlen */}
      <div className="relative z-[1] mt-6 grid grid-cols-4 gap-3 max-[520px]:grid-cols-2">
        {dashboardStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[14px] border border-nh-line bg-white/55 px-3.5 py-3"
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

      {/* Systemzustand pro Knoten */}
      <div className="relative z-[1] mt-3 rounded-[14px] border border-nh-line bg-white/55 p-3.5">
        <div className="mb-2.5 flex items-center justify-between font-mono text-[10.5px] tracking-[0.14em] text-nh-mute uppercase">
          <span>Node status</span>
          <span>latency</span>
        </div>

        <ul className="flex flex-col gap-2">
          {dashboardServices.map((service, index) => (
            <li
              key={service.name}
              className="flex items-center gap-3 font-mono text-[11.5px]"
            >
              <StatusDot tone={service.status === "operational" ? "ok" : "warn"} />

              <span className="min-w-0 flex-1 truncate text-nh-ink">{service.name}</span>

              <span className="hidden text-nh-mute-2 min-[420px]:inline">
                {service.region}
              </span>

              <span
                className={
                  service.status === "operational" ? "text-nh-ok" : "text-[#c07b10]"
                }
              >
                {/* Fest hinterlegte, aber plausibel gestaffelte Werte. */}
                {[4, 7, 9, 21][index]}ms
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
