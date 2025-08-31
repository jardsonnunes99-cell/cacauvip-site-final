import { PlaceholderBlock } from "../PlaceholderBlock";
import { Card, CardContent } from "@/components/ui/card";

export const FounderSection = () => {
  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            Conheça o Fundador
          </h2>
          <p className="text-muted-foreground">
            A paixão por doces que transformou um sonho em realidade
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl border-none bg-card/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="md:flex">
              {/* Photo */}
              <div className="md:w-1/3 flex items-center justify-center p-8">
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-accent-gold/20">
                  <img 
                    src="/lovable-uploads/555c45b1-4f03-43b1-8e75-5698f157cd8f.png" 
                    alt="Jardson Silva - Fundador da CacauVIP" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Jardson Silva
                </h3>
                
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Jardson, confeiteiro e fundador da CacauVIP. No início, enfrentei muitas dificuldades e precisei empreender para mudar minha vida. Hoje, transformo dedicação e paixão em doces que marcam momentos inesquecíveis. Minha missão é encantar pessoas e inspirar histórias de superação. Cada brigadeiro leva não só sabor, mas também minha trajetória e propósito: oferecer qualidade, sofisticação e praticidade em todos os eventos.
                  </p>
                  
                  <div className="bg-accent-gold/10 p-4 rounded-lg border-l-4 border-accent-gold mt-6">
                    <p className="text-right text-primary font-medium">
                      <strong>Jardson Silva</strong><br/>
                      <span className="text-sm text-muted-foreground">Fundador & Confeiteiro</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};