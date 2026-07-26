const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const mouseLogicOrig = `  // Mouse interaction
  let mouseX = -1000;
  let mouseY = -1000;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  container.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });`;

const mouseLogicNew = `  // Mouse interaction & Drag to rotate
  let mouseX = -1000;
  let mouseY = -1000;
  let lastMouseX = -1000;
  let lastMouseY = -1000;
  let isDragging = false;
  let angularVelocity = 0;

  container.addEventListener('mousedown', () => {
    isDragging = true;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    lastMouseX = -1000;
    lastMouseY = -1000;
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    if (isDragging && lastMouseX !== -1000) {
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      
      const vx = mouseX - cx;
      const vy = mouseY - cy;
      
      const torque = (vx * dy - vy * dx) / 5000;
      angularVelocity += torque;
    }
    
    if (isDragging) {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }
  });

  container.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
    isDragging = false;
    lastMouseX = -1000;
    lastMouseY = -1000;
  });`;

js = js.replace(mouseLogicOrig, mouseLogicNew);

const updateLogicOrig = `    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];`;

const updateLogicNew = `    angularVelocity *= 0.95; // Dampening
    const cx = w / 2;
    const cy = h / 2;

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      
      // Apply rotation force
      if (Math.abs(angularVelocity) > 0.0001) {
        const rx = tag.x - cx;
        const ry = tag.y - cy;
        tag.vx += -ry * angularVelocity * 0.1;
        tag.vy += rx * angularVelocity * 0.1;
      }`;

js = js.replace(updateLogicOrig, updateLogicNew);

fs.writeFileSync('src/main.js', js);
