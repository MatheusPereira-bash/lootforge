import { useMemo, useState } from 'react'
import styles from './FakeWheelCta.module.css'

const SPIN_COST = 12

function toMoney(value) {
  return value.toFixed(2).replace('.', ',')
}

export function FakeWheelCta({ skins }) {
  const [depositInput, setDepositInput] = useState('20')
  const [balance, setBalance] = useState(0)
  const [message, setMessage] = useState('Deposite saldo para iniciar a simulacao.')
  const [pendingSkin, setPendingSkin] = useState(null)
  const [claimedSkins, setClaimedSkins] = useState([])

  const canSpin = balance >= SPIN_COST
  const hasPendingPayment = Boolean(pendingSkin && !pendingSkin.paid)

  const claimedLabel = useMemo(() => {
    if (!claimedSkins.length) {
      return 'Nenhuma skin resgatada ainda.'
    }

    return claimedSkins.map((skin) => skin.name).join(' | ')
  }, [claimedSkins])

  const handleDeposit = (event) => {
    event.preventDefault()

    const parsed = Number.parseFloat(depositInput)
    if (Number.isNaN(parsed) || parsed <= 0) {
      setMessage('Informe um valor valido para deposito ficticio.')
      return
    }

    setBalance((prev) => prev + parsed)
    setMessage(`Deposito ficticio confirmado: R$ ${toMoney(parsed)}.`)
    setDepositInput('')
  }

  const handleSpin = () => {
    if (hasPendingPayment) {
      setMessage('Voce ja ganhou uma skin. Pague o resgate antes de girar novamente.')
      return
    }

    if (!canSpin) {
      setMessage('Saldo insuficiente. Deposite para continuar.')
      return
    }

    setBalance((prev) => prev - SPIN_COST)

    const didWin = Math.random() < 0.35
    if (!didWin) {
      setMessage('Nada encontrado no giro. O valor foi consumido pela roleta.')
      return
    }

    const selectedSkin = skins[Math.floor(Math.random() * skins.length)]
    setPendingSkin({ ...selectedSkin, paid: false })
    setMessage(
      `Parabens? Voce ganhou ${selectedSkin.name}, mas precisa pagar R$ ${toMoney(selectedSkin.price)} para resgatar.`,
    )
  }

  const handleSkinPayment = () => {
    if (!pendingSkin || pendingSkin.paid) {
      return
    }

    if (balance < pendingSkin.price) {
      setMessage('Saldo insuficiente para pagar o resgate da skin.')
      return
    }

    setBalance((prev) => prev - pendingSkin.price)
    setClaimedSkins((prev) => [...prev, pendingSkin])
    setPendingSkin(null)
    setMessage('Pagamento ficticio aprovado. Skin adicionada ao inventario de teste!')
  }

  return (
    <section className={styles.cta} id="girar">
      <h2>Teste agora a roleta ficticia</h2>
      <p>
        Cada giro custa <strong>R$ {toMoney(SPIN_COST)}</strong>. Se ganhar skin,
        o resgate e cobrado separadamente.
      </p>

      <div className={styles.walletBox}>
        <p>
          Saldo atual: <strong>R$ {toMoney(balance)}</strong>
        </p>
        <form onSubmit={handleDeposit} className={styles.depositForm}>
          <input
            type="number"
            min="1"
            step="0.01"
            value={depositInput}
            onChange={(event) => setDepositInput(event.target.value)}
            placeholder="Valor para deposito"
          />
          <button type="submit">Depositar</button>
        </form>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={handleSpin}>
          Girar roleta
        </button>
        {pendingSkin && (
          <button type="button" className={styles.secondary} onClick={handleSkinPayment}>
            Pagar skin ({pendingSkin.name})
          </button>
        )}
      </div>

      <div className={styles.feedback}>
        <p>{message}</p>
        <p>
          <strong>Inventario ficticio:</strong> {claimedLabel}
        </p>
        <small>
          Simulacao academica. Nenhum pagamento real e processado.
        </small>
      </div>
    </section>
  )
}
