const FORM_FIELD_CLASS =
  'w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed';

const ContactFormField = ({
  as = 'input',
  type = 'text',
  rows = 5,
  required = true,
  placeholder,
  value,
  onChange,
  disabled = false,
  id,
  name,
  label,
}) => {
  if (as === 'textarea') {
    return (
      <>
        <label htmlFor={id} className="sr-only">{label}</label>
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className={FORM_FIELD_CLASS}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </>
    );
  }

  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={FORM_FIELD_CLASS}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

export default ContactFormField;
