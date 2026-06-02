type FieldProps = {
  label: string;
  children: React.ReactNode;
};

export function Field({ label, children }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
