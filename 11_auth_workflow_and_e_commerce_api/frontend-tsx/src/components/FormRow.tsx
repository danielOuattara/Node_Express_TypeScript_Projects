type TypeFormRowProps = {
  type: string;
  name: string;
  value: string;
  handleChange(): void;
};

export default function FormRow({
  type,
  name,
  value,
  handleChange,
}: TypeFormRowProps) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
}
