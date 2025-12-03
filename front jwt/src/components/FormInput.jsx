// Campo de formulário reutilizável com label e input
export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  name,
  placeholder,
  required,
  id
}) {
  return (
    <label className="form-group">
      <span className="form-label">{label}</span>
      <input
        id={id}
        className="form-input"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </label>
  );
}
