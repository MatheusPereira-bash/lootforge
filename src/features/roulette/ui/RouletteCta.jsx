import { useEffect, useMemo, useRef, useState } from 'react'
import { SPIN_COST, wheelSlots } from '../../../shared/config/productData'
import { toMoney } from '../../../shared/lib/money'
import { SLOT_ANGLE, Wheel } from './Wheel'
import styles from './RouletteCta.module.css'

const SPIN_MS = 5000
const EXTRA_TURNS = 6
const HISTORY_SIZE = 6

export function RouletteCta({ skins }) {
  const [depositInput, setDepositInput] = useState('50')
  const [depositError, setDepositError] = useState('')
  const [balance, setBalance] = useState(0)
  const [message, setMessage] = useState('Deposite saldo para começar a girar.')
  const [pendingSkin, setPendingSkin] = useState(null)
  const [claimedSkins, setClaimedSkins] = useState([])
  const [history, setHistory] = useState([])
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [landedSlot, setLandedSlot] = useState(null)
  const timerRef = useRef(null)

  const slots = useMemo(
    () => wheelSlots.map((name) => skins.find((skin) => skin.name === name) ?? null),
    [skins],
  )

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const canSpin = balance >= SPIN_COST && !isSpinning && !pendingSkin
  const hasPendingPayment = Boolean(pendingSkin)

  const claimedLabel = claimedSkins.length
    ? claimedSkins.map((skin) => skin.name).join(' | ')
    : 'Nenhuma skin resgatada ainda.'

  const handleDeposit = (event) => {
    event.preventDefault()

    const parsed = Number.parseFloat(depositInput.replace(',', '.'))
    if (Number.isNaN(parsed) || parsed <= 0) {
      const errorMessage = 'Informe um valor de depósito maior que R$ 0,00.'
      setDepositError(errorMessage)
      setMessage(errorMessage)
      return
    }

    setDepositError('')
    setBalance((prev) => prev + parsed)
    setMessage(`Depósito confirmado: R$ ${toMoney(parsed)}.`)
    setDepositInput('')
  }

  const handleSpin = () => {
    if (isSpinning) {
      return
    }

    if (pendingSkin) {
      setMessage('Você ganhou uma skin. Pague o resgate antes de girar novamente.')
      return
    }

    if (balance < SPIN_COST) {
      setMessage('Saldo insuficiente. Deposite para continuar.')
      return
    }

    // Sorteia a casa primeiro e depois anima a roda até ela.
    // Como são 20 casas e 7 têm skin, a chance de prêmio é de 35%.
    const targetIndex = Math.floor(Math.random() * slots.length)
    const jitter = (Math.random() - 0.5) * (SLOT_ANGLE * 0.6)
    const targetAngle = (((-targetIndex * SLOT_ANGLE + jitter) % 360) + 360) % 360
    const currentAngle = ((rotation % 360) + 360) % 360
    const delta = ((targetAngle - currentAngle) % 360 + 360) % 360

    setBalance((prev) => prev - SPIN_COST)
    setIsSpinning(true)
    setLandedSlot(null)
    setMessage('Girando...')
    setRotation(rotation + EXTRA_TURNS * 360 + delta)

    timerRef.current = setTimeout(() => {
      const won = slots[targetIndex]
      setIsSpinning(false)
      setLandedSlot(targetIndex)

      if (!won) {
        setHistory((prev) => [{ label: 'Nada', win: false }, ...prev].slice(0, HISTORY_SIZE))
        setMessage('Nada encontrado no giro. O valor foi consumido pela roleta.')
        return
      }

      setPendingSkin(won)
      setHistory((prev) => [{ label: won.name, win: true }, ...prev].slice(0, HISTORY_SIZE))
      setMessage(
        `Parabéns? Você ganhou ${won.name}, mas precisa pagar R$ ${toMoney(won.price)} para resgatá-la.`,
      )
    }, SPIN_MS)
  }

  const handleSkinPayment = () => {
    if (!pendingSkin || isSpinning) {
      return
    }

    if (balance < pendingSkin.price) {
      setMessage(
        `Saldo insuficiente para o resgate. Faltam R$ ${toMoney(pendingSkin.price - balance)}.`,
      )
      return
    }

    setBalance((prev) => prev - pendingSkin.price)
    setClaimedSkins((prev) => [...prev, pendingSkin])
    setMessage(`Pagamento aprovado. ${pendingSkin.name} foi adicionada ao seu inventário!`)
    setPendingSkin(null)
  }

  return (
    <section className={styles.cta} id="girar">
      <h2>Gire a roleta agora</h2>
      <p>
        Cada giro custa <strong>R$ {toMoney(SPIN_COST)}</strong>. Se ganhar uma skin, o resgate é
        cobrado separadamente.
      </p>

      <div className={styles.layout}>
        <Wheel slots={slots} rotation={rotation} duration={isSpinning ? SPIN_MS : 0} highlight={landedSlot} />

        <div className={styles.panel}>
          <div className={styles.walletBox}>
            <p>
              Saldo atual: <strong>R$ {toMoney(balance)}</strong>
            </p>
            <form onSubmit={handleDeposit} className={styles.depositForm} noValidate>
              <input
                type="number"
                min="1"
                step="0.01"
                value={depositInput}
                onChange={(event) => {
                  setDepositInput(event.target.value)
                  if (depositError) {
                    setDepositError('')
                  }
                }}
                placeholder="Valor do depósito"
                aria-label="Valor do depósito"
                aria-invalid={depositError ? 'true' : 'false'}
                aria-describedby={depositError ? 'deposit-error' : undefined}
              />
              <button type="submit" disabled={isSpinning}>
                Depositar
              </button>
            </form>
            {depositError && (
              <small id="deposit-error" role="alert" className={styles.fieldError}>
                {depositError}
              </small>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleSpin}
              disabled={isSpinning || hasPendingPayment}
              title={
                hasPendingPayment
                  ? 'Finalize o pagamento do resgate para liberar novos giros.'
                  : undefined
              }
              aria-describedby={hasPendingPayment ? 'spin-lock-reason' : undefined}
            >
              {isSpinning ? 'Girando...' : `Girar (R$ ${toMoney(SPIN_COST)})`}
            </button>
            {pendingSkin && (
              <button
                type="button"
                className={styles.secondary}
                onClick={handleSkinPayment}
                disabled={isSpinning}
              >
                Pagar resgate: R$ {toMoney(pendingSkin.price)}
              </button>
            )}
          </div>
          {hasPendingPayment && (
            <small id="spin-lock-reason" className={styles.hint}>
              Giro bloqueado ate finalizar o pagamento do resgate.
            </small>
          )}

          <div className={styles.feedback} aria-live="polite">
            <p>{message}</p>
            <p>
              <strong>Inventário:</strong> {claimedLabel}
            </p>
            {history.length > 0 && (
              <div className={styles.history}>
                <strong>Últimos giros:</strong>
                <ul>
                  {history.map((item, index) => (
                    <li key={index} className={item.win ? styles.historyWin : styles.historyLose}>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {!canSpin && !isSpinning && !pendingSkin && balance < SPIN_COST && (
            <small className={styles.hint}>Você precisa de pelo menos R$ {toMoney(SPIN_COST)} para girar.</small>
          )}
        </div>
      </div>
    </section>
  )
}
