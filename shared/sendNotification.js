export const sendNotification = (to, title, body) =>
  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to,
      title,
      body,
    }),
  })

export const assignTitle = title =>
  title ? (title.length > 32 ? `${title.slice(0, 32)}...` : title) : '...'

export const assignBody = body =>
  body.length > 160 ? `${body.slice(0, 160)}...` : body
