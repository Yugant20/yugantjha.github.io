// The sculpture is a corrugated torus. Cache its surface so scrolling only
// rotates and shades existing vertices.
function createSculpture(canvas) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const rings = 112;
  const ribs = 28;
  const vertices = [];
  const faces = [];
  const tau = Math.PI * 2;

  for (let ring = 0; ring < rings; ring++) {
    const u = ring / rings * tau;
    for (let rib = 0; rib < ribs; rib++) {
      const v = rib / ribs * tau;
      const radius = 1.05 + .18 * Math.sin(3 * u) + .42 * Math.cos(v);
      vertices.push([
        radius * Math.cos(u),
        radius * Math.sin(u),
        .53 * Math.sin(v) + .48 * Math.cos(3 * u + .6)
      ]);
      const nextRing = (ring + 1) % rings;
      const nextRib = (rib + 1) % ribs;
      faces.push([ring * ribs + rib, nextRing * ribs + rib,
        nextRing * ribs + nextRib, ring * ribs + nextRib]);
    }
  }

  function draw(turn) {
    const size = canvas.width;
    const tilt = .81;
    const projected = vertices.map(([x, y, z]) => {
      const horizontal = x * Math.cos(turn) - y * Math.sin(turn);
      const vertical = x * Math.sin(turn) + y * Math.cos(turn);
      const depth = vertical * Math.sin(tilt) + z * Math.cos(tilt);
      const height = vertical * Math.cos(tilt) - z * Math.sin(tilt);
      const scale = size * .28 / (1 - depth * .12);
      return [size / 2 + (horizontal - .30 * height) * scale,
        size / 2 - (height + .30 * horizontal) * scale, depth];
    });
    context.clearRect(0, 0, size, size);
    const ordered = faces.map(face => ({
      face, depth: face.reduce((sum, i) => sum + projected[i][2], 0) / 4
    })).sort((a, b) => a.depth - b.depth);
    for (const {face, depth} of ordered) {
      const [a,b,c,d] = face.map(i => projected[i]);
      const light = Math.max(0, Math.min(1, .49 + depth * .34 - (a[1] / size - .5) * .47));
      context.beginPath();
      context.moveTo(a[0], a[1]);
      for (const point of [b,c,d]) context.lineTo(point[0], point[1]);
      context.closePath();
      context.fillStyle = 'rgb(' + [40+light*156,21+light*63,15+light*26].join(',') + ')';
      context.fill();
      context.strokeStyle = 'rgb(' + [101+light*154,44+light*147,24+light*101].join(',') + ')';
      context.lineWidth = size * .0011;
      context.stroke();
    }
  }

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const poster = canvas.previousElementSibling;
  let pending = false;
  function update() {
    pending = false;
    if (motion.matches) {
      canvas.style.visibility = 'hidden';
      poster.style.visibility = 'visible';
      return;
    }
    const bounds = canvas.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
    const pixels = Math.min(1000, Math.round(Math.min(bounds.width, bounds.height) * devicePixelRatio));
    if (canvas.width !== pixels) canvas.width = canvas.height = pixels;
    draw(.38 + Math.min(scrollY / innerHeight, 1) * .8);
    poster.style.visibility = 'hidden';
    canvas.style.visibility = 'visible';
  }
  function schedule() {
    if (!pending) {
      pending = true;
      requestAnimationFrame(update);
    }
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  update();
}
createSculpture(document.querySelector('.art canvas'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('arrived');
        observer.unobserve(entry.target);
      }
    }
  });
  document.querySelectorAll('.projects article').forEach(article => observer.observe(article));
}

function openLinkedDetail() {
  const target = document.getElementById(location.hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
}
addEventListener('hashchange', openLinkedDetail);
openLinkedDetail();
