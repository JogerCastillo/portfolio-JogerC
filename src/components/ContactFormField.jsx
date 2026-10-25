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
}) => {
  if (as === 'textarea') {
    return (
      <textarea
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={FORM_FIELD_CLASS}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }

  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      className={FORM_FIELD_CLASS}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default ContactFormField;
