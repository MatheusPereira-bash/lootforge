import styles from './RouletteCta.module.css'

const SIZE = 400
const CENTER = SIZE / 2
const RADIUS = 190
const LABEL_RADIUS = 140

export const SLOT_ANGLE = 360 / 20

function polar(angle, radius) {
  const rad = (angle * Math.PI) / 180
  return [CENTER + radius * Math.sin(rad), CENTER - radius * Math.cos(rad)]
}

function slicePath(index, total) {
  const step = 360 / total
  const [x1, y1] = polar(index * step - step / 2, RADIUS)
  const [x2, y2] = polar(index * step + step / 2, RADIUS)
  return `M ${CENTER} ${CENTER} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 0 1 ${x2} ${y2} Z`
}

export function Wheel({ slots, rotation, duration, highlight }) {
  return (
    <div className={styles.wheelWrap}>
      <div className={styles.pointer} aria-hidden="true" />
      <div
        className={styles.wheel}
        style={{
          transform: `rotate(${rotation}deg)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Roleta de skins com 20 casas">
          <circle cx={CENTER} cy={CENTER} r={RADIUS + 8} fill="#0a1223" stroke="#ffd47a" strokeWidth="4" />
          {slots.map((skin, index) => {
            const isHighlighted = highlight === index
            const fill = skin ? skin.color : index % 2 === 0 ? '#16213f' : '#0f1830'
            return (
              <g key={index}>
                <path
                  d={slicePath(index, slots.length)}
                  fill={fill}
                  stroke="#060b17"
                  strokeWidth="2"
                  opacity={highlight === null || isHighlighted ? 1 : 0.55}
                />
                <g transform={`rotate(${index * SLOT_ANGLE} ${CENTER} ${CENTER})`}>
                  <text
                    x={CENTER}
                    y={CENTER - LABEL_RADIUS}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={skin ? styles.slotLabelWin : styles.slotLabelLose}
                  >
                    {skin ? skin.visual : '✕'}
                  </text>
                </g>
              </g>
            )
          })}
          <circle cx={CENTER} cy={CENTER} r="34" fill="#0a1223" stroke="#ffd47a" strokeWidth="4" />
          <text
            x={CENTER}
            y={CENTER}
            textAnchor="middle"
            dominantBaseline="middle"
            className={styles.hubLabel}
          >
            LF
          </text>
        </svg>
      </div>
    </div>
  )
}
