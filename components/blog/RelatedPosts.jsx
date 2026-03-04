'use client'

import BlogCard from './BlogCard'

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-dark-800 transition-colors duration-300">
      <div className="container-fluid">
        <h2 className="heading-lg mb-8 text-center">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
