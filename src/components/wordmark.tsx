type WordmarkProps = {
  className?: string;
  markClassName?: string;
  withLabel?: boolean;
};

export function Wordmark({
  className,
  markClassName = "w-[7.5rem]",
  withLabel = true,
}: WordmarkProps) {
  return (
    <span className={`inline-flex flex-col items-center text-current ${className ?? ""}`}>
      <span
        aria-hidden="true"
        className={`block aspect-[1458/522] bg-current select-none ${markClassName}`}
        style={{
          WebkitMask: "url(/brand/soul-mark.png) center / contain no-repeat",
          mask: "url(/brand/soul-mark.png) center / contain no-repeat",
        }}
      />
      {withLabel ? (
        <span className="mt-1.5 pl-[0.5em] font-sans text-[0.62rem] font-normal uppercase leading-none tracking-[0.5em]">
          Jewelry
        </span>
      ) : null}
      <span className="sr-only">Soul Jewelry</span>
    </span>
  );
}
