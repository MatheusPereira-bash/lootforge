import { SkinCard } from '../../../entities/skin/ui/SkinCard'
import { RouletteCta } from '../../../features/roulette/ui/RouletteCta'
import {
  SPIN_COST,
  benefits,
  faq,
  productInfo,
  skins,
  steps,
  testimonials,
} from '../../../shared/config/productData'
import { toMoney } from '../../../shared/lib/money'
import styles from './LandingPage.module.css'

export function LandingPage() {
  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Pular para o conteúdo
      </a>

      <header className={styles.topbar}>
        <p>{productInfo.brand}</p>
        <nav>
          <a href="#beneficios">Benefícios</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#oferta">Oferta</a>
          <a href="#faq">FAQ</a>
          <a href="#girar" className={styles.navCta}>
            Girar roleta
          </a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1} className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.kicker}>{productInfo.tagline}</p>
          <h1>{productInfo.brand}</h1>
          <p>{productInfo.pitch}</p>
          <a href="#girar" className={styles.heroButton}>
            Quero girar agora
          </a>
        </section>

        <section id="beneficios" className={styles.section}>
          <h2>Benefícios e diferenciais</h2>
          <div className={styles.gridBenefits}>
            {benefits.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Skins da temporada</h2>
          <div className={styles.skinsGrid}>
            {skins.map((skin) => (
              <SkinCard key={skin.name} skin={skin} />
            ))}
          </div>
        </section>

        <section id="como-funciona" className={styles.section}>
          <h2>Como funciona</h2>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <h2>O que os jogadores dizem</h2>
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <article key={testimonial.player}>
                <p>"{testimonial.quote}"</p>
                <strong>{testimonial.player}</strong>
              </article>
            ))}
          </div>
        </section>

        <section id="oferta" className={styles.section}>
          <h2>Oferta da temporada</h2>
          <div className={styles.offerBox}>
            <p>
              Pacote inicial: depósito recomendado de <strong>R$ 50,00</strong> para até{' '}
              {Math.floor(50 / SPIN_COST)} giros e chance de resgate.
            </p>
            <p>
              Giro unitário: <strong>R$ {toMoney(SPIN_COST)}</strong> | Resgate das skins: entre{' '}
              <strong>
                R$ {toMoney(Math.min(...skins.map((skin) => skin.price)))} e R${' '}
                {toMoney(Math.max(...skins.map((skin) => skin.price)))}
              </strong>
            </p>
          </div>
        </section>

        <RouletteCta skins={skins} />

        <section id="faq" className={styles.section}>
          <h2>FAQ</h2>
          <div className={styles.faqList}>
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
