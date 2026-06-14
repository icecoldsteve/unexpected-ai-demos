import { useState, useEffect } from 'react'

// Type definitions
type DemoId = 'pool' | 'receptionist' | 'property' | 'visibility' | 'minigame'

interface Demo {
  id: DemoId
  title: string
  emoji: string
  tagline: string
  description: string
  benefit: string
  color: string
}

const demos: Demo[] = [
  {
    id: 'pool',
    title: 'Pool Scanner',
    emoji: '🏊',
    tagline: 'OpenClaw Agent',
    description: 'AI scans US homes with large backyards but no pool. Generates photorealistic previews, value estimates & ready-to-send sales pitches.',
    benefit: 'Turn cold homes into warm leads in seconds',
    color: '#22c55e'
  },
  {
    id: 'receptionist',
    title: 'AI Receptionist',
    emoji: '💬',
    tagline: '24/7 Lead Qualifier',
    description: 'Never miss a message again. AI replies instantly on WhatsApp, Instagram, Telegram. Books appointments & delivers qualified leads.',
    benefit: 'Double bookings from after-hours inquiries',
    color: '#3b82f6'
  },
  {
    id: 'property',
    title: 'Property Scanner',
    emoji: '🏠',
    tagline: 'Roof • Solar • Insurance',
    description: 'Satellite + vision AI scans entire neighborhoods. Identifies roof damage, solar potential, insurance risks. Auto-generates offers.',
    benefit: '15-25 warm leads per week, zero door-knocking',
    color: '#f59e0b'
  },
  {
    id: 'visibility',
    title: 'AI Visibility Scanner',
    emoji: '🔍',
    tagline: 'ChatGPT & Perplexity Ready',
    description: 'Audits small business websites for AI search readability. Generates missing content and optimizations that make your business appear in AI answers.',
    benefit: '3-7× more traffic from AI search in 60 days',
    color: '#8b5cf6'
  },
  {
    id: 'minigame',
    title: 'AI Mini Games',
    emoji: '🎮',
    tagline: 'Branded Viral Experiences',
    description: 'Rapid creation of branded interactive mini games (wheel of fortune, quiz) that can be sold for thousands.',
    benefit: 'Higher engagement than any static ad creative',
    color: '#ec4899'
  }
]

