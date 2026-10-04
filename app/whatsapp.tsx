'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export const WA_NUMBER = '8801521487521';
export const WA_LINK = `https://wa.me/${WA_NUMBER}`;

const QUICK_PROMPTS = [
  'Hi Sourav — I have a project in mind.',
  'Hi Sourav — I am hiring, let’s talk.',
  'Hi Sourav — quick question about your work.',
];

export function WhatsAppGlyph({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function WhatsAppConnect() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState<string[]>([]);
  const [teaser, setTeaser] = useState(false);
  const [unseen, setUnseen] = useState(true);
  const [time, setTime] = useState('');
  const area = useRef<HTMLTextAreaElement>(null);
  const body = useRef<HTMLDivElement>(null);

  // one-time nudge, a few seconds in
  useEffect(() => {
    const show = setTimeout(() => setTeaser(true), 6000);
    const hide = setTimeout(() => setTeaser(false), 22000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  // live Dhaka clock
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dhaka' }).format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTeaser(false);
    setUnseen(false);
    const id = setTimeout(() => area.current?.focus({ preventScroll: true }), 420);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { body.current?.scrollTo({ top: body.current.scrollHeight }); }, [sent, open]);

  const resize = () => { const el = area.current; if (!el) return; el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 110) + 'px'; };

  const send = () => {
    const text = msg.trim();
    if (!text) return;
    setSent(s => [...s, text]);
    setMsg('');
    requestAnimationFrame(() => { if (area.current) area.current.style.height = 'auto'; });
    window.open(`${WA_LINK}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="wa-widget" data-open={open}>
      {teaser && !open && (
        <button className="wa-teaser" onClick={() => setOpen(true)}>
          <span className="pulse" /> DIRECT LINE — HAVE A PROJECT IN MIND? <b>MESSAGE ME →</b>
        </button>
      )}
      <section className="wa-panel" role="dialog" aria-label="Send Sourav a WhatsApp message" aria-hidden={!open}>
        <header className="wa-head">
          <div className="wa-id">
            <span className="wa-avatar">SD</span>
            <div>
              <b>SOURAV DAS</b>
              <small><span className="pulse" /> ONLINE · {time ? `DHAKA ${time}` : 'UTC +06:00'}</small>
            </div>
          </div>
          <button className="wa-close" onClick={() => setOpen(false)} aria-label="Close chat panel"><X size={15} /></button>
        </header>
        <div className="wa-body" ref={body}>
          <div className="wa-msg in">
            <p>Hey — this is Sourav. Have a product, role, or technical challenge in mind? Type below and your message lands straight in my WhatsApp.</p>
            <small>DIRECT LINE · +880 1521-487521</small>
          </div>
          {sent.map((s, i) => (
            <div className="wa-msg out" key={i}>
              <p>{s}</p>
              <small>OPENED IN WHATSAPP ✓✓</small>
            </div>
          ))}
          <div className="wa-chips">
            {QUICK_PROMPTS.map(q => (
              <button key={q} onClick={() => { setMsg(q); requestAnimationFrame(resize); area.current?.focus({ preventScroll: true }); }}>{q}</button>
            ))}
          </div>
        </div>
        <div className="wa-compose">
          <textarea
            ref={area}
            rows={1}
            value={msg}
            placeholder="Type your message…"
            aria-label="Message text"
            onChange={e => { setMsg(e.target.value); resize(); }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          />
          <button className="wa-send" onClick={send} disabled={!msg.trim()} aria-label="Send message via WhatsApp">
            <WhatsAppGlyph size={19} />
          </button>
        </div>
        <p className="wa-note">OPENS WHATSAPP WITH YOUR MESSAGE PRE-FILLED — NOTHING IS SENT UNTIL YOU CONFIRM</p>
      </section>
      <button className="wa-fab" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close WhatsApp chat' : 'Chat with Sourav on WhatsApp'}>
        <span className="icon icon-wa"><WhatsAppGlyph size={27} /></span>
        <span className="icon icon-x"><X size={24} /></span>
        {unseen && !open && <span className="wa-badge">1</span>}
      </button>
    </div>
  );
}
