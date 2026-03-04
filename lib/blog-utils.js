export const CATEGORIES = [
  { slug: 'ecommerce', label: 'E-commerce', color: 'accent' },
  { slug: 'marketplace', label: 'Marketplace', color: 'primary' },
  { slug: 'development', label: 'Development', color: 'dark' },
  { slug: 'marketing', label: 'Marketing', color: 'accent' },
  { slug: 'ai-automation', label: 'AI & Automation', color: 'primary' },
  { slug: 'industry-insights', label: 'Industry Insights', color: 'dark' },
]

export function getCategoryLabel(slug) {
  const cat = CATEGORIES.find((c) => c.slug === slug)
  return cat ? cat.label : slug
}
