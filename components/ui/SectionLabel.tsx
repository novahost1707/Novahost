/** "04 / LEISTUNGEN" - technische Marke am Anfang jeder Section. */
export function SectionLabel({ children }: { children: string }) {
  const [num, ...rest] = children.split(" / ");
  return (
    <p className="slabel pixel">
      <span className="slabel__num">{num}</span>
      <span>/</span>
      <span>{rest.join(" / ")}</span>
      <span className="slabel__rule" aria-hidden="true" />
    </p>
  );
}