function App() {
  const [activeDemo, setActiveDemo] = useState<DemoId | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  // PWA Install Prompt
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }
    
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
  }

  const openDemo = (id: DemoId) => {
    setActiveDemo(id)
    document.body.style.overflow = 'hidden'
  }

  const closeDemo = () => {
    setActiveDemo(null)
    document.body.style.overflow = 'visible'
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDemo) closeDemo()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [activeDemo])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xl font-bold">AI</div>
            <div>
              <div className="font-semibold tracking-tight text-xl">Unexpected AI</div>
              <div className="text-[10px] text-white/50 -mt-1">PROFIT AUTOMATIONS</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <a href="#demos" className="hover:text-emerald-400 transition-colors px-3 py-1.5">Demos</a>
            <a href="https://x.com/rostikdeni/status/2065476430688133302" target="_blank" rel="noopener" className="hover:text-emerald-400 transition-colors px-3 py-1.5">Original Post</a>
            
            {!isInstalled && deferredPrompt && (
              <button 
                onClick={handleInstall}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 active:scale-[0.985] transition-all"
              >
                <span>Install App</span>
              </button>
            )}
            {isInstalled && (
              <div className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Installed
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 text-xs tracking-[2px] mb-6 border border-white/10">
          INSPIRED BY REAL AI AGENTS • 2026
        </div>
        
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-4">
          Unexpected AI<br />Automations That<br />Print Money
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-white/70 mb-8">
          AI that finds customers on its own, creates stunning visualizations, calculates ROI, 
          and prepares complete sales pitches — fully automated.
        </p>

        {/* Stats from the post */}
        <div className="flex flex-wrap justify-center gap-8 text-sm mb-10">
          <div className="text-center">
            <div className="text-3xl font-semibold text-emerald-400">91%</div>
            <div className="text-white/60">of AI-using SMBs saw revenue growth</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-emerald-400">27%</div>
            <div className="text-white/60">higher revenue per employee in AI-heavy industries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-emerald-400">3×</div>
            <div className="text-white/60">faster growth vs non-AI companies</div>
          </div>
        </div>

        <a href="#demos" 
           className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-2xl bg-white text-black font-medium text-base hover:bg-white/90 active:scale-[0.985] transition-all shadow-xl shadow-black/50">
          Explore the 5 Demos <span className="text-xl">↓</span>
        </a>
        <div className="mt-3 text-xs text-white/40">No sign-up • Fully client-side • Works offline after install</div>
      </div>

      {/* Demos Grid */}
      <div id="demos" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-emerald-400 text-sm tracking-widest font-medium">THE 5 UNEXPECTED OPPORTUNITIES</div>
            <div className="text-4xl font-semibold tracking-tight">AI Agents That Sell Themselves</div>
          </div>
          <div className="hidden md:block text-right text-sm text-white/50 max-w-[220px]">
            Click any card to launch the interactive demo
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {demos.map((demo) => (
            <div 
              key={demo.id}
              onClick={() => openDemo(demo.id)}
              className="group cursor-pointer bg-[#111] hover:bg-[#161616] border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col transition-all active:scale-[0.985]"
            >
              <div className="text-5xl mb-4 opacity-90 group-hover:scale-110 transition-transform inline-block">{demo.emoji}</div>
              
              <div className="font-semibold text-2xl tracking-tight mb-1">{demo.title}</div>
              <div className="text-xs uppercase tracking-[1.5px] text-white/50 mb-3">{demo.tagline}</div>
              
              <p className="text-white/70 text-[15px] leading-snug flex-1 mb-4">
                {demo.description}
              </p>
              
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm">
                <div className="text-emerald-400 font-medium flex items-center gap-1.5">
                  {demo.benefit}
                </div>
                <div className="text-white/40 group-hover:text-white/70 transition-colors">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Credit */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/40">
        Built as a fully functional PWA demo • Inspired by <a href="https://x.com/rostikdeni" target="_blank" className="hover:text-white underline">@rostikdeni</a>'s thread on unexpected AI automations • 
        Deployed on Vercel • Open source on GitHub
      </footer>

      {/* Demo Modals */}
      {activeDemo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={closeDemo}>
          <div 
            className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-[#111]">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{demos.find(d => d.id === activeDemo)?.emoji}</div>
                <div>
                  <div className="font-semibold text-2xl tracking-tight">{demos.find(d => d.id === activeDemo)?.title}</div>
                  <div className="text-sm text-white/50">{demos.find(d => d.id === activeDemo)?.tagline}</div>
                </div>
              </div>
              <button 
                onClick={closeDemo}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-2xl leading-none text-white/60 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal Content - Dynamic per demo */}
            <div className="flex-1 overflow-auto p-8">
              {activeDemo === 'pool' && <PoolScannerDemo />}
              {activeDemo === 'receptionist' && <AIReceptionistDemo />}
              {activeDemo === 'property' && <PropertyScannerDemo />}
              {activeDemo === 'visibility' && <VisibilityScannerDemo />}
              {activeDemo === 'minigame' && <MiniGameDemo />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ==================== DEMO COMPONENTS ====================

// 1. Pool Scanner Demo
function PoolScannerDemo() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)

  const properties = [
    { id: 'bh1', address: '1247 Laurel Way, Beverly Hills, CA', price: '$1.85M', lot: '0.72 acres', backyard: 'Large flat lawn, south-facing, mature trees' },
    { id: 'malibu', address: '892 Pacific Coast Hwy, Malibu, CA', price: '$3.2M', lot: '1.1 acres', backyard: 'Ocean view slope, 180° privacy' },
    { id: 'austin', address: '4512 Westlake Dr, Austin, TX', price: '$925k', lot: '0.65 acres', backyard: 'Huge backyard, pool-ready, no HOA' },
  ]

  const handleScan = () => {
    if (!selectedProperty) return
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setShowResults(true)
    }, 1850)
  }

  const currentProp = properties.find(p => p.id === selectedProperty)

  const copyPitch = () => {
    const pitch = `Hi there,\n\nI noticed your beautiful home at ${currentProp?.address}. Your spacious ${currentProp?.lot} backyard is perfect for a resort-style pool.\n\nOur AI analysis shows a potential value increase of $95,000–$135,000 after installation.\n\nWould you be open to a free 3D visualization of exactly how it would look in your yard?\n\nBest,\nAlex Rivera\nOpenClaw Pools • (310) 555-0142`
    navigator.clipboard.writeText(pitch)
    triggerConfetti()
    alert('✅ Sales pitch copied to clipboard! Ready to send via email or DM.')
  }

  const downloadPDF = () => {
    const { jsPDF } = (window as any).jspdf
    if (!jsPDF || !currentProp) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Header
    doc.setFillColor(16, 185, 129) // emerald
    doc.rect(0, 0, pageWidth, 35, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.text('OpenClaw Pools — AI Property Analysis', pageWidth / 2, 18, { align: 'center' })
    doc.setFontSize(11)
    doc.text('Confidential • Prepared for Homeowner', pageWidth / 2, 26, { align: 'center' })

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(14)
    doc.text('Property Analysis Report', 20, 50)

    // Property details
    doc.setFontSize(12)
    doc.text(`Property: ${currentProp.address}`, 20, 62)
    doc.text(`Estimated Value: ${currentProp.price}`, 20, 70)
    doc.text(`Lot Size: ${currentProp.lot}`, 20, 78)
    doc.text(`Backyard Notes: ${currentProp.backyard}`, 20, 86)

    // AI Analysis box
    doc.setDrawColor(16, 185, 129)
    doc.setLineWidth(0.5)
    doc.rect(20, 95, pageWidth - 40, 55, 'S')
    doc.setFontSize(13)
    doc.text('AI Analysis Summary', 25, 103)
    doc.setFontSize(11)
    doc.text('• Large usable backyard with excellent southern exposure', 25, 112)
    doc.text('• Ideal soil & drainage conditions for pool installation', 25, 119)
    doc.text('• High potential for significant property value increase', 25, 126)
    doc.text('• Recommended: Resort-style pool with spa + landscaping', 25, 133)

    // Financials
    doc.setFontSize(12)
    doc.text('Projected Financial Impact', 20, 160)
    doc.setFontSize(11)
    doc.text('Estimated Project Cost:          $48,000 – $68,000', 25, 169)
    doc.text('Expected Value Increase:        $95,000 – $135,000', 25, 176)
    doc.text('Net Equity Gain (approx):       $47,000 – $67,000', 25, 183)
    doc.text('Estimated Payback Period:       4.2 years', 25, 190)
    doc.text('5-Year ROI:                     2.1×', 25, 197)

    // Pitch
    doc.setFontSize(12)
    doc.text('Personalized Sales Pitch', 20, 212)
    doc.setFontSize(10)
    const pitchLines = [
      `Dear Homeowner at ${currentProp.address.split(',')[0]},`,
      '',
      'Our AI-powered property scanner identified your home as an excellent candidate for a custom pool.',
      `With ${currentProp.lot} of beautiful backyard space and strong southern exposure, adding a resort-style`,
      'pool could dramatically enhance both lifestyle and resale value.',
      '',
      `Conservative estimates show a value increase of $95k–$135k after installation (cost $48k–$68k).`,
      'Many homeowners in similar properties report the pool paying for itself through increased equity',
      'and enjoyment within just a few years.',
      '',
      'Would you like us to prepare a free, personalized 3D visualization and detailed proposal?',
      '',
      'Best regards,',
      'Alex Rivera | OpenClaw AI Agent',
      '(310) 555-0142 | alex@openclaw.example'
    ]
    let y = 220
    pitchLines.forEach(line => {
      doc.text(line, 25, y)
      y += 6
    })

    // Footer
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text('Generated by OpenClaw AI Agent • ' + new Date().toLocaleDateString(), pageWidth / 2, 285, { align: 'center' })
    doc.text('This is a demo report. Real version would include satellite imagery + exact cost calculator.', pageWidth / 2, 291, { align: 'center' })

    doc.save(`OpenClaw_Property_Report_${currentProp.address.split(',')[0].replace(/\s+/g, '_')}.pdf`)
    triggerConfetti()
  }

  // Simple confetti for celebrations
  const triggerConfetti = () => {
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899']
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const confetto = document.createElement('div')
        confetto.className = 'fixed pointer-events-none z-[200] text-2xl'
        confetto.style.left = Math.random() * window.innerWidth + 'px'
        confetto.style.top = '-20px'
        confetto.style.transition = 'transform 1.8s linear, opacity 1.8s linear'
        confetto.innerHTML = ['🎉', '✨', '💎', '🏆'][Math.floor(Math.random() * 4)]
        document.body.appendChild(confetto)

        const angle = Math.random() * 80 + 40
        const velocity = Math.random() * 3 + 2
        let y = -20
        let x = parseFloat(confetto.style.left)
        const interval = setInterval(() => {
          y += velocity
          x += Math.sin(y / 30) * 1.5
          confetto.style.transform = `translate(${x - parseFloat(confetto.style.left)}px, ${y}px) rotate(${y * 2}deg)`
          if (y > window.innerHeight + 50) {
            clearInterval(interval)
            confetto.remove()
          }
        }, 16)
      }, i * 3)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!showResults ? (
        <>
          <p className="text-white/70 mb-6 text-lg">AI agent scans public records + satellite imagery to find high-intent homeowners who have the space but haven’t considered a pool yet.</p>
          
          <div className="mb-4 text-sm uppercase tracking-widest text-white/50">SELECT A DEMO PROPERTY</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {properties.map(prop => (
              <button
                key={prop.id}
                onClick={() => setSelectedProperty(prop.id)}
                className={`text-left p-4 rounded-2xl border transition-all ${selectedProperty === prop.id ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 hover:border-white/30 bg-[#111]'}`}
              >
                <div className="font-medium">{prop.address.split(',')[0]}</div>
                <div className="text-xs text-white/50 mt-0.5">{prop.address.split(', ').slice(1).join(', ')}</div>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-emerald-400">{prop.price}</span>
                  <span className="text-white/60">{prop.lot}</span>
                </div>
              </button>
            ))}
          </div>

          <button 
            onClick={handleScan}
            disabled={!selectedProperty || isScanning}
            className="w-full h-14 rounded-2xl bg-emerald-500 disabled:bg-white/10 disabled:text-white/40 text-black font-semibold text-lg flex items-center justify-center gap-3 active:scale-[0.985] transition-all disabled:cursor-not-allowed"
          >
            {isScanning ? (
              <>🛰️ AI Agent Scanning Google Maps + County Records...</>
            ) : (
              <>Launch OpenClaw Agent — Find & Pitch</>
            )}
          </button>
          <div className="text-center text-xs text-white/40 mt-3">Takes ~2 seconds • 100% simulated for demo</div>
        </>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="uppercase text-emerald-400 text-xs tracking-[2px]">ANALYSIS COMPLETE</div>
              <div className="text-2xl font-semibold tracking-tight">{currentProp?.address}</div>
            </div>
            <button onClick={() => { setShowResults(false); setSelectedProperty(null); setSliderValue(50) }} className="text-sm px-4 py-2 rounded-xl border border-white/20 hover:bg-white/5">← New Scan</button>
          </div>

          {/* Before / After Slider */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2 px-1">
              <div>BEFORE <span className="text-white/50">(Current)</span></div>
              <div>AFTER <span className="text-emerald-400">(AI Visualization)</span></div>
            </div>
            
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              <img 
                src="https://picsum.photos/id/1016/1200/675" 
                alt="Current backyard" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 overflow-hidden border-r border-emerald-500/70" 
                style={{ width: `${sliderValue}%` }}
              >
                <img 
                  src="https://picsum.photos/id/160/1200/675" 
                  alt="AI generated pool visualization" 
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ width: `${10000 / sliderValue}%`, maxWidth: 'none' }}
                />
              </div>
              
              {/* Slider handle */}
              <input 
                type="range" 
                min="5" 
                max="95" 
                value={sliderValue} 
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 accent-emerald-500 cursor-pointer"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] bg-black/60 px-2 py-px rounded text-white/60 pointer-events-none">DRAG TO COMPARE</div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Est. Value Increase', value: '$95k – $135k' },
              { label: 'Project Cost Range', value: '$48k – $68k' },
              { label: 'Payback Period', value: '4.2 years' },
              { label: '5-Year ROI', value: '2.1×' },
            ].map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <div className="text-xs text-white/50">{m.label}</div>
                <div className="text-2xl font-semibold tracking-tight mt-1 text-emerald-400">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Sales Pitch */}
          <div className="bg-[#111] border border-white/10 rounded-3xl p-7">
            <div className="uppercase tracking-widest text-xs text-white/50 mb-3">AI-GENERATED PERSONALIZED PITCH</div>
            <div className="text-white/80 text-[15px] leading-relaxed whitespace-pre-line mb-5 font-light">
              Hi there,<br /><br />
              I noticed your beautiful home at {currentProp?.address}. With {currentProp?.lot} of usable backyard space and excellent southern exposure, this is one of the best candidates I've seen for a custom pool this month.<br /><br />
              Our quick analysis shows adding a resort-style pool could increase your home's value by <span className="text-emerald-400 font-medium">$95,000 – $135,000</span>.<br /><br />
              Would you like me to send over a free personalized 3D visualization?
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={copyPitch} className="flex-1 md:flex-none px-6 h-11 rounded-2xl bg-white text-black font-medium flex items-center justify-center gap-2 active:scale-[0.985]">
                📋 Copy Full Pitch to Clipboard
              </button>
              <button onClick={downloadPDF} className="flex-1 md:flex-none px-6 h-11 rounded-2xl bg-emerald-500 text-white font-medium flex items-center justify-center gap-2 active:scale-[0.985]">
                📄 Download Professional PDF Report
              </button>
              <button onClick={() => alert('✅ In real agent: This would email the homeowner + log in CRM + schedule follow-up call.')} className="flex-1 md:flex-none px-6 h-11 rounded-2xl border border-white/30 hover:bg-white/5 font-medium">
                Send via Email + Log Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 2. AI Receptionist Demo
function AIReceptionistDemo() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Hi! This is Mike's Auto Repair. How can I help you today?" }
  ])
  const [input, setInput] = useState('')
  const [leads, setLeads] = useState<any[]>([])
  const [vehicleInfo, setVehicleInfo] = useState('')
  const [appointmentBooked, setAppointmentBooked] = useState(false)

  const quickReplies = [
    "Hi, my brakes are making a grinding noise",
    "Do you have time this week for an oil change?",
    "What's your price for a transmission flush?"
  ]

  const generateAIResponse = (userMsg: string): string => {
    const msg = userMsg.toLowerCase()

    // More realistic, context-aware responses
    if ((msg.includes('brake') || msg.includes('noise') || msg.includes('grinding')) && !vehicleInfo) {
      return "Thanks for letting me know — grinding brakes are often pads or rotors. To give you an accurate quote and book the right slot, could you share the make, model, and year of your vehicle? Also, roughly when did the noise start?"
    }

    if (msg.includes('honda') || msg.includes('toyota') || msg.includes('ford') || msg.includes('chevy') || msg.includes('bmw') || msg.includes('202') || msg.includes('201')) {
      if (!vehicleInfo) {
        setVehicleInfo(userMsg) // remember it
        return "Thanks! Noted — " + userMsg + ". For brake work on that vehicle we usually need 45–60 minutes. We have good availability this week. Would Thursday or Friday afternoon work for a brake inspection?"
      }
    }

    if (msg.includes('oil') || msg.includes('change')) {
      return "Oil changes are quick — we can usually do them same-day. We have openings Thursday 2pm, 3:30pm and Friday morning. Which time slot works best for you?"
    }

    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('quote')) {
      if (msg.includes('brake')) {
        return "Brake inspection + pad replacement on most vehicles runs $189–$349 depending on parts. I can lock in Thursday at 2pm and send a firm quote once I have the exact year/make/model. Sound good?"
      }
      return "Transmission flush is typically $189–$249. Want me to check what your specific vehicle needs and text you a precise quote?"
    }

    if ((msg.includes('yes') || msg.includes('book') || msg.includes('thursday') || msg.includes('friday') || msg.includes('2pm')) && !appointmentBooked) {
      setAppointmentBooked(true)
      return "Excellent! I've reserved Thursday at 2:00pm for you. To finalize, could you please share your name and best phone number? I'll have Mike text you a confirmation and any prep instructions the night before."
    }

    if (msg.includes('name is') || msg.includes('my name') || (msg.includes('call me') && msg.length < 60)) {
      // Simulate collecting contact info
      return "Perfect, thank you! I've noted everything. Your appointment is confirmed for Thursday 2pm. You'll receive a text confirmation shortly from Mike's Auto Repair. Is there anything else I can help with today?"
    }

    if (appointmentBooked) {
      return "Your appointment is all set for Thursday at 2pm. If anything changes just reply here — we're happy to reschedule. Safe driving!"
    }

    // Fallback with more helpful tone
    return "Got it. To give you the fastest and most accurate help, could you tell me the vehicle make/model/year and what issue or service you're looking for?"
  }

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    setMessages(prev => [...prev, { from: 'user', text: messageText }])
    setInput('')

    setTimeout(() => {
      const aiReply = generateAIResponse(messageText)
      setMessages(prev => [...prev, { from: 'ai', text: aiReply }])

      // Simulate lead qualification
      if (aiReply.includes('name and phone') || messageText.toLowerCase().includes('book')) {
        const newLead = {
          id: Date.now(),
          name: 'Alex Rivera',
          phone: '(310) 555-9821',
          service: messageText.includes('brake') ? 'Brake inspection' : 'Oil change / Maintenance',
          time: 'Thu 2:00pm',
          status: 'Qualified'
        }
        setLeads(prev => [newLead, ...prev].slice(0, 4))
      }
    }, 650)
  }

  return (
    <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
      {/* Chat */}
      <div className="md:col-span-3 bg-[#111] rounded-3xl border border-white/10 flex flex-col h-[520px]">
        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">🔧</div>
          <div>
            <div className="font-medium">Mike's Auto Repair • AI Assistant</div>
            <div className="text-xs text-emerald-400">Online • Responds in &lt;3s</div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4 text-sm">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : ''}`}>
              <div className={`max-w-[82%] px-4 py-3 rounded-3xl ${m.from === 'user' ? 'bg-white text-black' : 'bg-white/10'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2 mb-3 flex-wrap">
            {quickReplies.map((qr, idx) => (
              <button key={idx} onClick={() => sendMessage(qr)} className="text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/5 transition-colors">
                {qr.length > 42 ? qr.slice(0,40)+'…' : qr}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message as the customer..." 
              className="flex-1 bg-black border border-white/20 rounded-2xl px-5 h-11 text-sm focus:outline-none focus:border-white/40" 
            />
            <button onClick={() => sendMessage()} className="px-6 rounded-2xl bg-white text-black font-medium">Send</button>
          </div>
        </div>
      </div>

      {/* Leads Sidebar */}
      <div className="md:col-span-2 bg-[#111] rounded-3xl border border-white/10 p-6 flex flex-col">
        <div className="font-semibold mb-1 flex items-center justify-between">
          <span>Qualified Leads Today</span>
          <span className="text-emerald-400 text-xs px-2 py-0.5 bg-emerald-500/10 rounded">LIVE</span>
        </div>
        <div className="text-xs text-white/50 mb-4">Auto-synced to owner’s CRM / phone</div>

        {leads.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-center text-white/40 text-sm">
            Send a message in the chat.<br />Qualified leads will appear here automatically.
          </div>
        )}

        <div className="space-y-3 flex-1">
          {leads.map(lead => (
            <div key={lead.id} className="bg-black/40 border border-white/10 rounded-2xl p-4 text-sm">
              <div className="font-medium">{lead.name} • {lead.phone}</div>
              <div className="text-emerald-400 text-xs mt-0.5">{lead.service} • {lead.time}</div>
              <div className="text-[10px] text-white/50 mt-2">Status: {lead.status} • AI qualified</div>
            </div>
          ))}
        </div>

        <div className="text-[10px] text-center text-white/40 pt-4 border-t border-white/10">This demo shows how small businesses never lose a customer to slow replies again.</div>
      </div>
    </div>
  )
}

// 3. Property Scanner Demo
function PropertyScannerDemo() {
  const [scanned, setScanned] = useState(false)
  const [selectedArea, setSelectedArea] = useState('phoenix')

  const areas: Record<string, any> = {
    phoenix: { name: 'Phoenix Metro Suburbs', leads: 23, roofIssues: 14, solarHigh: 9 },
    austin: { name: 'Austin Hill Country', leads: 17, roofIssues: 8, solarHigh: 11 },
    orlando: { name: 'Orlando & Winter Park', leads: 31, roofIssues: 19, solarHigh: 7 },
  }

  const current = areas[selectedArea]

  const handleScan = () => {
    setScanned(true)
  }

  return (
    <div>
      <p className="text-white/70 mb-6">Vision AI + satellite data turns entire cities into sales pipelines for roofers, solar companies, and insurers.</p>

      <div className="flex gap-2 mb-6">
        {Object.keys(areas).map(key => (
          <button key={key} onClick={() => { setSelectedArea(key); setScanned(false) }} className={`px-5 py-2 text-sm rounded-full border transition-all ${selectedArea === key ? 'bg-white text-black border-white' : 'border-white/20 hover:bg-white/5'}`}>
            {areas[key].name}
          </button>
        ))}
      </div>

      {!scanned ? (
        <button onClick={handleScan} className="w-full py-4 rounded-3xl bg-amber-500 text-black font-semibold text-lg active:scale-[0.985]">🛰️ Scan {current.name} — Identify Opportunities</button>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-emerald-400 text-xs tracking-widest">SCAN COMPLETE • {current.leads} PROPERTIES FLAGGED</div>
              <div className="text-3xl font-semibold tracking-tight">Ready-to-Sell Leads in {current.name}</div>
            </div>
            <button onClick={() => setScanned(false)} className="text-sm underline">Rescan another area</button>
          </div>

          <img src="https://picsum.photos/id/201/1200/630" alt="Satellite view of scanned neighborhood" className="w-full rounded-3xl border border-white/10" />

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Roof Damage Detected', count: current.roofIssues, desc: 'Missing shingles, curling, storm damage' },
              { title: 'High Solar Potential', count: current.solarHigh, desc: 'Ideal pitch + southern exposure' },
              { title: 'Insurance Risk Flagged', count: Math.floor(current.leads * 0.6), desc: 'Older roofs, high claim probability' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#111] rounded-3xl p-6 border border-white/10">
                <div className="text-4xl font-semibold text-amber-400 mb-1">{item.count}</div>
                <div className="font-medium mb-1">{item.title}</div>
                <div className="text-sm text-white/60">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="text-xs text-white/50 text-center">In production: Each lead includes owner contact, exact address, AI-generated before/after roof photos, cost estimate & personalized offer letter.</div>
        </div>
      )}
    </div>
  )
}

// 4. AI Visibility Scanner Demo
function VisibilityScannerDemo() {
  const [url, setUrl] = useState('https://sunset-coffee.com')
  const [audited, setAudited] = useState(false)
  const [score, setScore] = useState(0)

  const runAudit = () => {
    setAudited(true)
    setScore(Math.floor(Math.random() * 25) + 38)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-white/70 mb-6">Most small business websites are invisible to ChatGPT, Perplexity, and Gemini. This agent fixes that.</p>

      <div className="flex gap-3 mb-6">
        <input 
          value={url} 
          onChange={e => setUrl(e.target.value)} 
          className="flex-1 bg-[#111] border border-white/20 rounded-2xl px-5 text-sm h-12 focus:outline-none" 
          placeholder="Enter business website URL"
        />
        <button onClick={runAudit} disabled={audited} className="px-8 rounded-2xl bg-violet-500 text-white font-medium disabled:bg-white/10">Run AI Audit</button>
      </div>

      {audited && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-6xl font-semibold text-violet-400 tabular-nums">{score}</div>
            <div>
              <div className="text-xl font-medium">AI Readability Score</div>
              <div className="text-sm text-white/50">Average for local service businesses</div>
            </div>
          </div>

          <div className="bg-[#111] rounded-3xl p-7 border border-white/10 space-y-5 text-sm">
            <div>
              <div className="font-medium mb-1 text-red-400">Issues Found</div>
              <ul className="list-disc pl-5 space-y-1 text-white/70">
                <li>No FAQ page or structured answers to common questions</li>
                <li>Missing service comparison tables & pricing transparency</li>
                <li>Headings not optimized for voice/AI search queries</li>
                <li>No schema markup for local business + services</li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-1 text-emerald-400">AI-Generated Recommendations (Ready to Publish)</div>
              <div className="bg-black/40 p-4 rounded-2xl text-xs font-mono whitespace-pre-line text-white/80">
{`Q: How much does a full detail cost at Sunset Coffee?
A: Our signature detail package starts at $189 and includes... 

Q: Do you offer mobile detailing near downtown?
A: Yes — we serve all of downtown, Midtown, and the Arts District within 8 miles.`}
              </div>
            </div>
          </div>

          <button onClick={() => alert('✅ In real version: This would generate a full PDF audit report + editable content files + one-click publish to Webflow/WordPress.')} className="w-full py-3.5 rounded-2xl border border-white/30 text-sm font-medium hover:bg-white/5">
            Download Full Audit + Optimized Content Pack
          </button>
        </div>
      )}
    </div>
  )
}

// 5. Mini Game Demo
function MiniGameDemo() {
  const [brandName, setBrandName] = useState('Sunset Coffee Co.')
  const [primaryColor, setPrimaryColor] = useState('#f59e0b')
  const [gameType, setGameType] = useState<'wheel' | 'quiz'>('wheel')
  const [isGenerated, setIsGenerated] = useState(false)
  const [spinAngle, setSpinAngle] = useState(0)
  const [result, setResult] = useState('')

  const prizes = ['Free Latte', '20% Off', 'Merch Pack', 'Free Pastry', 'Buy 5 Get 1']

  const generateGame = () => {
    setIsGenerated(true)
    setResult('')
    setSpinAngle(0)
  }

  const spinWheel = () => {
    const random = Math.floor(Math.random() * 360) + 1440
    const newAngle = spinAngle + random
    setSpinAngle(newAngle)

    setTimeout(() => {
      const normalized = newAngle % 360
      const segment = Math.floor(normalized / 72)
      const won = prizes[4 - segment]
      setResult(`🎉 You won: ${won}!`)
    }, 4200)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!isGenerated ? (
        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-white/50">Brand Name</label>
            <input value={brandName} onChange={e => setBrandName(e.target.value)} className="w-full mt-1.5 bg-[#111] border border-white/20 h-11 px-5 rounded-2xl" />
          </div>
          
          <div>
            <label className="text-xs uppercase tracking-widest text-white/50">Brand Color</label>
            <div className="flex gap-3 mt-1.5">
              <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-14 h-11 p-1 bg-[#111] rounded-2xl overflow-hidden border border-white/20" />
              <div className="flex-1 text-sm px-5 flex items-center bg-[#111] border border-white/20 rounded-2xl">{primaryColor}</div>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">Game Type</label>
            <div className="flex gap-3">
              {(['wheel', 'quiz'] as const).map(t => (
                <button key={t} onClick={() => setGameType(t)} className={`flex-1 py-3 rounded-2xl border text-sm font-medium capitalize transition-all ${gameType === t ? 'bg-white text-black border-white' : 'border-white/20'}`}>
                  {t === 'wheel' ? '🎡 Wheel of Fortune' : '❓ Trivia Quiz'}
                </button>
              ))}
            </div>
          </div>

          <button onClick={generateGame} className="w-full h-14 mt-4 rounded-3xl bg-pink-500 text-white font-semibold text-lg active:scale-[0.985]">
            ✨ Generate Branded Mini Game with AI
          </button>
          <div className="text-center text-xs text-white/40">Takes seconds • Fully playable • Exportable as standalone link</div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div style={{ color: primaryColor }} className="font-semibold text-2xl tracking-tight">{brandName}</div>
            <button onClick={() => { setIsGenerated(false); setResult('') }} className="text-xs px-4 py-2 border border-white/20 rounded-xl">← Edit & Regenerate</button>
          </div>

          {gameType === 'wheel' && (
            <div className="text-center">
              <div className="relative mx-auto w-80 h-80 mb-6" style={{ transform: `rotate(${spinAngle}deg)`, transition: spinAngle > 0 ? 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none' }}>
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                  {prizes.map((prize, i) => {
                    const startAngle = i * 72 - 90
                    const endAngle = startAngle + 72
                    const largeArc = 0
                    const x1 = 100 + 85 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 100 + 85 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 100 + 85 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 100 + 85 * Math.sin((endAngle * Math.PI) / 180)
                    const path = `M 100 100 L ${x1} ${y1} A 85 85 0 ${largeArc} 1 ${x2} ${y2} Z`
                    return (
                      <g key={i}>
                        <path d={path} fill={i % 2 === 0 ? primaryColor : '#111'} stroke="#fff" strokeWidth="1.5" />
                        <text 
                          x={100 + 52 * Math.cos(((startAngle + 36) * Math.PI) / 180)} 
                          y={100 + 52 * Math.sin(((startAngle + 36) * Math.PI) / 180)} 
                          fill="#fff" fontSize="9" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${startAngle + 36}, ${100 + 52 * Math.cos(((startAngle + 36) * Math.PI) / 180)}, ${100 + 52 * Math.sin(((startAngle + 36) * Math.PI) / 180)})`}
                        >
                          {prize}
                        </text>
                      </g>
                    )
                  })}
                  <circle cx="100" cy="100" r="18" fill="#111" stroke="#fff" strokeWidth="3" />
                </svg>
              </div>

              <button onClick={spinWheel} disabled={!!result} className="px-10 h-12 rounded-2xl bg-white text-black font-semibold disabled:opacity-60 active:scale-95 transition-all">
                SPIN THE WHEEL
              </button>

              {result && (
                <div className="mt-6 text-2xl font-semibold text-emerald-400">{result}</div>
              )}
              <div className="mt-8 text-xs text-white/50">This is a fully functional branded experience a freelancer can sell for $4,000–$7,500.</div>
            </div>
          )}

          {gameType === 'quiz' && (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🧠</div>
              <div className="text-xl mb-2">Trivia Quiz Generated!</div>
              <p className="text-white/60 max-w-xs mx-auto">In a real build: 8–12 questions about coffee, rewards, and brand story. Fully reskinned and instantly embeddable.</p>
              <button onClick={() => alert('In production this would launch a beautiful hosted quiz with lead capture form at the end.')} className="mt-8 px-8 py-3 rounded-2xl border border-white/30">Preview Sample Quiz →</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
