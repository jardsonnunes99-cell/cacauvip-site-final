import { useState } from 'react';
import { Gift, ShoppingBag, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SignupModal } from '@/components/auth/SignupModal';
import { LoginModal } from '@/components/auth/LoginModal';

export function EnhancedLoyaltySection() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-accent-gold/5 via-secondary/10 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,69,19,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.05),transparent_50%)]" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Crown className="h-8 w-8 text-accent-gold" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              Programa{' '}
              <span className="text-accent-gold">VIP</span>{' '}
              de Fidelidade
            </h2>
            <Crown className="h-8 w-8 text-accent-gold" />
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A cada 5 compras você ganha{' '}
            <span className="font-bold text-conversion-green">1 caixa de brigadeiros grátis!</span>
            {' '}Cadastre-se agora e comece a acumular seus carimbos.
          </p>
        </div>

        {/* Main Visual Explanation */}
        <div className="mb-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-2 border-accent-gold/20 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Como Funciona</h3>
                <p className="text-muted-foreground">Sistema simples e automático</p>
              </div>
              
              {/* Step by Step Visual */}
              <div className="space-y-8">
                {/* Step 1: 5 Purchases */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary">1.</span>
                    <span className="text-lg font-medium text-primary">Faça 5 compras</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div
                        key={num}
                        className="w-12 h-12 rounded-xl border-2 border-accent-gold bg-accent-gold/10 flex items-center justify-center relative"
                      >
                        <ShoppingBag className="h-5 w-5 text-accent-gold" />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent-gold text-primary text-xs font-bold rounded-full flex items-center justify-center">
                          {num}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="text-4xl text-accent-gold animate-bounce">⬇</div>
                </div>
                
                {/* Step 2: Get Prize */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-conversion-green">2.</span>
                    <span className="text-lg font-medium text-conversion-green">Ganhe seu prêmio!</span>
                  </div>
                  
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-conversion-green to-conversion-green/80 border-4 border-conversion-green/30 flex items-center justify-center animate-pulse shadow-lg">
                      <Gift className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-conversion-green/20 rounded-2xl animate-ping" />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-bold text-conversion-green mb-1">
                      1 CAIXA DE BRIGADEIROS GRÁTIS! 🎁
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Entre em contato pelo WhatsApp para resgatar
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-accent-gold/5 to-accent-gold/10 border-accent-gold/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="h-8 w-8 text-accent-gold" />
              </div>
              <h4 className="text-lg font-bold text-primary">Acumule Automaticamente</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A cada compra, você ganha automaticamente um carimbo. 
                Sem complicações, sem códigos especiais.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-conversion-green/5 to-conversion-green/10 border-conversion-green/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-conversion-green/10 rounded-full flex items-center justify-center mx-auto">
                <Gift className="h-8 w-8 text-conversion-green" />
              </div>
              <h4 className="text-lg font-bold text-primary">Prêmios Garantidos</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                5 carimbos = 1 caixa grátis garantida! 
                Brigadeiros da mesma qualidade premium.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-primary">Status VIP Exclusivo</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Atendimento prioritário, ofertas especiais e 
                acesso antecipado a novos sabores.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center space-y-8">
          <div className="max-w-md mx-auto">
            <Button 
              onClick={() => setShowSignup(true)}
              className="btn-hero-glow w-full text-lg py-4 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <Star className="h-5 w-5 mr-2" />
              Quero ser Cliente VIP!
              <Star className="h-5 w-5 ml-2" />
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-conversion-green">✓</span>
              Cadastro Gratuito
            </div>
            <div className="flex items-center gap-2">
              <span className="text-conversion-green">✓</span>
              Sem Taxas Ocultas
            </div>
            <div className="flex items-center gap-2">
              <span className="text-conversion-green">✓</span>
              Prêmios Garantidos
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SignupModal 
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
      
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
    </section>
  );
}