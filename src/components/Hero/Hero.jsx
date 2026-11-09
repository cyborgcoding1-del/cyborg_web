import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowRight, ChevronRight, Activity, ShieldCheck, Layers, Headphones } from 'lucide-react';
import { useInView, scrollToSection } from '../../hooks/useAnimations';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Hero = () => {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [contentRef, isInView] = useInView({ threshold: 0.1 });
  const canvasRef = useRef(null);

  // Stats data for live metrics bar
  const metrics = [
    {
      value: '10+',
      label: t('hero_stat_projects'),
      icon: Activity,
    },
    {
      value: '99.9%',
      label: t('hero_stat_uptime'),
      icon: ShieldCheck,
    },
    {
      value: 'Coming Soon',
      label: t('hero_stat_industries'),
      icon: Layers,
    },
    {
      value: '24/7',
      label: t('hero_stat_support'),
      icon: Headphones,
    },
  ];

  // Three.js interactive 3D WebGL scene setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    let width = parent ? parent.clientWidth : window.innerWidth;
    let height = parent ? parent.clientHeight : 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, (width / height) || 1, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(isDark ? 0x0D0C1D : 0xf0f4f8, isDark ? 0 : 0.4);

    // 3. Central Glowing Cybernetic Wireframe Icosahedron
    const icosahedronGroup = new THREE.Group();
    scene.add(icosahedronGroup);

    // Outer wireframe icosahedron (Cyan)
    const icoGeo = new THREE.IcosahedronGeometry(1.85, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x00F0FF,
      wireframe: true,
      emissive: 0x00F0FF,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.6,
      roughness: 0.2,
      metalness: 0.8
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    icosahedronGroup.add(icosahedron);

    // Inner wireframe icosahedron (Purple)
    const innerIcoGeo = new THREE.IcosahedronGeometry(1.28, 0);
    const innerIcoMat = new THREE.MeshBasicMaterial({
      color: 0x8A2BE2,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerIco = new THREE.Mesh(innerIcoGeo, innerIcoMat);
    icosahedronGroup.add(innerIco);

    // Center glowing core sphere
    const coreGeo = new THREE.SphereGeometry(0.5, 20, 20);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.18
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    icosahedronGroup.add(coreMesh);

    // 4. Orbiting Particle Rings
    const ringGroup1 = new THREE.Group();
    const ringGroup2 = new THREE.Group();
    const ringGroup3 = new THREE.Group();
    scene.add(ringGroup1);
    scene.add(ringGroup2);
    scene.add(ringGroup3);

    const sphereGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const cyanSphereMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.75
    });
    const purpleSphereMat = new THREE.MeshBasicMaterial({
      color: 0x8A2BE2,
      transparent: true,
      opacity: 0.75
    });
    const magentaSphereMat = new THREE.MeshBasicMaterial({
      color: 0xFF007F,
      transparent: true,
      opacity: 0.7
    });

    // Ring 1 - inclined plane
    const ring1Count = 28;
    const ring1Radius = 2.9;
    for (let i = 0; i < ring1Count; i++) {
      const angle = (i / ring1Count) * Math.PI * 2;
      const mat = i % 2 === 0 ? cyanSphereMat : purpleSphereMat;
      const particle = new THREE.Mesh(sphereGeo, mat);
      particle.position.set(Math.cos(angle) * ring1Radius, Math.sin(angle) * ring1Radius, 0);
      ringGroup1.add(particle);
    }
    ringGroup1.rotation.x = Math.PI / 3;
    ringGroup1.rotation.y = Math.PI / 6;

    // Ring 2 - opposite inclination
    const ring2Count = 24;
    const ring2Radius = 3.3;
    for (let i = 0; i < ring2Count; i++) {
      const angle = (i / ring2Count) * Math.PI * 2;
      const mat = i % 3 === 0 ? magentaSphereMat : cyanSphereMat;
      const particle = new THREE.Mesh(sphereGeo, mat);
      particle.position.set(Math.cos(angle) * ring2Radius, Math.sin(angle) * ring2Radius, 0);
      ringGroup2.add(particle);
    }
    ringGroup2.rotation.x = -Math.PI / 4;
    ringGroup2.rotation.z = Math.PI / 5;

    // Ring 3 - wider subtle orbit
    const ring3Count = 20;
    const ring3Radius = 3.7;
    for (let i = 0; i < ring3Count; i++) {
      const angle = (i / ring3Count) * Math.PI * 2;
      const particle = new THREE.Mesh(sphereGeo, purpleSphereMat);
      particle.position.set(Math.cos(angle) * ring3Radius, 0, Math.sin(angle) * ring3Radius);
      ringGroup3.add(particle);
    }
    ringGroup3.rotation.x = Math.PI / 8;

    // 5. Floating UI Card Box Geometries
    const cardsGroup = new THREE.Group();
    scene.add(cardsGroup);

    const cardBoxes = [];
    const cardGeo = new THREE.BoxGeometry(0.72, 0.44, 0.03);
    const cardEdgesGeo = new THREE.EdgesGeometry(cardGeo);
    const cardEdgeMat = new THREE.LineBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: isDark ? 0.5 : 0.6
    });
    const cardFaceMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0D0C1D : 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: isDark ? 0.65 : 0.85
    });

    const cardConfigs = [
      { pos: [-2.4, 1.4, 0.8], rot: [0.15, 0.4, -0.1], speed: 0.8, phase: 0 },
      { pos: [2.5, 1.3, 0.4], rot: [-0.2, -0.45, 0.15], speed: 0.7, phase: 1.8 },
      { pos: [-2.2, -1.3, 0.9], rot: [0.2, 0.5, 0.05], speed: 0.9, phase: 3.2 },
      { pos: [2.3, -1.2, 0.6], rot: [-0.15, -0.35, -0.1], speed: 0.75, phase: 4.6 },
      { pos: [0.1, 2.4, -0.4], rot: [0.25, 0.1, -0.1], speed: 0.6, phase: 2.4 }
    ];

    cardConfigs.forEach((cfg) => {
      const cardMesh = new THREE.Mesh(cardGeo, cardFaceMat);
      const edgeLines = new THREE.LineSegments(cardEdgesGeo, cardEdgeMat);
      cardMesh.add(edgeLines);
      cardMesh.position.set(...cfg.pos);
      cardMesh.rotation.set(...cfg.rot);
      cardsGroup.add(cardMesh);
      cardBoxes.push({
        mesh: cardMesh,
        initialY: cfg.pos[1],
        initialX: cfg.pos[0],
        speed: cfg.speed,
        phase: cfg.phase
      });
    });

    // 6. Lights
    const cyanPointLight = new THREE.PointLight(0x00F0FF, 1.8, 25);
    cyanPointLight.position.set(3, 4, 4);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0x8A2BE2, 1.4, 25);
    purplePointLight.position.set(-4, -3, 3);
    scene.add(purplePointLight);

    const centerPointLight = new THREE.PointLight(0x00F0FF, 1.0, 8);
    centerPointLight.position.set(0, 0, 0);
    scene.add(centerPointLight);

    const ambientLight = new THREE.AmbientLight(isDark ? 0x121124 : 0xe0e7ff, isDark ? 1.0 : 1.2);
    scene.add(ambientLight);

    // 7. Mouse Interaction
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Responsive Resize Handling
    const handleResize = () => {
      if (!canvas) return;
      if (window.innerWidth < 768) return;
      const p = canvas.parentElement;
      const w = p ? p.clientWidth : window.innerWidth;
      const h = p ? p.clientHeight : 500;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);
    let resizeObserver = null;
    if (parent && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(parent);
    }

    // 9. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip render calculations on mobile (< 768px) for performance
      if (window.innerWidth < 768) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.035;
      currentMouseY += (targetMouseY - currentMouseY) * 0.035;

      // Rotate icosahedrons with smooth mouse influence
      icosahedronGroup.rotation.x = elapsedTime * 0.12 + currentMouseY * 0.25;
      icosahedronGroup.rotation.y = elapsedTime * 0.16 + currentMouseX * 0.25;

      innerIco.rotation.x = -elapsedTime * 0.15;
      innerIco.rotation.y = -elapsedTime * 0.1;

      // Orbit particle rings
      ringGroup1.rotation.z = elapsedTime * 0.14;
      ringGroup2.rotation.z = -elapsedTime * 0.11;
      ringGroup3.rotation.y = elapsedTime * 0.08;

      // Floating UI cards animation
      cardBoxes.forEach((item) => {
        item.mesh.position.y = item.initialY + Math.sin(elapsedTime * item.speed + item.phase) * 0.12;
        item.mesh.position.x = item.initialX + Math.cos(elapsedTime * 0.5 + item.phase) * 0.05;
        item.mesh.rotation.y += 0.0015;
      });

      // Subtle parallax camera tilt
      camera.position.x = currentMouseX * 0.4;
      camera.position.y = currentMouseY * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 10. Clean up on unmount or theme change
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <section
      id="home"
      className={`relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-16 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0D0C1D] text-white' : 'bg-[#f0f4f8] text-gray-900'
        }`}
    >
      {/* Circuit Grid Background Overlay */}
      <div
        className={`absolute inset-0 circuit-grid pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-5' : 'opacity-[0.03]'
          }`}
      />

      {/* Cyber Ambient Gradient Orbs */}
      <div
        className={`absolute top-1/4 -left-28 w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-cyber-cyan/10' : 'bg-cyber-cyan/[0.04]'
          }`}
      />
      <div
        className={`absolute top-1/3 -right-28 w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-cyber-purple/15' : 'bg-cyber-purple/[0.05]'
          }`}
      />
      <div
        className={`absolute -bottom-20 left-1/2 -translate-x-1/2 w-[650px] h-[320px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-cyber-cyan/5' : 'bg-cyber-cyan/[0.02]'
          }`}
      />

      {/* Subtle Radial Gradient Overlay from Center */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDark
          ? 'bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(0,240,255,0.05),transparent_70%)]'
          : 'bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(0,240,255,0.02),transparent_70%)]'
          }`}
      />
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDark
          ? 'bg-gradient-to-b from-transparent via-transparent to-[#0D0C1D]/80'
          : 'bg-gradient-to-b from-transparent via-transparent to-[#f0f4f8]/80'
          }`}
      />

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 z-10 my-auto"
      >
        {/* LEFT CONTENT (lg:w-1/2) */}
        <div
          className={`w-full lg:w-1/2 flex flex-col ${isRTL ? 'items-start text-right' : 'items-start text-left'
            } z-10`}
        >
          {/* Animated Badge */}
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6 sm:mb-8 transition-all duration-700 delay-100 ease-out ${isDark
              ? 'glass border border-white/10 bg-white/[0.04] text-gray-200'
              : 'bg-white/80 border border-gray-200 text-gray-700 shadow-sm'
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan" />
            </span>
            <span className="text-xs sm:text-sm font-medium tracking-wide font-inter">
              {t('hero_badge')}
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight mb-6 transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            <span
              className={
                isDark
                  ? 'gradient-text block'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 block'
              }
            >
              {t('hero_title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-base sm:text-lg md:text-xl max-w-xl mb-8 sm:mb-10 leading-relaxed sm:leading-loose font-inter transition-all duration-700 delay-300 ease-out ${isDark ? 'text-gray-400' : 'text-gray-600'
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {t('hero_subtitle')}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto transition-all duration-700 delay-400 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            {/* Primary Button */}
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="group relative min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyber-cyan via-[#00d4ff] to-cyber-purple text-cyber-dark font-orbitron font-bold tracking-wide text-sm flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(0,240,255,0.3)] hover:shadow-[0_8px_30px_rgba(0,240,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{t('hero_cta_primary')}</span>
              <ArrowRight
                className={`w-4 h-4 transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'
                  } text-cyber-dark`}
              />
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className={`group min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl font-orbitron font-medium tracking-wide text-sm flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${isDark
                ? 'border border-white/15 hover:border-cyber-cyan/50 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md text-gray-200 hover:text-white shadow-sm hover:shadow-[0_4px_20px_rgba(0,240,255,0.15)]'
                : 'border border-gray-300 hover:border-cyan-500 bg-white/80 hover:bg-white text-gray-800 hover:text-cyan-600 shadow-sm hover:shadow-md'
                }`}
            >
              <span>{t('hero_cta_secondary')}</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-0.5 rotate-180' : 'group-hover:translate-x-0.5'
                  } text-cyber-cyan`}
              />
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT (lg:w-1/2): Three.js WebGL 3D Canvas - hidden on mobile < 768px */}
        <div
          className={`hidden md:flex w-full lg:w-1/2 items-center justify-center relative min-h-[340px] sm:min-h-[460px] lg:min-h-[560px] z-10 transition-all duration-1000 delay-300 ease-out ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
        >
          {/* Subtle Outer Glow Behind Canvas */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl ${isDark ? 'bg-cyber-cyan/[0.08]' : 'bg-cyber-cyan/[0.04]'
                }`}
            />
            <div
              className={`w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-2xl ${isDark ? 'bg-cyber-purple/[0.08]' : 'bg-cyber-purple/[0.04]'
                }`}
            />
          </div>

          {/* 3D Canvas Container */}
          <div className="relative w-full h-[340px] sm:h-[460px] lg:h-[560px] flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-grab active:cursor-grabbing"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM: Live Metrics Bar */}
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 z-20 transition-all duration-700 delay-500 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <div
          className={`rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300 ${isDark
            ? 'glass backdrop-blur-md bg-white/[0.04] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
            : 'bg-white/80 backdrop-blur-md border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.06)]'
            }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((metric, idx) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col items-center ${isRTL
                    ? 'md:items-end text-center md:text-right'
                    : 'md:items-start text-center md:text-left'
                    } group ${idx !== 0
                      ? isRTL
                        ? 'lg:pr-8 lg:border-r ' + (isDark ? 'lg:border-white/10' : 'lg:border-gray-200')
                        : 'lg:pl-8 lg:border-l ' + (isDark ? 'lg:border-white/10' : 'lg:border-gray-200')
                      : ''
                    }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`p-1.5 rounded-lg border transition-colors ${isDark
                        ? 'bg-cyber-cyan/10 border-cyber-cyan/20 group-hover:border-cyber-cyan/40'
                        : 'bg-cyan-50 border-cyan-200 group-hover:border-cyan-400'
                        }`}
                    >
                      <IconComponent className="w-4 h-4 text-cyber-cyan" />
                    </div>
                    <span
                      className={`font-orbitron font-bold text-2xl md:text-3xl tracking-tight transition-colors ${isDark
                        ? 'text-white group-hover:text-cyber-cyan'
                        : 'text-gray-900 group-hover:text-cyan-600'
                        }`}
                    >
                      {metric.value}
                    </span>
                  </div>

                  <h3
                    className={`text-xs sm:text-sm font-orbitron font-semibold tracking-wider uppercase ${isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                  >
                    {metric.label}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
