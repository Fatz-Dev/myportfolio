const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const skillsOrig = `  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
    'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 
    'Tailwind CSS', 'GraphQL', 'WebSockets', 'Figma', 'System Design'
  ];`;

const skillsNew = `  const skills = [
    { name: 'JavaScript', level: 'Core Language', desc: 'Expert proficiency in vanilla & modern ES6+' },
    { name: 'TypeScript', level: 'Type Safety', desc: 'Strict typing for enterprise-scale architecture' },
    { name: 'React', level: 'Frontend UI', desc: 'Component-driven reactive interfaces' },
    { name: 'Next.js', level: 'Fullstack Framework', desc: 'SSR, SSG, and API routing' },
    { name: 'Node.js', level: 'Backend Runtime', desc: 'High-performance asynchronous services' },
    { name: 'Python', level: 'Data & Scripting', desc: 'Data processing and automation tools' },
    { name: 'PostgreSQL', level: 'Database', desc: 'Relational data modeling and complex queries' },
    { name: 'Redis', level: 'Caching', desc: 'In-memory state and high-speed telemetry' },
    { name: 'Docker', level: 'DevOps', desc: 'Containerization and isolated deployments' },
    { name: 'AWS', level: 'Cloud Infra', desc: 'Scalable cloud computing architectures' },
    { name: 'Tailwind CSS', level: 'Styling', desc: 'Utility-first rapid UI development' },
    { name: 'GraphQL', level: 'API Layer', desc: 'Precise and efficient data fetching' },
    { name: 'WebSockets', level: 'Real-time', desc: 'Bi-directional low-latency communication' },
    { name: 'Figma', level: 'Design', desc: 'UI/UX prototyping and wireframing' },
    { name: 'System Design', level: 'Architecture', desc: 'Designing resilient distributed systems' }
  ];`;

js = js.replace(skillsOrig, skillsNew);

const elCreationOrig = `    const el = document.createElement('div');
    el.className = 'absolute top-0 left-0 flex items-center gap-2 font-mono text-sm md:text-base px-4 py-2 bg-sand border-drawn text-ink shadow-sm cursor-none select-none';
    el.innerHTML = \`
      \${skillIcons[skill] || ''}
      <span>\${skill}</span>
    \`;
    container.appendChild(el);`;

const elCreationNew = `    const el = document.createElement('div');
    el.className = 'absolute top-0 left-0 group cursor-none select-none';
    el.innerHTML = \`
      <div class="flex items-center gap-2 font-mono text-sm md:text-base px-4 py-2 bg-sand border-drawn text-ink shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-hover:z-50 relative bg-sand/90 backdrop-blur-sm">
        \${skillIcons[skill.name] || ''}
        <span>\${skill.name}</span>
        
        <!-- Hover Detail Popup -->
        <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 z-[60]">
            <div class="bg-ink text-sand p-3 border-drawn text-xs text-center shadow-lg relative">
                <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink transform rotate-45"></div>
                <span class="block font-bold text-terra mb-1">\${skill.level}</span>
                <span class="opacity-80">\${skill.desc}</span>
            </div>
        </div>
      </div>
    \`;
    container.appendChild(el);`;

js = js.replace(elCreationOrig, elCreationNew);

const forEachOrig = `skills.forEach(skill => {`;
const forEachNew = `skills.forEach(skill => {`;

// No need to replace forEachOrig, but since skill was string, now it's object. Wait, `skillIcons[skill]` -> `skillIcons[skill.name]`. Already handled in elCreationNew.

fs.writeFileSync('src/main.js', js);
