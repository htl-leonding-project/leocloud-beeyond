export function Navbar() {
  return (
    <div className="navbar my-2 rounded-lg bg-secondary px-4">
      <img
        src={`${process.env.BASE_PATH}/assets/bee-purple.svg`}
        className="mr-3 h-6 select-none sm:h-9"
        alt="Beeyond Logo"
      />
      <span className="select-none text-2xl font-semibold text-white">
        Beeyond
      </span>
    </div>
  );
}
