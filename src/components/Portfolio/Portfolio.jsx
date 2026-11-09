import React, { useState, useEffect, useCallback } from 'react';
import { 
  Eye, 
  ExternalLink, 
  X, 
  Smartphone, 
  Monitor, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Wifi, 
  Activity, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useInView } from '../../hooks/useAnimations';

const PORTFOLIO_PROJECTS = [
  {
    id: 'smartpos',
    name: 'SmartPOS Terminal',
    category: 'POS & ERP Systems',
    shortDescription: 'Industrial cloud POS terminal with offline sync & sub-second checkout.',
    fullDescription: 'An enterprise-grade hybrid point-of-sale terminal engine built for high-throughput retail and hospitality outlets. Features local SQLite offline persistence, continuous WebSocket bi-directional sync, biometric manager authorizations, and native thermal printing driver integration.',
    techStack: ['React', 'Node.js', 'Electron', 'PostgreSQL', 'WebSockets'],
    client: 'Apex Retail Group',
    metrics: [
      { label: 'Checkout Latency', value: '< 450ms' },
      { label: 'Offline Resilience', value: '100%' },
      { label: 'Monthly GMV Processed', value: '$14.2M' },
    ],
    features: [
      'Zero-downtime offline mode with automated idempotent background sync',
      'Multi-currency, split-tender, and cryptographic contactless payment support',
      'Hardware periphery drivers for thermal receipt printers, cash drawers, and barcode scanners',
      'Granular shift management and automated cash drawer balance variance audit'
    ],
    mockupType: 'pos'
  },
  {
    id: 'freshcart',
    name: 'FreshCart Mobile',
    category: 'Mobile Apps',
    shortDescription: 'Hyperlocal 15-minute grocery delivery app with predictive basket AI.',
    fullDescription: 'Next-generation mobile commerce platform tailored for rapid dark-store delivery. Integrates real-time driver telemetry with Mapbox geofencing, dynamic surge routing, push-notification replenishment triggers, and lightning fast 1-tap checkout.',
    techStack: ['React Native', 'GraphQL', 'Mapbox', 'Redis', 'AWS'],
    client: 'FreshCart Global',
    metrics: [
      { label: 'Order Dispatch Time', value: '8.4 mins' },
      { label: 'App Store Rating', value: '4.9 ★' },
      { label: 'Conversion Rate', value: '+34%' },
    ],
    features: [
      'Sub-meter live courier tracking with dynamic estimated time of arrival (ETA)',
      'Machine learning reorder suggestion engine based on historic consumption',
      'Sub-second instant search with typo tolerance and category auto-filtering',
      'Apple Pay & Google Pay frictionless biometric checkout pipelines'
    ],
    mockupType: 'mobile-grocery'
  },
  {
    id: 'pharmacare',
    name: 'PharmaCare Platform',
    category: 'Websites',
    shortDescription: 'Enterprise pharmacy management portal and digital prescription router.',
    fullDescription: 'HIPAA-compliant web platform serving hospital networks and independent pharmacies. Unifies e-prescriptions, clinical contraindication cross-checking, insurance claim pre-authorization, and temperature-controlled cold-chain inventory monitoring.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma', 'Supabase'],
    client: 'PharmaCare Health Systems',
    metrics: [
      { label: 'Prescriptions Processed', value: '1.8M+' },
      { label: 'Dispense Accuracy', value: '99.99%' },
      { label: 'Claim Approval Speed', value: '3.2x faster' },
    ],
    features: [
      'Automated drug-to-drug contraindication and allergy safety cross-checks',
      'Direct integration with national electronic prescription clearinghouses',
      'Batch expiry date telemetry and automated supplier replenishment triggers',
      'Encrypted patient communication portal with SMS dosage schedules'
    ],
    mockupType: 'saas-pharma'
  },
  {
    id: 'quickbite',
    name: 'QuickBite Orders',
    category: 'Mobile Apps',
    shortDescription: 'Contactless tableside & takeaway ordering app with interactive menu.',
    fullDescription: 'High-speed guest ordering and contactless payment mobile web application. Customers scan dynamic table QR codes to browse high-definition video menus, customize ingredients, split the check, and fire orders straight to the kitchen line without staff intervention.',
    techStack: ['Flutter', 'Firebase', 'Stripe', 'Golang', 'gRPC'],
    client: 'BiteVentures Hospitality',
    metrics: [
      { label: 'Table Turnaround', value: '+28%' },
      { label: 'Average Ticket Size', value: '+22%' },
      { label: 'Staff Overhead', value: '-35%' },
    ],
    features: [
      'Dynamic QR code deep-linking with real-time seat and table positioning',
      'Interactive ingredient modifier matrix with allergen warning indicators',
      'Individual bill splitting with asynchronous credit card and mobile wallet processing',
      'Direct Kitchen Display System (KDS) order routing with kitchen status pings'
    ],
    mockupType: 'mobile-food'
  },
  {
    id: 'retailsync',
    name: 'RetailSync ERP',
    category: 'POS & ERP Systems',
    shortDescription: 'Multi-branch omni-channel retail management & inventory ERP.',
    fullDescription: 'Scalable cloud ERP designed to bridge physical retail stores, warehouse hubs, and e-commerce storefronts. Centralizes product catalogs, cross-branch stock transfers, vendor purchase orders, accounting reconciliations, and executive intelligence dashboards.',
    techStack: ['React', 'TypeScript', 'FastAPI', 'Docker', 'Apache Kafka'],
    client: 'Apex Retail Group',
    metrics: [
      { label: 'Branches Connected', value: '140+' },
      { label: 'Stock Discrepancy', value: '< 0.02%' },
      { label: 'Sync Latency', value: '120ms' },
    ],
    features: [
      'Event-driven inventory synchronization powered by distributed Kafka pipelines',
      'Intelligent predictive stock transfers between regional fulfillment centers',
      'Comprehensive ledger, tax calculation, and automated invoice reconciliation',
      'Custom role-based permissions with immutable multi-tenant audit logs'
    ],
    mockupType: 'erp-dashboard'
  },
  {
    id: 'cloudkitchen',
    name: 'CloudKitchen Web',
    category: 'Websites',
    shortDescription: 'Multi-brand ghost kitchen order consolidation and dispatch hub.',
    fullDescription: 'An ultra-fast web dispatch command center for virtual dark kitchens operating up to 15 food brands in a single kitchen footprint. Ingests orders simultaneously from UberEats, Deliveroo, Talabat, and direct web channels into a unified preparation conveyor.',
    techStack: ['Vue.js', 'React', 'Tailwind CSS', 'MongoDB', 'NestJS'],
    client: 'Nomad Kitchens Lab',
    metrics: [
      { label: 'Aggregator Channels', value: '12 Integrations' },
      { label: 'Courier Wait Time', value: '-42%' },
      { label: 'Orders / Hour Capacity', value: '450+' },
    ],
    features: [
      'Single consolidated touch interface aggregating multiple food delivery APIs',
      'Intelligent station routing based on prep cook workload and fry/grill capacities',
      'Courier arrival beacon integration with automated packaging handoff alerts',
      'Real-time food cost analytics and recipe yield variance monitoring'
    ],
    mockupType: 'cloud-kitchen'
  }
];

