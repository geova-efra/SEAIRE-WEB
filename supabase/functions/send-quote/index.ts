const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await req.json();
    const nombre = String(body?.nombre ?? '').trim();
    const telefono = String(body?.telefono ?? '').trim();
    const correo = String(body?.correo ?? '').trim();
    const servicio = String(body?.servicio ?? '').trim();
    const detalle = String(body?.detalle ?? '').trim();

    if (!nombre || !telefono || !correo) {
      return json({ error: 'Nombre, teléfono y correo son obligatorios.' }, 400);
    }

    const apiKey = Deno.env.get('RESEND_API_KEY');
    const from = Deno.env.get('RESEND_FROM');
    const to = Deno.env.get('QUOTE_TO_EMAIL') || 'seaire.gere@gmail.com';

    if (!apiKey || !from) {
      return json({ error: 'El servicio de correo no está configurado.' }, 500);
    }

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033">
        <h2>Nueva solicitud de cotización - SEAIRE</h2>
        <p><strong>Nombre / Empresa:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Teléfono / WhatsApp:</strong> ${escapeHtml(telefono)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(correo)}</p>
        <p><strong>Servicio:</strong> ${escapeHtml(servicio || 'No especificado')}</p>
        <p><strong>Detalle:</strong><br>${escapeHtml(detalle || 'Sin detalle adicional.').replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="font-size:12px;color:#687386">Solicitud enviada desde la página web de SEAIRE.</p>
      </div>`;

    const resend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: correo,
        subject: `Nueva cotización SEAIRE - ${nombre}`,
        html,
      }),
    });

    const result = await resend.json();
    if (!resend.ok) {
      console.error('Resend error:', result);
      return json({ error: 'Resend rechazó el envío del correo.' }, 502);
    }

    return json({ ok: true, id: result?.id ?? null });
  } catch (error) {
    console.error(error);
    return json({ error: 'No se pudo procesar la solicitud.' }, 500);
  }
});

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[c] ?? c));
}
