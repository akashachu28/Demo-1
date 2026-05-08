import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { PageHeader } from "../../layout/components/PageHeader";
import { Card } from "../../../components/ui/card";

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
    { 
      title: "Total Balance", 
      value: "$284.5K", 
      change: "+12.5% growth",
      icon: DollarSign, 
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100"
    },
    { 
      title: "Deposits (30D)", 
      value: "$45.2K", 
      change: "+8.3% increase",
      icon: TrendingUp, 
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 via-green-50 to-green-100"
    },
    { 
      title: "Withdrawals (30D)", 
      value: "$23.8K", 
      change: "-4.2% decrease",
      icon: TrendingDown, 
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100"
    },
    { 
      title: "Active Accounts", 
      value: "127", 
      change: "+15 new accounts",
      icon: Calendar, 
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100"
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 px-1">
      {/* Fixed Header */}
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <PageHeader 
          title="Retainer Ledger"
          subtitle="Track contractor retainer balances and transactions"
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2 p-2 rounded-lg">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
              {stats.map((stat) => (
                <Card
                  key={stat.title}
                  className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[16px] text-gray-700 mb-1">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-700">
                          {stat.value}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div
                      className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Transactions */}
            <Card className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
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
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-sm text-gray-600">{transaction.date}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">{transaction.contractor}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium ${
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
            </Card>

            {/* Contractor Balances */}
            <Card className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Top Contractor Balances</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contractorBalances.map((account, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-gray-900">{account.contractor}</p>
                          <p className="text-xs text-gray-500 mt-1">Last: {account.lastActivity}</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-md font-medium">Active</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <p className="text-2xl font-bold text-gray-900">{account.balance.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
