import React, { useState, ChangeEvent, useEffect } from 'react';
import { ArrowRightLeft, Scale, Atom, History, Trash2, Info, Beaker, FlaskRound as Flask } from 'lucide-react';

interface Compound {
  name: string;
  molecularWeight: number;
  formula: string;
  category: string;
}

interface HistoryEntry {
  timestamp: Date;
  compound: string;
  grams: string;
  moles: string;
  molecularWeight: number;
}

const commonCompounds: Compound[] = [
  // 无机化合物
  { name: '水', formula: 'H₂O', molecularWeight: 18.015, category: '无机化合物' },
  { name: '氯化钠', formula: 'NaCl', molecularWeight: 58.44, category: '无机化合物' },
  { name: '硫酸', formula: 'H₂SO₄', molecularWeight: 98.079, category: '无机化合物' },
  { name: '碳酸钠', formula: 'Na₂CO₃', molecularWeight: 105.99, category: '无机化合物' },
  { name: '氢氧化钠', formula: 'NaOH', molecularWeight: 40.00, category: '无机化合物' },
  { name: '硝酸', formula: 'HNO₃', molecularWeight: 63.01, category: '无机化合物' },
  { name: '氨气', formula: 'NH₃', molecularWeight: 17.03, category: '无机化合物' },
  
  // 有机化合物
  { name: '葡萄糖', formula: 'C₆H₁₂O₆', molecularWeight: 180.156, category: '有机化合物' },
  { name: '乙醇', formula: 'C₂H₅OH', molecularWeight: 46.07, category: '有机化合物' },
  { name: '乙酸', formula: 'CH₃COOH', molecularWeight: 60.05, category: '有机化合物' },
  { name: '甲烷', formula: 'CH₄', molecularWeight: 16.04, category: '有机化合物' },
  { name: '苯', formula: 'C₆H₆', molecularWeight: 78.11, category: '有机化合物' },
  { name: '尿素', formula: 'CH₄N₂O', molecularWeight: 60.06, category: '有机化合物' },
  
  // 气体
  { name: '二氧化碳', formula: 'CO₂', molecularWeight: 44.009, category: '气体' },
  { name: '氧气', formula: 'O₂', molecularWeight: 31.998, category: '气体' },
  { name: '氮气', formula: 'N₂', molecularWeight: 28.013, category: '气体' },
  { name: '氢气', formula: 'H₂', molecularWeight: 2.016, category: '气体' },
];

