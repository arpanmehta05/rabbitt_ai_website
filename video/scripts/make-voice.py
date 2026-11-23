"""Records the showreel's narration: one clip per on-screen line, read by a Microsoft natural voice
through the edge-tts package, then converted to WAV for scripts/make-audio.mjs to place on the
timeline. The text is sent to Microsoft's online read-aloud service.

    .venv/Scripts/python scripts/make-voice.py     ->  voice/*.wav

Run it from the video folder. Change VOICE or a line below, run this, then make-audio.mjs, then render.
"""

import asyncio
import pathlib
import subprocess

import edge_tts

VOICE = "en-US-AndrewMultilingualNeural"  # warm, confident: the magician
RATE = "+12%"

# (file name, what is said). The timing is set in make-audio.mjs.
LINES = [
    ("01-trick", "Want to see a trick?"),
    ("02-eye", "Keep your eye on the hat."),
    ("03-in", "Your data goes in."),
    ("04-out", "Your A.I. comes out."),
    ("05-leaves", "And nothing leaves the hat."),
    ("06-bytes", "Zero bytes, sent outside your cloud."),
    ("07-card", "Pick a card."),
    ("08-six", "Six products. Six services. One private cloud."),
    ("09-smoke", "No smoke. No mirrors."),
    ("10-cloud", "Just your cloud."),
    ("11-name", "Rabbit A.I."),
]

OUT = pathlib.Path(__file__).resolve().parent.parent / "voice"


async def main() -> None:
    OUT.mkdir(exist_ok=True)
    for name, text in LINES:
        mp3 = OUT / f"{name}.mp3"
        # the service now and then returns nothing; try a few times
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(mp3))
                break
            except edge_tts.exceptions.NoAudioReceived:
                if attempt == 3:
                    raise
                await asyncio.sleep(1.5)
        wav = OUT / f"{name}.wav"
        subprocess.run(
            ["npx", "remotion", "ffmpeg", "-y", "-loglevel", "error", "-i", str(mp3), "-ar", "44100", "-ac", "1", "-c:a", "pcm_s16le", str(wav)],
            check=True,
            shell=True,
            cwd=OUT.parent,
        )
        mp3.unlink()
        print("recorded", wav.name, "-", text)


asyncio.run(main())
