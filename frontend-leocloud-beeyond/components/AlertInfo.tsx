function AlertInfo({ message }: { message: string }) {
  return (
    <div className="toast">
      <div className="alert alert-info shadow-lg sm:max-w-xs md:max-w-sm lg:max-w-md">
        <div>
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
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

export default AlertInfo;
