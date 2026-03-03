export function YouTubeEmbed({ videoId, title = 'Video' }) {
  return (
    <div className="my-8 border-2 border-dark-900 dark:border-dark-700 shadow-brutal">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}

export function PodcastCard({ title, host, platform, url, description }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-6 p-6 bg-white dark:bg-dark-800 border-2 border-dark-900 dark:border-dark-700 hover:shadow-brutal transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-accent-500 border-2 border-dark-900 dark:border-dark-600 flex items-center justify-center">
          <span className="text-white text-lg">🎙️</span>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-semantic-text-tertiary mb-1">
            {platform} · {host}
          </p>
          <h4 className="text-lg font-bold text-semantic-text-primary group-hover:text-semantic-accent transition-colors">
            {title}
          </h4>
          {description && (
            <p className="mt-2 text-sm text-semantic-text-secondary">{description}</p>
          )}
        </div>
      </div>
    </a>
  )
}
