import React from 'react';

export default function BrainAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-center relative opacity-80 pointer-events-none">
      <svg 
        viewBox="0 0 200 200" 
        className="w-full max-w-[300px] h-auto stroke-brand-olive stroke-[1.5] fill-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            @keyframes pulse-node-anim {
              0% { r: 1.5; opacity: 0.5; }
              100% { r: 3; opacity: 1; }
            }
            @keyframes draw-line-anim {
              0% { stroke-dashoffset: 100; }
              100% { stroke-dashoffset: -100; }
            }
            @keyframes float-brain-anim {
              0% { transform: translateY(0px); }
              100% { transform: translateY(-8px); }
            }
            .anim-float {
              animation: float-brain-anim 4s infinite ease-in-out alternate;
            }
            .anim-line {
              stroke-dasharray: 100;
              animation: draw-line-anim 6s infinite linear;
            }
            .anim-pulse {
              animation: pulse-node-anim 2s infinite ease-in-out alternate;
            }
          `}
        </style>
        
        <g className="anim-float">
          {/* Stylized Brain Outline */}
          <path d="M100 40 C 60 40, 40 70, 40 100 C 40 130, 60 160, 100 160 C 140 160, 160 130, 160 100 C 160 70, 140 40, 100 40 Z" />
          
          {/* Inner Lobes */}
          <path d="M100 40 C 100 80, 80 100, 40 100" className="opacity-50" />
          <path d="M100 40 C 100 80, 120 100, 160 100" className="opacity-50" />
          <path d="M100 160 C 100 120, 80 100, 40 100" className="opacity-50" />
          <path d="M100 160 C 100 120, 120 100, 160 100" className="opacity-50" />
          
          {/* Neural Connections */}
          <path d="M70 70 L 130 130" className="anim-line opacity-40" />
          <path d="M130 70 L 70 130" className="anim-line opacity-40" />
          <path d="M60 100 L 140 100" className="anim-line opacity-40" />
          <path d="M100 60 L 100 140" className="anim-line opacity-40" />
          
          {/* Neural Nodes */}
          <circle cx="70" cy="70" className="anim-pulse fill-brand-olive" stroke="none" />
          <circle cx="130" cy="130" className="anim-pulse fill-brand-olive" stroke="none" style={{ animationDelay: '0.5s' }}/>
          <circle cx="130" cy="70" className="anim-pulse fill-brand-olive" stroke="none" style={{ animationDelay: '1s' }}/>
          <circle cx="70" cy="130" className="anim-pulse fill-brand-olive" stroke="none" style={{ animationDelay: '1.5s' }}/>
          <circle cx="100" cy="100" className="anim-pulse fill-brand-olive" stroke="none" style={{ animationDelay: '0.75s' }}/>
        </g>
      </svg>
    </div>
  );
}
