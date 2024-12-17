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
import { Label } from "@/components/ui/label";

import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/themes/prism.css";

import defaultShader from "@/res/shaders/default.frag?raw";
import { setupPipeline } from "@/lib/webgl-boilerplate";

export function ShaderGen() {
  const [shaderValid, setShaderValid] = useState(false);
  const [shaderCode, setShaderCode] = useState(defaultShader);

  const [prompt, setPrompt] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const codeRef = useRef<HTMLElement>(null); //FIX: prism prevents shaderCode update propogation 

  useEffect(() => {
    codeRef.current!.textContent = shaderCode;
    Prism.highlightAll();

    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl2");

    if (!gl) {
      console.error("WebGL not supported in this browser.");
      return;
    }

    console.log("changed shaderCode");
    return setupPipeline(canvas, gl, shaderCode, setShaderValid);
  }, [shaderCode]);

  const generateShader = async () => {
    const response = await fetch("http://localhost:4000/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      console.log("oof");
    }

    const data = await response.json();
    setShaderCode(data.result);
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
            className="w-full mt-2 aspect-square bg-gray-100 rounded-l-md"
          />

          <pre className="text-sm bg-gray-100 text-left overflow-auto aspect-square rounded-r-md">
            <code ref={codeRef} className="language-c !text-sm">{shaderCode}</code>
          </pre>
        </div>
        {!shaderValid && (
          <Label className="text-red-700">Invalid Shader Code!</Label>
        )}
      </CardContent>
    </Card>
  );
}
