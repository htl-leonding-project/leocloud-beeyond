function Alert({ type, message }: { type: string; message: string }) {
  let className = "";
  let icon: React.ReactNode = "";

  switch (type) {
    case "error":
      className = "alert-error";
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
      break;
    case "info":
      className = "alert-info";
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 flex-shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      );
      break;
    default:
      return null;
  }

  return (
    <div className={`alert ${className} shadow-lg sm:max-w-xs md:max-w-sm lg:max-w-md`}>
      <div>
        {icon}
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Alert;
