export const Marquee: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex justify-between w-[200%] animate-marquee">
      {children}
      {children}
    </div>
  );
};
