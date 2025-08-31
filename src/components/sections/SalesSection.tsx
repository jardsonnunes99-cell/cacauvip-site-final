import { PlaceholderBlock } from "../PlaceholderBlock";
import { PricingCalculator } from "../PricingCalculator";

export const SalesSection = () => {
  return (
    <section id="sales-section" className="py-16 px-4 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Faça seu Pedido Personalizado
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja como é simples criar a encomenda perfeita para seu evento
          </p>
        </div>

        {/* VSL Placeholder */}
        <div className="mb-12">
          <PlaceholderBlock height="xl" className="max-w-2xl mx-auto">
            🎬 [INSIRA SEU VÍDEO DE VENDAS (VSL) AQUI]
            <br />
            <span className="text-xs text-muted-foreground mt-2 block">
              Vídeo explicativo sobre o processo, qualidade e benefícios
            </span>
          </PlaceholderBlock>
        </div>

        {/* Interactive Calculator */}
        <div className="mb-8">
          <PricingCalculator />
        </div>

        {/* Pricing Information */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
          <h3 className="text-lg font-bold text-center text-primary mb-4">
            💰 Tabela de Preços
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span className="font-medium">100 - 199 unidades:</span>
              <span className="font-bold text-accent-gold">R$ 1,80/un</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-conversion-green/10 rounded-lg border border-conversion-green/30">
              <span className="font-medium">200+ unidades:</span>
              <span className="font-bold text-conversion-green">R$ 1,75/un</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            ⭐ Pedido mínimo de 100 unidades
          </p>
        </div>
      </div>
    </section>
  );
};