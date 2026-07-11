import React, { useEffect, useState } from 'react';
import { WindowInstance, useWindowStore } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { Briefcase, FileText, ArrowRight, LayoutGrid, Monitor, PenTool, Cpu, Megaphone, BarChart2, Filter, ChevronDown, CheckCircle2, Users, Activity, ShoppingCart, Zap, Package, TrendingUp } from 'lucide-react';
import { useWorkNavigation } from './useWorkNavigation';
import { WORK_PROJECTS } from './work-data';
import CaseStudyStoryPage from './components/CaseStudyStoryPage';

interface WorkAppProps {
  window: WindowInstance;
  onHome?: () => void;
}

export default function WorkApp({ window: windowInstance, onHome }: WorkAppProps) {
  const { openApp } = useWindowStore();
  
  // Read intent from fileContext or targetContext
  const initialProjectId = 
    windowInstance?.targetContext?.projectId || 
    (windowInstance?.fileContext?.initialIntent as string | undefined);

  const {
    view,
    activeProjectId,
    activeProject,
    openProject,
    backToIndex
  } = useWorkNavigation(initialProjectId);

  // If the window context changes while open, navigate automatically
  useEffect(() => {
    if (initialProjectId) {
      openProject(initialProjectId);
    }
  }, [initialProjectId, openProject]);

  const [activeCategory, setActiveCategory] = useState('All Projects');

  const sidebar = (
    <div className="py-2">
      <SidebarGroup title="PORTFOLIO">
        <SidebarItem icon={LayoutGrid} label="All Projects" isActive={activeCategory === 'All Projects' && !activeProject} onClick={() => { setActiveCategory('All Projects'); backToIndex(); }} />
        <SidebarItem icon={Monitor} label="Design & Dev" isActive={activeCategory === 'Design & Dev' && !activeProject} onClick={() => { setActiveCategory('Design & Dev'); backToIndex(); }} />
        <SidebarItem icon={PenTool} label="Branding" isActive={activeCategory === 'Branding' && !activeProject} onClick={() => { setActiveCategory('Branding'); backToIndex(); }} />
        <SidebarItem icon={Cpu} label="Automation" isActive={activeCategory === 'Automation' && !activeProject} onClick={() => { setActiveCategory('Automation'); backToIndex(); }} />
        <SidebarItem icon={Megaphone} label="Marketing" isActive={activeCategory === 'Marketing' && !activeProject} onClick={() => { setActiveCategory('Marketing'); backToIndex(); }} />
      </SidebarGroup>
      
      <SidebarGroup title="CASE STUDIES">
        {WORK_PROJECTS.slice(0, 3).map(p => (
          <SidebarItem 
            key={p.id} 
            icon={FileText} 
            label={p.clientName} 
            isActive={activeProject?.id === p.id} 
            onClick={() => openProject(p.id)} 
          />
        ))}
      </SidebarGroup>

      <SidebarGroup title="INSIGHTS">
        <SidebarItem icon={BarChart2} label="Reports" />
      </SidebarGroup>
    </div>
  );

  const userProfileWidget = (
    <div className="mt-4 flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10 group">
       <div className="flex items-center gap-3">
         <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xs shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
           PN
         </div>
         <div className="flex flex-col">
           <span className="text-[13px] font-semibold text-white/90 group-hover:text-white transition-colors">Phantom Node</span>
           <span className="text-[10px] text-white/40">Studio Account</span>
         </div>
       </div>
       <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
    </div>
  );

  let content;

  if (activeProject) {
    content = (
      <CaseStudyStoryPage 
        project={activeProject} 
        onBack={backToIndex}
        onOpenProject={openProject}
        windowInstance={windowInstance} 
      />
    );
  } else {
    // Filter projects
    const displayedProjects = activeCategory === 'All Projects' 
      ? WORK_PROJECTS 
      : WORK_PROJECTS.filter(p => p.category === activeCategory || 
                                (activeCategory === 'Design & Dev' && p.category.includes('Web')) ||
                                (activeCategory === 'Marketing' && p.category.includes('Marketing')) ||
                                (activeCategory === 'Automation' && p.category.includes('Automation')));

    content = (
      <div className="h-full w-full relative bg-[#F4F4F6] overflow-auto">

        {/* Diagonal background lines — top right area only */}
        <div className="absolute top-0 right-0 w-[50%] h-[320px] overflow-hidden pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 500 320" fill="none" preserveAspectRatio="xMaxYMin slice">
            {[0,40,80,120,160,200,240,280].map((offset, i) => (
              <line key={i} x1={500} y1={offset} x2={offset} y2={320} stroke="#8a8a9a" strokeWidth="0.6" opacity="0.18"/>
            ))}
          </svg>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* ── HEADER ZONE ── */}
          <div className="relative px-10 pt-8 pb-0">
            
            {/* 3D cube image — absolutely positioned top-right of the header */}
            <div className="absolute top-0 right-0 w-[300px] h-[220px] pointer-events-none select-none z-10">
              <img
                src="/images/work-cube-decoration.png"
                alt="3D cube decoration"
                className="w-full h-full object-contain object-right-top"
                draggable={false}
              />
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[13px] mb-5">
              <span className="text-gray-400 font-medium">Work</span>
              <span className="text-gray-300 font-normal">›</span>
              <span className="text-gray-800 font-semibold">All Projects</span>
            </div>

            {/* Title */}
            <h1 className="text-[40px] font-black text-gray-900 leading-[1.1] tracking-tight mb-2">Selected Work</h1>

            {/* Subtitle */}
            <p className="text-[14px] text-gray-500 font-normal mb-3">Outcomes we're proud to put our name on.</p>

            {/* Golden accent line */}
            <div className="w-8 h-[3px] rounded-full bg-yellow-400 mb-8"></div>

            {/* ── KPI CARDS ── */}
            <div className="grid grid-cols-3 gap-4 mb-7 pr-4">

              {/* Card 1 — Projects Completed */}
              <div className="bg-white rounded-[18px] p-5 shadow-[0_1px_16px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-3">
                {/* Top row: icon + label */}
                <div className="flex items-center gap-2">
                  <Briefcase className="w-[18px] h-[18px] text-gray-500 shrink-0" strokeWidth={1.5} />
                  <span className="text-[11.5px] font-medium text-gray-500 uppercase tracking-[0.06em]">Projects Completed</span>
                </div>
                {/* Number */}
                <div className="text-[36px] font-black text-gray-900 leading-none">24</div>
                {/* Bottom row: metric + sparkline */}
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-semibold text-[#22C55E] flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L5 2L9 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    12% this year
                  </span>
                  {/* Sparkline with arrowhead */}
                  <svg width="64" height="32" viewBox="0 0 64 32" fill="none">
                    <path d="M2 28 C10 26, 18 22, 26 18 S42 10, 52 4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    {/* Arrowhead */}
                    <path d="M48 2 L54 4 L52 10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>

              {/* Card 2 — Active Projects */}
              <div className="bg-white rounded-[18px] p-5 shadow-[0_1px_16px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Users className="w-[18px] h-[18px] text-gray-500 shrink-0" strokeWidth={1.5} />
                  <span className="text-[11.5px] font-medium text-gray-500 uppercase tracking-[0.06em]">Active Projects</span>
                </div>
                <div className="text-[36px] font-black text-gray-900 leading-none">8</div>
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-semibold text-[#22C55E] flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L5 2L9 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    2 new this month
                  </span>
                  <svg width="64" height="32" viewBox="0 0 64 32" fill="none">
                    <path d="M2 30 C12 27, 22 22, 32 16 S46 8, 54 3" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <path d="M50 1 L56 3 L54 9" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>

              {/* Card 3 — Client Satisfaction */}
              <div className="bg-white rounded-[18px] p-5 shadow-[0_1px_16px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-[18px] h-[18px] text-gray-500 shrink-0" strokeWidth={1.5} />
                  <span className="text-[11.5px] font-medium text-gray-500 uppercase tracking-[0.06em]">Client Satisfaction</span>
                </div>
                <div className="text-[36px] font-black text-gray-900 leading-none">99.9%</div>
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-semibold text-[#22C55E] flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L5 2L9 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Based on feedback
                  </span>
                  {/* Donut ring — nearly complete yellow circle */}
                  <div className="relative w-10 h-10 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#E5E7EB" strokeWidth="4"/>
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#FBBF24" strokeWidth="4"
                        strokeDasharray="100.5"
                        strokeDashoffset="0.1"
                        strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            {/* ── FILTER TABS ROW ── */}
            <div className="flex items-center justify-between pr-4 mb-6">
              <div className="flex items-center gap-2">
                {(['All Projects', 'Design & Dev', 'Branding', 'Automation', 'Marketing'] as const).map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-[#F5E8C0] text-[#92600A] shadow-sm'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {cat === 'All Projects' && <LayoutGrid className="w-3.5 h-3.5" />}
                      {cat === 'Design & Dev' && <Monitor className="w-3.5 h-3.5" />}
                      {cat === 'Branding' && <PenTool className="w-3.5 h-3.5" />}
                      {cat === 'Automation' && <Cpu className="w-3.5 h-3.5" />}
                      {cat === 'Marketing' && <Megaphone className="w-3.5 h-3.5" />}
                      {cat}
                    </button>
                  );
                })}
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                <Filter className="w-3.5 h-3.5" /> Filter <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
              </button>
            </div>
          </div>

          {/* ── PROJECT TABLE ── */}
          <div className="flex-1 px-10 pb-10">

          {/* Project List Table */}
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 p-5 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
              <div className="pl-4">PROJECT</div>
              <div>SERVICE</div>
              <div>STATUS</div>
              <div>YEAR</div>
              <div>IMPACT</div>
              <div className="w-10"></div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {displayedProjects.map((project, idx) => {
                const getIcon = () => {
                  if (project.clientName.includes('Northstar')) return { icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />, bg: 'bg-emerald-50', dot: 'bg-emerald-500', text: 'text-emerald-500' };
                  if (project.clientName.includes('Atlas')) return { icon: <Package className="w-6 h-6 text-purple-500" />, bg: 'bg-purple-50', dot: 'bg-purple-500', text: 'text-purple-500' };
                  if (project.clientName.includes('Apex')) return { icon: <BarChart2 className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-50', dot: 'bg-orange-500', text: 'text-orange-500' };
                  if (project.clientName.includes('Vertex')) return { icon: <ShoppingCart className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50', dot: 'bg-blue-500', text: 'text-blue-500' };
                  if (project.clientName.includes('Nova')) return { icon: <Zap className="w-6 h-6 text-yellow-500" />, bg: 'bg-yellow-50', dot: 'bg-yellow-500', text: 'text-yellow-500' };
                  return { icon: <Briefcase className="w-6 h-6 text-gray-500" />, bg: 'bg-gray-50', dot: 'bg-gray-500', text: 'text-gray-500' };
                };
                
                const iconDef = getIcon();
                
                return (
                  <button 
                    key={project.id}
                    onClick={() => openProject(project.id)}
                    className="w-full grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 p-5 items-center hover:bg-gray-50 transition-colors text-left group"
                  >
                    {/* Project Col */}
                    <div className="flex items-center gap-4 pl-4">
                      <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${iconDef.bg}`}>
                        {iconDef.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-[15px] mb-0.5 group-hover:text-yellow-600 transition-colors">{project.clientName}</div>
                        <div className="text-gray-500 text-[13px] line-clamp-1">{project.tagline}</div>
                      </div>
                    </div>
                    
                    {/* Service Col */}
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${iconDef.dot}`}></div>
                      <span className="text-[13px] font-medium text-gray-600">{project.category}</span>
                    </div>
                    
                    {/* Status Col */}
                    <div>
                      <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold ${project.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-yellow-50 text-yellow-600 border border-yellow-100'}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    {/* Year Col */}
                    <div className="text-[13px] font-medium text-gray-500">
                      {project.year}
                    </div>
                    
                    {/* Impact Col */}
                    <div className={`flex items-center gap-1.5 ${iconDef.text} font-bold text-[13px]`}>
                      <TrendingUp className="w-4 h-4" />
                      {project.impact}
                    </div>
                    
                    {/* Action Col */}
                    <div className="w-10 flex justify-end pr-4">
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                )
              })}
              
              {displayedProjects.length === 0 && (
                <div className="p-12 text-center text-gray-500 font-medium">
                  No projects found for this category.
                </div>
              )}
            </div>
          </div>

          </div>{/* flex-1 px-10 pb-10 */}
        </div>{/* relative z-10 flex flex-col */}
      </div>
    );
  }

  return (
    <NativeAppShell 
      appId={windowInstance.instanceId}
      sidebar={sidebar}
      content={content}
      onLogoClick={onHome}
      onBackClick={onHome}
      bottomWidget={userProfileWidget}
    />
  );
}
