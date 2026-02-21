import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { Resend } from 'resend';

// 1. Config Sanity (Mode Tulis)
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, 
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

// 2. Config Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 🔥 GENERATE WIB TIMESTAMP
    const date = new Date();
    const sentAtWIB = date.toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }) + ' WIB';

    // A. SIMPAN KE SANITY
    await client.create({
      _type: 'contact',
      name,
      email,
      message,
      sentAt: sentAtWIB, // Simpan waktu Bandung
      status: 'new',
    });

    // FETCH EMAIL DARI SANITY
    const profile = await client.fetch(`*[_type == "profile"][0]{ email }`);
    const recipientEmail = profile?.email || 'syifarpratama@gmail.com';

    // B. KIRIM NOTIFIKASI KE EMAIL ANDA
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `New Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2>New Inquiry Received</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Time:</strong> ${sentAtWIB}</p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 16px; color: #333;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
