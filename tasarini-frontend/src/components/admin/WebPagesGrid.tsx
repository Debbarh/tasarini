
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Search, Eye, Edit, Trash, Plus, FileText, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface WebPageData {
  id: string;
  name: string;
  slug: string;
  content_preview: string;
  is_active: boolean;
  created: string;
  updated: string;
}

interface WebPageFormData {
  name: string;
  slug: string;
  content: string;
  is_active: boolean;
}

const WebPagesGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<WebPageData | null>(null);
  const { toast } = useToast();

  const form = useForm<WebPageFormData>({
    defaultValues: {
      name: '',
      slug: '',
      content: '',
      is_active: true
    }
  });

  // Données d'exemple correspondant à votre modèle WebPage
  const webPages: WebPageData[] = [
    { 
      id: '1', 
      name: 'À propos', 
      slug: 'about', 
      content_preview: 'Notre mission est de vous accompagner dans vos voyages...', 
      is_active: true, 
      created: '2024-01-15', 
      updated: '2024-01-20' 
    },
    { 
      id: '2', 
      name: 'Conditions générales', 
      slug: 'terms', 
      content_preview: 'Les présentes conditions générales régissent...', 
      is_active: true, 
      created: '2024-01-16', 
      updated: '2024-01-22' 
    },
    { 
      id: '3', 
      name: 'Politique de confidentialité', 
      slug: 'privacy', 
      content_preview: 'Nous attachons une grande importance à la protection...', 
      is_active: true, 
      created: '2024-01-17', 
      updated: '2024-01-21' 
    },
    { 
      id: '4', 
      name: 'FAQ Voyage', 
      slug: 'faq-travel', 
      content_preview: 'Questions fréquemment posées sur nos services...', 
      is_active: false, 
      created: '2024-01-18', 
      updated: '2024-01-23' 
    },
  ];

  const filteredPages = webPages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPage = (data: WebPageFormData) => {
    console.log('Adding page:', data);
    toast({
      title: "Page ajoutée",
      description: `${data.name} a été ajoutée avec succès.`,
    });
    setIsAddDialogOpen(false);
    form.reset();
  };

  const handleEditPage = (data: WebPageFormData) => {
    console.log('Editing page:', data);
    toast({
      title: "Page modifiée",
      description: `${data.name} a été modifiée avec succès.`,
    });
    setIsEditDialogOpen(false);
    form.reset();
  };

  const handleDeletePage = (page: WebPageData) => {
    console.log('Deleting page:', page.id);
    toast({
      title: "Page supprimée",
      description: `${page.name} a été supprimée avec succès.`,
    });
  };

  const handleViewPage = (page: WebPageData) => {
    console.log('Viewing page:', page.slug);
    toast({
      title: "Aperçu de la page",
      description: `Ouverture de "${page.name}"`,
    });
  };

  const openEditDialog = (page: WebPageData) => {
    setEditingPage(page);
    form.reset({
      name: page.name,
      slug: page.slug,
      content: page.content_preview + "...", // En réalité, on récupérerait le contenu complet
      is_active: page.is_active
    });
    setIsEditDialogOpen(true);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[àáâäã]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôöõ]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const WebPageForm = ({ onSubmit, submitLabel }: { onSubmit: (data: WebPageFormData) => void, submitLabel: string }) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Le nom est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la page</FormLabel>
              <FormControl>
                <Input 
                  placeholder="À propos" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    // Auto-génération du slug
                    const slugField = form.getValues('slug');
                    if (!slugField || slugField === generateSlug(form.getValues('name'))) {
                      form.setValue('slug', generateSlug(e.target.value));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="slug"
          rules={{ 
            required: "Le slug est requis",
            pattern: {
              value: /^[a-z0-9-]+$/,
              message: "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (URL)</FormLabel>
              <FormControl>
                <Input placeholder="about" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          rules={{ required: "Le contenu est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Contenu de la page..." 
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Page active</FormLabel>
                <div className="text-sm text-gray-500">
                  La page sera visible sur le site
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold">Gestion des Pages Web</h3>
          <p className="text-gray-600">Gérez le contenu CMS de votre site</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle page</DialogTitle>
            </DialogHeader>
            <WebPageForm onSubmit={handleAddPage} submitLabel="Ajouter" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Rechercher une page..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-600">Total Pages</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{webPages.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600">Pages Actives</span>
          </div>
          <p className="text-2xl font-bold text-green-800">
            {webPages.filter(p => p.is_active).length}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-orange-600">Pages Inactives</span>
          </div>
          <p className="text-2xl font-bold text-orange-800">
            {webPages.filter(p => !p.is_active).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Aperçu du contenu</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>Modifié le</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.name}</TableCell>
                <TableCell>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    /{page.slug}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-600 truncate">
                      {page.content_preview}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {page.is_active ? (
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  ) : (
                    <Badge variant="outline">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell>{new Date(page.created).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(page.updated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewPage(page)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(page)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePage(page)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la page</DialogTitle>
          </DialogHeader>
          <WebPageForm onSubmit={handleEditPage} submitLabel="Modifier" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebPagesGrid;
