import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-accent-gold mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <a 
          href="/" 
          className="btn-hero inline-flex items-center gap-2 no-underline"
        >
          <Home className="h-5 w-5" />
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
