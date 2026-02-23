import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, ShieldCheck, Settings, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/data/products';
import {
  MakhanaContentSettings,
  MakhanaSection,
  defaultMakhanaSettings,
  getMakhanaProducts,
  getMakhanaSettings,
  makeProductId,
  resetMakhanaProducts,
  resetMakhanaSettings,
  saveMakhanaProducts,
  saveMakhanaSettings,
} from '@/data/makhanaStore';

const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = '123';
const ADMIN_SESSION_KEY = 'genus-admin-session-v1';

const getDefaultDraft = (): Product => ({
  id: '',
  title: '',
  subtitle: '',
  grade: '',
  image: '',
  description: '',
  price: '',
  features: [''],
  nutritionalInfo: [{ label: 'Protein', value: '0g' }],
  packaging: [''],
  bannerImage: '/assets/makhana-harvest-bg.png',
  weightInGrams: 250,
  section: 'green',
});

const textToList = (value: string) => value.split('\n').map((line) => line.trim()).filter(Boolean);
const listToText = (items: string[]) => items.join('\n');
const nutritionToText = (items: { label: string; value: string }[]) => items.map((item) => `${item.label}: ${item.value}`).join('\n');

const textToNutrition = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(':');
      return { label: (label || '').trim(), value: rest.join(':').trim() };
    })
    .filter((item) => item.label && item.value);

