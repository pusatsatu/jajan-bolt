'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Crown,
  Package 
} from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/header';
import UserSidebar from '@/components/user/user-sidebar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
}

interface User {
  username: string;
  role: 'trial' | 'free' | 'pro';
}

export default function ProdukPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Buket Mawar Merah",
      price: 75000,
      description: "Buket mawar segar dengan 12 tangkai mawar merah pilihan",
      image: "https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=400",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Buket Tulip Kuning",
      price: 85000,
      description: "Buket tulip kuning segar langsung import dari Belanda",
      image: "https://images.pexels.com/photos/1011302/pexels-photo-1011302.jpeg?auto=compress&cs=tinysrgb&w=400",
      createdAt: "2024-01-14"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role === 'free') {
      router.push('/user');
      return;
    }
    setUser(parsedUser);
  }, [router]);

  if (!user) return null;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (products.length >= 30) {
      toast.error('Maksimal 30 produk');
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      price: parseInt(formData.price),
      description: formData.description,
      image: formData.image || 'https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProducts(prev => [...prev, newProduct]);
    setFormData({ name: '', price: '', description: '', image: '' });
    setIsAddModalOpen(false);
    toast.success('Produk berhasil ditambahkan!');
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct) return;

    const updatedProduct: Product = {
      ...editingProduct,
      name: formData.name,
      price: parseInt(formData.price),
      description: formData.description,
      image: formData.image || editingProduct.image
    };

    setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setFormData({ name: '', price: '', description: '', image: '' });
    setIsEditModalOpen(false);
    setEditingProduct(null);
    toast.success('Produk berhasil diperbarui!');
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Produk berhasil dihapus!');
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      image: product.image
    });
    setIsEditModalOpen(true);
  };

  if (user.role === 'free') {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex">
          <UserSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto text-center">
              <div className="py-20">
                <Package className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
                <h1 className="text-3xl font-bold mb-4">Fitur Pro Diperlukan</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Kelola produk hanya tersedia untuk user Trial dan Pro. 
                  Upgrade sekarang untuk mengakses fitur ini!
                </p>
                <Button className="mx-auto">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade ke Pro
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <UserSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold">Management Produk</h1>
                <p className="text-muted-foreground">
                  Kelola katalog produk Anda ({products.length}/30)
                </p>
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button disabled={products.length >= 30}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Produk
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Produk Baru</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nama Produk</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Nama produk"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Harga</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="50000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Deskripsi produk"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">URL Gambar (opsional)</Label>
                      <Input
                        id="image"
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit">Simpan</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Cari produk..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum ada produk</h3>
                  <p className="text-muted-foreground mb-4">
                    Mulai tambahkan produk pertama Anda untuk ditampilkan di microsite
                  </p>
                  <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Produk
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id}>
                    <div className="aspect-square relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-primary">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                        <Badge variant="outline">
                          {product.createdAt}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => openEditModal(product)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hapus
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Produk</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditProduct} className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Nama Produk</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nama produk"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-price">Harga</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="50000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Deskripsi</Label>
                    <Textarea
                      id="edit-description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Deskripsi produk"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-image">URL Gambar</Label>
                    <Input
                      id="edit-image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit">Perbarui</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Load More */}
            {filteredProducts.length >= 10 && (
              <div className="text-center mt-8">
                <Button variant="outline">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}