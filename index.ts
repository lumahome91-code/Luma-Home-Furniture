import { router, json, error } from '@appdeploy/sdk';

type OrderBody = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  items?: Array<{ name?: string; price?: number }>;
  total?: number;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character] || character));

const createOrderNumber = () => {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return 'LUMA-' + stamp.slice(-6) + '-' + random;
};

export const handler = router({
  'GET /api/_healthcheck': [async () => json({ message: 'Success' })],
  'POST /api/orders': [async ({ body }) => {
    const order = (body || {}) as OrderBody;
    const name = String(order.name || '').trim();
    const email = String(order.email || '').trim();
    const phone = String(order.phone || '').trim();
    const address = String(order.address || '').trim();
    const items = Array.isArray(order.items) ? order.items : [];

    if (!name || !email || !phone || !address || items.length === 0) {
      return error('Please provide your contact details and at least one item.', 400);
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return error('Please provide a valid email address.', 400);
    }

    const orderNumber = createOrderNumber();
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });

    const itemRows = items.map((item, index) => {
      const itemName = escapeHtml(String(item.name || 'Furniture item'));
      const price = Number(item.price || 0);
      return '<tr>' +
        '<td style="padding:12px 10px;border-bottom:1px solid #eee;color:#222;">' + (index + 1) + '</td>' +
        '<td style="padding:12px 10px;border-bottom:1px solid #eee;color:#222;">' + itemName + '</td>' +
        '<td style="padding:12px 10px;border-bottom:1px solid #eee;text-align:right;color:#222;">' + currency.format(price) + '</td>' +
        '</tr>';
    }).join('');

    const total = Number(order.total || 0);
    const formattedTotal = currency.format(total);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured.');
      return error('Order email service is not configured.', 500);
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Luma Home Orders <onboarding@resend.dev>',
        to: ['lumahome91@gmail.com'],
        reply_to: email,
        subject: 'Luma Home Order ' + orderNumber + ' — ' + name,
        html: '<div style="margin:0;background:#f7f5f1;padding:32px 16px;font-family:Arial,sans-serif;color:#222;">' +
          '<div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e8e4dc;">' +
          '<div style="padding:28px 30px;border-bottom:1px solid #e8e4dc;">' +
          '<div style="font-size:22px;font-weight:700;letter-spacing:2px;">LUMA<span style="font-weight:400;">HOME</span></div>' +
          '<p style="margin:8px 0 0;color:#777;font-size:13px;">New order request</p>' +
          '</div>' +
          '<div style="padding:28px 30px;">' +
          '<div style="display:inline-block;padding:8px 12px;background:#f1eee8;font-size:13px;font-weight:700;">Order ' + escapeHtml(orderNumber) + '</div>' +
          '<h2 style="margin:20px 0 6px;font-size:22px;">New order received</h2>' +
          '<p style="margin:0 0 24px;color:#666;">A customer has submitted an order request through the Luma Home website.</p>' +
          '<h3 style="font-size:15px;margin:0 0 10px;">Order summary</h3>' +
          '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
          '<thead><tr><th style="padding:10px;text-align:left;background:#f7f5f1;">#</th><th style="padding:10px;text-align:left;background:#f7f5f1;">Item</th><th style="padding:10px;text-align:right;background:#f7f5f1;">Price</th></tr></thead>' +
          '<tbody>' + itemRows + '</tbody>' +
          '<tfoot><tr><td colspan="2" style="padding:16px 10px;font-weight:700;">Order total</td><td style="padding:16px 10px;text-align:right;font-size:18px;font-weight:700;">' + formattedTotal + '</td></tr></tfoot>' +
          '</table>' +
          '<h3 style="font-size:15px;margin:28px 0 10px;">Customer details</h3>' +
          '<p style="margin:6px 0;"><strong>Name:</strong> ' + escapeHtml(name) + '</p>' +
          '<p style="margin:6px 0;"><strong>Email:</strong> ' + escapeHtml(email) + '</p>' +
          '<p style="margin:6px 0;"><strong>Phone:</strong> ' + escapeHtml(phone) + '</p>' +
          '<p style="margin:6px 0;"><strong>Delivery address:</strong><br>' + escapeHtml(address).replace(/\n/g, '<br>') + '</p>' +
          '</div>' +
          '<div style="padding:18px 30px;background:#f7f5f1;color:#777;font-size:12px;">Luma Home Furniture · Order ' + escapeHtml(orderNumber) + '</div>' +
          '</div></div>',
      }),
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      console.error('Resend API error:', detail);
      return error('We could not send your order right now. Please try again.', 502);
    }

    return json({ success: true, orderNumber });
  }],
});
