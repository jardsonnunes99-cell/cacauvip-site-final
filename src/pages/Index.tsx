import { HeroSection } from "@/components/sections/HeroSection";
import { VideoGallerySection } from "@/components/sections/VideoGallerySection"; 
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { SalesSection } from "@/components/sections/SalesSection";
import { BonusSection } from "@/components/sections/BonusSection";
import { EnhancedLoyaltySection } from "@/components/sections/EnhancedLoyaltySection";
import { FounderSection } from "@/components/sections/FounderSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Bloco 1: Hero Section */}
      <HeroSection />
      
      {/* Bloco 2: Vídeo de Desejo e Galeria */}
      <VideoGallerySection />
      
      {/* Bloco 3: Proposta Única de Valor */}
      <ValuePropositionSection />
      
      {/* Bloco 4: Tabela Comparativa */}
      <ComparisonSection />
      
      {/* Bloco 5: Seção de Vendas com VSL e Calculadora */}
      <SalesSection />
      
      {/* Bloco 6: Bônus Exclusivos */}
      <BonusSection />
      
      {/* Bloco 7: Programa de Fidelidade - Enhanced */}
      <div id="loyalty-section">
        <EnhancedLoyaltySection />
      </div>
      
      {/* Bloco 8: Sobre o Fundador */}
      <FounderSection />
      
      {/* Bloco 9: FAQ */}
      <FAQSection />
      
      {/* Bloco 10: Rodapé */}
      <FooterSection />
      
    </div>
  );
};

export default Index;
