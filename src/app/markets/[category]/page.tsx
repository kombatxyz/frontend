import React, { Suspense } from 'react';
import Markets from '@/components/markets';

export async function generateStaticParams() {
  const categories = [
    'crypto',
    'sports',
    'politics',
    'companies',
    'entertainment',
    'finance',
    'climate',
  ];

  return categories.map((category) => ({
    category: category,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }> | { category: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const categoryParam = resolvedParams?.category || 'markets';
  const category =
    categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);

  return {
    title: `${category} Markets | Your App Name`,
    description: `Browse and trade ${categoryParam.toLowerCase()} prediction markets`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }> | { category: string };
}) {
  const resolvedParams = await Promise.resolve(params);

  const validCategories = [
    'crypto',
    'sports',
    'politics',
    'companies',
    'entertainment',
    'finance',
    'climate',
  ];

  const category = resolvedParams?.category;
  if (category && !validCategories.includes(category.toLowerCase())) {
  }

  return (
    <Suspense fallback={<div className="loading-state">Loading...</div>}>
      <Markets />
    </Suspense>
  );
}
