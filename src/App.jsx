import { useState, useEffect, createContext, useContext } from 'react'

/* ─── i18n ─── */
const t = {
  en: {
    nav: { services: 'Services', taqueria: 'Taquería', meat: 'Meat Market', bakery: 'Bakery', about: 'About', hours: 'Hours', contact: 'Contact' },
    hero: {
      tag: "Huntsville's Authentic Mexican Grocery",
      h1a: 'Fresh From',
      h1b: 'Jalisco to Huntsville.',
      sub: 'Family-owned supermercado, carnicería, taquería, and panadería. Authentic Mexican groceries, fresh-cut meats, handmade tacos, and daily-baked pan dulce — all under one roof.',
      cta1: 'View Our Taquería Menu',
      cta2: 'Get Directions',
      badges: ['Carnicería', 'Taquería', 'Panadería', 'Supermercado'],
    },
    services: {
      tag: 'What We Offer',
      title: 'Four Stores in One',
      sub: 'Everything you need for authentic Mexican cooking, eating, and celebrating — fresh, daily, and made with love.',
      items: [
        { icon: '🛒', title: 'Supermercado', desc: 'Fresh produce, imported Mexican brands, spices, dried chiles, tortillas, salsas, snacks, beverages (Jarritos, Mexican Coca-Cola), and everyday household essentials.' },
        { icon: '🥩', title: 'Carnicería', desc: 'Fresh-cut meats daily. Custom cuts, carne asada, pollo marinado, chicharrón, carnitas, chorizo, and specialty items. Our butchers cut to your specifications.' },
        { icon: '🌮', title: 'Taquería', desc: 'Authentic tacos, burritos, tortas, menudo, barbacoa, quesadillas, and more — made fresh daily with recipes from Jalisco, Mexico. Dine in or take out.' },
        { icon: '🍞', title: 'Panadería', desc: 'Fresh-baked pan dulce, conchas, cuernos, polvorones, and traditional Mexican pastries. Baked daily — come early for the best selection!' },
      ],
    },
    taqueria: {
      tag: 'Our Kitchen',
      title: 'Taquería Menu',
      sub: 'Authentic flavors from Jalisco, Mexico. Made fresh daily with quality ingredients.',
      note: 'Prices and availability may vary. Ask about our daily specials!',
      categories: [
        { name: 'Tacos & Burritos', items: ['Tacos (Asada, Pastor, Carnitas, Barbacoa, Lengua, Pollo)', 'Burritos', 'Quesadillas', 'Tortas', 'Sopes', 'Gorditas'] },
        { name: 'Plates & Soups', items: ['Menudo (Weekends)', 'Barbacoa Plate', 'Carnitas Plate', 'Caldo de Res', 'Pozole (Seasonal)'] },
        { name: 'Sides & Drinks', items: ['Rice & Beans', 'Guacamole', 'Salsa Fresca', 'Aguas Frescas (Horchata, Jamaica, Tamarindo)', 'Mexican Sodas (Jarritos, Coca-Cola)'] },
      ],
    },
    meat: {
      tag: 'Our Butchers',
      title: 'Carnicería',
      sub: 'Fresh meats cut daily by our skilled butchers. Custom cuts available — just ask.',
      items: ['Carne Asada (Thin-cut or Thick-cut)', 'Pollo Marinado (Marinated Chicken)', 'Carnitas (Pork)', 'Chorizo (House-made)', 'Chicharrón', 'Barbacoa', 'Cecina', 'Bistec Ranchero', 'Costillas (Ribs)', 'Fajita Meat', 'Custom Cuts — Cut to Order'],
      cta: 'Visit our carnicería for the freshest meats in Huntsville. Our butchers are happy to cut to your exact specifications.',
    },
    bakery: {
      tag: 'Fresh Daily',
      title: 'Panadería',
      sub: 'Traditional Mexican baked goods, fresh from our ovens every morning.',
      items: ['Conchas (assorted flavors)', 'Cuernos (Mexican croissants)', 'Polvorones (Wedding cookies)', 'Pan de Elote (Cornbread)', 'Empanadas', 'Orejas (Elephant ears)', 'Tres Leches Cake (Special order)', 'Custom Cakes (Birthdays, Quinceañeras)'],
      cta: 'Come early for the best selection! Our bakers start before dawn to bring you fresh bread every day.',
    },
    about: {
      tag: 'Our Story',
      title: 'About Las Flores',
      p1: 'For 18 years, Juan Flores worked as a welder in Huntsville, Texas. He watched the community grow and wondered when someone would open an authentic Mexican grocery store to serve the Hispanic families who called Huntsville home.',
      p2: 'In 2019, Juan decided to take action. He left his welding career and, together with his wife Armida, opened Supermercado Las Flores — named after the family, "The Flowers."',
      p3: 'Drawing on recipes and traditions from Juan\'s home state of Jalisco, Mexico, Las Flores quickly became more than a grocery store. It became a community gathering place — a carnicería where you can get custom-cut meats, a taquería serving authentic tacos and menudo, and now a panadería offering fresh pan dulce every morning.',
      p4: '"For the community, by the community." — Juan & Armida Flores',
      stats: [['7+', 'Years Serving Huntsville'], ['4', 'Departments Under One Roof'], ['4.6★', '77+ Customer Reviews'], ['6', 'Days a Week']],
    },
    hours: {
      tag: 'Visit Us',
      title: 'Hours & Location',
      address: '2514 Sam Houston Ave, Suite C',
      city: 'Huntsville, TX 77340',
      phone: '(936) 755-6096',
      schedule: [['Monday', '7:00 AM – 8:00 PM'], ['Tuesday', 'CLOSED'], ['Wednesday', '7:00 AM – 8:00 PM'], ['Thursday', '7:00 AM – 8:00 PM'], ['Friday', '7:00 AM – 8:00 PM'], ['Saturday', '7:00 AM – 8:00 PM'], ['Sunday', '7:00 AM – 7:00 PM']],
      directions: 'Get Directions',
      callUs: 'Call Us',
    },
    reviews: {
      tag: 'What Our Customers Say',
      title: 'Customer Reviews',
      items: [
        { name: 'Satisfied Customer', text: 'Super nice staff! Authentic food! Meat market selection is great, fresh produce and it holds all our favorite go to snacks! Love love love this place!' },
        { name: 'Local Foodie', text: 'The salsa is freaking hot, so don\'t go pouring it on your food unless you can hang with that. Great authentic flavors!' },
        { name: 'Regular Customer', text: 'Prices are a bit high for what it is, but they have added a new bakery and it looks promising. The meat quality is always good.' },
      ],
      more: 'Read more reviews on Google →',
    },
    faq: {
      tag: 'Questions?',
      title: 'Frequently Asked Questions',
      items: [
        { q: 'What are your hours?', a: 'We are open Monday, Wednesday–Saturday from 7:00 AM to 8:00 PM, and Sunday from 7:00 AM to 7:00 PM. We are closed on Tuesdays.' },
        { q: 'Do you have a taquería?', a: 'Yes! Our taquería serves authentic Mexican food including tacos, burritos, tortas, menudo, barbacoa, and more. Available for dine-in or takeout.' },
        { q: 'Can I get custom meat cuts?', a: 'Absolutely! Our skilled butchers will cut meat to your exact specifications. Just ask at the carnicería counter.' },
        { q: 'Do you offer catering?', a: 'We offer catering for events, parties, and gatherings. Contact us to discuss taco bars, meat platters, bakery trays, and more.' },
        { q: 'Is there a bakery?', a: 'Yes! Our panadería bakes fresh pan dulce, conchas, and traditional Mexican pastries every morning. We also take custom cake orders for birthdays and quinceañeras.' },
        { q: 'Do you accept credit cards?', a: 'Yes, we accept cash, credit cards, and debit cards.' },
      ],
    },
    cta: { title: 'Visit Us Today', sub: 'Fresh groceries, authentic food, and friendly service — we\'re waiting for you.', btn1: '📍 Get Directions', btn2: '📞 Call Us' },
    footer: { tagline: 'Family-owned supermercado serving the Huntsville community with authentic Mexican groceries, meats, food, and baked goods since 2019.', motto: '"For the community, by the community"', rights: 'All rights reserved.' },
  },
  es: {
    nav: { services: 'Servicios', taqueria: 'Taquería', meat: 'Carnicería', bakery: 'Panadería', about: 'Nosotros', hours: 'Horario', contact: 'Contacto' },
    hero: {
      tag: 'El Supermercado Mexicano Auténtico de Huntsville',
      h1a: 'Directo de',
      h1b: 'Jalisco a Huntsville.',
      sub: 'Supermercado familiar con carnicería, taquería y panadería. Productos mexicanos auténticos, carnes frescas cortadas a la medida, tacos hechos a mano y pan dulce horneado diariamente — todo bajo un mismo techo.',
      cta1: 'Ver Menú de Taquería',
      cta2: 'Cómo Llegar',
      badges: ['Carnicería', 'Taquería', 'Panadería', 'Supermercado'],
    },
    services: {
      tag: 'Lo Que Ofrecemos',
      title: 'Cuatro Tiendas en Una',
      sub: 'Todo lo que necesitas para cocinar, comer y celebrar a lo mexicano — fresco, diario y hecho con amor.',
      items: [
        { icon: '🛒', title: 'Supermercado', desc: 'Frutas y verduras frescas, marcas mexicanas importadas, especias, chiles secos, tortillas, salsas, botanas, bebidas (Jarritos, Coca-Cola mexicana) y productos del hogar.' },
        { icon: '🥩', title: 'Carnicería', desc: 'Carnes frescas cortadas diariamente. Cortes a la medida, carne asada, pollo marinado, chicharrón, carnitas, chorizo y especialidades. Nuestros carniceros cortan a tu gusto.' },
        { icon: '🌮', title: 'Taquería', desc: 'Tacos auténticos, burritos, tortas, menudo, barbacoa, quesadillas y más — preparados diariamente con recetas de Jalisco, México. Para comer aquí o para llevar.' },
        { icon: '🍞', title: 'Panadería', desc: 'Pan dulce fresco, conchas, cuernos, polvorones y repostería tradicional mexicana. Horneado diariamente — ¡llega temprano para la mejor selección!' },
      ],
    },
    taqueria: {
      tag: 'Nuestra Cocina',
      title: 'Menú de Taquería',
      sub: 'Sabores auténticos de Jalisco, México. Preparado fresco diariamente con ingredientes de calidad.',
      note: 'Los precios y la disponibilidad pueden variar. ¡Pregunta por nuestras especialidades del día!',
      categories: [
        { name: 'Tacos y Burritos', items: ['Tacos (Asada, Pastor, Carnitas, Barbacoa, Lengua, Pollo)', 'Burritos', 'Quesadillas', 'Tortas', 'Sopes', 'Gorditas'] },
        { name: 'Platos y Caldos', items: ['Menudo (Fines de Semana)', 'Plato de Barbacoa', 'Plato de Carnitas', 'Caldo de Res', 'Pozole (De Temporada)'] },
        { name: 'Extras y Bebidas', items: ['Arroz y Frijoles', 'Guacamole', 'Salsa Fresca', 'Aguas Frescas (Horchata, Jamaica, Tamarindo)', 'Refrescos Mexicanos (Jarritos, Coca-Cola)'] },
      ],
    },
    meat: {
      tag: 'Nuestros Carniceros',
      title: 'Carnicería',
      sub: 'Carnes frescas cortadas diariamente por nuestros carniceros expertos. Cortes a la medida — solo pide.',
      items: ['Carne Asada (Corte Delgado o Grueso)', 'Pollo Marinado', 'Carnitas (Cerdo)', 'Chorizo (Hecho en Casa)', 'Chicharrón', 'Barbacoa', 'Cecina', 'Bistec Ranchero', 'Costillas', 'Fajita', 'Cortes a la Medida — A Tu Gusto'],
      cta: 'Visita nuestra carnicería para las carnes más frescas de Huntsville. Nuestros carniceros están felices de cortar a tu medida exacta.',
    },
    bakery: {
      tag: 'Fresco Diariamente',
      title: 'Panadería',
      sub: 'Pan mexicano tradicional, fresco de nuestros hornos cada mañana.',
      items: ['Conchas (varios sabores)', 'Cuernos', 'Polvorones', 'Pan de Elote', 'Empanadas', 'Orejas', 'Pastel de Tres Leches (Pedido Especial)', 'Pasteles Personalizados (Cumpleaños, Quinceañeras)'],
      cta: '¡Llega temprano para la mejor selección! Nuestros panaderos comienzan antes del amanecer para traerte pan fresco cada día.',
    },
    about: {
      tag: 'Nuestra Historia',
      title: 'Sobre Las Flores',
      p1: 'Durante 18 años, Juan Flores trabajó como soldador en Huntsville, Texas. Vio crecer la comunidad y se preguntaba cuándo alguien abriría un supermercado mexicano auténtico para servir a las familias hispanas que llamaban Huntsville su hogar.',
      p2: 'En 2019, Juan decidió actuar. Dejó su carrera de soldador y, junto con su esposa Armida, abrió Supermercado Las Flores — nombrado por la familia, "Las Flores."',
      p3: 'Con recetas y tradiciones del estado natal de Juan, Jalisco, México, Las Flores rápidamente se convirtió en más que una tienda. Se convirtió en un lugar de reunión comunitaria — una carnicería donde puedes obtener cortes a la medida, una taquería que sirve tacos y menudo auténticos, y ahora una panadería que ofrece pan dulce fresco cada mañana.',
      p4: '"Para la comunidad, por la comunidad." — Juan y Armida Flores',
      stats: [['7+', 'Años Sirviendo a Huntsville'], ['4', 'Departamentos Bajo Un Techo'], ['4.6★', '77+ Reseñas de Clientes'], ['6', 'Días a la Semana']],
    },
    hours: {
      tag: 'Visítanos',
      title: 'Horario y Ubicación',
      address: '2514 Sam Houston Ave, Suite C',
      city: 'Huntsville, TX 77340',
      phone: '(936) 755-6096',
      schedule: [['Lunes', '7:00 AM – 8:00 PM'], ['Martes', 'CERRADO'], ['Miércoles', '7:00 AM – 8:00 PM'], ['Jueves', '7:00 AM – 8:00 PM'], ['Viernes', '7:00 AM – 8:00 PM'], ['Sábado', '7:00 AM – 8:00 PM'], ['Domingo', '7:00 AM – 7:00 PM']],
      directions: 'Cómo Llegar',
      callUs: 'Llámanos',
    },
    reviews: {
      tag: 'Lo Que Dicen Nuestros Clientes',
      title: 'Reseñas de Clientes',
      items: [
        { name: 'Cliente Satisfecho', text: '¡Personal súper amable! ¡Comida auténtica! La selección de la carnicería es excelente, productos frescos y tienen todas nuestras botanas favoritas. ¡Nos encanta este lugar!' },
        { name: 'Amante de la Comida', text: 'La salsa está bien picosa, así que no la eches toda a tu comida a menos que aguantes. ¡Sabores auténticos increíbles!' },
        { name: 'Cliente Regular', text: 'Los precios son un poco altos, pero han agregado una nueva panadería y se ve prometedora. La calidad de la carne siempre es buena.' },
      ],
      more: 'Leer más reseñas en Google →',
    },
    faq: {
      tag: '¿Preguntas?',
      title: 'Preguntas Frecuentes',
      items: [
        { q: '¿Cuál es su horario?', a: 'Estamos abiertos Lunes, Miércoles a Sábado de 7:00 AM a 8:00 PM, y Domingo de 7:00 AM a 7:00 PM. Cerramos los Martes.' },
        { q: '¿Tienen taquería?', a: '¡Sí! Nuestra taquería sirve comida mexicana auténtica incluyendo tacos, burritos, tortas, menudo, barbacoa y más. Para comer aquí o para llevar.' },
        { q: '¿Pueden cortar carne a la medida?', a: '¡Por supuesto! Nuestros carniceros expertos cortan la carne a tus especificaciones exactas. Solo pide en el mostrador de la carnicería.' },
        { q: '¿Ofrecen catering?', a: 'Ofrecemos catering para eventos, fiestas y reuniones. Contáctanos para discutir barras de tacos, charolas de carne, charolas de panadería y más.' },
        { q: '¿Tienen panadería?', a: '¡Sí! Nuestra panadería hornea pan dulce fresco, conchas y repostería mexicana tradicional cada mañana. También aceptamos pedidos de pasteles personalizados para cumpleaños y quinceañeras.' },
        { q: '¿Aceptan tarjeta?', a: 'Sí, aceptamos efectivo, tarjetas de crédito y tarjetas de débito.' },
      ],
    },
    cta: { title: 'Visítanos Hoy', sub: 'Productos frescos, comida auténtica y servicio amable — te esperamos.', btn1: '📍 Cómo Llegar', btn2: '📞 Llámanos' },
    footer: { tagline: 'Supermercado familiar sirviendo a la comunidad de Huntsville con productos mexicanos auténticos, carnes, comida y pan desde 2019.', motto: '"Para la comunidad, por la comunidad"', rights: 'Todos los derechos reservados.' },
  },
}