const fieldClass = 'mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-300';
const textareaClass = `${fieldClass} min-h-28`;

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(ADMIN_SESSION_KEY) === 'true');
  const [loginForm, setLoginForm] = useState({ name: '', password: '' });

  const [products, setProducts] = useState<Product[]>(() => getMakhanaProducts());
  const [settings, setSettings] = useState<MakhanaContentSettings>(() => getMakhanaSettings());
  const [selectedId, setSelectedId] = useState<string | null>(products[0]?.id ?? null);
  const selectedProduct = useMemo(() => products.find((item) => item.id === selectedId) ?? null, [products, selectedId]);

  const [draft, setDraft] = useState<Product>(() => selectedProduct ?? getDefaultDraft());
  const [featureText, setFeatureText] = useState<string>(() => listToText(draft.features));
  const [packagingText, setPackagingText] = useState<string>(() => listToText(draft.packaging));
  const [nutritionText, setNutritionText] = useState<string>(() => nutritionToText(draft.nutritionalInfo));
  const [filterValue, setFilterValue] = useState('');

  const filteredProducts = useMemo(() => {
    const query = filterValue.trim().toLowerCase();
    if (!query) return products;
    return products.filter((item) => item.title.toLowerCase().includes(query) || item.id.toLowerCase().includes(query));
  }, [filterValue, products]);

  const syncDraftTextState = (next: Product) => {
    setFeatureText(listToText(next.features));
    setPackagingText(listToText(next.packaging));
    setNutritionText(nutritionToText(next.nutritionalInfo));
  };

  const loadDraft = (product: Product | null) => {
    const next = product ?? getDefaultDraft();
    setDraft(next);
    syncDraftTextState(next);
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (loginForm.name.trim() === ADMIN_USER && loginForm.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      toast.success('Access granted.');
      return;
    }
    toast.error('Invalid credentials.');
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setLoginForm({ name: '', password: '' });
  };

  const handleDraftChange = (key: keyof Product, value: string | number | MakhanaSection) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileToImage = (event: ChangeEvent<HTMLInputElement>, key: 'image' | 'secondaryImage') => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!result) {
        toast.error('Could not read image file.');
        return;
      }
      setDraft((prev) => ({ ...prev, [key]: result }));
      toast.success('Image uploaded to draft.');
    };
    reader.readAsDataURL(file);
  };

  const persistProducts = (nextProducts: Product[]) => {
    setProducts(nextProducts);
    saveMakhanaProducts(nextProducts);
  };

  const handleSaveProduct = (event: FormEvent) => {
    event.preventDefault();
    const section = draft.section ?? 'green';
    const title = draft.title.trim();
    const id = draft.id.trim() || makeProductId(section, title);

    if (!title) return toast.error('Title is required.');
    if (!draft.image.trim()) return toast.error('Primary image is required.');

    const nextProduct: Product = {
      ...draft,
      id,
      section,
      title,
      subtitle: draft.subtitle.trim() || 'Makhana Product',
      grade: draft.grade.trim() || 'Premium',
      price: draft.price.trim() || '₹0',
      description: draft.description.trim() || 'No description provided.',
      image: draft.image.trim(),
      secondaryImage: draft.secondaryImage?.trim() || undefined,
      bannerImage: draft.bannerImage.trim() || '/assets/makhana-harvest-bg.png',
      weightInGrams: Number(draft.weightInGrams) > 0 ? Number(draft.weightInGrams) : 250,
      features: textToList(featureText).length ? textToList(featureText) : ['Fresh stock'],
      packaging: textToList(packagingText).length ? textToList(packagingText) : ['Standard pack'],
      nutritionalInfo: textToNutrition(nutritionText).length
        ? textToNutrition(nutritionText)
        : [
            { label: 'Protein', value: '0g' },
            { label: 'Fiber', value: '0g' },
          ],
    };

    const existingIndex = products.findIndex((item) => item.id === selectedId || item.id === nextProduct.id);
    const nextProducts = [...products];

    if (existingIndex >= 0) {
      nextProducts[existingIndex] = nextProduct;
      toast.success('Product updated.');
    } else {
      nextProducts.unshift(nextProduct);
      toast.success('Product created.');
    }

    persistProducts(nextProducts);
    setSelectedId(nextProduct.id);
    setDraft(nextProduct);
    syncDraftTextState(nextProduct);
  };

  const handleDeleteProduct = () => {
    if (!selectedId) return toast.error('No product selected.');
    const nextProducts = products.filter((item) => item.id !== selectedId);
    persistProducts(nextProducts);
    toast.success('Product deleted.');
    const nextSelected = nextProducts[0] ?? null;
    setSelectedId(nextSelected?.id ?? null);
    loadDraft(nextSelected);
  };

  const handleCreateNew = () => {
    setSelectedId(null);
    loadDraft(getDefaultDraft());
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedId(product.id);
    loadDraft(product);
  };

  const handleSaveSettings = (event: FormEvent) => {
    event.preventDefault();
    saveMakhanaSettings(settings);
    toast.success('Makhana page content updated.');
  };

  const handleResetAll = () => {
    resetMakhanaProducts();
    resetMakhanaSettings();
    const fallbackProducts = getMakhanaProducts();
    setProducts(fallbackProducts);
    setSettings(defaultMakhanaSettings);
    const first = fallbackProducts[0] ?? null;
    setSelectedId(first?.id ?? null);
    loadDraft(first);
    toast.success('Reset to defaults.');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30 font-sans text-gray-900 overflow-x-hidden relative">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] bg-orange-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <nav className="relative z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/makhana" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900" aria-label="Go back">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-green-600 flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">G</div>
                <span className="font-bold text-xl tracking-tight">Genus <span className="text-green-700">Agro</span></span>
              </Link>
            </div>
            <div className="text-sm font-semibold text-gray-700">Admin Access</div>
          </div>
        </nav>

        <section className="relative z-10 pt-16 pb-24 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-100 mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-xs font-bold text-orange-800 uppercase tracking-widest">Secure Admin</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Makhana Admin <br />
            <span className="bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">Control Panel.</span>
          </h1>

          <form onSubmit={handleLogin} className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-[0_20px_50px_rgba(234,88,12,0.15)] space-y-4">
            <label className="text-sm font-semibold block">
              Name
              <input
                className={fieldClass}
                value={loginForm.name}
                onChange={(event) => setLoginForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Enter name"
              />
            </label>
            <label className="text-sm font-semibold block">
              Password
              <input
                type="password"
                className={fieldClass}
                value={loginForm.password}
                onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                placeholder="Enter password"
              />
            </label>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold">
              Login
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30 font-sans text-gray-900 overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] bg-orange-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <nav className="relative z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/makhana" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900" aria-label="Go back">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-green-600 flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">G</div>
              <span className="font-bold text-xl tracking-tight">Genus <span className="text-green-700">Agro</span></span>
            </Link>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <Link to="/makhana" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">View Page</Link>
            <button onClick={handleResetAll} className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">Reset</button>
            <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">Logout</button>
          </div>
        </div>
      </nav>

      <section className="relative z-10 pt-12 pb-10 px-4 md:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-100 mb-6 shadow-sm">
          <Leaf className="w-4 h-4 text-green-600" />
          <span className="text-xs font-bold text-orange-800 uppercase tracking-widest">Catalog Administration</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          Manage Products <br />
          <span className="bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">In Real Time.</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {[
            { icon: Sparkles, label: 'Add New Products' },
            { icon: Settings, label: 'Edit Existing Catalog' },
            { icon: ShieldCheck, label: 'Update Page Content' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
              <badge.icon className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-gray-800">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      <main className="relative z-10 container mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <aside className="bg-white rounded-[2rem] border border-gray-100 p-5 shadow-sm h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Product List</h2>
            <button onClick={handleCreateNew} className="text-xs px-3 py-2 bg-orange-500 text-white rounded-xl font-semibold">+ New</button>
          </div>
          <input
            className={fieldClass}
            placeholder="Search by title or id"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          />
          <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-1 mt-3">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className={`w-full text-left p-3 rounded-xl border transition ${
                  selectedId === product.id ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <p className="text-sm font-semibold line-clamp-1">{product.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{product.id}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-6">
          <form onSubmit={handleSaveProduct} className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Product Editor</h2>
              <button type="button" onClick={handleDeleteProduct} className="text-sm font-semibold text-red-600 hover:text-red-700">Delete Selected</button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="text-sm font-semibold">Section
                <select className={fieldClass} value={draft.section ?? 'green'} onChange={(event) => handleDraftChange('section', event.target.value as MakhanaSection)}>
                  <option value="green">Retail Green</option>
                  <option value="loose">Loose</option>
                  <option value="packet">Branded Packet</option>
                </select>
              </label>
              <label className="text-sm font-semibold">Product ID (optional)
                <input className={fieldClass} value={draft.id} onChange={(event) => handleDraftChange('id', event.target.value)} placeholder="Auto-generated if blank" />
              </label>
              <label className="text-sm font-semibold">Title
                <input className={fieldClass} value={draft.title} onChange={(event) => handleDraftChange('title', event.target.value)} />
              </label>
              <label className="text-sm font-semibold">Subtitle
                <input className={fieldClass} value={draft.subtitle} onChange={(event) => handleDraftChange('subtitle', event.target.value)} />
              </label>
              <label className="text-sm font-semibold">Grade
                <input className={fieldClass} value={draft.grade} onChange={(event) => handleDraftChange('grade', event.target.value)} />
              </label>
              <label className="text-sm font-semibold">Price
                <input className={fieldClass} value={draft.price} onChange={(event) => handleDraftChange('price', event.target.value)} placeholder="₹500 or ₹1000 / kg" />
              </label>
              <label className="text-sm font-semibold">Weight in grams
                <input type="number" min={1} className={fieldClass} value={draft.weightInGrams} onChange={(event) => handleDraftChange('weightInGrams', Number(event.target.value) || 0)} />
              </label>
              <label className="text-sm font-semibold">Banner image path
                <input className={fieldClass} value={draft.bannerImage} onChange={(event) => handleDraftChange('bannerImage', event.target.value)} />
              </label>
            </div>

            <label className="text-sm font-semibold block">Description
              <textarea className={textareaClass} value={draft.description} onChange={(event) => handleDraftChange('description', event.target.value)} />
            </label>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="text-sm font-semibold block">Primary image URL or base64
                <input className={fieldClass} value={draft.image} onChange={(event) => handleDraftChange('image', event.target.value)} />
                <input className="mt-2 block text-sm" type="file" accept="image/*" onChange={(event) => handleFileToImage(event, 'image')} />
              </label>

              <label className="text-sm font-semibold block">Secondary image URL/base64 (optional)
                <input className={fieldClass} value={draft.secondaryImage ?? ''} onChange={(event) => handleDraftChange('secondaryImage', event.target.value)} />
                <input className="mt-2 block text-sm" type="file" accept="image/*" onChange={(event) => handleFileToImage(event, 'secondaryImage')} />
              </label>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <label className="text-sm font-semibold block">Features (one per line)
                <textarea className={textareaClass} value={featureText} onChange={(event) => setFeatureText(event.target.value)} />
              </label>
              <label className="text-sm font-semibold block">Packaging (one per line)
                <textarea className={textareaClass} value={packagingText} onChange={(event) => setPackagingText(event.target.value)} />
              </label>
              <label className="text-sm font-semibold block">Nutrition (`Label: Value` per line)
                <textarea className={textareaClass} value={nutritionText} onChange={(event) => setNutritionText(event.target.value)} />
              </label>
            </div>

            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold">Save Product</button>
          </form>

          <form onSubmit={handleSaveSettings} className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold">Makhana Page Content</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="text-sm font-semibold">Hero badge
                <input className={fieldClass} value={settings.heroBadge} onChange={(event) => setSettings((prev) => ({ ...prev, heroBadge: event.target.value }))} />
              </label>
              <label className="text-sm font-semibold">Hero title line 1
                <input className={fieldClass} value={settings.heroTitleLine1} onChange={(event) => setSettings((prev) => ({ ...prev, heroTitleLine1: event.target.value }))} />
              </label>
              <label className="text-sm font-semibold">Hero title line 2
                <input className={fieldClass} value={settings.heroTitleLine2} onChange={(event) => setSettings((prev) => ({ ...prev, heroTitleLine2: event.target.value }))} />
              </label>
              <label className="text-sm font-semibold">Retail section title
                <input className={fieldClass} value={settings.retailTitle} onChange={(event) => setSettings((prev) => ({ ...prev, retailTitle: event.target.value }))} />
              </label>
              <label className="text-sm font-semibold">Loose section title
                <input className={fieldClass} value={settings.looseTitle} onChange={(event) => setSettings((prev) => ({ ...prev, looseTitle: event.target.value }))} />
              </label>
              <label className="text-sm font-semibold">Loose section caption
                <input className={fieldClass} value={settings.looseCaption} onChange={(event) => setSettings((prev) => ({ ...prev, looseCaption: event.target.value }))} />
              </label>
              <label className="text-sm font-semibold">Packet section title
                <input className={fieldClass} value={settings.packetTitle} onChange={(event) => setSettings((prev) => ({ ...prev, packetTitle: event.target.value }))} />
              </label>
            </div>

            <label className="text-sm font-semibold block">Hero description
              <textarea className={textareaClass} value={settings.heroDescription} onChange={(event) => setSettings((prev) => ({ ...prev, heroDescription: event.target.value }))} />
            </label>

            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold">Save Page Content</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
