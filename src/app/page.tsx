'use client';

import { useState, useMemo } from 'react';
import { swfData, notableAcquisitions, regionColors, sourceColors, totalGlobalAUM, regionBreakdown, sourceBreakdown, SWFund } from '@/data/swf-data';

function BubbleMap({ funds, selectedFund, onSelect, filterRegion, filterSource }: {
  funds: SWFund[];
  selectedFund: SWFund | null;
  onSelect: (f: SWFund | null) => void;
  filterRegion: string;
  filterSource: string;
}) {
  const filtered = useMemo(() => {
    return funds.filter(f => {
      if (filterRegion && f.region !== filterRegion) return false;
      if (filterSource && f.source !== filterSource) return false;
      return true;
    });
  }, [funds, filterRegion, filterSource]);

  const maxAum = Math.max(...funds.map(f => f.aum));

  // Simple equirectangular projection
  const projectX = (lng: number) => ((lng + 180) / 360) * 900 + 50;
  const projectY = (lat: number) => ((90 - lat) / 180) * 450 + 25;
  const radius = (aum: number) => Math.sqrt(aum / maxAum) * 40 + 4;

  return (
    <svg viewBox="0 0 1000 500" className="w-full h-auto" style={{ background: '#0a1628' }}>
      {/* Simple world outline - major landmasses */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Grid lines */}
      {[-60, -30, 0, 30, 60].map(lat => (
        <line key={`lat-${lat}`} x1="50" y1={projectY(lat)} x2="950" y2={projectY(lat)}
          stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="4,4" />
      ))}
      {[-120, -60, 0, 60, 120].map(lng => (
        <line key={`lng-${lng}`} x1={projectX(lng)} y1="25" x2={projectX(lng)} y2="475"
          stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="4,4" />
      ))}

      {/* Equator */}
      <line x1="50" y1={projectY(0)} x2="950" y2={projectY(0)}
        stroke="#1e3a5f" strokeWidth="1" />

      {/* Region labels */}
      <text x={projectX(-100)} y={projectY(50)} fill="#334155" fontSize="14" fontWeight="bold" textAnchor="middle">NORTH AMERICA</text>
      <text x={projectX(-60)} y={projectY(-15)} fill="#334155" fontSize="14" fontWeight="bold" textAnchor="middle">SOUTH AMERICA</text>
      <text x={projectX(15)} y={projectY(55)} fill="#334155" fontSize="14" fontWeight="bold" textAnchor="middle">EUROPE</text>
      <text x={projectX(25)} y={projectY(5)} fill="#334155" fontSize="14" fontWeight="bold" textAnchor="middle">AFRICA</text>
      <text x={projectX(50)} y={projectY(35)} fill="#334155" fontSize="14" fontWeight="bold" textAnchor="middle">MIDDLE EAST</text>
      <text x={projectX(105)} y={projectY(40)} fill="#334155" fontSize="14" fontWeight="bold" textAnchor="middle">ASIA-PACIFIC</text>

      {/* Fund bubbles */}
      {filtered.map((fund, i) => {
        const cx = projectX(fund.lng);
        const cy = projectY(fund.lat);
        const r = radius(fund.aum);
        const color = regionColors[fund.region] || '#64748b';
        const isSelected = selectedFund?.name === fund.name;

        return (
          <g key={i} onClick={() => onSelect(isSelected ? null : fund)} className="cursor-pointer">
            {/* Glow effect */}
            <circle cx={cx} cy={cy} r={r * 2} fill={color} opacity={0.1} filter="url(#blur)" />
            {/* Main bubble */}
            <circle
              cx={cx} cy={cy} r={r}
              fill={color}
              fillOpacity={isSelected ? 0.9 : 0.6}
              stroke={isSelected ? '#fff' : color}
              strokeWidth={isSelected ? 2 : 1}
              className="transition-all duration-300 hover:fill-opacity-80"
            />
            {/* Label for large funds */}
            {fund.aum > 300 && (
              <text x={cx} y={cy - r - 5} fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="500">
                {fund.country === 'China' ? fund.name.split('(')[0].trim().slice(0, 4) : fund.country}
              </text>
            )}
            {/* AUM label inside bubble for very large funds */}
            {fund.aum > 500 && (
              <text x={cx} y={cy + 4} fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">
                ${Math.round(fund.aum / 10) * 10}B
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function BarChart({ data, colorMap, title }: { data: Record<string, number>; colorMap: Record<string, string>; title: string }) {
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...sorted.map(([, v]) => v));

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">{title}</h3>
      <div className="space-y-2">
        {sorted.map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="w-24 text-xs text-slate-400 truncate">{key}</div>
            <div className="flex-1 h-5 bg-slate-800 rounded overflow-hidden">
              <div
                className="h-full rounded transition-all duration-500"
                style={{
                  width: `${(value / max) * 100}%`,
                  backgroundColor: colorMap[key] || '#64748b',
                }}
              />
            </div>
            <div className="w-16 text-xs text-slate-300 text-right">${value.toLocaleString()}B</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FundDetail({ fund, onClose }: { fund: SWFund; onClose: () => void }) {
  const acqs = notableAcquisitions.filter(a => fund.name.includes(a.fund) || a.fund.includes(fund.name.split(' ')[0]));

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl p-5 animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">{fund.name}</h2>
          <p className="text-sm text-slate-400">{fund.country} • Est. {fund.founded} • Source: {fund.source}</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-slate-900/60 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-amber-400">${fund.aum}B</div>
          <div className="text-xs text-slate-500">AUM</div>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-3 text-center">
          <div className={`text-lg font-bold ${fund.defenseExposure === 'High' ? 'text-red-400' : fund.defenseExposure === 'Medium' ? 'text-amber-400' : 'text-green-400'}`}>
            {fund.defenseExposure}
          </div>
          <div className="text-xs text-slate-500">Defense Exposure</div>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-3 text-center">
          <div className={`text-lg font-bold ${fund.techExposure === 'High' ? 'text-blue-400' : fund.techExposure === 'Medium' ? 'text-amber-400' : 'text-slate-400'}`}>
            {fund.techExposure}
          </div>
          <div className="text-xs text-slate-500">Tech Exposure</div>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-3 text-center">
          <div className={`text-lg font-bold ${fund.transparency === 'High' ? 'text-green-400' : fund.transparency === 'Medium' ? 'text-amber-400' : 'text-red-400'}`}>
            {fund.transparency}
          </div>
          <div className="text-xs text-slate-500">Transparency</div>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4">{fund.description}</p>

      <div className="mb-3">
        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Notable Holdings</h4>
        <div className="flex flex-wrap gap-1.5">
          {fund.notableInvestments.map((inv, i) => (
            <span key={i} className="px-2 py-1 bg-slate-700/60 text-slate-300 rounded text-xs">{inv}</span>
          ))}
        </div>
      </div>

      {acqs.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Major Acquisitions</h4>
          <div className="space-y-1">
            {acqs.map((a, i) => (
              <div key={i} className="flex justify-between text-xs text-slate-400">
                <span>{a.target}</span>
                <span className={a.status === 'Blocked' ? 'text-red-400' : a.status === 'Divested' ? 'text-orange-400' : 'text-green-400'}>
                  ${a.value}B • {a.year} • {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TopFundsTable({ funds, onSelect }: { funds: SWFund[]; onSelect: (f: SWFund) => void }) {
  const sorted = [...funds].sort((a, b) => b.aum - a.aum).slice(0, 15);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-2 px-2 text-slate-500 font-medium">#</th>
            <th className="text-left py-2 px-2 text-slate-500 font-medium">Fund</th>
            <th className="text-left py-2 px-2 text-slate-500 font-medium">Country</th>
            <th className="text-right py-2 px-2 text-slate-500 font-medium">AUM ($B)</th>
            <th className="text-center py-2 px-2 text-slate-500 font-medium">Source</th>
            <th className="text-center py-2 px-2 text-slate-500 font-medium">Defense</th>
            <th className="text-center py-2 px-2 text-slate-500 font-medium">Tech</th>
            <th className="text-center py-2 px-2 text-slate-500 font-medium">Transparency</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((fund, i) => (
            <tr
              key={i}
              onClick={() => onSelect(fund)}
              className="border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors"
            >
              <td className="py-2 px-2 text-slate-600">{i + 1}</td>
              <td className="py-2 px-2 text-slate-300 font-medium">{fund.name.length > 35 ? fund.name.slice(0, 32) + '...' : fund.name}</td>
              <td className="py-2 px-2 text-slate-400">{fund.country}</td>
              <td className="py-2 px-2 text-right text-amber-400 font-mono">{fund.aum.toLocaleString()}</td>
              <td className="py-2 px-2 text-center">
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${fund.source === 'Oil & Gas' ? 'bg-amber-900/40 text-amber-400' : fund.source === 'Diamonds' ? 'bg-purple-900/40 text-purple-400' : 'bg-blue-900/40 text-blue-400'}`}>
                  {fund.source}
                </span>
              </td>
              <td className="py-2 px-2 text-center">
                <span className={`${fund.defenseExposure === 'High' ? 'text-red-400' : fund.defenseExposure === 'Medium' ? 'text-amber-400' : fund.defenseExposure === 'Low' ? 'text-green-400' : 'text-slate-600'}`}>
                  {fund.defenseExposure === 'High' ? '🔴' : fund.defenseExposure === 'Medium' ? '🟡' : fund.defenseExposure === 'Low' ? '🟢' : '⚪'}
                </span>
              </td>
              <td className="py-2 px-2 text-center">
                <span className={`${fund.techExposure === 'High' ? 'text-blue-400' : fund.techExposure === 'Medium' ? 'text-amber-400' : 'text-slate-600'}`}>
                  {fund.techExposure === 'High' ? '🔵' : fund.techExposure === 'Medium' ? '🟡' : '⚪'}
                </span>
              </td>
              <td className="py-2 px-2 text-center">
                <span className={`${fund.transparency === 'High' ? 'text-green-400' : fund.transparency === 'Medium' ? 'text-amber-400' : 'text-red-400'}`}>
                  {fund.transparency === 'High' ? '🟢' : fund.transparency === 'Medium' ? '🟡' : '🔴'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-4">
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color || 'text-white'}`}>{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}

export default function Home() {
  const [selectedFund, setSelectedFund] = useState<SWFund | null>(null);
  const [filterRegion, setFilterRegion] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [activeTab, setActiveTab] = useState<'map' | 'table' | 'acquisitions'>('map');

  const oilFunds = swfData.filter(f => f.source === 'Oil & Gas');
  const oilAUM = oilFunds.reduce((s, f) => s + f.aum, 0);
  const middleEastAUM = swfData.filter(f => f.region === 'Middle East').reduce((s, f) => s + f.aum, 0);
  const highDefense = swfData.filter(f => f.defenseExposure === 'High');

  const regions = [...new Set(swfData.map(f => f.region))].sort();
  const sources = [...new Set(swfData.map(f => f.source))].sort();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-blue-900/20" />
        <div className="max-w-7xl mx-auto px-4 py-12 relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🏛️</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Global Sovereign Wealth Fund Map
              </h1>
              <p className="text-slate-400 mt-1">
                Geopolitical leverage through capital — $13.5T+ in state-controlled assets shaping global power
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
            <StatCard label="Total Global AUM" value={`$${(totalGlobalAUM / 1000).toFixed(1)}T`} sub={`${swfData.length} funds tracked`} color="text-amber-400" />
            <StatCard label="Oil & Gas Funded" value={`$${(oilAUM / 1000).toFixed(1)}T`} sub={`${oilFunds.length} petro-funds`} color="text-yellow-500" />
            <StatCard label="Middle East" value={`$${(middleEastAUM / 1000).toFixed(1)}T`} sub="Largest concentration" color="text-orange-400" />
            <StatCard label="High Defense Exposure" value={`${highDefense.length}`} sub={highDefense.map(f => f.country).join(', ')} color="text-red-400" />
            <StatCard label="Oldest Fund" value="1854" sub="Texas Permanent School Fund" color="text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters and tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex gap-1 bg-slate-800/60 rounded-lg p-1">
            {(['map', 'table', 'acquisitions'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${activeTab === tab ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {tab === 'map' ? '🗺️ Map' : tab === 'table' ? '📊 Rankings' : '🎯 Acquisitions'}
              </button>
            ))}
          </div>

          <select
            value={filterRegion}
            onChange={e => setFilterRegion(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-300"
          >
            <option value="">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <select
            value={filterSource}
            onChange={e => setFilterSource(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-300"
          >
            <option value="">All Sources</option>
            {sources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {(filterRegion || filterSource) && (
            <button
              onClick={() => { setFilterRegion(''); setFilterSource(''); }}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Main content */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <BubbleMap
                  funds={swfData}
                  selectedFund={selectedFund}
                  onSelect={setSelectedFund}
                  filterRegion={filterRegion}
                  filterSource={filterSource}
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-3 px-2">
                {Object.entries(regionColors).map(([region, color]) => (
                  <div key={region} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs text-slate-500">{region}</span>
                  </div>
                ))}
                <div className="text-xs text-slate-600 ml-4">Bubble size = AUM</div>
              </div>

              {selectedFund && (
                <div className="mt-4">
                  <FundDetail fund={selectedFund} onClose={() => setSelectedFund(null)} />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <BarChart data={regionBreakdown} colorMap={regionColors} title="AUM by Region" />
              <BarChart data={sourceBreakdown} colorMap={sourceColors} title="AUM by Funding Source" />

              {/* Key insights */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Key Geopolitical Insights</h3>
                <div className="space-y-3 text-xs text-slate-400">
                  <div className="flex gap-2">
                    <span className="text-amber-400 mt-0.5">▸</span>
                    <p><strong className="text-slate-300">Middle East petro-wealth</strong> controls ~$3.9T — more than Europe and North America combined. The Gulf states are converting depleting oil reserves into permanent financial leverage.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-400 mt-0.5">▸</span>
                    <p><strong className="text-slate-300">China&apos;s shadow empire:</strong> CIC, SAFE, and NSSF collectively manage $2.9T with minimal transparency. Strategic Western infrastructure acquisitions face increasing CFIUS resistance.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-400 mt-0.5">▸</span>
                    <p><strong className="text-slate-300">Russia&apos;s depleted war chest:</strong> National Wealth Fund down from $180B to ~$150B funding Ukraine war. Western assets frozen under sanctions — a cautionary tale for other autocracies.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-400 mt-0.5">▸</span>
                    <p><strong className="text-slate-300">The transparency gap:</strong> Norway publishes every holding. China, UAE, and Qatar disclose almost nothing. Opacity enables strategic acquisitions without scrutiny.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-400 mt-0.5">▸</span>
                    <p><strong className="text-slate-300">Semiconductor leverage:</strong> Mubadala&apos;s ownership of GlobalFoundries gives Abu Dhabi direct control over a top-5 chipmaker — a unique defense-tech position for a Gulf state.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <h2 className="text-lg font-bold text-white mb-4">Global SWF Rankings by AUM</h2>
            <TopFundsTable funds={swfData} onSelect={setSelectedFund} />
            {selectedFund && (
              <div className="mt-4">
                <FundDetail fund={selectedFund} onClose={() => setSelectedFund(null)} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'acquisitions' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <h2 className="text-lg font-bold text-white mb-2">Notable SWF Acquisitions & Investments</h2>
            <p className="text-sm text-slate-500 mb-4">Major cross-border deals revealing geopolitical leverage through capital</p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-2 text-slate-500">Fund</th>
                    <th className="text-left py-2 px-2 text-slate-500">Target</th>
                    <th className="text-left py-2 px-2 text-slate-500">Sector</th>
                    <th className="text-right py-2 px-2 text-slate-500">Value ($B)</th>
                    <th className="text-center py-2 px-2 text-slate-500">Year</th>
                    <th className="text-center py-2 px-2 text-slate-500">Target Country</th>
                    <th className="text-center py-2 px-2 text-slate-500">CFIUS</th>
                    <th className="text-center py-2 px-2 text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {notableAcquisitions.sort((a, b) => b.value - a.value).map((acq, i) => (
                    <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-2 px-2 text-slate-300 font-medium">{acq.fund}</td>
                      <td className="py-2 px-2 text-slate-400">{acq.target}</td>
                      <td className="py-2 px-2">
                        <span className="px-1.5 py-0.5 bg-slate-700/60 rounded text-slate-300 text-[10px]">{acq.sector}</span>
                      </td>
                      <td className="py-2 px-2 text-right text-amber-400 font-mono">{acq.value.toLocaleString()}</td>
                      <td className="py-2 px-2 text-center text-slate-500">{acq.year}</td>
                      <td className="py-2 px-2 text-center text-slate-400">{acq.country}</td>
                      <td className="py-2 px-2 text-center">{acq.cfiusReview ? '⚠️' : '—'}</td>
                      <td className="py-2 px-2 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          acq.status === 'Completed' ? 'bg-green-900/40 text-green-400' :
                          acq.status === 'Blocked' ? 'bg-red-900/40 text-red-400' :
                          acq.status === 'Divested' ? 'bg-orange-900/40 text-orange-400' :
                          'bg-blue-900/40 text-blue-400'
                        }`}>
                          {acq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">CFIUS & Geopolitical Friction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The Committee on Foreign Investment in the United States (CFIUS) has increasingly blocked or forced divestiture of SWF acquisitions in sensitive sectors. 
                China&apos;s CIC and SAFE face the highest scrutiny, particularly for infrastructure, technology, and defense-adjacent investments. 
                Gulf state funds generally receive lighter treatment, though Mubadala&apos;s GlobalFoundries acquisition underwent extensive national security review. 
                The trend is toward broader definitions of &ldquo;national security&rdquo; including semiconductors, AI, biotech, and critical infrastructure — 
                narrowing the investable universe for state-controlled capital.
              </p>
            </div>
          </div>
        )}

        {/* Sources */}
        <div className="mt-8 border-t border-slate-800 pt-6 pb-8">
          <h3 className="text-sm font-semibold text-slate-500 mb-2">Sources & Methodology</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Data compiled from Sovereign Wealth Fund Institute (SWFI), IMF Sovereign Wealth Funds Survey, CFIUS Annual Reports to Congress, 
            Preqin Sovereign Wealth Fund Review, individual fund annual reports and disclosures. AUM figures as of latest available reporting 
            (2024-2025). Defense and technology exposure ratings based on disclosed portfolio holdings, known acquisitions, and sector-level 
            investment mandates. Transparency ratings follow Linaburg-Maduell Transparency Index methodology. Some funds (particularly Chinese 
            and Gulf state entities) may have significantly larger or different actual holdings than publicly disclosed.
          </p>
          <div className="flex flex-wrap gap-4 mt-3">
            <a href="https://www.swfinstitute.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-600 hover:text-amber-400">SWFI Institute →</a>
            <a href="https://home.treasury.gov/policy-issues/international/the-committee-on-foreign-investment-in-the-united-states-cfius" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-600 hover:text-amber-400">CFIUS Reports →</a>
            <a href="https://www.preqin.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-600 hover:text-amber-400">Preqin →</a>
            <a href="https://www.imf.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-600 hover:text-amber-400">IMF →</a>
          </div>
        </div>
      </div>
    </main>
  );
}
