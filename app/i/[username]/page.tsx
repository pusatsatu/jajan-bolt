'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  MapPin, 
  Share2, 
  ShoppingCart,
  Plus,
  Minus,
  ExternalLink 
} from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/header';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity?: number;
}

interface CustomLink {
  id: number;
  name: string;
  url: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function MicrositePage() {
  const { username } = useParams() as { username: string };
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Buket Mawar Merah",
      price: 75000,
      description: "Buket mawar segar dengan 12 tangkai mawar merah pilihan",
      image: "https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 2,
      name: "Buket Tulip Kuning",
      price: 85000,
      description: "Buket tulip kuning segar langsung import dari Belanda",
      image: "https://images.pexels.com/photos/1011302/pexels-photo-1011302.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      name: "Rangkaian Bunga Meja",
      price: 120000,
      description: "Rangkaian bunga cantik untuk dekorasi meja kantor atau rumah",
      image: "https://images.pexels.com/photos/1878825/pexels-photo-1878825.jpeg?auto=compress&cs=tinysrgb&w=400",
    }
  ]);

  const [customLinks] = useState<CustomLink[]>([
    { id: 1, name: "📱 WhatsApp Business", url: "https://wa.me/6285221212223" },
    { id: 2, name: "📸 Instagram @toko.bunga", url: "https://instagram.com/toko.bunga" },
    { id: 3, name: "🌐 Website Toko", url: "https://tokobunga.com" },
    { id: 4, name: "🎵 TikTok @tokobunga", url: "https://tiktok.com/@tokobunga" },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mock user data
  const userProfile = {
    username: username,
    description: "Toko bunga segar setiap hari 🌹 Tersedia berbagai jenis bunga untuk segala kebutuhan Anda",
    whatsapp: "+6285221212223",
    googleMaps: "https://maps.app.goo.gl/RtMAVNz2g1qepiUT9",
    role: "pro" // or "trial" or "free"
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      return prevCart.reduce((acc: CartItem[], item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    const message = `Halo! Saya ingin memesan:\n\n${cart.map(item => 
      `${item.name} x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
    ).join('\n')}\n\nTotal: Rp ${getTotalPrice().toLocaleString('id-ID')}\n\nTerima kasih!`;
    
    const whatsappUrl = `https://wa.me/${userProfile.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `@${userProfile.username} - jajan.app`,
        text: userProfile.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <Header showNav={false} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="p-6 mb-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userProfile.username.charAt(0).toUpperCase()}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold mb-2">@{userProfile.username}</h1>
              <p className="text-muted-foreground mb-4 max-w-md">
                {userProfile.description}
              </p>
            </div>

            <div className="flex gap-3">
              <Button size="sm" onClick={() => window.open(`https://wa.me/${userProfile.whatsapp.replace('+', '')}`, '_blank')}>
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button size="sm" variant="outline" onClick={() => window.open(userProfile.googleMaps, '_blank')}>
                <MapPin className="w-4 h-4 mr-2" />
                Lokasi
              </Button>
              <Button size="sm" variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </Card>

        {/* Products Section */}
        {(userProfile.role === 'pro' || userProfile.role === 'trial') && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Produk Kami</h2>
              {getTotalItems() > 0 && (
                <Button onClick={() => setIsCartOpen(true)} className="relative">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Keranjang ({getTotalItems()})
                  <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs">
                    {getTotalItems()}
                  </Badge>
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.map(product => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Custom Links Section */}
        {(userProfile.role === 'pro' || userProfile.role === 'trial') && customLinks.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">Link Berguna</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {customLinks.map(link => (
                <Card key={link.id} className="p-4 hover:shadow-md transition-shadow">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-0"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{link.name}</span>
                      <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
                    </div>
                  </Button>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
            <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Keranjang Belanja</h3>
                  <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                    <Plus className="w-4 h-4 rotate-45" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-60">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground">Keranjang kosong</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-sm text-primary">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => removeFromCart(item.id)}>
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="icon" variant="outline" onClick={() => addToCart(item)}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg text-primary">
                      Rp {getTotalPrice().toLocaleString('id-ID')}
                    </span>
                  </div>
                  <Button className="w-full" onClick={handleCheckout}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Checkout via WhatsApp
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            Powered by{' '}
            <a 
              href="/" 
              className="text-primary hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              jajan.app
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}