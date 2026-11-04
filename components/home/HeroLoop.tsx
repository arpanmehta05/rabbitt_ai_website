import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Ban, KeyRound, Lock } from "lucide-react";
import styles from "./HeroLoop.module.css";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
const stages = [
  { word: "Connect", caption: "Your data. Right where it belongs.", deg: -90, d: 0 },
  { word: "Train", caption: "Private models. Yours to own.", deg: 30, d: -8 },
  { word: "Deploy", caption: "Your AI. Inside your cloud.", deg: 150, d: -4 },
];
const CX = 435;
const CY = 310;
const R = 112;
const at = (deg: number, r: number) => [CX + r * Math.cos(deg * Math.PI / 180), CY + r * Math.sin(deg * Math.PI / 180)];

// Each stage's line into its picture. The phase matches the stage's resting time on the 12s clock.
const connectors = [
  { d: "M327 128 H379 Q435 128 435 182", phase: 0 },
  { d: "M569 366 H611", phase: -8 },
  { d: "M303 366 H279 Q267 366 267 378 V394", phase: -4 },
];
// The one line that tries to leave. It fades before it reaches the edge of the customer's cloud.
const EGRESS = "M515 230 C585 160 681 130 681 50";

// Documents light up one after another while the arrow rests at Connect.
const tiles = Array.from({ length: 30 }, (_, i) => i * 0.1);
// The weights: a fixed pattern of strengths and shimmer offsets, so server and client render the same.
const weights = Array.from({ length: 70 }, (_, i) => ({ o: 0.12 + ((i * 37) % 11) / 13.5, d: -((i * 53) % 23) / 9 }));
const logLines = [
  <>POST /v1/agent <span className={styles.ok}>200</span></>,
  <span className={styles.dim}>› refund.lookup ok</span>,
  <span className={styles.dim}>› policy.verify ok</span>,
  <>reply sent <span className={styles.ms}>182ms</span></>,
  <>POST /v1/search <span className={styles.ok}>200</span></>,
  <span className={styles.dim}>› contracts.find ok</span>,
];

export default function HeroLoop() {
  return (
    <section data-nav-theme="dark" className={styles.hero}>
      <div className={styles.backdrop} aria-hidden />
      <div className={`rb-container ${styles.layout}`}>
        <div className={styles.copy}>
          <h1>
            <span>Own your data.</span>
            <span>Own your AI.</span>
          </h1>
          <p>Private models and agents that run inside your own cloud. Nothing leaves, and the weights are yours.</p>
          <div className={styles.actions}>
            <Link href="/contactus" className={styles.primary}>Book a demo <ArrowRight size={17} /></Link>
            <Link href="/products" className={styles.secondary}>Explore products <ArrowUpRight size={17} /></Link>
          </div>
        </div>

        <div className={styles.scene} role="img" aria-label="Everything happens inside your own cloud: your documents are indexed, a private model is trained and its weights stay sealed, agents answer your customers, and no data leaves.">
          <div className={styles.diagram} aria-hidden="true">
            <svg viewBox="0 0 860 660" fill="none" className={styles.connections}>
              <rect x="55" y="32" width="752" height="548" rx="22" fill="#000" stroke="#4d6f96" strokeOpacity=".6" strokeWidth="1.2" className={styles.perimeter} />

              {connectors.map(({ d }) => <path key={d} d={d} className={styles.base} />)}
              <path d={EGRESS} className={styles.base} strokeDasharray="3 4" />
              {connectors.map(({ d, phase }) => (
                <g key={d} className={styles.stage} style={delay(phase)}>
                  <path d={d} pathLength={100} className={styles.pulse} />
                  {phase === 0 && <path d={d} pathLength={100} className={`${styles.pulse} ${styles.late}`} />}
                </g>
              ))}
              <path d={EGRESS} pathLength={100} className={styles.egress} />

              <circle cx={CX} cy={CY} r={R} fill="#05090f" stroke="#6684a6" strokeOpacity=".6" />
              <g className="rb-loop-arrow" style={{ "--cx": `${CX}px`, "--cy": `${CY}px` } as CSSProperties}>
                <circle cx={CX} cy={CY} r={R} pathLength="1" stroke="#65aaff" strokeWidth="2" strokeDasharray=".22 .78" strokeDashoffset=".22" />
                <path d={`M${CX + R - 5} ${CY - 5} L${CX + R} ${CY + 3} L${CX + R + 5} ${CY - 5}`} stroke="#c8e4ff" strokeWidth="2" />
              </g>
            </svg>

            <span className={`${styles.tag} ${styles.boundaryTag}`}><Lock />Your cloud · vpc-prod · ap-south-1</span>
            <span className={`${styles.tag} ${styles.egressTag}`}><Ban />Egress · 0 B</span>

            {stages.map((stage) => {
              const [x, y] = at(stage.deg, R);
              return <span key={stage.word} className={styles.stageLabel} style={{ left: `${x / 8.6}%`, top: `${y / 6.6}%`, ...delay(stage.d) }}>{stage.word}</span>;
            })}
            <div className={styles.ringCenter}>
              {stages.map((stage, i) => <div key={stage.word} className={`${styles.stageCaption} ${i === 0 ? "is-first" : ""}`}><div className="rb-word" style={delay(stage.d)}><p>{stage.caption}</p></div></div>)}
            </div>

            <div className={`${styles.block} ${styles.indexBlock}`}>
              <div className={styles.stage} style={delay(0)}>
                <div className={styles.blockHead}>Indexing · Drive · Postgres · Slack</div>
                <div className={styles.tiles}>{tiles.map((d) => <i key={d} style={delay(d)} />)}</div>
                <div className={styles.labelled}>
                  <div><span>labelled</span><span><b>1,204</b> / 5,000</span></div>
                  <div className={styles.bar}><span /></div>
                </div>
              </div>
            </div>

            <div className={`${styles.block} ${styles.weightsBlock}`}>
              <div className={styles.stage} style={delay(-8)}>
                <div className={styles.blockHead}><Lock />Weights · private-v1</div>
                <div className={styles.weights}>{weights.map(({ o, d }, i) => <i key={i} style={{ "--o": o.toFixed(2), ...delay(d) } as CSSProperties} />)}</div>
                <div className={styles.stats}><span>epoch <b>12/20</b></span><span>loss <b className={styles.blue}>0.18 ↘</b></span></div>
              </div>
              <div className={styles.note}><KeyRound />Only you hold the weights</div>
            </div>

            <div className={`${styles.block} ${styles.logBlock}`}>
              <div className={styles.stage} style={delay(-4)}>
                <div className={styles.blockHead}><i className={styles.live} />support-agent · live</div>
                <div className={styles.logWindow}>
                  <div className={styles.logLines}>
                    {[...logLines, ...logLines].map((line, i) => <div key={i}>{line}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
