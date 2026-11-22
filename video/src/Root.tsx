import { Composition } from "remotion";
import { Showreel } from "./Showreel";
import { FPS, TOTAL } from "./theme";

export function Root() {
  return (
    <>
      <Composition id="Showreel" component={Showreel} durationInFrames={TOTAL} fps={FPS} width={1920} height={1080} />
      <Composition id="ShowreelVertical" component={Showreel} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
    </>
  );
}
