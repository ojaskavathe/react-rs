import { useEffect, useState } from "react";
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

import init, { calculate } from "calc-lib";

export function Calculator() {
  const [ans, setAns] = useState("");
  const [expr, setExpr] = useState("");

  useEffect(() => {
    init().then(() => {
      console.log("wasm-loaded");
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculator</CardTitle>
        <CardDescription>Evaluate Expressions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-2 flex flex-col items-center sm:space-x-2 sm:space-y-0 sm:flex-row">
          <Input
            id="name"
            placeholder="Expression (eg. 2+5)"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
          />
          <Button onClick={() => setAns(calculate(expr))}>Calculate</Button>
        </div>
        {ans != "" && (
          <div className="space-y-1 flex items-center space-x-2">
            <Label>Answer:</Label>
            <Input value={ans} readOnly />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
