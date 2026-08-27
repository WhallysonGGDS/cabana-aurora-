'use client'

import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'

const whatsappUrl = 'https://wa.me/5511999999999?text=Olá!%20Quero%20reservar%20o%20Refúgio%20Aurora.'

const gallery = [
  { src: '/cabana-hero.png', alt: 'Refúgio Aurora iluminado entre as montanhas', label: 'A chegada', className: 'md:col-span-7 md:row-span-2' },
  { src: '/cabana-interior.png', alt: 'Sala com lareira e vista para a serra', label: 'Dentro da floresta', className: 'md:col-span-5' },
  { src: '/cabana-exterior.png', alt: 'Exterior da cabana entre araucárias', label: 'Matéria e silêncio', className: 'md:col-span-5' },
  { src: '/cabana-noite.png', alt: 'Cabana iluminada durante a noite', label: 'Depois do pôr do sol', className: 'md:col-span-12' },
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function MagneticLink({ children, href = '#', light = false }: { children: React.ReactNode; href?: string; light?: boolean }) {
  return (
    <a href={href} className={`magnetic-link group ${light ? 'magnetic-link-light' : ''}`}>
      <span>{children}</span>
      <span className="link-orb"><ArrowUpRight size={14} strokeWidth={1.4} /></span>
    </a>
  )
}

export function CabanaSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Refúgio Aurora, início">
          <span className="brand-mark"><span /><span /><span /></span>
          <span><strong>REFÚGIO</strong><em>AURORA</em></span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#experiencia">A experiência</a><a href="#galeria">Galeria</a><a href="#detalhes">Detalhes</a><a href="#localizacao">Localização</a>
        </nav>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="header-cta">Reservar <ArrowUpRight size={14} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`} aria-hidden={!menuOpen}>
        {['A experiência', 'Galeria', 'Detalhes', 'Localização'].map((item, index) => <a key={item} href={`#${['experiencia', 'galeria', 'detalhes', 'localizacao'][index]}`} onClick={() => setMenuOpen(false)}>{item}<ArrowUpRight size={18} /></a>)}
        <a className="menu-reserve" href={whatsappUrl} target="_blank" rel="noreferrer">Reservar pelo WhatsApp <ArrowUpRight size={18} /></a>
      </div>

      <section id="top" className="hero">
        <img src="/cabana-hero.png" alt="Refúgio Aurora, cabana contemporânea iluminada nas montanhas" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <Reveal><p className="eyebrow light">Hospedagem autoral · Serra da Mantiqueira</p></Reveal>
          <Reveal className="hero-reveal"><h1>Onde o tempo<br /><i>desacelera.</i></h1></Reveal>
          <Reveal><p className="hero-description">Uma cabana desenhada para quem procura o essencial: o calor da madeira, o silêncio da mata e uma janela aberta para o infinito.</p></Reveal>
          <Reveal><MagneticLink href={whatsappUrl} light>Planejar sua estadia</MagneticLink></Reveal>
        </div>
        <div className="hero-meta"><span>22° 41&apos; S</span><span>45° 34&apos; W</span><span className="scroll-cue">Role para explorar <ArrowDownRight size={16} /></span></div>
      </section>

      <section id="experiencia" className="intro section-pad">
        <Reveal><p className="eyebrow">Uma pausa com propósito</p></Reveal>
        <div className="intro-grid"><Reveal><h2>Menos ruído.<br /><i>Mais presença.</i></h2></Reveal><Reveal><p className="body-copy">No alto da serra, o Refúgio Aurora é uma casa para dois, cercada por araucárias e pela luz que muda a cada hora. Chegue sem pressa. A floresta faz o resto.</p><MagneticLink href="#detalhes">Conheça o refúgio</MagneticLink></Reveal></div>
      </section>

      <section className="feature-band"><div className="feature-list"><Reveal><span className="feature-index">01</span><h3>Arquitetura<br />que respira</h3><p>Vidro, pedra e madeira local em diálogo com o terreno.</p></Reveal><Reveal><span className="feature-index">02</span><h3>Ritual<br />de chegada</h3><p>Lenha acesa, café passado e nada na agenda.</p></Reveal><Reveal><span className="feature-index">03</span><h3>O luxo<br />do silêncio</h3><p>Uma experiência íntima, longe do excesso.</p></Reveal></div></section>

      <section id="galeria" className="gallery-section section-pad"><Reveal><div className="section-heading"><div><p className="eyebrow">Fragmentos do refúgio</p><h2>A casa por dentro<br /><i>da paisagem.</i></h2></div><p className="section-note">Passeie pelos espaços pensados para<br />olhar, respirar e ficar.</p></div></Reveal><div className="gallery-grid">{gallery.map((item, index) => <Reveal key={item.src} className={`gallery-card ${item.className}`}><button onClick={() => setActiveImage(index)} aria-label={`Ampliar: ${item.alt}`}><img src={item.src} alt={item.alt} /><span>{item.label}<ArrowUpRight size={15} /></span></button></Reveal>)}</div></section>

      <section id="detalhes" className="details-section"><div className="details-image"><img src="/cabana-interior.png" alt="Detalhe da sala do Refúgio Aurora" /></div><div className="details-copy"><Reveal><p className="eyebrow">O que espera por você</p><h2>Conforto que<br /><i>não pede licença.</i></h2><p className="body-copy">Lareira, banheira com vista, cama king size e uma cozinha pronta para transformar ingredientes simples em memórias. Tudo foi escolhido para desaparecer — e deixar a serra aparecer.</p><MagneticLink href={whatsappUrl}>Ver disponibilidade</MagneticLink></Reveal><div className="detail-specs"><span>2 hóspedes</span><span>1 suíte</span><span>Serra · MG</span></div></div></section>

      <section id="localizacao" className="location-section section-pad"><Reveal><p className="eyebrow">Como chegar</p><div className="location-row"><h2>A montanha<br /><i>é o destino.</i></h2><p className="body-copy">A 2h30 de São Paulo, entre a neblina de Gonçalves e as trilhas da Mantiqueira. O caminho é parte da experiência — e vale cada curva.</p></div></Reveal></section>

      <section className="booking-cta"><div><p className="eyebrow light">Seu próximo fim de semana</p><h2>Reserve seu<br /><i>tempo.</i></h2></div><MagneticLink href={whatsappUrl} light>Falar no WhatsApp</MagneticLink></section>

      <footer className="site-footer"><a href="#top" className="brand"><span className="brand-mark"><span /><span /><span /></span><span><strong>REFÚGIO</strong><em>AURORA</em></span></a><p>Uma casa para lembrar<br />como é estar presente.</p><span className="copyright">© 2026 Refúgio Aurora</span></footer>

      {activeImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeria ampliada" onClick={() => setActiveImage(null)}><button className="lightbox-close" onClick={() => setActiveImage(null)} aria-label="Fechar galeria"><X size={22} /></button><button className="lightbox-arrow left" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage - 1 + gallery.length) % gallery.length) }} aria-label="Imagem anterior"><ChevronLeft size={26} /></button><img src={gallery[activeImage].src} alt={gallery[activeImage].alt} onClick={(event) => event.stopPropagation()} /><button className="lightbox-arrow right" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % gallery.length) }} aria-label="Próxima imagem"><ChevronRight size={26} /></button></div>}
    </main>
  )
}

export default CabanaSite
