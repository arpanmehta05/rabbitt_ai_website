import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Hat } from "./hat";
import { Stage } from "./Stage";
import { C, SCENES, fontFamily } from "./theme";
import { S1Trick } from "./scenes/S1Trick";
import { S2DataIn } from "./scenes/S2DataIn";
import { S3AiOut } from "./scenes/S3AiOut";
import { S4Stays } from "./scenes/S4Stays";
import { S5Cards } from "./scenes/S5Cards";
import { S6Close } from "./scenes/S6Close";

// "The hat trick": a 30-second showreel for the landing page, rendered to MP4. The Rabbitt logo (a
// rabbit in a magician's hat) is the one character: data goes into the hat, AI comes out, nothing
// leaves, and it deals the products like cards. It is muted and loops: the first and last frames are
// black. Both cuts (16:9 and 9:16) come from this one timeline.
const PARTS = [
  [SCENES.trick, S1Trick],
  [SCENES.dataIn, S2DataIn],
  [SCENES.aiOut, S3AiOut],
  [SCENES.stays, S4Stays],
  [SCENES.cards, S5Cards],
  [SCENES.close, S6Close],
] as const;

export function Showreel() {
  return (
    <AbsoluteFill style={{ background: C.stage, fontFamily, color: C.white, WebkitFontSmoothing: "antialiased" }}>
      <Stage />
      {/* the narration over the sound effects, made by scripts/make-voice.py and scripts/make-audio.mjs */}
      <Audio src={staticFile("showreel-audio.wav")} />
      {PARTS.map(([[from, duration], Scene], i) => (
        <Sequence key={i} from={from} durationInFrames={duration} premountFor={10}>
          <Scene duration={duration} from={from} />
        </Sequence>
      ))}
      <Hat />
    </AbsoluteFill>
  );
}
