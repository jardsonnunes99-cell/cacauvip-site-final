import { useState } from "react";
import { PlaceholderBlock } from "../PlaceholderBlock";
import { WhatsAppButton } from "../WhatsAppButton";
import { LoginModal } from "../auth/LoginModal";
import { SignupModal } from "../auth/SignupModal";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('sales-section');
    calculatorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuthClick = () => {
    if (user) {
      // Simple check for admin access (in production, implement proper role-based access)
      if (user.email === 'admin@cacauvip.com') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setShowLogin(true);
    }
  };

  return (
    <section className="section-hero min-h-screen flex flex-col justify-center px-4 py-8">
      {/* Header with auth link */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleAuthClick}
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent-gold transition-colors text-sm font-medium bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
          >
            <User className="h-4 w-4" />
            {user ? 'Minha Conta' : 'Entrar / Cadastrar'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="mb-8 animate-scale-in">
          <img 
            src="/lovable-uploads/72a8440b-1e08-4f6e-ad3b-326299514a2a.png" 
            alt="CacauVip - Brigadeiros Gourmet" 
            className="max-w-xs mx-auto h-auto filter drop-shadow-2xl"
          />
        </div>

        {/* Slogan - Mantém funcionalidade mas otimiza apresentação */}
        <div className="text-accent-gold text-lg sm:text-xl font-medium mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          ✨ Brigadeiros Premium para Eventos Especiais
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          O detalhe de{" "}
          <span className="text-accent-gold animate-pulse-soft">
            sofisticação
          </span>{" "}
          que sua festa merece.
        </h1>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.6s" }}>
          Brigadeiros gourmet produzidos artesanalmente para surpreender seus convidados. 
          Atendendo em <strong>São José dos Cordeiros - PB</strong> e região.
        </p>

        {/* CTA Button */}
        <div className="max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <button
            onClick={scrollToCalculator}
            className="btn-hero-glow w-full"
          >
            Monte seu pedido personalizado
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80 mt-8 animate-fade-in" style={{ animationDelay: "1s" }}>
          <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
            <span className="text-accent-gold">✓</span>
            Produção Artesanal
          </div>
          <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
            <span className="text-accent-gold">✓</span>
            Ingredientes Premium
          </div>
          <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
            <span className="text-accent-gold">✓</span>
            Entrega Garantida
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      
      <SignupModal 
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </section>
  );
};