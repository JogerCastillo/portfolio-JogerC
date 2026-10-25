const ContactFormFeedback = ({
  status,
  isSubmitting,
  sendLabel,
  sendingLabel,
  successLabel,
  errorLabel,
}) => {
  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2"
      >
        <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
          {isSubmitting && (
          <span
            className="inline-block h-4 w-4 border-2 border-white/45 dark:border-white/30 border-t-white dark:border-t-white/95 rounded-full animate-spin motion-reduce:animate-none"
          />
          )}
        </span>
        {isSubmitting ? sendingLabel : sendLabel}
      </button>
      {status === 'success' && (
        <p className="text-green-600 dark:text-green-400 text-center">{successLabel}</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 dark:text-red-400 text-center">{errorLabel}</p>
      )}
    </>
  );
};

export default ContactFormFeedback;
