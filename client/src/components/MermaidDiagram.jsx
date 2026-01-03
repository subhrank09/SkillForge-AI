import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ chartCode }) => {
  const ref = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. Initialize with "Attractive" Settings
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base', // 'base' allows us to customize colors manually
      securityLevel: 'loose',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      themeVariables: {
        primaryColor: '#1e293b',        // Dark Slate Node Background
        primaryTextColor: '#e2e8f0',    // Light Text
        primaryBorderColor: '#3b82f6',  // Neon Blue Border
        lineColor: '#a78bfa',           // Purple Connecting Lines
        secondaryColor: '#0f172a',      // Background for subgraphs
        tertiaryColor: '#1e1e2e',       // Background for other elements
        noteBkgColor: '#334155',        // Note background
        noteTextColor: '#f8fafc',       // Note text
        fontSize: '14px',
      },
      flowchart: {
        curve: 'basis', // Makes lines curvy and smooth (Adorable!)
        htmlLabels: true,
      }
    });

    const renderChart = async () => {
      if (chartCode && ref.current) {
        try {
          setError(false);
          ref.current.innerHTML = ''; 
          
          // Unique ID for this render
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          // 2. Render
          const { svg } = await mermaid.render(id, chartCode);
          
          if (ref.current) {
            ref.current.innerHTML = svg;
            
            // 3. Post-Render Styling (The "Secret Sauce")
            // We verify the SVG is there, then inject CSS classes to make it glow
            const svgElement = ref.current.querySelector('svg');
            if (svgElement) {
              svgElement.style.maxWidth = '100%';
              svgElement.style.height = 'auto';
              // Make rects rounded and glowing
              const rects = svgElement.querySelectorAll('rect');
              rects.forEach(rect => {
                rect.setAttribute('rx', '10'); // Rounded corners
                rect.setAttribute('ry', '10');
                rect.style.strokeWidth = '2px';
                rect.style.filter = 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))'; // Blue Glow
              });
              // Make lines glowing
              const paths = svgElement.querySelectorAll('path');
              paths.forEach(path => {
                path.style.strokeWidth = '2px';
                path.style.filter = 'drop-shadow(0 0 3px rgba(167, 139, 250, 0.5))'; // Purple Glow
              });
            }
          }
        } catch (err) {
          console.error("Mermaid Render Failed:", err);
          setError(true);
        }
      }
    };

    renderChart();
  }, [chartCode]);

  if (error) {
    return (
      <div className="p-4 border border-red-500/50 bg-red-500/10 rounded-xl text-red-300 text-xs font-mono overflow-auto">
        <p className="font-bold mb-2">Diagram Syntax Error:</p>
        <pre>{chartCode}</pre>
      </div>
    );
  }

  // Container styling
  return (
    <div className="w-full flex justify-center bg-gray-950/50 p-6 rounded-2xl border border-gray-800 my-6 overflow-x-auto shadow-inner">
      <div ref={ref} className="w-full text-center" />
    </div>
  );
};

export default MermaidDiagram;