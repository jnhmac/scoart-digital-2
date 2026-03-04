exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const params = new URLSearchParams(event.body)

    // Verify Turnstile token
    const turnstileToken = params.get('cf-turnstile-response')
    if (!turnstileToken) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Captcha verification required' }),
      }
    }

    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    })
    const turnstileResult = await turnstileResponse.json()

    if (!turnstileResult.success) {
      console.error('Turnstile verification failed:', JSON.stringify(turnstileResult))
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ success: false, message: 'Captcha verification failed' }),
      }
    }

    const email = params.get('email')
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Email is required' }),
      }
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Scoart Digital <noreply@send.scoartdigital.com>',
        to: ['newsletter@scoartdigital.com'],
        subject: `New Newsletter Subscriber`,
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin-top: 16px; color: #666; font-size: 12px;">
            Subscribed via scoartdigital.com blog newsletter form
          </p>
        `,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Resend API error:', JSON.stringify(result))
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Failed to send notification' }),
      }
    }

    console.log('Newsletter notification sent:', JSON.stringify(result))
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Subscribed successfully' }),
    }
  } catch (error) {
    console.error('Newsletter submission error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Server error' }),
    }
  }
}
