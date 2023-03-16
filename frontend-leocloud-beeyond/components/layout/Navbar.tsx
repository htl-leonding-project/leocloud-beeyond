export function Navbar({}: {}) {
  return (
    <div className="navbar bg-secondary rounded-lg my-2 px-4">
      <img
        src={`${process.env.BASE_PATH}/assets/bee-purple.svg`}
        className="h-6 mr-3 sm:h-9"
        alt="Beeyond Logo"
      />
      <span className="text-2xl font-semibold text-white">Beeyond</span>
    </div>
  );
}
