import BlogHero from '../../components/blog/BlogHero'
import BlogListing from '../../components/blog/BlogListing'
import NewsletterSignup from '../../components/blog/NewsletterSignup'
import { getAllPosts } from '../../lib/blog'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-900 dark:to-dark-800 transition-colors duration-300">
      <BlogHero />

      <section className="pb-16 md:pb-24">
        <div className="container-fluid">
          <BlogListing posts={posts} />
        </div>
      </section>

      <NewsletterSignup />
    </div>
  )
}
