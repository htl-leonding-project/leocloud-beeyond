export function Navbar({}: {}) {
  return (
    <nav className="bg-secondary border-gray-200 py-2.5 rounded-lg p-2xl m-2">
      <div className="flex items-center mx-5">
        <img
          src={`${process.env.BASE_PATH}/assets/bee-purple.svg`}
          className="h-6 mr-3 sm:h-9"
          alt="Beeyond Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Beeyond
        </span>
      </div>
    </nav>
  );
}
