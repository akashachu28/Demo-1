export function RecentActivityDark() {
  const activities = [
    { id: "1", text: "COJ auto-verified (3/21)", time: "2h ago" },
    { id: "2", text: "New contractor onboarded", time: "4h ago" },
    { id: "3", text: "Contractor field-ready", time: "6h ago" },
    { id: "4", text: "AI classification overridden", time: "1d ago" },
  ];

  return (
    <div className="bg-[#1e2442] rounded-lg border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">RECENT ACTIVITY</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
            <p className="text-sm text-gray-300 flex-1">{activity.text}</p>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
