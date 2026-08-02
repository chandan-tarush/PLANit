type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = '' }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src="/planit-mark.png" alt="PlanIt" className={compact ? 'h-8 w-8 object-contain' : 'h-10 w-10 object-contain'} />
      <span className={`${compact ? 'text-lg' : 'text-2xl'} font-black tracking-[-0.04em] text-white`}>PlanIt</span>
    </div>
  );
}
