import React, { useState } from 'react';
import { Calculator, HelpCircle, TrendingUp, IndianRupee } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / (12 * 100);
    const months = years * 12;
    const futureValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const totalInvestment = monthlyInvestment * months;
    const wealthGained = futureValue - totalInvestment;

    const yearlyData = Array.from({ length: years + 1 }, (_, index) => {
      const currentMonths = index * 12;
      const currentValue = monthlyInvestment * 
        ((Math.pow(1 + monthlyRate, currentMonths) - 1) / monthlyRate) * 
        (1 + monthlyRate);
      
      return {
        year: index,
        value: Math.round(currentValue),
        investment: monthlyInvestment * currentMonths
      };
    });

    return {
      futureValue: Math.round(futureValue),
      totalInvestment,
      wealthGained,
      yearlyData
    };
  };

  const results = calculateSIP();

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-indigo-500">
        <CardHeader className="bg-white rounded-t-lg border-b border-gray-100">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <span>SIP Calculator</span>
            <span className="text-sm font-normal text-gray-500 ml-auto">Systematic Investment Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <IndianRupee className="w-5 h-5 text-indigo-600" />
                  <label className="text-sm font-semibold text-gray-700">Monthly Investment</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-indigo-800 text-white">
                        <p>Enter your monthly SIP amount</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  min="500"
                  step="500"
                />
                <p className="mt-2 text-xs text-gray-500">Minimum ₹500 per month</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <label className="text-sm font-semibold text-gray-700">Investment Period</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-indigo-800 text-white">
                        <p>Select investment duration in years</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <input
                  type="range"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  min="1"
                  max="30"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">1 year</span>
                  <span className="text-sm font-medium text-indigo-600">{years} years</span>
                  <span className="text-sm text-gray-500">30 years</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  <label className="text-sm font-semibold text-gray-700">Expected Return (%)</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-indigo-800 text-white p-2">
                        <p>Historical equity returns: 12-15% p.a.</p>
                        <p>Debt returns: 6-8% p.a.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-md">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-blue-600">Total Investment</p>
                    <p className="text-lg font-bold mt-1">{formatCurrency(results.totalInvestment)}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none shadow-md">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-green-600">Expected Returns</p>
                    <p className="text-lg font-bold mt-1">{formatCurrency(results.wealthGained)}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-none shadow-md">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-indigo-600">Total Value</p>
                    <p className="text-lg font-bold mt-1">{formatCurrency(results.futureValue)}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-md">
                <CardContent className="p-4">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.yearlyData}>
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
                          contentStyle={{ background: '#fff', border: '1px solid #e5e7eb' }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          name="Total Value"
                          stroke="#4f46e5"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="investment"
                          name="Investment"
                          stroke="#059669"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
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
