import { X, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const comparisonData = [
  {
    feature: "Ingredientes Premium",
    traditional: false,
    cacauVip: true
  },
  {
    feature: "Produção Artesanal",
    traditional: false,
    cacauVip: true
  },
  {
    feature: "Embalagem Sofisticada",
    traditional: false,
    cacauVip: true
  },
  {
    feature: "Controle de Qualidade",
    traditional: false,
    cacauVip: true
  },
  {
    feature: "Personalização",
    traditional: false,
    cacauVip: true
  },
  {
    feature: "Garantia de Satisfação",
    traditional: false,
    cacauVip: true
  },
  {
    feature: "Atendimento Personalizado",
    traditional: false,
    cacauVip: true
  }
];

export const ComparisonSection = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            A diferença é clara
          </h2>
          <p className="text-muted-foreground">
            Compare e veja por que Cacau Vip é a escolha certa
          </p>
        </div>

        <Card className="overflow-hidden shadow-2xl border-none">
          <CardHeader className="bg-primary text-primary-foreground p-0">
            <div className="grid grid-cols-3 text-center">
              <div className="py-6 px-4">
                <CardTitle className="text-lg font-bold">Características</CardTitle>
              </div>
              <div className="py-6 px-4 bg-muted/20">
                <CardTitle className="text-lg font-bold">Docinhos Tradicionais</CardTitle>
              </div>
              <div className="py-6 px-4 bg-accent-gold text-accent-gold-foreground">
                <CardTitle className="text-lg font-bold">Cacau Vip</CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {comparisonData.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-secondary/30' : 'bg-background'}`}
              >
                <div className="py-4 px-4 font-medium text-foreground border-r border-border">
                  {item.feature}
                </div>
                
                <div className="py-4 px-4 text-center border-r border-border">
                  {item.traditional ? (
                    <Check className="h-6 w-6 text-conversion-green mx-auto" />
                  ) : (
                    <X className="h-6 w-6 text-destructive mx-auto" />
                  )}
                </div>
                
                <div className="py-4 px-4 text-center bg-accent-gold/10">
                  {item.cacauVip ? (
                    <Check className="h-6 w-6 text-conversion-green mx-auto" />
                  ) : (
                    <X className="h-6 w-6 text-destructive mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-muted-foreground italic">
            ✨ A qualidade que faz toda a diferença na sua festa
          </p>
        </div>
      </div>
    </section>
  );
};