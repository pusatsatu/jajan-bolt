'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Crown,
  Link as LinkIcon,
  ExternalLink 
} from 'lucide-react';
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

interface CustomLink {
  id: number;
  name: string;
  url: string;
  createdAt: string;
}

interface User {
  username: string;
  role: 'trial' | 'free' | 'pro';
}

export default function CustomLinkPage() {
  const [user, setUser] = useState<User | null>(null);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([
    {
      id: 1,
      name: "📱 WhatsApp Business",
      url: "https://wa.me/6285221212223",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "📸 Instagram @toko.bunga",
      url: "https://instagram.com/toko.bunga",
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      name: "🌐 Website Toko",
      url: "https://tokobunga.com",
      createdAt: "2024-01-13"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<CustomLink | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: ''
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

  const filteredLinks = customLinks.filter(link =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (customLinks.length >= 30) {
      toast.error('Maksimal 30 custom link');
      return;
    }

    if (!formData.url.startsWith('http://') && !formData.url.startsWith('https://')) {
      setFormData(prev => ({ ...prev, url: `https://${prev.url}` }));
    }

    const newLink: CustomLink = {
      id: Date.now(),
      name: formData.name,
      url: formData.url,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCustomLinks(prev => [...prev, newLink]);
    setFormData({ name: '', url: '' });
    setIsAddModalOpen(false);
    toast.success('Custom link berhasil ditambahkan!');
  };

  const handleEditLink = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingLink) return;

    let finalUrl = formData.url;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = `https://${finalUrl}`;
    }

    const updatedLink: CustomLink = {
      ...editingLink,
      name: formData.name,
      url: finalUrl
    };

    setCustomLinks(prev => prev.map(l => l.id === editingLink.id ? updatedLink : l));
    setFormData({ name: '', url: '' });
    setIsEditModalOpen(false);
    setEditingLink(null);
    toast.success('Custom link berhasil diperbarui!');
  };

  const handleDeleteLink = (id: number) => {
    if (confirm('Yakin ingin menghapus custom link ini?')) {
      setCustomLinks(prev => prev.filter(l => l.id !== id));
      toast.success('Custom link berhasil dihapus!');
    }
  };

  const openEditModal = (link: CustomLink) => {
    setEditingLink(link);
    setFormData({
      name: link.name,
      url: link.url
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
                <LinkIcon className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
                <h1 className="text-3xl font-bold mb-4">Fitur Pro Diperlukan</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Custom Link hanya tersedia untuk user Trial dan Pro. 
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
                <h1 className="text-3xl font-bold">Management Custom Link</h1>
                <p className="text-muted-foreground">
                  Kelola link berguna untuk pengunjung ({customLinks.length}/30)
                </p>
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button disabled={customLinks.length >= 30}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Link
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Custom Link</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddLink} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nama Link</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="📱 WhatsApp Business"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://wa.me/6285221212223"
                        required
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
                        placeholder="Cari custom link..."
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

            {/* Links Grid */}
            {filteredLinks.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <LinkIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum ada custom link</h3>
                  <p className="text-muted-foreground mb-4">
                    Tambahkan link ke media sosial, website, atau platform lain untuk pengunjung
                  </p>
                  <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Link
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredLinks.map(link => (
                  <Card key={link.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{link.name}</h3>
                            <Badge variant="outline">
                              {link.createdAt}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <LinkIcon className="w-4 h-4" />
                            <span className="break-all">{link.url}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(link.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(link)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteLink(link.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </Button>
                        </div>
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
                  <DialogTitle>Edit Custom Link</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditLink} className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Nama Link</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="📱 WhatsApp Business"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-url">URL</Label>
                    <Input
                      id="edit-url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://wa.me/6285221212223"
                      required
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
            {filteredLinks.length >= 10 && (
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