import { PlaceholderBlock } from "../PlaceholderBlock";

export const VideoGallerySection = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Gallery Section */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary animate-fade-in">
            Galeria de Produtos
          </h2>
          
          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "/lovable-uploads/da6eb3e9-5013-4af7-9bf2-1d36fe9f4c15.png",
              "/lovable-uploads/d994cdff-93be-4256-b05f-970d473fcf13.png", 
              "/lovable-uploads/44804d62-caf7-4cec-867b-3409e19266dd.png",
              "/lovable-uploads/42f52c9b-51a8-4702-a3c0-9c05d7dd4a27.png",
              "/lovable-uploads/9b86c006-cc10-4f44-b5a0-b2d62c01be49.png",
              "/lovable-uploads/57570ba7-2ef8-4cc2-8668-5b81c4972993.png",
              "/lovable-uploads/531de4d4-5f4c-4bb5-b83a-a75007a1700b.png",
              "/lovable-uploads/65400cd6-ddcf-45b1-abc9-4e988c064b8e.png"
            ].map((src, i) => (
              <div 
                key={i} 
                className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img 
                  src={src} 
                  alt={`Brigadeiros Gourmet CacauVip - Produto ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground text-sm mt-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            Brigadeiros gourmet artesanais com ingredientes premium
          </p>
        </div>
      </div>
    </section>
  );
};