export function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden mt-4 z-10">
      <div className="relative flex max-w-[90vw] mx-auto overflow-hidden py-5">
        <div className="flex gap-x-4 items-center w-max animate-marquee [--duration:15s]">
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
