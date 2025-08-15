import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Sari Melati",
      business: "Toko Kue Online",
      content: "Sejak pakai jajan.app, penjualan kue saya naik 300%! Interface-nya mudah banget dan customer jadi lebih mudah pesan lewat WhatsApp.",
      rating: 5
    },
    {
      name: "Budi Santoso", 
      business: "Warung Elektronik",
      content: "Platform yang sangat membantu UMKM seperti saya. Dalam 1 minggu sudah dapat 50+ customer baru dari microsite ini.",
      rating: 5
    },
    {
      name: "Rina Handayani",
      business: "Fashion Hijab",
      content: "Desain batiknya unik dan elegant. Pelanggan sering puji tampilan toko online saya yang terlihat profesional.",
      rating: 5
    },
    {
      name: "Ahmad Wijaya",
      business: "Toko Tanaman Hias",
      content: "Yang paling saya suka adalah fitur analytics-nya. Bisa tau produk mana yang laris dan jam berapa customer paling aktif.",
      rating: 5
    },
    {
      name: "Desi Purnama",
      business: "Catering Rumahan",
      content: "Setup microsite-nya cuma butuh 5 menit! Langsung bisa jualan online dan terima pesanan dari WhatsApp.",
      rating: 5
    },
    {
      name: "Hendra Kurnia",
      business: "Jasa Service HP",
      content: "Fitur custom link-nya berguna banget. Bisa kasih link ke semua sosmed dan portfolio kerja saya dalam satu tempat.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Apa Kata Mereka yang Sudah Sukses?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ribuan penjual telah merasakan manfaatnya. Sekarang giliran Anda untuk bergabung!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.business}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Penjual Aktif</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Transaksi Berhasil</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Rating Kepuasan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}