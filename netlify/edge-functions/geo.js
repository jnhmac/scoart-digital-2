export default async (request, context) => {
  const response = await context.next()
  const country = context.geo?.country?.code || 'INTL'
  const geo = country === 'US' ? 'US' : 'INTL'

  // Only set cookie if not already present
  const existing = request.headers.get('cookie')?.match(/geo=(US|INTL)/)
  if (!existing) {
    response.headers.append(
      'set-cookie',
      `geo=${geo}; Path=/; SameSite=Lax; Max-Age=2592000`
    )
  }

  return response
}

export const config = {
  path: '/*',
}
