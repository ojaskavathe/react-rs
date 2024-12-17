import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ShaderGen() {
  const [shaderCode, setShaderCode] = useState(`
#version 300 es

precision highp float;

out vec4 fragColor;

void main() {
	fragColor = vec4(0.0, 1.0, 0.0, 1.0);
}
  `);

  const [prompt, setPrompt] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl2");

    if (!gl) {
      console.error("WebGL not supported in this browser.");
      return;
    }
  }, [shaderCode]);

  const generateShader = async () => {
    setShaderCode(`
#version 300 es

precision highp float;

out vec4 fragColor;

void main() {
	fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
    `);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shader Generator</CardTitle>
        <CardDescription>
          Generate fragment shaders to render on this quad!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 max-w-screen-md">
        <div className="w-full space-y-2 flex flex-col items-center sm:space-x-2 sm:space-y-0 sm:flex-row">
          <Input
            placeholder="Describe the shader (eg. red circle on white background)"
            id="name"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button type="submit" onClick={generateShader}>
            Generate
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          <canvas
            ref={canvasRef}
            id="shaderCanvas"
            className="w-full aspect-square bg-gray-100 rounded-l-md"
          />

          <pre className="text-sm bg-gray-100 text-left overflow-auto aspect-square rounded-r-md">
            <code className="language-c !text-sm">{shaderCode}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
