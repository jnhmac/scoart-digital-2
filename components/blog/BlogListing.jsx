'use client'

import { useState, useMemo } from 'react'
import BlogCard from './BlogCard'
import CategoryFilter from './CategoryFilter'

export default function BlogListing({ posts }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return posts
    return posts.filter((post) => post.category === activeCategory)
  }, [activeCategory, posts])

  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter(
    (post) => !post.featured || activeCategory !== 'all'
  )

  return (
    <>
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Featured Post */}
      {featuredPost && activeCategory === 'all' && (
        <div className="mb-12 md:mb-16 max-w-4xl mx-auto">
          <BlogCard post={featuredPost} featured />
        </div>
      )}

      {/* Post Grid */}
      {regularPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {regularPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="body-lg text-semantic-text-tertiary">
            No articles in this category yet. Check back soon.
          </p>
        </div>
      )}
    </>
  )
}
