import vertexShaderSrc from "@/res/shaders/default.vert?raw";
import fallbackFragmentShader from "@/res/shaders/fallback.frag?raw";

export function setupPipeline(
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext,
  shaderCode: string,
  setShaderValid: any,
) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaderCode);

  if (!fragmentShader) {
    setShaderValid(false);
    fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fallbackFragmentShader,
    );
  } else {
    setShaderValid(true);
  }

  const program = createProgram(gl, vertexShader!, fragmentShader!);
  if (!program) {
    return;
  }

  gl.useProgram(program);

  // quad
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const timeLocation = gl.getUniformLocation(program, "u_time");

  // Animation loop
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  };

  const render = (time: number) => {
    resizeCanvas();

    // Pass uniforms
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(timeLocation, time * 0.001);

    // Clear and draw
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);

  // Cleanup on component unmount
  return () => {
    console.log("cleanup");
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteBuffer(positionBuffer);
  };
}

const createShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
) => {
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking failed:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};
