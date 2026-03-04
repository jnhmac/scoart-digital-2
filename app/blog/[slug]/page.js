import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug, getRelatedPosts, getCategoryLabel } from '../../../lib/blog'
import BlogPostLayout from '../../../components/blog/BlogPostLayout'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: `${post.frontmatter.title} | Scoart Digital Blog`,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      url: `https://scoartdigital.com/blog/${params.slug}`,
    },
  }
}

const mdxComponents = {
  h2: (props) => (
    <h2
      className="heading-md mt-12 mb-4 scroll-mt-24"
      id={props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-2xl font-bold mt-8 mb-3 text-semantic-text-primary"
      id={props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="text-xl font-bold mt-6 mb-2 text-semantic-text-primary" {...props} />
  ),
  p: (props) => <p className="body-base mb-4 leading-relaxed" {...props} />,
  ul: (props) => <ul className="list-disc list-inside space-y-2 mb-6 body-base" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside space-y-2 mb-6 body-base" {...props} />,
  li: (props) => <li className="text-semantic-text-secondary" {...props} />,
  strong: (props) => <strong className="font-bold text-semantic-text-primary" {...props} />,
  a: (props) => (
    <a
      className="text-semantic-accent hover:underline font-medium"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-accent-500 pl-6 py-2 my-6 bg-primary-50 dark:bg-dark-800"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="px-1.5 py-0.5 bg-primary-100 dark:bg-dark-700 text-accent-600 dark:text-accent-400 text-sm font-mono rounded"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="p-6 my-6 bg-dark-900 dark:bg-dark-800 text-gray-100 overflow-x-auto border-2 border-dark-900 dark:border-dark-700 font-mono text-sm leading-relaxed"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-semantic-border" />,
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-2 border-dark-900 dark:border-dark-700" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="px-4 py-3 bg-primary-100 dark:bg-dark-700 text-left font-bold text-sm border-b-2 border-dark-900 dark:border-dark-700" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-3 border-b border-semantic-border text-sm" {...props} />
  ),
  img: (props) => (
    <img className="my-6 border-2 border-dark-900 dark:border-dark-700 w-full" {...props} />
  ),
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return <div>Post not found</div>

  const relatedPosts = getRelatedPosts(params.slug, post.frontmatter.category)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: {
      '@type': 'Organization',
      name: post.frontmatter.author || 'Scoart Digital',
      url: 'https://scoartdigital.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Scoart Digital',
      url: 'https://scoartdigital.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://scoartdigital.com/blog/${params.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostLayout frontmatter={post.frontmatter} slug={params.slug} relatedPosts={relatedPosts}>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </BlogPostLayout>
    </>
  )
}
