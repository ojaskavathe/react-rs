import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Calculator } from "@/components/calculator";
import { ShaderGen } from "@/components/shader-gen";

import "./App.css";

function App() {
  return (
    <Tabs defaultValue="shadergen" className="w-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="calculator">Calculator</TabsTrigger>
        <TabsTrigger value="shadergen">ShaderGen</TabsTrigger>
      </TabsList>
      <TabsContent value="calculator">
        <Calculator />
      </TabsContent>
      <TabsContent value="shadergen">
        <ShaderGen />
      </TabsContent>
    </Tabs>
  );
}

export default App;
