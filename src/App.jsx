import React, { useState } from 'react';
import { Calculator, HelpCircle, IndianRupee, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / (12 * 100);
    const months = years * 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = monthlyInvestment * months;
    const wealthGained = futureValue - totalInvestment;

    const yearlyData = Array.from({ length: years + 1 }, (_, index) => {
      const currentMonths = index * 12;
      const currentValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, currentMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      return {
        year: index,
        value: Math.round(currentValue),
        investment: monthlyInvestment * currentMonths
      };
    });

    return { futureValue: Math.round(futureValue), totalInvestment, wealthGained, yearlyData };
  };

  const results = calculateSIP();

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <Card className="max-w-5xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur">
        <CardHeader className="border-b bg-white/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-600 text-white">
                <Calculator className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SIP Calculator
              </CardTitle>
            </div>
            <span className="text-sm text-gray-500">Systematic Investment Plan</span>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <Card className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <IndianRupee className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <label className="font-medium text-gray-700">Monthly Investment</label>
                      <p className="text-sm text-gray-500">Enter your monthly SIP amount</p>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
                    min="500"
                    step="500"
                  />
                  <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />
                    Minimum ₹500 per month
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <label className="font-medium text-gray-700">Investment Period</label>
                      <p className="text-sm text-gray-500">Select duration in years</p>
                    </div>
                  </div>
                  <input
                    type="range"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    min="1"
                    max="30"
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-sm text-gray-500">1 year</span>
                    <span className="text-lg font-semibold text-purple-600">{years} years</span>
                    <span className="text-sm text-gray-500">30 years</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <label className="font-medium text-gray-700">Expected Return (%)</label>
                      <p className="text-sm text-gray-500">Annual returns percentage</p>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-lg"
                    min="1"
                    max="30"
                    step="0.1"
                  />
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">Historical Returns:</p>
                    <p className="text-xs text-green-600">Equity: 12-15% p.a. | Debt: 6-8% p.a.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-blue-100">Total Investment</p>
                    <p className="text-2xl font-bold mt-2">{formatCurrency(results.totalInvestment)}</p>
                    <div className="mt-2 flex items-center text-blue-100">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm">Invested Amount</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-green-100">Expected Returns</p>
                    <p className="text-2xl font-bold mt-2">{formatCurrency(results.wealthGained)}</p>
                    <div className="mt-2 flex items-center text-green-100">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">Wealth Gained</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-purple-100">Total Value</p>
                    <p className="text-2xl font-bold mt-2">{formatCurrency(results.futureValue)}</p>
                    <div className="mt-2 flex items-center text-purple-100">
                      <Calculator className="w-4 h-4 mr-1" />
                      <span className="text-sm">Final Amount</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={results.yearlyData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="year" 
                          label={{ value: 'Years', position: 'bottom' }}
                          stroke="#6b7280"
                        />
                        <YAxis 
                          tickFormatter={(value) => formatCurrency(value)}
                          stroke="#6b7280"
                        />
                        <RechartsTooltip
                          formatter={(value) => formatCurrency(value)}
                          labelFormatter={(label) => `Year ${label}`}
                          contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="value"
                          name="Total Value"
                          stroke="#6366f1"
                          strokeWidth={2}
                          fill="url(#colorValue)"
                        />
                        <Area
                          type="monotone"
                          dataKey="investment"
                          name="Investment"
                          stroke="#22c55e"
                          strokeWidth={2}
                          fill="url(#colorInvestment)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPCalculator;