const CATEGORIES = ['All', 'Mobile Apps', 'POS & ERP Systems', 'Websites'];

// Mini Device Mockup Renderer
function DeviceMockup({ type, name }) {
  switch (type) {
    case 'pos':
      return (
        <div className="w-full h-48 bg-gradient-to-br from-[#0a0f1d] to-[#05070e] p-3 flex flex-col justify-between select-none font-mono text-[10px]">
          {/* Top POS Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
              <span className="text-cyber-cyan font-bold tracking-wider text-[11px]">POS_TERM // 04</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-[10px]">
              <Wifi className="w-3 h-3 text-cyber-cyan" />
              <span>SYNCED</span>
              <span className="text-white/60">14:32</span>
            </div>
          </div>

          {/* POS Body Grid */}
          <div className="grid grid-cols-12 gap-2 my-1 flex-1 items-center">
            {/* Catalog shortcuts */}
            <div className="col-span-7 grid grid-cols-2 gap-1.5">
              <div className="p-1.5 rounded bg-white/5 border border-white/10 flex flex-col">
                <span className="text-gray-300 font-sans truncate">Cyber Combo A</span>
                <span className="text-cyber-cyan font-bold mt-1">$24.00</span>
              </div>
              <div className="p-1.5 rounded bg-white/5 border border-white/10 flex flex-col">
                <span className="text-gray-300 font-sans truncate">Nitro ColdBrew</span>
                <span className="text-cyber-cyan font-bold mt-1">$6.50</span>
              </div>
              <div className="p-1.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/40 flex flex-col">
                <span className="text-cyan-200 font-sans truncate">Quantum Meal</span>
                <span className="text-cyber-cyan font-bold mt-1">$32.00</span>
              </div>
              <div className="p-1.5 rounded bg-white/5 border border-white/10 flex flex-col">
                <span className="text-gray-300 font-sans truncate">Matrix Snack</span>
                <span className="text-cyber-cyan font-bold mt-1">$12.00</span>
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="col-span-5 bg-cyber-darker/90 rounded border border-cyber-cyan/30 p-2 flex flex-col justify-between h-full">
              <div>
                <div className="text-gray-400 text-[9px] flex justify-between">
                  <span>ORDER #892</span>
                  <span className="text-cyber-cyan">3 ITEMS</span>
                </div>
                <div className="mt-1 space-y-0.5 text-gray-300 text-[9px]">
                  <div className="flex justify-between">
                    <span className="truncate">Quantum Meal</span>
                    <span>$32.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="truncate">Nitro Brew</span>
                    <span>$6.50</span>
                  </div>
                </div>
              </div>
              <div className="pt-1.5 border-t border-white/10">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-gray-400 text-[8px]">TOTAL</span>
                  <span className="text-cyber-cyan font-orbitron font-bold text-xs">$38.50</span>
                </div>
                <div className="bg-cyber-cyan text-cyber-dark font-sans font-bold text-[9px] py-1 text-center rounded tracking-wider shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                  PAY CASH/CARD
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Ticker */}
          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] text-gray-400">
            <span className="flex items-center gap-1">
              <Activity className="w-2.5 h-2.5 text-cyber-magenta" />
              <span>Shift Sales: $4,280.00</span>
            </span>
            <span className="text-emerald-400 font-sans">99.98% Gateway Health</span>
          </div>
        </div>
      );

    case 'mobile-grocery':
      return (
        <div className="w-full h-48 bg-gradient-to-br from-[#080d1a] to-[#04060d] p-3 flex flex-col justify-between select-none">
          {/* Mobile Status Header */}
          <div className="flex items-center justify-between text-gray-400 text-[10px] pb-1 border-b border-white/5">
            <span className="font-semibold text-white">9:41</span>
            <div className="w-12 h-2.5 bg-black rounded-full border border-white/10" />
            <div className="flex items-center gap-1">
              <span className="text-[9px]">5G</span>
              <div className="w-3.5 h-2 border border-gray-400 rounded-xs p-0.5">
                <div className="h-full bg-cyber-cyan w-2/3" />
              </div>
            </div>
          </div>

          {/* Search bar & categories */}
          <div className="mt-1">
            <div className="h-6 rounded-full bg-white/5 border border-white/10 flex items-center px-2.5 text-[10px] text-gray-400 gap-1.5">
              <span className="text-cyber-cyan">🔍</span>
              <span className="truncate">Search fresh organic produce...</span>
            </div>
            <div className="flex gap-1.5 mt-2 overflow-hidden text-[9px]">
              <span className="px-2 py-0.5 rounded-full bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan">🥑 Organic</span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">🥛 Dairy</span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">🍓 Berries</span>
            </div>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-2 gap-2 my-1">
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-medium text-white truncate">Hass Avocados</div>
                <div className="text-[9px] text-cyber-cyan font-bold">$4.99 <span className="text-gray-500 line-through">$5.99</span></div>
              </div>
              <span className="w-5 h-5 rounded-full bg-cyber-cyan/20 text-cyber-cyan flex items-center justify-center text-xs font-bold border border-cyber-cyan/40">+</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-medium text-white truncate">Organic Almonds</div>
                <div className="text-[9px] text-cyber-cyan font-bold">$6.49</div>
              </div>
              <span className="w-5 h-5 rounded-full bg-cyber-cyan/20 text-cyber-cyan flex items-center justify-center text-xs font-bold border border-cyber-cyan/40">+</span>
            </div>
          </div>

          {/* Delivery pill */}
          <div className="h-6 rounded-lg bg-gradient-to-r from-cyber-cyan/30 via-cyber-purple/30 to-cyber-magenta/30 border border-cyber-cyan/40 flex items-center justify-between px-2 text-[10px]">
            <span className="text-white font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyber-cyan" />
              <span>Arrives in 14 mins</span>
            </span>
            <span className="text-cyber-cyan font-bold font-orbitron">3 items • $16.47</span>
          </div>
        </div>
      );

    case 'saas-pharma':
      return (
        <div className="w-full h-48 bg-gradient-to-br from-[#0c0d1e] to-[#060713] p-3 flex flex-col justify-between select-none font-sans">
          {/* Browser / SaaS Bar */}
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              <span className="ml-2 px-2 py-0.5 rounded bg-black/40 text-[9px] text-gray-400 font-mono border border-white/5">
                rx.pharmacare.io/portal
              </span>
            </div>
            <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> HIPAA SECURE
            </span>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-1.5 my-1">
            <div className="p-1 rounded bg-white/5 border border-white/10 text-center">
              <div className="text-[8px] text-gray-400">Active Rx</div>
              <div className="text-xs font-bold text-cyber-cyan font-orbitron">1,842</div>
            </div>
            <div className="p-1 rounded bg-white/5 border border-white/10 text-center">
              <div className="text-[8px] text-gray-400">Daily Fills</div>
              <div className="text-xs font-bold text-cyber-purple font-orbitron">486</div>
            </div>
            <div className="p-1 rounded bg-white/5 border border-white/10 text-center">
              <div className="text-[8px] text-gray-400">Cold Chain</div>
              <div className="text-xs font-bold text-emerald-400 font-orbitron">3.8°C OK</div>
            </div>
          </div>

          {/* Patient Rx Table rows */}
          <div className="space-y-1 my-0.5">
            <div className="flex items-center justify-between px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px]">
              <span className="text-gray-200 font-medium">Eleanor Vance</span>
              <span className="text-gray-400">Amoxicillin 500mg</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[8px] border border-emerald-500/30">Dispensed</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px]">
              <span className="text-gray-200 font-medium">Marcus Chen</span>
              <span className="text-gray-400">Metformin 850mg</span>
              <span className="px-1.5 py-0.2 rounded-full bg-cyber-cyan/20 text-cyber-cyan text-[8px] border border-cyber-cyan/30">Verification</span>
            </div>
          </div>

          {/* Bottom audit bar */}
          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] text-gray-400">
            <span>Automated Dispenser Sync: 100%</span>
            <span className="text-cyber-cyan">Next Batch: 4 mins</span>
          </div>
        </div>
      );

    case 'mobile-food':
      return (
        <div className="w-full h-48 bg-gradient-to-br from-[#120a1c] to-[#07040d] p-3 flex flex-col justify-between select-none">
          {/* Top Table QR header */}
          <div className="flex items-center justify-between pb-1 border-b border-white/10 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-cyber-magenta/20 border border-cyber-magenta/40 text-cyber-magenta font-mono font-bold">
                TABLE #14
              </span>
              <span className="text-gray-300 font-medium">Cyber Diner VIP</span>
            </div>
            <span className="text-emerald-400 font-mono text-[9px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live Tab
            </span>
          </div>

          {/* Order status step tracker */}
          <div className="my-1 p-1.5 rounded-lg bg-white/5 border border-white/10">
            <div className="flex justify-between text-[8px] text-gray-400 mb-1">
              <span className="text-cyber-cyan font-semibold">1. Ordered ✓</span>
              <span className="text-cyber-magenta font-bold animate-pulse">2. On Grill 🔥</span>
              <span>3. Ready</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta w-2/3 rounded-full" />
            </div>
          </div>

          {/* Food items mini cards */}
          <div className="grid grid-cols-2 gap-2 my-0.5">
            <div className="p-1.5 rounded bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[8px] px-1 rounded bg-amber-500/20 text-amber-300">Chef Special</span>
                <div className="text-[10px] text-white font-medium mt-0.5">Wagyu Truffle Burger</div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-cyber-cyan font-bold text-[10px]">$18.50</span>
                <span className="text-[9px] text-gray-400">Qty: 1</span>
              </div>
            </div>
            <div className="p-1.5 rounded bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[8px] px-1 rounded bg-purple-500/20 text-purple-300">Beverage</span>
                <div className="text-[10px] text-white font-medium mt-0.5">Smoked Yuzu Tonic</div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-cyber-cyan font-bold text-[10px]">$7.00</span>
                <span className="text-[9px] text-gray-400">Qty: 2</span>
              </div>
            </div>
          </div>

          {/* Action pay button */}
          <div className="h-6 rounded bg-gradient-to-r from-cyber-magenta to-cyber-purple flex items-center justify-between px-2 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(255,0,127,0.3)]">
            <span>Split Bill / Apple Pay</span>
            <span className="font-orbitron">$32.50</span>
          </div>
        </div>
      );

    case 'erp-dashboard':
      return (
        <div className="w-full h-48 bg-gradient-to-br from-[#07131e] to-[#040810] p-3 flex flex-col justify-between select-none font-mono">
          {/* ERP Top Bar */}
          <div className="flex items-center justify-between pb-1 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
              <span className="text-white font-bold text-[10px]">RETAIL_SYNC // GLOBAL</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/20">
              <Activity className="w-3 h-3" />
              <span>NODES: 142 ACTIVE</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-1.5 my-1 text-[9px]">
            <div className="p-1 bg-white/5 rounded border border-white/10">
              <div className="text-gray-400 text-[8px]">Daily GMV</div>
              <div className="text-cyber-cyan font-bold text-[11px] font-orbitron">$482.9K</div>
              <div className="text-emerald-400 text-[7px]">+14.2% DoD</div>
            </div>
            <div className="p-1 bg-white/5 rounded border border-white/10">
              <div className="text-gray-400 text-[8px]">Kafka Pipeline</div>
              <div className="text-purple-300 font-bold text-[11px] font-orbitron">14.8k msg/s</div>
              <div className="text-gray-400 text-[7px]">0 drop rate</div>
            </div>
            <div className="p-1 bg-white/5 rounded border border-white/10">
              <div className="text-gray-400 text-[8px]">Cross-Stock</div>
              <div className="text-emerald-400 font-bold text-[11px] font-orbitron">99.98%</div>
              <div className="text-gray-400 text-[7px]">Balanced</div>
            </div>
          </div>

          {/* Micro chart simulation */}
          <div className="p-1.5 rounded bg-black/40 border border-white/5 flex flex-col justify-between">
            <div className="flex justify-between text-[8px] text-gray-400 mb-1">
              <span>Branch Hourly Ingestion Load</span>
              <span className="text-cyber-cyan">Peak 1,240 req/m</span>
            </div>
            <div className="flex items-end gap-1 h-7 pt-1 px-1">
              {[40, 65, 30, 85, 95, 70, 60, 80, 100, 75, 90, 85, 95].map((val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-cyber-purple to-cyber-cyan rounded-t-xs opacity-80"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </div>

          {/* Bottom node sync */}
          <div className="flex justify-between items-center pt-1 border-t border-white/5 text-[8px] text-gray-400">
            <span>Dubai Flagship: SYNCED</span>
            <span>Riyadh Hub: SYNCED</span>
            <span className="text-cyber-cyan">London HQ: OK</span>
          </div>
        </div>
      );

    case 'cloud-kitchen':
      return (
        <div className="w-full h-48 bg-gradient-to-br from-[#120a16] to-[#06040a] p-3 flex flex-col justify-between select-none font-sans">
          {/* Dispatch Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyber-magenta animate-ping" />
              <span className="font-orbitron font-bold text-white text-[10px]">KITCHEN COMMAND</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyber-magenta/20 text-cyber-magenta text-[9px] font-mono border border-cyber-magenta/40">
              18 ACTIVE COOKS
            </span>
          </div>

          {/* Kanban / Ticket rows */}
          <div className="grid grid-cols-3 gap-1.5 my-1 text-[9px]">
            {/* New */}
            <div className="bg-white/5 rounded p-1 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-[8px] text-cyber-cyan font-bold">
                  <span>#CK-901</span>
                  <span>UberEats</span>
                </div>
                <div className="text-gray-300 truncate mt-0.5 font-medium">Taco Nova (x3)</div>
              </div>
              <div className="mt-1 text-emerald-400 text-[8px]">New • 01:12</div>
            </div>

            {/* Cooking */}
            <div className="bg-cyber-purple/10 rounded p-1 border border-cyber-purple/30 flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-[8px] text-purple-300 font-bold">
                  <span>#CK-898</span>
                  <span>Talabat</span>
                </div>
                <div className="text-gray-200 truncate mt-0.5 font-medium">Bao Bun Lab (x2)</div>
              </div>
              <div className="mt-1 text-amber-400 text-[8px] font-mono">Grill: 06:40</div>
            </div>

            {/* Ready */}
            <div className="bg-emerald-500/10 rounded p-1 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-[8px] text-emerald-300 font-bold">
                  <span>#CK-892</span>
                  <span>Deliveroo</span>
                </div>
                <div className="text-gray-200 truncate mt-0.5 font-medium">Wing Matrix (x4)</div>
              </div>
              <div className="mt-1 text-emerald-400 text-[8px] font-bold">COURIER HERE</div>
            </div>
          </div>

          {/* Dispatch Speed Bar */}
          <div className="p-1 rounded bg-black/40 border border-white/5 flex items-center justify-between text-[9px]">
            <span className="text-gray-400">Average Preparation Time</span>
            <span className="text-cyber-cyan font-orbitron font-bold">11m 45s</span>
            <span className="text-emerald-400 text-[8px] bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">-3.2m Target</span>
          </div>

          {/* Bottom channels */}
          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[8px] text-gray-400">
            <span>Brands: 8 Online</span>
            <span className="text-cyber-magenta font-mono">Aggregator Sync: 100%</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });

  // Filter projects according to category
  const filteredProjects = activeFilter === 'All' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  // Close modal on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setSelectedProject(null);
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, handleKeyDown]);

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className={`py-20 lg:py-32 bg-cyber-dark relative overflow-hidden section-fade ${
        isInView ? 'visible' : ''
      }`}
    >
      {/* Circuit Grid Background Dense Overlay */}
      <div className="absolute inset-0 circuit-grid-dense opacity-40 pointer-events-none" />

      {/* Cyber Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyber-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-orbitron tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered Case Studies</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-orbitron text-center gradient-text mb-4 tracking-wide">
            Our Tech in Action
          </h2>

          <p className="text-gray-400 text-center max-w-2xl mx-auto text-base md:text-lg">
            Explore our deployed ecosystem of high-throughput mobile applications, mission-critical POS terminals, and scalable cloud enterprise architectures.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 lg:mb-14 gap-2.5 sm:gap-4 no-scrollbar">
          {CATEGORIES.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)] font-semibold'
                    : 'glass border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass rounded-xl overflow-hidden border border-white/10 hover:border-cyber-cyan/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer flex flex-col justify-between"
            >
              {/* Mockup Display with Eye Overlay on Hover */}
              <div className="relative border-b border-white/10 overflow-hidden bg-black/40">
                <DeviceMockup type={project.mockupType} name={project.name} />

                {/* Hover Eye Overlay */}
                <div className="absolute inset-0 bg-cyber-dark/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan text-xs font-orbitron font-medium tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                    <Eye className="w-4 h-4 text-cyber-cyan" />
                    <span>INSPECT SYSTEM</span>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyber-cyan">
                      {project.category}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      {project.category === 'Mobile Apps' ? <Smartphone className="w-3.5 h-3.5 text-cyber-magenta" /> : 
                       project.category === 'POS & ERP Systems' ? <Layers className="w-3.5 h-3.5 text-cyber-cyan" /> :
                       <Monitor className="w-3.5 h-3.5 text-cyber-purple" />}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-orbitron text-white group-hover:text-cyber-cyan transition-colors duration-200">
                    {project.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech Stack Chips Line */}
                <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-500">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <span className="text-cyber-cyan text-xs font-semibold group-hover:translate-x-1 transition-transform duration-200 flex items-center">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="glass-strong rounded-2xl max-w-2xl w-full border border-cyber-cyan/40 p-6 md:p-8 relative max-h-[92vh] overflow-y-auto shadow-[0_0_50px_rgba(0,240,255,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full glass border border-white/10 text-gray-400 hover:text-white hover:border-cyber-cyan/50 hover:bg-white/10 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-10 mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan font-orbitron">
                  {selectedProject.category}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                  Client: {selectedProject.client}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-orbitron text-white">
                {selectedProject.name}
              </h2>
            </div>

            {/* Interactive Preview Mockup Container */}
            <div className="rounded-xl overflow-hidden border border-white/10 mb-6 bg-cyber-darker">
              <DeviceMockup type={selectedProject.mockupType} name={selectedProject.name} />
            </div>

            {/* Project Overview */}
            <div className="mb-6">
              <h4 className="text-xs font-orbitron uppercase tracking-widest text-cyber-cyan mb-2">System Overview</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedProject.fullDescription}
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {selectedProject.metrics.map((metric, idx) => (
                <div key={idx} className="glass p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-base sm:text-lg font-bold font-orbitron text-cyber-cyan">{metric.value}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Key Capabilities */}
            <div className="mb-6">
              <h4 className="text-xs font-orbitron uppercase tracking-widest text-cyber-cyan mb-3">Key Capabilities</h4>
              <ul className="space-y-2">
                {selectedProject.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Tech Stack */}
            <div className="mb-8">
              <h4 className="text-xs font-orbitron uppercase tracking-widest text-cyber-cyan mb-2">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-cyber-cyan text-cyber-dark font-orbitron font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all duration-300 text-center"
              >
                Close System Spec
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg glass border border-white/20 text-white font-orbitron font-medium text-xs tracking-wider uppercase hover:border-cyber-cyan hover:text-cyber-cyan transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <span>Request Custom Build</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
