type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: React.ReactNode;
};

export function PageHeader({ title, eyebrow, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b879ff]">{eyebrow}</div> : null}
        <h1 className="text-3xl font-black tracking-normal md:text-5xl">{title}</h1>
        {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-white/58 md:text-base">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
