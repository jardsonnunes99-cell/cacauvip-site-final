import { Gift, CreditCard, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const bonuses = [
  {
    icon: Gift,
    title: "Embalagem Sofisticada",
    description: "Embalagem premium que valoriza ainda mais seus brigadeiros e impressiona seus convidados."
  },
  {
    icon: CreditCard,
    title: "Cartão Cliente VIP",
    description: "10% de desconto nas próximas compras e acesso exclusivo a novidades antes de todos os outros clientes."
  },
  {
    icon: Truck,
    title: "Entrega Grátis",
    description: "Entrega gratuita em São José dos Cordeiros e região para pedidos acima de 150 unidades."
  }
];

export const BonusSection = () => {
  return (
    <section className="section-premium py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Sua Encomenda Fica Ainda Melhor com{" "}
            <span className="text-accent-gold">
              Nossos Bônus Exclusivos!
            </span>
          </h2>
          <p className="text-lg text-premium-brown-foreground/90 max-w-2xl mx-auto">
            Todos os bônus abaixo estão inclusos automaticamente no seu pedido
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {bonuses.map((bonus, index) => {
            const Icon = bonus.icon;
            return (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border-premium-brown-foreground/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center">
                  {/* INCLUSO Tag */}
                  <div className="mb-6">
                    <span className="inline-block bg-accent-gold text-accent-gold-foreground px-4 py-2 rounded-full text-sm font-bold animate-pulse-soft">
                      INCLUSO
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto bg-accent-gold/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <Icon className="h-10 w-10 text-accent-gold animate-bounce-gentle" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-premium-brown-foreground mb-4">
                    {bonus.title}
                  </h3>
                  
                  <p className="text-premium-brown-foreground/80 leading-relaxed">
                    {bonus.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-premium-brown-foreground/90 font-medium">
            🎉 Tudo isso sem custo adicional!
          </p>
        </div>
      </div>
    </section>
  );
};