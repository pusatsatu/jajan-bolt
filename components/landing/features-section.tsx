import { Card } from '@/components/ui/card';
import { 
  Smartphone, 
  ShoppingBag, 
  Link as LinkIcon, 
  BarChart3, 
  MessageSquare, 
  Palette,
  Globe,
  Zap
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Microsite Responsif",
      description: "Tampil sempurna di semua perangkat dengan desain yang menarik"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Katalog Produk",
      description: "Kelola hingga 30 produk dengan gambar dan deskripsi lengkap"
    },
    {
      icon: <LinkIcon className="w-8 h-8" />,
      title: "Custom Link",
      description: "Tambahkan hingga 30 link custom untuk media sosial dan website"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Real-time",
      description: "Pantau pengunjung dan performa toko secara real-time"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Integrasi WhatsApp",
      description: "Checkout langsung melalui WhatsApp untuk kemudahan berkomunikasi"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Desain Batik",
      description: "Tema eksklusif dengan motif batik tradisional Indonesia"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "SEO Optimized",
      description: "Optimasi mesin pencari untuk meningkatkan visibilitas"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Loading Super Cepat",
      description: "Performance optimal dengan teknologi Next.js terbaru"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fitur Lengkap untuk Kesuksesan Anda
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dapatkan semua tools yang Anda butuhkan untuk menjalankan bisnis online
            yang sukses dan menguntungkan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}