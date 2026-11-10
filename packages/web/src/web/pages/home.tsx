import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, X, Menu, Mountain, Star, MapPin, Phone, Instagram, Plus, Check } from 'lucide-react';

const CASA = 'https://www.airbnb.com.br/rooms/6353169';
const LOFT = 'https://www.airbnb.com.br/rooms/20274293';
const MAPS = 'https://maps.app.goo.gl/d5YpYKca8K4FPCr17';
const INSTA = 'https://www.instagram.com/baudamantiqueira/';
const houses = {
  casa: { name: 'A Casa', subtitle: 'Espaço para estar junto.', intro: 'Uma casa de 200 m² onde a cozinha se abre para as conversas, a varanda convida à rede e cada móvel guarda uma história.', capacity: 'Até 6 hóspedes', rooms: '3 quartos', baths: '3 banheiros', rate: '4,95', reviews: '226', url: CASA, facts: ['Cozinha completa e fogão à lenha', 'Lareira, varandão e uma charmosa torre', 'Área cercada para receber seus pets', 'Wi-Fi Starlink'], images: ['casa-00', 'casa-35', 'casa-08', 'casa-14', 'casa-25', 'casa-30', 'casa-36'], captions: ['Sala da Casa, cercada de janelas e verde', 'A Casa e sua torre, vistas do jardim', 'Cozinha integrada e mesa para reunir', 'Suíte da Casa', 'O quarto da torre', 'Banheiro com ladrilhos verde e rosa', 'Varanda e cadeira de balanço'] },
  loft: { name: 'O Loft', subtitle: 'Pertinho, com o horizonte inteiro.', intro: 'Ambientes integrados, madeira e uma banheira com vista da Pedra do Baú. Uma microcasa rústica e acolhedora para curtir o campo no seu ritmo.', capacity: 'Até 4 hóspedes', rooms: '1 quarto + sofá-cama', baths: '1 banheiro', rate: '4,97', reviews: '265', url: LOFT, facts: ['Banheira com vista da paisagem', 'Cozinha equipada e Nespresso', 'Ambientes integrados e pé-direito alto', 'Wi-Fi Starlink'], images: ['loft-15', 'loft-37', 'loft-16', 'loft-20', 'loft-06', 'loft-24', 'loft-29'], captions: ['Ambientes integrados do Loft', 'O Loft no jardim', 'Cama e interior do Loft', 'Banheira com vista para a Pedra do Baú', 'Café no Loft', 'Verde à janela do Loft', 'Paisagem e brumas vistas do Loft'] },
};
type Gallery = { images: string[]; captions: string[]; index: number; title: string };
function Brand({ light = false }: { light?: boolean }) {
  return <a href="#inicio" className={`brand ${light ? 'light' : ''}`} aria-label="Baú da Mantiqueira — início"><svg viewBox="0 0 82 38" fill="none" aria-hidden="true"><path d="M2 33 22 15l12 10L48 5l6 1 2 12 7-4 17 19M5 37h72M16 27l6-5 10 8M40 22l8-11 5 10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg><span>baú da mantiqueira<small>CASA & LOFT</small></span></a>;
}
function External({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) { return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>; }

export default function Home() {
  const [selected, setSelected] = useState<'casa' | 'loft'>('casa');
  const [photo, setPhoto] = useState(0);
  const [menu, setMenu] = useState(false);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isGalleryOpen = gallery !== null;
  const house = houses[selected];
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isGalleryOpen) return;
    const previous = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.showModal();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGallery(null);
      if (e.key === 'ArrowRight') setGallery(g => g && ({ ...g, index: (g.index + 1) % g.images.length }));
      if (e.key === 'ArrowLeft') setGallery(g => g && ({ ...g, index: (g.index - 1 + g.images.length) % g.images.length }));
      if (e.key === 'Tab') {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.lightbox button'));
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); previous?.focus(); };
  }, [isGalleryOpen]);
  const openHouse = () => setGallery({ images: house.images, captions: house.captions, index: photo, title: house.name });
  const changePhoto = (direction: number) => setGallery(g => g && ({ ...g, index: (g.index + direction + g.images.length) % g.images.length }));
  return <>
    <a className="skip" href="#acomodacoes">Pular para as acomodações</a>
    <header className="header" id="inicio">
      <Brand />
      <nav aria-label="Navegação principal" className={menu ? 'nav open' : 'nav'}>
        {[['acomodacoes', 'Casa & Loft'], ['historias', 'Nosso baú'], ['avaliacoes', 'Quem já veio'], ['chegada', 'Como chegar']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
      </nav>
      <a className="button header-cta" href="#reservar">Escolha seu cantinho <ArrowUpRight size={16}/></a>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? 'Fechar menu' : 'Abrir menu'}>{menu ? <X/> : <Menu/>}</button>
    </header>
    <main>
      <section className="hero" aria-label="Bem-vindo ao Baú da Mantiqueira">
        <img className="hero-image" src="/images/casa-43.jpg" alt="Vista real da Pedra do Baú entre montanhas e árvores da propriedade" 	 width="1600" height="900" fetchPriority="high" style={{ background: '#303e32' }} />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow"><span className="tiny-line"/> SAPUCAÍ-MIRIM · SERRA DA MANTIQUEIRA</span>
          <h1>Abra as janelas.<br/><em>A Mantiqueira entra.</em></h1>
          <p>Duas casas, histórias em cada canto e a Pedra do Baú<br className="desktop-break"/> fazendo parte dos seus dias.</p>
          <a className="button warm" href="#acomodacoes">Encontre seu lugar aqui <ArrowUpRight size={18}/></a>
        </div>
        <a className="hero-scroll" href="#nosso-lugar"><span>O TEMPO É OUTRO POR AQUI</span><ArrowDown size={18}/></a>
        <div className="hero-note"><Mountain size={24} strokeWidth={1}/><span>Essa é a nossa vista.<br/>E pode ser a sua também.</span></div>
      </section>
      <div className="trust-bar">
        <div className="trust-intro"><Star size={17} strokeWidth={1.4}/><span>Preferidos dos hóspedes<small>NO AIRBNB</small></span></div>
        <External href={CASA} className="rating"><span>A Casa</span><strong>4,95 <Star size={12} fill="currentColor"/></strong><small>226 avaliações</small></External>
        <span className="trust-divider"/>
        <External href={LOFT} className="rating"><span>O Loft</span><strong>4,97 <Star size={12} fill="currentColor"/></strong><small>265 avaliações</small></External>
        <span className="trust-tag">Muito verde. Muito cuidado. Muito você.</span>
      </div>

      <section className="intro section wrap reveal" id="nosso-lugar">
        <div className="intro-copy"><span className="eyebrow olive">UM LUGAR PARA SIMPLESMENTE ESTAR</span><h2>Tem coisas que<br/>a gente só encontra<br/><em>quando fica.</em></h2><p>O café sem pressa. Um tempero colhido na horta. A luz atravessando as janelas. Uma conversa que se estende enquanto o fogão à lenha esquenta a casa.</p><p>No Baú, a vida do campo não é cenário. É o que acontece entre uma trilha, um livro na rede e o próximo olhar para a montanha.</p><a className="text-link" href="#historias">Abra o nosso baú <ArrowRight size={17}/></a></div>
        <div className="intro-visual"><button className="photo-button" onClick={() => setGallery({ images: ['casa-35', 'casa-36', 'casa-43'], captions: ['A Casa, entre o jardim e as montanhas', 'Varanda da Casa', 'Vista da Pedra do Baú'], index: 0, title: 'Nosso lugar' })} aria-label="Ampliar fotos da propriedade"><img src="/images/casa-35.jpg" alt="Casa de madeira e vidro, com torre e jardim" loading="lazy"/><span className="photo-caption">A Casa, por fora. Um tanto de histórias, por dentro.</span></button><div className="round-note"><Mountain size={29} strokeWidth={1}/><span>118 mil m²<br/><em>de natureza</em></span></div></div>
      </section>

      <section className="stays section" id="acomodacoes">
        <div className="wrap stays-heading reveal"><div><span className="eyebrow olive">DOIS JEITOS DE VIVER O BAÚ</span><h2>Qual é o seu <em>cantinho?</em></h2></div><p>Para reunir quem você gosta.<br/>Ou se demorar a dois na paisagem.</p></div>
        <div className="wrap stay-tabs" role="tablist" aria-label="Escolha a acomodação">
          <button id="tab-casa" role="tab" aria-selected={selected === 'casa'} aria-controls="stay-panel" onClick={() => {setSelected('casa'); setPhoto(0);}} className={selected === 'casa' ? 'active' : ''}>01 <span>A Casa</span><small>ATÉ 6 HÓSPEDES</small><ArrowUpRight size={20}/></button>
          <button id="tab-loft" role="tab" aria-selected={selected === 'loft'} aria-controls="stay-panel" onClick={() => {setSelected('loft'); setPhoto(0);}} className={selected === 'loft' ? 'active' : ''}>02 <span>O Loft</span><small>ATÉ 4 HÓSPEDES</small><ArrowUpRight size={20}/></button>
        </div>
        <div className="wrap stay-panel" id="stay-panel" role="tabpanel" aria-labelledby={`tab-${selected}`}>
          <div className="stay-pictures"><button className="main-stay-photo photo-button" onClick={openHouse} aria-label={`Ampliar: ${house.captions[photo]}`}><img key={house.images[photo]} src={`/images/${house.images[photo]}.jpg`} alt={house.captions[photo]} loading="lazy"/><span className="view-photos">Ver fotos <Plus size={16}/></span></button><div className="thumbnails">{house.images.slice(0,4).map((image, i) => <button key={image} onClick={() => setPhoto(i)} aria-label={`Mostrar ${house.captions[i]}`} aria-pressed={photo === i} className={photo === i ? 'active' : ''}><img src={`/images/${image}.jpg`} alt="" loading="lazy"/></button>)}<button className="more-photos" onClick={openHouse}>+{house.images.length - 4}<small>FOTOS</small></button></div></div>
          <div className="stay-copy" key={selected}><span className="eyebrow olive">{house.name.toUpperCase()} · BAÚ DA MANTIQUEIRA</span><h3>{house.subtitle}</h3><p>{house.intro}</p><div className="specs"><span>{house.capacity}</span><span>{house.rooms}</span><span>{house.baths}</span></div><ul>{house.facts.map(fact => <li key={fact}><Check size={14} strokeWidth={1.6}/>{fact}</li>)}</ul><External href={house.url} className="button green">Reservar {selected === 'casa' ? 'a Casa' : 'o Loft'} no Airbnb <ArrowUpRight size={18}/></External><small className="reserve-note">Confira as datas disponíveis no anúncio.</small></div>
        </div>
        <div className="wrap shared-note"><span>Bom saber</span><p>Casa e Loft são acomodações independentes no mesmo sítio. Horta, lago, trilhas e quedinha d’água são áreas compartilhadas.</p><a href="#perguntas" aria-label="Ler sobre privacidade e áreas comuns"><Plus size={17}/></a></div>
      </section>

      <section className="stories section wrap" id="historias">
        <div className="stories-heading reveal"><span className="eyebrow olive">NÃO É DECORAÇÃO. É MEMÓRIA.</span><h2>Um baú não guarda só coisas.<br/><em>Guarda histórias.</em></h2></div>
        <div className="story-grid">
          <article className="story-large reveal"><button className="photo-button" onClick={() => setGallery({ images: ['casa-30', 'casa-00', 'casa-14'], captions: ['Ladrilhos e mosaico feito por Fátima', 'Móveis e objetos que guardam histórias', 'Suíte decorada com mobiliário afetivo'], index: 0, title: 'Memórias da Casa' })} aria-label="Ver detalhes e memórias da Casa"><img src="/images/casa-30.jpg" alt="Mosaico e ladrilhos verde e rosa no banheiro da Casa" loading="lazy"/><span className="image-number">01 / MEMÓRIA & AFETO</span></button><h3>Até os ladrilhos têm o que contar.</h3><p>O verde e o rosa do banheiro da Casa homenageiam a Mangueira. O mosaico foi montado à mão pela Fátima, quando o sítio ainda não tinha energia elétrica. Os móveis vieram de amigos, família e garimpos — cada peça com sua lembrança.</p></article>
          <article className="story-small reveal"><button className="photo-button" onClick={() => setGallery({ images: ['casa-41', 'casa-45', 'casa-48', 'loft-06'], captions: ['Horta orgânica da propriedade', 'Lago no sítio', 'Quedinha d’água da propriedade', 'Café com a marca Baú da Mantiqueira'], index: 0, title: 'Lá fora' })} aria-label="Ver fotos da horta, lago e natureza"><img src="/images/casa-41.jpg" alt="Canteiros da horta orgânica cercados de natureza" loading="lazy"/><span className="image-number">02 / DA HORTA À MESA</span></button><h3>O tempero do almoço?<br/><em>Você pode colher.</em></h3><p>A horta orgânica faz parte da estadia. Verduras e temperos fresquinhos para levar à cozinha — uma alegria pequena que os hóspedes fazem questão de lembrar.</p><blockquote>“Tinha horta para pegarmos hortaliças e ervas. Nos sentimos em casa!”<cite>ALICE · AIRBNB, CASA · AGO. 2026</cite></blockquote></article>
        </div>
        <div className="host reveal"><img src="/images/fatima.jpg" alt="Fátima Tassinari, anfitriã" loading="lazy"/><div><span className="eyebrow olive">QUEM CUIDA DO BAÚ</span><h3>Fátima Tassinari</h3><span className="host-label">Paisagista, anfitriã e colecionadora de histórias.</span></div><div className="host-text"><p>O olhar de paisagista está no jardim. O gosto de receber, nos detalhes. Fátima é Superhost no Airbnb e soma 11 anos de hospedagem — e sua atenção aparece, de novo e de novo, nas avaliações.</p><External href={CASA} className="text-link">Conheça a anfitriã no Airbnb <ArrowUpRight size={16}/></External></div></div>
      </section>

      <section className="reviews section" id="avaliacoes"><div className="wrap"><div className="reviews-heading reveal"><div><span className="eyebrow">NAS PALAVRAS DE QUEM JÁ VEIO</span><h2>O que fica depois<br/><em>de fechar a mala.</em></h2></div><div className="review-summary"><Star size={23} strokeWidth={1}/><p>Casa & Loft<br/><strong>Preferidos dos hóspedes</strong><small>Airbnb · consultado em outubro de 2026</small></p></div></div><div className="review-grid">
        {[{ name: 'Luanna', home: 'Casa', date: 'JULHO DE 2026', quote: 'A casa da Fátima é incrível! Cheia de personalidade, muito bem decorada e limpíssima. Roupas de cama e banho de ótima qualidade e cheirosas, cozinha muito bem equipada, espaço externo maravilhoso… Passamos dias de paz, tranquilidade e conforto.', url: CASA },{name: 'Júlia', home: 'Loft', date: 'OUTUBRO DE 2026', quote: 'Dias perfeitamente tranquilos observando passarinhos e contemplando a paisagem. O chalé é muito aconchegante, tinha tudo que precisávamos. O acesso é tranquilo com um carro pequeno. Voltaremos com certeza!', url: LOFT },{ name: 'Adriana', home: 'Casa', date: 'AGOSTO DE 2026', quote: 'Fátima também muito solícita, sempre nos orientando e respondendo rapidamente as mensagens. Muito cuidadosa em todas as orientações da reserva, do caminho, self Check In, e dicas locais.', url: CASA }].map(review => <article key={review.name} className="review reveal"><div className="stars" aria-label="5 de 5 estrelas">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} fill="currentColor"/>)}</div><blockquote>“{review.quote}”</blockquote><External href={review.url} className="review-author"><span>{review.name}<small>{review.home} · {review.date}</small></span><ArrowUpRight size={16}/></External></article>)}
        </div><div className="reviews-bottom"><p>Relatos reais publicados no Airbnb. Alguns trechos foram selecionados para esta página.</p><External href={MAPS} className="text-link">Veja também no Google <ArrowUpRight size={16}/></External></div></div></section>

      <section className="arrival section wrap" id="chegada"><div className="arrival-copy reveal"><span className="eyebrow olive">O CAMINHO TAMBÉM É CAMPO</span><h2>Entre Minas e a serra.<br/><em>Longe da correria.</em></h2><p>Estamos no Bairro dos Martins, na zona rural de Sapucaí-Mirim, sul de Minas Gerais. Um ponto de partida para conhecer a Mantiqueira — ou para passar dias sem precisar sair do sítio.</p><div className="distances"><span><strong>19 km</strong>Santo Antônio do Pinhal</span><span><strong>21 km</strong>São Bento do Sapucaí</span><span><strong>30 km</strong>Gonçalves</span><span><strong>33 km</strong>Campos do Jordão</span></div><External href={MAPS} className="text-link"><MapPin size={17}/> Veja onde fica o Baú <ArrowUpRight size={17}/></External></div><div className="arrival-photo reveal"><img src="/images/loft-29.jpg" alt="Vista da varanda do Loft sobre o vale coberto de brumas" loading="lazy"/><span>Brumas no vale. Silêncio ao redor.</span></div></section>
      <section className="faq wrap" id="perguntas"><div><span className="eyebrow olive">ANTES DE ARRUMAR A MALA</span><h3>Para chegar<br/><em>sabendo.</em></h3></div><div className="faq-list">
        {[['Como é a estrada até o sítio?', 'O último trecho tem 7 km de estrada mista: 3 km de bloquetes e 4 km de terra. Os últimos 500 metros são mais íngremes, com os pontos mais difíceis pavimentados. Após a reserva, siga as orientações de chegada enviadas pela anfitriã.'], ['A propriedade é exclusiva para a minha reserva?', 'O interior de cada acomodação é exclusivo para seus hóspedes. Casa e Loft ficam no mesmo sítio, em patamares diferentes. A entrada e algumas áreas externas são compartilhadas, incluindo horta, lago, trilhas e quedinha d’água. Há áreas externas próprias de cada acomodação.'], ['Posso levar meu pet?', 'O anúncio da Casa informa que ela recebe pets e possui área cercada. Para regras, quantidade de animais e condições do Loft, confirme diretamente com a anfitriã antes de reservar.'], ['Tem internet para trabalhar?', 'Os dois anúncios informam Wi-Fi Starlink. A Casa também indica um espaço adequado para trabalhar. Você pode conferir os detalhes atualizados de cada acomodação no Airbnb.'], ['Como faço minha reserva?', 'Escolha a Casa ou o Loft e abra o anúncio correspondente no Airbnb. Lá você pode consultar a disponibilidade, as regras e as condições da sua estadia. O check-in começa às 14h e o checkout é até as 11h.']].map(([question, answer]) => <details key={question}><summary>{question}<Plus size={17}/></summary><p>{answer}</p></details>)}
      </div></section>
      <section className="booking section" id="reservar"><div className="wrap booking-inner reveal"><span className="eyebrow olive">DEIXE UM ESPAÇO NA MALA PARA AS HISTÓRIAS</span><h2>O Baú está aberto.<br/><em>Vem ficar um pouco.</em></h2><div className="booking-links"><External href={CASA} className="button green">Quero ficar na Casa <ArrowUpRight size={18}/></External><External href={LOFT} className="button outline">Quero ficar no Loft <ArrowUpRight size={18}/></External></div><p>Reservas pelo Airbnb. Cuidado por conta da Fátima.</p><a href="tel:+5511981415272" className="text-link"><Phone size={15}/> Prefere conversar? Fale com a Fátima <ArrowUpRight size={15}/></a></div><svg className="booking-mountains" viewBox="0 0 1000 200" fill="none" aria-hidden="true"><path d="M0 180 150 65l100 70 130-70 80 65 110-110 25 2 10 65 50-18 200 110 65-75 80 65M0 199l200-75 90 55 100-47 90 63 175-54 150 56 195-56" stroke="currentColor" strokeWidth="1"/></svg></section>
    </main>
    <footer className="footer"><div className="wrap footer-top"><Brand light/><p>Casa & Loft na Serra da Mantiqueira.<br/>Um lugar com memória, natureza e afeto.</p><span className="baú-stamp" aria-hidden="true"><svg viewBox="0 0 82 38" fill="none"><path d="M2 33 22 15l12 10L48 5l6 1 2 12 7-4 17 19" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg><em className="baú-stamp-label">Baú da Mantiqueira</em></span><div className="socials"><External href={INSTA} className="social-link"><Instagram size={18}/><span>Instagram</span><ArrowUpRight size={14}/></External><External href={MAPS} className="social-link"><MapPin size={18}/><span>Como chegar</span><ArrowUpRight size={14}/></External></div></div><div className="wrap footer-bottom"><span>Baú da Mantiqueira · Sapucaí-Mirim, MG</span><span>Feito de histórias. Cercado de montanhas.</span><a href="#inicio">Voltar ao alto <ArrowUpRight size={14}/></a></div></footer>
    {gallery && <dialog ref={dialogRef} className="lightbox" aria-label={`Galeria: ${gallery.title}`} onCancel={e => { e.preventDefault(); setGallery(null); }}><div className="lightbox-top"><span>{gallery.title}</span><button ref={closeRef} onClick={() => setGallery(null)} aria-label="Fechar galeria"><X/></button></div><button className="gallery-prev" onClick={() => changePhoto(-1)} aria-label="Foto anterior"><ChevronLeft/></button><figure><img src={`/images/${gallery.images[gallery.index]}.jpg`} alt={gallery.captions[gallery.index]}/><figcaption>{gallery.captions[gallery.index]}<span>{gallery.index + 1} / {gallery.images.length}</span></figcaption></figure><button className="gallery-next" onClick={() => changePhoto(1)} aria-label="Próxima foto"><ChevronRight/></button></dialog>}
  </>;
}