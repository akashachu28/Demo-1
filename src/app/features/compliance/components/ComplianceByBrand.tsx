export function ComplianceByBrand() {
  const brands = [
    { name: "First Restoration", value: 96, color: "bg-green-500" },
    { name: "Mad City Windows & Baths", value: 92, color: "bg-lime-500" },
    { name: "Maritime", value: 89, color: "bg-red-500" },
  ];

  return (
    <div className="bg-[#003057] rounded-lg border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">COMPLIANCE BY BRAND</h3>
      <div className="space-y-4">
        {brands.map((brand) => (
          <div key={brand.name}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-300">{brand.name}</p>
              <span className="text-sm font-semibold text-white">{brand.value}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div
                className={`${brand.color} h-2 rounded-full transition-all`}
                style={{ width: `${brand.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
