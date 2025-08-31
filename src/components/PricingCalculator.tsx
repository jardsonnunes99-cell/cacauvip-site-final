import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppButton } from "./WhatsAppButton";

export const PricingCalculator = () => {
  const [quantity, setQuantity] = useState(100);
  const [inputValue, setInputValue] = useState("100");

  // Pricing logic
  const getUnitPrice = (qty: number) => {
    return qty >= 200 ? 1.75 : 1.80;
  };

  const totalValue = quantity * getUnitPrice(quantity);
  const unitPrice = getUnitPrice(quantity);

  const handleSliderChange = (value: number[]) => {
    const newQuantity = value[0];
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numValue = parseInt(value) || 100;
    const clampedValue = Math.max(100, Math.min(1000, numValue));
    setQuantity(clampedValue);
  };

  useEffect(() => {
    // Update input if it differs from quantity (for validation)
    if (parseInt(inputValue) !== quantity && inputValue !== "") {
      setInputValue(quantity.toString());
    }
  }, [quantity, inputValue]);

  return (
    <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary animate-fade-in">
          Calculadora de Preços
        </CardTitle>
        <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Mínimo de 100 unidades
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quantity Slider */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <label className="text-sm font-medium text-foreground">
            Quantidade: {quantity} unidades
          </label>
          <Slider
            value={[quantity]}
            onValueChange={handleSliderChange}
            max={1000}
            min={100}
            step={10}
            className="w-full hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Direct Input */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <label className="text-sm font-medium text-foreground">
            Ou digite a quantidade:
          </label>
          <Input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            min="100"
            max="1000"
            className="text-center text-lg font-semibold hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Pricing Display */}
        <div className="bg-secondary/50 rounded-lg p-4 space-y-2 animate-fade-in hover:bg-secondary/70 transition-colors duration-300" style={{ animationDelay: "0.8s" }}>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Preço unitário:</span>
            <span className="font-semibold text-primary">
              R$ {unitPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-2xl text-accent-gold animate-pulse-soft">
              R$ {totalValue.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          {quantity >= 200 && (
            <p className="text-sm text-conversion-green font-medium text-center animate-bounce-gentle">
              🎉 Desconto aplicado para 200+ unidades!
            </p>
          )}
        </div>

        {/* WhatsApp Button */}
        <div className="animate-fade-in">
          <WhatsAppButton 
            quantity={quantity} 
            totalValue={totalValue}
            className="w-full hover:scale-105 transition-transform duration-300"
          >
            Fazer Encomenda via WhatsApp
          </WhatsAppButton>
        </div>
      </CardContent>
    </Card>
  );
};