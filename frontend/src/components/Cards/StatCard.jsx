function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      cursor-pointer
      border
      border-transparent
      hover:border-blue-200
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;