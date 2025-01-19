import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, IndianRupee, Clock, TrendingUp, ArrowUpRight, Sun, Moon, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const SIPCalculator = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [monthlyInvestment, years, expectedReturn]);

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

  const downloadPDF = () => {
    // Implement PDF download functionality
    console.log('Downloading PDF...');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    } p-4 md:p-8`}>
      <Card className={`max-w-6xl mx-auto shadow-2xl border-0 ${
        isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-lg transition-all duration-300`}>
        <CardHeader className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-white/50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${
                isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'
              } text-white transform hover:scale-105 transition-transform`}>
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  SIP Calculator
                </CardTitle>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Plan your financial future with confidence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full hover:bg-opacity-80 transition-colors ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              {/* Investment Input Card */}
              <Card className={`border ${
                isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100'
              } shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <IndianRupee className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        Monthly Investment
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Enter your monthly SIP amount
                      </p>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className={`w-full p-4 text-lg rounded-xl transition-all ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-200 focus:ring-2 focus:ring-indigo-500'
                    }`}
                    min="500"
                    step="500"
                  />
                  <div className={`mt-4 p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}>
                    <p className={`text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-blue-700'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                      Minimum ₹500 per month recommended
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Period Card */}
              <Card className={`border ${
                isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100'
              } shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        Investment Period
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Select investment duration
                      </p>
                    </div>
                  </div>
                  <input
                    type="range"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    min="1"
                    max="30"
                  />
                  <div className="flex justify-between mt-4">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      1 year
                    </span>
                    <span className="text-xl font-semibold text-purple-500">
                      {years} years
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      30 years
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Expected Return Card */}
              <Card className={`border ${
                isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100'
              } shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        Expected Return (%)
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Annual returns percentage
                      </p>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className={`w-full p-4 text-lg rounded-xl transition-all ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-200 focus:ring-2 focus:ring-green-500'
                    }`}
                    min="1"
                    max="30"
                    step="0.1"
                  />
                  <div className={`mt-4 p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-green-50'
                  }`}>
                    <h4 className={`font-medium ${
                      isDarkMode ? 'text-green-400' : 'text-green-800'
                    }`}>
                      Historical Returns:
                    </h4>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-gray-600' : 'bg-white'
                      }`}>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          Equity
                        </p>
                        <p className={`text-lg font-bold ${
                          isDarkMode ? 'text-white' : 'text-green-700'
                        }`}>
                          12-15%
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-gray-600' : 'bg-white'
                      }`}>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          Debt
                        </p>
                        <p className={`text-lg font-bold ${
                          isDarkMode ? 'text-white' : 'text-green-700'
                        }`}>
                          6-8%
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={`transform hover:scale-105 transition-all duration-300 ${
                  isDarkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                } text-white border-0`}>
                  <CardContent className="p-6">
                    <p className={`text-sm font-medium ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-100'
                    }`}>Total Investment</p>
                    <p className={`text-2xl font-bold mt-2 ${isAnimating ? 'animate-pulse' : ''}`}>
                      {formatCurrency(results.totalInvestment)}
                    </p>
                    <div className="mt-2 flex items-center text-blue-200">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm">Invested Amount</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`transform hover:scale-105 transition-all duration-300 ${
 isDarkMode ? 'bg-gradient-to-br from-green-900 to-green-800' : 'bg-gradient-to-br from-green-500 to-green-600'
} text-white border-0`}>
 <CardContent className="p-6">
   <p className={`text-sm font-medium ${isDarkMode ? 'text-green-300' : 'text-green-100'}`}>
     Expected Returns
   </p>
   <p className={`text-2xl font-bold mt-2 ${isAnimating ? 'animate-pulse' : ''}`}>
     {formatCurrency(results.wealthGained)}
   </p>
   <div className="mt-2 flex items-center text-green-200">
     <TrendingUp className="w-4 h-4 mr-1" />
     <span className="text-sm">Wealth Gained</span>
   </div>
 </CardContent>
</Card>

<Card className={`transform hover:scale-105 transition-all duration-300 ${
 isDarkMode ? 'bg-gradient-to-br from-purple-900 to-purple-800' : 'bg-gradient-to-br from-purple-500 to-purple-600'
} text-white border-0`}>
 <CardContent className="p-6">
   <p className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-100'}`}>
     Total Value
   </p>
   <p className={`text-2xl font-bold mt-2 ${isAnimating ? 'animate-pulse' : ''}`}>
     {formatCurrency(results.futureValue)}
   </p>
   <div className="mt-2 flex items-center text-purple-200">
     <Calculator className="w-4 h-4 mr-1" />
     <span className="text-sm">Final Amount</span>
   </div>
 </CardContent>
</Card>
</div>

<Card className={`border-0 shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
 <CardContent className="p-6">
   <div className="h-80">
     <ResponsiveContainer width="100%" height="100%">
       <AreaChart data={results.yearlyData}>
         <defs>
           <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
             <stop offset="5%" stopColor={isDarkMode ? '#818cf8' : '#6366f1'} stopOpacity={0.3}/>
             <stop offset="95%" stopColor={isDarkMode ? '#818cf8' : '#6366f1'} stopOpacity={0}/>
           </linearGradient>
           <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
             <stop offset="5%" stopColor={isDarkMode ? '#4ade80' : '#22c55e'} stopOpacity={0.3}/>
             <stop offset="95%" stopColor={isDarkMode ? '#4ade80' : '#22c55e'} stopOpacity={0}/>
           </linearGradient>
         </defs>
         <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
         <XAxis 
           dataKey="year" 
           label={{ value: 'Years', position: 'bottom' }}
           stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
         />
         <YAxis 
           tickFormatter={(value) => formatCurrency(value)}
           stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
         />
         <RechartsTooltip
           formatter={(value) => formatCurrency(value)}
           labelFormatter={(label) => `Year ${label}`}
           contentStyle={{ 
             background: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
             border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
             borderRadius: '6px',
             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
             color: isDarkMode ? '#e5e7eb' : 'inherit'
           }}
         />
         <Legend />
         <Area
           type="monotone"
           dataKey="value"
           name="Total Value"
           stroke={isDarkMode ? '#818cf8' : '#6366f1'}
           strokeWidth={2}
           fill="url(#colorValue)"
         />
         <Area
           type="monotone"
           dataKey="investment"
           name="Investment"
           stroke={isDarkMode ? '#4ade80' : '#22c55e'}
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