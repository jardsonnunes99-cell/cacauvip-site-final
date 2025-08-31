import { Award, Shield, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Award,
    title: "Produção Artesanal",
    description: "Cada brigadeiro é feito à mão com ingredientes selecionados e técnicas tradicionais que garantem sabor único."
  },
  {
    icon: Shield,
    title: "Garantia de Satisfação",
    description: "100% de garantia na qualidade. Se não ficar satisfeito, refazemos seu pedido sem custo adicional."
  },
  {
    icon: Truck,
    title: "Entrega Segura",
    description: "Embalagem especial e entrega cuidadosa para manter a qualidade e apresentação dos seus brigadeiros."
  }
];

export const ValuePropositionSection = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            Por que escolher Cacau Vip?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Três pilares que fazem a diferença na sua experiência
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-accent-gold/20 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-accent-gold" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};