import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export { CATEGORIES, getCategoryLabel } from './blog-utils'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)

      // Derive slug from filename: "2026-02-15-my-post-title.mdx" -> "my-post-title"
      const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '')

      return {
        slug,
        filename,
        ...data,
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return posts
}

export function getPostBySlug(slug) {
  if (!fs.existsSync(BLOG_DIR)) return null

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const file = files.find((f) => {
    const fileSlug = f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '')
    return fileSlug === slug
  })

  if (!file) return null

  const filePath = path.join(BLOG_DIR, file)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    frontmatter: data,
    content,
  }
}

export function getPostsByCategory(category) {
  return getAllPosts().filter((post) => post.category === category)
}

export function getRelatedPosts(currentSlug, category, limit = 3) {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit)
}
