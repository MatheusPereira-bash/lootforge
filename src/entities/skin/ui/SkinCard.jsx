import { toMoney } from '../../../shared/lib/money'
import styles from './SkinCard.module.css'

export function SkinCard({ skin }) {
  return (
    <article className={styles.card}>
      <div className={styles.badge} style={{ background: skin.color }}>
        {skin.visual}
      </div>
      <p className={styles.rarity}>{skin.rarity}</p>
      <h3>{skin.name}</h3>
      <p>{skin.flavor}</p>
      <strong>Resgate: R$ {toMoney(skin.price)}</strong>
    </article>
  )
}