const LangCtx = createContext()
const useLang = () => useContext(LangCtx)
const useT = () => { const { lang } = useLang(); return t[lang] }

/* ─── Language Toggle ─── */
function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-all border border-white/20"
      aria-label="Toggle language">
      <span>{lang === 'en' ? '🇲🇽' : '🇺🇸'}</span>
      <span>{lang === 'en' ? 'Español' : 'English'}</span>
    </button>
  )
}

/* ─── Nav ─── */
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const tx = useT()
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h) }, [])

  const links = [
    [tx.nav.services, '#services'], [tx.nav.taqueria, '#taqueria'], [tx.nav.meat, '#meat'],
    [tx.nav.bakery, '#bakery'], [tx.nav.about, '#about'], [tx.nav.hours, '#hours'],
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl">🌺</span>
            <div>
              <span className="text-white font-bold text-base leading-tight block">Las Flores</span>
              <span className="text-maize text-[10px] tracking-wider uppercase">Supermercado</span>
            </div>
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="text-white/80 hover:text-maize transition-colors text-sm font-medium">{label}</a>
            ))}
            <LangToggle />
            <a href="#hours" className="bg-salsa hover:bg-chile text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors">{tx.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3 lg:hidden">
            <LangToggle />
            <button onClick={() => setOpen(!open)} className="text-white p-2" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden pb-4 border-t border-white/10">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="block py-3 text-white/80 hover:text-maize transition-colors text-sm font-medium">{label}</a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  const tx = useT()
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-dark via-warm to-dark overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffd700\' fill-opacity=\'0.15\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/svg%3E")'}} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-3xl">
          <p className="text-maize font-semibold tracking-wider uppercase text-sm mb-4">{tx.hero.tag}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
            {tx.hero.h1a}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-salsa to-chile">{tx.hero.h1b}</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl mb-8 max-w-xl leading-relaxed">{tx.hero.sub}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#taqueria" className="bg-salsa hover:bg-chile text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-salsa/30 text-sm sm:text-base">{tx.hero.cta1} →</a>
            <a href="#hours" className="border border-white/20 hover:border-maize text-white px-8 py-3.5 rounded-full font-semibold transition-all text-sm sm:text-base">{tx.hero.cta2}</a>
          </div>
          <div className="flex flex-wrap gap-4 mt-12">
            {tx.hero.badges.map((b, i) => (
              <span key={i} className="text-xs bg-white/10 text-white/80 px-4 py-1.5 rounded-full border border-white/10">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
function Services() {
  const tx = useT()
  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-salsa font-semibold tracking-wider uppercase text-sm mb-2">{tx.services.tag}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{tx.services.title}</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">{tx.services.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tx.services.items.map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-salsa transition-colors">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Taqueria Menu ─── */
function TaqueriaMenu() {
  const tx = useT()
  return (
    <section id="taqueria" className="py-20 sm:py-28 bg-gradient-to-br from-dark to-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-maize font-semibold tracking-wider uppercase text-sm mb-2">{tx.taqueria.tag}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{tx.taqueria.title}</h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">{tx.taqueria.sub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {tx.taqueria.categories.map((cat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-maize mb-4">{cat.name}</h3>
              <ul className="space-y-3">
                {cat.items.map((item, j) => (
                  <li key={j} className="text-white/80 text-sm flex items-start gap-2">
                    <span className="text-salsa mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-white/40 text-sm mt-8 italic">{tx.taqueria.note}</p>
      </div>
    </section>
  )
}

/* ─── Meat Market ─── */
function MeatMarket() {
  const tx = useT()
  return (
    <section id="meat" className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-salsa font-semibold tracking-wider uppercase text-sm mb-2">{tx.meat.tag}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{tx.meat.title}</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">{tx.meat.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {tx.meat.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-6 py-4 hover:bg-salsa/5 transition-colors">
              <span className="text-salsa font-bold">🥩</span>
              <span className="text-gray-800 font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8 italic">{tx.meat.cta}</p>
      </div>
    </section>
  )
}

/* ─── Bakery ─── */
function Bakery() {
  const tx = useT()
  return (
    <section id="bakery" className="py-20 sm:py-28 bg-tortilla/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-salsa font-semibold tracking-wider uppercase text-sm mb-2">{tx.bakery.tag}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{tx.bakery.title}</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">{tx.bakery.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {tx.bakery.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-6 py-4 hover:shadow-md transition-all">
              <span className="text-chile font-bold">🍞</span>
              <span className="text-gray-800 font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8 italic">{tx.bakery.cta}</p>
      </div>
    </section>
  )
}

/* ─── About ─── */
function About() {
  const tx = useT()
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-salsa font-semibold tracking-wider uppercase text-sm mb-2">{tx.about.tag}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">{tx.about.title}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{tx.about.p1}</p>
              <p>{tx.about.p2}</p>
              <p>{tx.about.p3}</p>
              <p className="font-medium text-gray-900 italic text-lg">{tx.about.p4}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-dark to-warm rounded-2xl p-10 text-white">
            <div className="grid grid-cols-2 gap-8">
              {tx.about.stats.map(([num, label], i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-maize">{num}</div>
                  <div className="text-white/60 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Hours ─── */
function Hours() {
  const tx = useT()
  return (
    <section id="hours" className="py-20 sm:py-28 bg-gradient-to-br from-dark to-warm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-maize font-semibold tracking-wider uppercase text-sm mb-2">{tx.hours.tag}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{tx.hours.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="space-y-3">
              {tx.hours.schedule.map(([day, time], i) => (
                <div key={i} className={`flex justify-between items-center py-2 border-b border-white/5 ${time === 'CLOSED' || time === 'CERRADO' ? 'text-salsa' : 'text-white/80'}`}>
                  <span className="font-medium text-sm">{day}</span>
                  <span className={`text-sm ${time === 'CLOSED' || time === 'CERRADO' ? 'font-bold' : ''}`}>{time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="space-y-4 text-white/80">
              <div className="flex items-start gap-3">
                <span className="text-maize mt-0.5">📍</span>
                <div><p className="text-white font-semibold">{tx.hours.address}</p><p>{tx.hours.city}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-maize">📞</span>
                <a href="tel:9367556096" className="hover:text-maize transition-colors">{tx.hours.phone}</a>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <a href="https://maps.google.com/?q=2514+Sam+Houston+Ave+Suite+C+Huntsville+TX+77340" target="_blank" rel="noopener noreferrer"
                className="bg-salsa hover:bg-chile text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors text-center">{tx.hours.directions} →</a>
              <a href="tel:9367556096" className="border border-white/20 hover:border-maize text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors text-center">{tx.hours.callUs}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Reviews ─── */
function Reviews() {
  const tx = useT()
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-salsa font-semibold tracking-wider uppercase text-sm mb-2">{tx.reviews.tag}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{tx.reviews.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {tx.reviews.items.map((r, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-8">
              <div className="flex gap-1 mb-4">{Array.from({length:5},(_,j)=><span key={j} className="text-maize text-lg">★</span>)}</div>
              <p className="text-gray-600 leading-relaxed text-sm mb-6">"{r.text}"</p>
              <p className="text-gray-900 font-semibold text-sm">— {r.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="https://www.google.com/search?q=Supermercado+Las+Flores+Huntsville+TX+reviews" target="_blank" rel="noopener noreferrer" className="text-salsa hover:text-chile transition-colors text-sm font-medium">{tx.reviews.more}</a>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQ() {
  const tx = useT()
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section className="py-20 sm:py-28 bg-tortilla/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-salsa font-semibold tracking-wider uppercase text-sm mb-2">{tx.faq.tag}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{tx.faq.title}</h2>
        </div>
        <div className="space-y-4">
          {tx.faq.items.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <span className={`text-salsa transition-transform ${openIdx === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openIdx === i && <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTA() {
  const tx = useT()
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-r from-salsa to-chile relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{tx.cta.title}</h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{tx.cta.sub}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://maps.google.com/?q=2514+Sam+Houston+Ave+Suite+C+Huntsville+TX+77340" target="_blank" rel="noopener noreferrer" className="bg-white text-salsa hover:bg-gray-100 px-8 py-3.5 rounded-full font-semibold transition-colors text-sm">{tx.cta.btn1}</a>
          <a href="tel:9367556096" className="bg-white/20 hover:bg-white/30 text-white px-8 py-3.5 rounded-full font-semibold transition-colors border border-white/30 text-sm">{tx.cta.btn2}</a>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  const tx = useT()
  return (
    <footer className="py-16 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🌺</span>
              <div><span className="text-white font-bold text-lg block leading-tight">Las Flores</span><span className="text-maize text-xs tracking-wider uppercase">Supermercado</span></div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{tx.footer.tagline}</p>
            <p className="text-white/40 text-sm italic">{tx.footer.motto}</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6">{tx.hours.tag}</h3>
            <div className="space-y-2 text-white/60 text-sm">
              {tx.hours.schedule.map(([day, time], i) => (
                <div key={i} className="flex justify-between"><span>{day}</span><span className={time === 'CLOSED' || time === 'CERRADO' ? 'text-salsa font-semibold' : ''}>{time}</span></div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6">{tx.nav.contact}</h3>
            <div className="space-y-3 text-white/60 text-sm">
              <p>{tx.hours.address}</p>
              <p>{tx.hours.city}</p>
              <p><a href="tel:9367556096" className="hover:text-maize transition-colors">{tx.hours.phone}</a></p>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/p/Supermercado-Las-Flores-100054219021034/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-maize transition-colors text-sm">Facebook</a>
              <a href="https://www.instagram.com/explore/locations/1123113951228865/supermercado-las-flores/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-maize transition-colors text-sm">Instagram</a>
              <a href="https://www.google.com/maps/search/Supermercado+Las+Flores+Huntsville+TX" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-maize transition-colors text-sm">Google Maps</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Supermercado Las Flores, Inc. {tx.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  const [lang, setLang] = useState('en')
  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div className="font-sans">
        <Nav />
        <Hero />
        <Services />
        <TaqueriaMenu />
        <MeatMarket />
        <Bakery />
        <About />
        <Hours />
        <Reviews />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </LangCtx.Provider>
  )
}
