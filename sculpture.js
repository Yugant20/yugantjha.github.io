// A single indexed mesh forms a trefoil. Its normals drive the studio reflections.
function mountSculpture(canvas) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
  if (!gl) return;

  const vertexSource = `
    attribute vec2 uv;
    uniform vec2 rotation;
    varying vec3 normal;
    varying vec3 position;
    varying float groove;
    vec3 curve(float u) {
      return vec3(sin(u) + 2.0*sin(2.0*u), cos(u) - 2.0*cos(2.0*u), -sin(3.0*u)) * 0.55;
    }
    mat3 rotate(float yaw, float pitch) {
      float a=cos(yaw), b=sin(yaw), c=cos(pitch), d=sin(pitch);
      return mat3(a, b*d, -b*c, 0., c, d, b, -a*d, a*c);
    }
    void main() {
      vec3 tangent = normalize(curve(uv.x + 0.002) - curve(uv.x - 0.002));
      vec3 side = normalize(cross(tangent, vec3(0.,0.,1.)));
      vec3 up = cross(tangent, side);
      vec3 n = cos(uv.y)*side + sin(uv.y)*up;
      mat3 view = rotate(rotation.x, rotation.y);
      position = view * (curve(uv.x) + 0.33*n);
      normal = view*n;
      groove = uv.x;
      gl_Position = vec4(position.xy * 0.47, -position.z * 0.22, 1.0 - position.z*0.075);
    }`;
  const fragmentSource = `
    precision mediump float;
    varying vec3 normal;
    varying vec3 position;
    varying float groove;
    void main() {
      vec3 n = normalize(normal);
      vec3 r = reflect(normalize(position - vec3(0.,0.,8.)), n);
      float softbox = smoothstep(0.02,0.41,r.y) * (1.0-smoothstep(0.56,0.91,r.y));
      float edge = pow(1.0-abs(n.z), 2.5);
      float sheen = pow(max(0., dot(r,normalize(vec3(-.7,.7,.5)))), 9.);
      vec3 col = mix(vec3(.085,.11,.15),vec3(.47,.54,.63),0.5+0.5*r.x);
      col += softbox*vec3(.58,.60,.62) + sheen*.45 + edge*.17;
      col += vec3(.30,.15,.05)*pow(max(0.,-r.y),2.);
      col *= .91+.09*cos(groove*120.);
      gl_FragColor=vec4(col,1.);
    }`;

  const program = gl.createProgram();
  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]]) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  const vertices = [], indices = [];
  const rings = 256, sides = 48;
  for (let i = 0; i <= rings; i++) {
    for (let j = 0; j <= sides; j++) {
      vertices.push(i / rings * Math.PI * 2, j / sides * Math.PI * 2);
      if (i < rings && j < sides) {
        const a = i*(sides+1)+j, b = a+sides+1;
        indices.push(a,b,a+1,b,b+1,a+1);
      }
    }
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const uv = gl.getAttribLocation(program, 'uv');
  gl.enableVertexAttribArray(uv);
  gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  gl.enable(gl.DEPTH_TEST);
  const rotation = gl.getUniformLocation(program, 'rotation');

  let frame = 0, pointerX = 0, pointerY = 0, yaw = -.45, pitch = .2;
  const hero = canvas.closest('.hero');
  function render() {
    frame = 0;
    canvas.hidden = motion.matches || gl.isContextLost();
    if (canvas.hidden || document.hidden) return;
    const bounds = canvas.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
    const size = Math.min(1400, Math.round(Math.min(bounds.width,bounds.height)*devicePixelRatio));
    if (size !== canvas.width) canvas.width = canvas.height = size;
    const targetYaw = -.45 + Math.min(scrollY/innerHeight,1)*.82 + pointerX*.22;
    const targetPitch = .2 + pointerY*.12;
    yaw += (targetYaw-yaw)*.13;
    pitch += (targetPitch-pitch)*.13;
    gl.viewport(0,0,size,size);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniform2f(rotation,yaw,pitch);
    gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
    canvas.parentElement.classList.add('rendered');
    if (Math.abs(targetYaw-yaw)+Math.abs(targetPitch-pitch) > .001) schedule();
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(render);
  }
  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || motion.matches) return;
    const bounds = hero.getBoundingClientRect();
    pointerX = (event.clientX-bounds.left)/bounds.width * 2-1;
    pointerY = (event.clientY-bounds.top)/bounds.height * 2-1;
    schedule();
  });
  hero.addEventListener('pointerleave', () => { pointerX = pointerY = 0; schedule(); });
  canvas.addEventListener('webglcontextlost', () => canvas.parentElement.classList.remove('rendered'));
  motion.addEventListener('change', schedule);
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  document.addEventListener('visibilitychange',schedule);
  render();
}
mountSculpture(document.querySelector('.art canvas'));
