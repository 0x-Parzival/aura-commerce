import { useEffect, useState } from 'react';
import { Product, products as defaultProducts } from './products';

const PRODUCT_STORAGE_KEY = 'genus-makhana-products-v1';
const SETTINGS_STORAGE_KEY = 'genus-makhana-settings-v1';

export type MakhanaSection = 'green' | 'loose' | 'packet';

export interface MakhanaContentSettings {
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  retailTitle: string;
  looseTitle: string;
  looseCaption: string;
  packetTitle: string;
}

export const defaultMakhanaSettings: MakhanaContentSettings = {
  heroBadge: 'Premium Quality Makhana',
  heroTitleLine1: 'Pure Crunchiness',
  heroTitleLine2: 'Perfected.',
  heroDescription:
    "Experience Bihar's finest GI-tagged Makhana. Naturally grown, ethically harvested, and packed with health benefits in every single bite.",
  retailTitle: 'Retail Green Packets',
  looseTitle: 'Loose Makhana (Wholesale)',
  looseCaption: 'Bulk pricing available per kilogram',
  packetTitle: 'Branded Packets',
};

const toArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === 'string').map((item) => item.trim()).filter(Boolean);
};

const toNutrition = (value: unknown): { label: string; value: string }[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const nutrition = item as { label?: unknown; value?: unknown };
      const label = typeof nutrition.label === 'string' ? nutrition.label.trim() : '';
      const nutritionValue = typeof nutrition.value === 'string' ? nutrition.value.trim() : '';
      if (!label || !nutritionValue) return null;
      return { label, value: nutritionValue };
    })
    .filter((item): item is { label: string; value: string } => item !== null);
};

const sanitizeProduct = (raw: unknown, index: number): Product => {
  const data = (raw && typeof raw === 'object' ? raw : {}) as Partial<Product>;
  const fallback = defaultProducts[index % defaultProducts.length];

  return {
    id: typeof data.id === 'string' && data.id.trim() ? data.id.trim() : fallback.id,
    title: typeof data.title === 'string' && data.title.trim() ? data.title.trim() : fallback.title,
    subtitle: typeof data.subtitle === 'string' && data.subtitle.trim() ? data.subtitle.trim() : fallback.subtitle,
    grade: typeof data.grade === 'string' && data.grade.trim() ? data.grade.trim() : fallback.grade,
    image: typeof data.image === 'string' && data.image.trim() ? data.image.trim() : fallback.image,
    secondaryImage:
      typeof data.secondaryImage === 'string' && data.secondaryImage.trim() ? data.secondaryImage.trim() : undefined,
    description:
      typeof data.description === 'string' && data.description.trim() ? data.description.trim() : fallback.description,
    price: typeof data.price === 'string' && data.price.trim() ? data.price.trim() : fallback.price,
    features: toArray(data.features).length ? toArray(data.features) : fallback.features,
    nutritionalInfo: toNutrition(data.nutritionalInfo).length ? toNutrition(data.nutritionalInfo) : fallback.nutritionalInfo,
    packaging: toArray(data.packaging).length ? toArray(data.packaging) : fallback.packaging,
    bannerImage:
      typeof data.bannerImage === 'string' && data.bannerImage.trim() ? data.bannerImage.trim() : fallback.bannerImage,
    weightInGrams:
      typeof data.weightInGrams === 'number' && Number.isFinite(data.weightInGrams) && data.weightInGrams > 0
        ? data.weightInGrams
        : fallback.weightInGrams,
    section: data.section === 'green' || data.section === 'loose' || data.section === 'packet' ? data.section : inferSection(fallback),
  };
};

export const inferSection = (product: Pick<Product, 'id' | 'section'>): MakhanaSection => {
  if (product.section) return product.section;
  if (product.id.startsWith('green-')) return 'green';
  if (product.id.startsWith('loose-')) return 'loose';
  return 'packet';
};

const cloneDefaults = () => defaultProducts.map((item) => ({ ...item }));

export const getMakhanaProducts = (): Product[] => {
  const raw = localStorage.getItem(PRODUCT_STORAGE_KEY);
  if (!raw) return cloneDefaults();

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return cloneDefaults();
    const sanitized = parsed.map((item, index) => sanitizeProduct(item, index));
    return sanitized.length ? sanitized : cloneDefaults();
  } catch {
    return cloneDefaults();
  }
};

export const saveMakhanaProducts = (nextProducts: Product[]) => {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(nextProducts));
};

export const resetMakhanaProducts = () => {
  localStorage.removeItem(PRODUCT_STORAGE_KEY);
};

export const getMakhanaSettings = (): MakhanaContentSettings => {
  const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!raw) return defaultMakhanaSettings;

  try {
    const parsed = JSON.parse(raw) as Partial<MakhanaContentSettings>;
    return {
      heroBadge: typeof parsed.heroBadge === 'string' && parsed.heroBadge.trim() ? parsed.heroBadge : defaultMakhanaSettings.heroBadge,
      heroTitleLine1:
        typeof parsed.heroTitleLine1 === 'string' && parsed.heroTitleLine1.trim()
          ? parsed.heroTitleLine1
          : defaultMakhanaSettings.heroTitleLine1,
      heroTitleLine2:
        typeof parsed.heroTitleLine2 === 'string' && parsed.heroTitleLine2.trim()
          ? parsed.heroTitleLine2
          : defaultMakhanaSettings.heroTitleLine2,
      heroDescription:
        typeof parsed.heroDescription === 'string' && parsed.heroDescription.trim()
          ? parsed.heroDescription
          : defaultMakhanaSettings.heroDescription,
      retailTitle:
        typeof parsed.retailTitle === 'string' && parsed.retailTitle.trim()
          ? parsed.retailTitle
          : defaultMakhanaSettings.retailTitle,
      looseTitle:
        typeof parsed.looseTitle === 'string' && parsed.looseTitle.trim()
          ? parsed.looseTitle
          : defaultMakhanaSettings.looseTitle,
      looseCaption:
        typeof parsed.looseCaption === 'string' && parsed.looseCaption.trim()
          ? parsed.looseCaption
          : defaultMakhanaSettings.looseCaption,
      packetTitle:
        typeof parsed.packetTitle === 'string' && parsed.packetTitle.trim()
          ? parsed.packetTitle
          : defaultMakhanaSettings.packetTitle,
    };
  } catch {
    return defaultMakhanaSettings;
  }
};

export const saveMakhanaSettings = (settings: MakhanaContentSettings) => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

export const resetMakhanaSettings = () => {
  localStorage.removeItem(SETTINGS_STORAGE_KEY);
};

export const useMakhanaProducts = () => {
  const [items, setItems] = useState<Product[]>(() => getMakhanaProducts());

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === PRODUCT_STORAGE_KEY) {
        setItems(getMakhanaProducts());
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return { items, setItems };
};

export const useMakhanaSettings = () => {
  const [settings, setSettings] = useState<MakhanaContentSettings>(() => getMakhanaSettings());

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === SETTINGS_STORAGE_KEY) {
        setSettings(getMakhanaSettings());
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return { settings, setSettings };
};

export const makeProductId = (section: MakhanaSection, title: string) => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const safeSlug = slug || `product-${Date.now()}`;
  return `${section}-${safeSlug}`;
};
