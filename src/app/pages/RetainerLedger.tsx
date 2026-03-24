import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";

const retainerTransactions = [
  { id: "1", contractor: "John Smith", type: "deposit", amount: 5000, balance: 5000, date: "Mar 20, 2026", description: "Initial retainer deposit" },
  { id: "2", contractor: "Sarah Johnson", type: "withdrawal", amount: 1200, balance: 8800, date: "Mar 19, 2026", description: "License renewal - Texas" },
  { id: "3", contractor: "Mike Davis", type: "deposit", amount: 3500, balance: 10000, date: "Mar 18, 2026", description: "Retainer top-up" },
  { id: "4", contractor: "Emily Brown", type: "withdrawal", amount: 850, balance: 9150, date: "Mar 17, 2026", description: "Insurance premium" },
  { id: "5", contractor: "David Wilson", type: "withdrawal", amount: 420, balance: 8730, date: "Mar 16, 2026", description: "License renewal - Illinois" },
  { id: "6", contractor: "Lisa Anderson", type: "deposit", amount: 4000, balance: 4000, date: "Mar 15, 2026", description: "Initial retainer deposit" },
  { id: "7", contractor: "James Taylor", type: "withdrawal", amount: 675, balance: 3325, date: "Mar 14, 2026", description: "Document processing fees" },
  { id: "8", contractor: "Jennifer Martinez", type: "deposit", amount: 2500, balance: 2500, date: "Mar 13, 2026", description: "Initial retainer deposit" },
];

const contractorBalances = [
  { contractor: "John Smith", balance: 5000, lastActivity: "Mar 20, 2026", status: "active" },
  { contractor: "Sarah Johnson", balance: 8800, lastActivity: "Mar 19, 2026", status: "active" },
  { contractor: "Mike Davis", balance: 10000, lastActivity: "Mar 18, 2026", status: "active" },
  { contractor: "Emily Brown", balance: 9150, lastActivity: "Mar 17, 2026", status: "active" },
  { contractor: "David Wilson", balance: 8730, lastActivity: "Mar 16, 2026", status: "active" },
  { contractor: "Lisa Anderson", balance: 4000, lastActivity: "Mar 15, 2026", status: "active" },
];

export function RetainerLedger() {
  const stats = [
    { label: "Total Balance", value: "$284.5K", icon: DollarSign, color: "blue", trend: "+12.5%" },
    { label: "Deposits (30D)", value: "$45.2K", icon: TrendingUp, color: "green", trend: "+8.3%" },
    { label: "Withdrawals (30D)", value: "$23.8K", icon: TrendingDown, color: "orange", trend: "-4.2%" },
    { label: "Active Accounts", value: "127", icon: Calendar, color: "purple", trend: "+15" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-[#0E4665] px-8 py-4">
        <h1 className="text-2xl font-semibold text-white">Retainer Ledger</h1>
        <p className="text-sm text-blue-100 mt-1">Track contractor retainer balances and transactions</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contractor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Balance</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {retainerTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-600">{transaction.date}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">{transaction.contractor}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td className={`px-4 py-4 text-sm font-semibold ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">${transaction.balance.toLocaleString()}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{transaction.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contractor Balances */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contractor Balances</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contractorBalances.map((account, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{account.contractor}</p>
                    <p className="text-xs text-gray-500 mt-1">Last: {account.lastActivity}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded font-medium">Active</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-900">{account.balance.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
