import { MapPin, Phone, Instagram, Facebook, MessageCircle } from "lucide-react";
import { PlaceholderBlock } from "../PlaceholderBlock";

export const FooterSection = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Info */}
          <div className="space-y-6">
            <img 
              src="/lovable-uploads/72a8440b-1e08-4f6e-ad3b-326299514a2a.png" 
              alt="CacauVip - Brigadeiros Gourmet" 
              className="max-w-32 h-auto"
            />
            
            <p className="text-primary-foreground/80 leading-relaxed">
              Brigadeiros gourmet artesanais que transformam seu evento em uma experiência inesquecível.
            </p>
            
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent-gold/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent-gold/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/5583999004653"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-conversion-green rounded-full flex items-center justify-center hover:bg-conversion-green/80 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-accent-gold">
              Informações de Contato
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Localização</p>
                  <p className="text-primary-foreground/80 text-sm">
                    São José dos Cordeiros - PB<br />
                    e região
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Telefone/WhatsApp</p>
                  <a 
                    href="https://wa.me/5583999004653"
                    className="text-primary-foreground/80 text-sm hover:text-accent-gold transition-colors"
                  >
                    (83) 99900-4653
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-accent-gold">
              Links Rápidos
            </h3>
            
            <div className="space-y-3">
              <a 
                href="#sales-section"
                className="block text-primary-foreground/80 hover:text-accent-gold transition-colors text-sm"
              >
                Fazer Pedido
              </a>
              <a 
                href="https://wa.me/5583999004653?text=Olá! Gostaria de saber sobre os sabores disponíveis."
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary-foreground/80 hover:text-accent-gold transition-colors text-sm"
              >
                Sabores Disponíveis
              </a>
              <a 
                href="https://wa.me/5583999004653?text=Olá! Gostaria de informações sobre entrega."
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary-foreground/80 hover:text-accent-gold transition-colors text-sm"
              >
                Informações de Entrega
              </a>
              <a 
                href="https://wa.me/5583999004653?text=Olá! Gostaria de fazer um orçamento personalizado."
                target="_blank"
                rel="noopener noreferrer" 
                className="block text-primary-foreground/80 hover:text-accent-gold transition-colors text-sm"
              >
                Orçamento Personalizado
              </a>
              <a 
                href="#loyalty-section"
                className="block text-primary-foreground/80 hover:text-accent-gold transition-colors text-sm"
              >
                Programa de Fidelidade
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Cacau Vip. Todos os direitos reservados.
            </p>
            
            {/* Final WhatsApp Button */}
            <a
              href="https://wa.me/5583999004653?text=Olá! Gostaria de fazer uma encomenda."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};