function App() {
  const [grams, setGrams] = useState<string>('');
  const [moles, setMoles] = useState<string>('');
  const [selectedCompound, setSelectedCompound] = useState<Compound>(commonCompounds[0]);
  const [customMW, setCustomMW] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('all');
  const [volume, setVolume] = useState<string>('');
  const [density, setDensity] = useState<string>('');
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('conversionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }, [history]);

  const getMolecularWeight = () => {
    return isCustom ? parseFloat(customMW) || 0 : selectedCompound.molecularWeight;
  };

  const addToHistory = (g: string, mol: string) => {
    const newEntry: HistoryEntry = {
      timestamp: new Date(),
      compound: isCustom ? '自定义' : selectedCompound.name,
      grams: g,
      moles: mol,
      molecularWeight: getMolecularWeight()
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('conversionHistory');
  };

  const handleGramsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGrams(value);
    if (value && !isNaN(parseFloat(value))) {
      const molValue = parseFloat(value) / getMolecularWeight();
      setMoles(molValue.toFixed(6));
      addToHistory(value, molValue.toFixed(6));
      
      if (density && !isNaN(parseFloat(density)) && parseFloat(density) > 0) {
        const volumeValue = parseFloat(value) / parseFloat(density);
        setVolume(volumeValue.toFixed(4));
      }
    } else {
      setMoles('');
      setVolume('');
    }
  };

  const handleMolesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMoles(value);
    if (value && !isNaN(parseFloat(value))) {
      const gramValue = parseFloat(value) * getMolecularWeight();
      setGrams(gramValue.toFixed(6));
      addToHistory(gramValue.toFixed(6), value);
      
      if (density && !isNaN(parseFloat(density)) && parseFloat(density) > 0) {
        const volumeValue = gramValue / parseFloat(density);
        setVolume(volumeValue.toFixed(4));
      }
    } else {
      setGrams('');
      setVolume('');
    }
  };

  const handleDensityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDensity(value);
    
    if (grams && !isNaN(parseFloat(grams)) && value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      const volumeValue = parseFloat(grams) / parseFloat(value);
      setVolume(volumeValue.toFixed(4));
    } else {
      setVolume('');
    }
  };

  const handleCompoundChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustom(true);
      setSelectedCompound(commonCompounds[0]);
    } else {
      setIsCustom(false);
      const compound = commonCompounds.find(c => c.name === value);
      if (compound) {
        setSelectedCompound(compound);
        if (grams) {
          const molValue = parseFloat(grams) / compound.molecularWeight;
          setMoles(molValue.toFixed(6));
        } else if (moles) {
          const gramValue = parseFloat(moles) * compound.molecularWeight;
          setGrams(gramValue.toFixed(6));
        }
      }
    }
  };

  return (
    <div className="min-h-screen gradient-bg p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass-effect rounded-2xl shadow-2xl p-6 md:p-8">
          {/* 标题 */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Flask className="w-10 h-10 text-indigo-600 animate-bounce" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              质量/摩尔转换器
            </h1>
            <Beaker className="w-10 h-10 text-indigo-600 animate-bounce" style={{ animationDelay: '0.1s' }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* 化合物选择区域 */}
              <div className="bg-white/50 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    分类筛选
                  </label>
                  <select
                    className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="all">所有分类</option>
                    <option value="无机化合物">无机化合物</option>
                    <option value="有机化合物">有机化合物</option>
                    <option value="气体">气体</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    选择化合物
                  </label>
                  <select
                    className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
                    onChange={handleCompoundChange}
                    value={isCustom ? 'custom' : selectedCompound.name}
                  >
                    {commonCompounds
                      .filter(c => category === 'all' || c.category === category)
                      .map((compound) => (
                        <option key={compound.name} value={compound.name}>
                          {compound.name} ({compound.formula}) - {compound.molecularWeight} g/mol
                        </option>
                      ))}
                    <option value="custom">自定义分子量</option>
                  </select>
                </div>

                {isCustom && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      输入分子量 (g/mol)
                    </label>
                    <input
                      type="number"
                      value={customMW}
                      onChange={(e) => setCustomMW(e.target.value)}
                      className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
                      placeholder="输入分子量..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    密度 (g/mL) - 可选
                  </label>
                  <input
                    type="number"
                    value={density}
                    onChange={handleDensityChange}
                    className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
                    placeholder="输入密度..."
                  />
                </div>
              </div>

              {/* 转换区域 */}
              <div className="bg-white/50 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      质量 (g)
                    </label>
                    <input
                      type="number"
                      value={grams}
                      onChange={handleGramsChange}
                      className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
                      placeholder="输入质量..."
                    />
                  </div>

                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <ArrowRightLeft className="text-indigo-600 w-6 h-6 transform transition-transform hover:scale-110" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      物质的量 (mol)
                    </label>
                    <input
                      type="number"
                      value={moles}
                      onChange={handleMolesChange}
                      className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
                      placeholder="输入物质的量..."
                    />
                  </div>

                  {density && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        体积 (mL)
                      </label>
                      <input
                        type="number"
                        value={volume}
                        readOnly
                        className="w-full p-3 rounded-lg bg-gray-50 border-2 border-indigo-100"
                        placeholder="计算得到的体积..."
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 详细信息 */}
              <div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <Info className="w-5 h-5" />
                  {showDetails ? '隐藏详细信息' : '显示详细信息'}
                </button>
                {showDetails && (
                  <div className="mt-4 bg-white/50 rounded-xl p-6 shadow-lg transition-all">
                    <h3 className="font-semibold mb-4 text-gray-800">计算详情：</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        </span>
                        当前分子量: {getMolecularWeight()} g/mol
                      </li>
                      {!isCustom && (
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                          </span>
                          化学式: {selectedCompound.formula}
                        </li>
                      )}
                      {density && (
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                          </span>
                          密度: {density} g/mL
                        </li>
                      )}
                      {grams && moles && (
                        <>
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                            </span>
                            质量: {grams} g
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                            </span>
                            物质的量: {moles} mol
                          </li>
                          {volume && (
                            <li className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                              </span>
                              体积: {volume} mL
                            </li>
                          )}
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* 历史记录 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <History className="w-5 h-5" />
                  {showHistory ? '隐藏历史记录' : '显示历史记录'}
                </button>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    清除历史
                  </button>
                )}
              </div>
              
              {showHistory && (
                <div className="bg-white/50 rounded-xl p-6 shadow-lg transition-all">
                  {history.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">暂无历史记录</p>
                  ) : (
                    <div className="space-y-4">
                      {history.map((entry, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-4 shadow transition-all hover:shadow-md"
                        >
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span className="font-medium">{entry.compound}</span>
                            <span className="text-gray-400">{entry.timestamp.toLocaleString()}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Scale className="w-4 h-4 text-indigo-600" />
                              <span>{entry.grams} g</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Atom className="w-4 h-4 text-indigo-600" />
                              <span>{entry.moles} mol</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;