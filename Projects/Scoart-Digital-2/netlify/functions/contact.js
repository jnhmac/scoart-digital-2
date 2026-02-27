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

    const data = {
      name: params.get('name'),
      email: params.get('email'),
      company: params.get('company') || 'Not provided',
      service: params.get('service'),
      message: params.get('message'),
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
        to: ['info@scoartdigital.com'],
        subject: `New Contact Form: ${data.service} - ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold;">Name</td>
              <td style="padding: 8px 12px; border: 1px solid #ddd;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 8px 12px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold;">Company</td>
              <td style="padding: 8px 12px; border: 1px solid #ddd;">${data.company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold;">Service</td>
              <td style="padding: 8px 12px; border: 1px solid #ddd;">${data.service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold;">Message</td>
              <td style="padding: 8px 12px; border: 1px solid #ddd;">${data.message}</td>
            </tr>
          </table>
          <p style="margin-top: 16px; color: #666; font-size: 12px;">
            Sent from scoartdigital.com contact form
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
        body: JSON.stringify({ success: false, message: 'Failed to send email' }),
      }
    }

    console.log('Email sent successfully:', JSON.stringify(result))
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Form submitted successfully' }),
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Server error' }),
    }
  }
}
