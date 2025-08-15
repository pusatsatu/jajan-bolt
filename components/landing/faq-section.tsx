import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQSection() {
  const faqs = [
    {
      question: "Apakah benar-benar gratis?",
      answer: "Ya! Anda bisa membuat microsite dan menggunakannya selamanya dengan paket Free. Upgrade ke Pro hanya jika Anda butuh fitur tambahan seperti katalog produk dan custom link."
    },
    {
      question: "Bagaimana cara pembayaran untuk upgrade ke Pro?",
      answer: "Pembayaran dilakukan melalui QRIS yang akan ditampilkan setelah Anda memilih paket Pro. Setelah transfer, upload bukti pembayaran dan admin akan memverifikasi dalam 1x24 jam."
    },
    {
      question: "Apakah saya bisa menggunakan domain sendiri?",
      answer: "Saat ini microsite Anda akan menggunakan format jajan.app/i/username. Fitur custom domain sedang dalam tahap pengembangan."
    },
    {
      question: "Bagaimana cara customer memesan produk?",
      answer: "Customer dapat melihat katalog produk di microsite Anda, menambahkan ke keranjang, lalu checkout melalui WhatsApp. Pesan otomatis akan dikirim ke nomor WhatsApp yang Anda daftarkan."
    },
    {
      question: "Apakah ada batasan pengunjung?",
      answer: "Tidak ada batasan pengunjung untuk semua paket. Microsite Anda dapat diakses oleh siapa saja dan kapan saja tanpa batasan traffic."
    },
    {
      question: "Bisakah saya mengganti username setelah registrasi?",
      answer: "Username tidak dapat diubah setelah registrasi. Pastikan Anda memilih username yang tepat saat pendaftaran."
    },
    {
      question: "Bagaimana jika saya lupa password?",
      answer: "Hubungi customer service melalui WhatsApp untuk reset password. Tim support akan membantu Anda mengatur password baru."
    },
    {
      question: "Apakah ada kontrak jangka panjang?",
      answer: "Tidak ada kontrak. Untuk paket Pro, Anda bisa berlangganan bulanan atau tahunan. Bisa dibatalkan kapan saja tanpa penalti."
    },
    {
      question: "Bagaimana keamanan data saya?",
      answer: "Data Anda aman dengan enkripsi SSL dan backup otomatis. Kami tidak menyimpan informasi sensitif seperti password dalam bentuk plain text."
    },
    {
      question: "Apakah microsite saya SEO friendly?",
      answer: "Ya! Semua microsite dioptimasi untuk SEO dengan meta tags yang tepat, loading cepat, dan struktur HTML yang search engine friendly."
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang jajan.app dan fitur-fiturnya.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}