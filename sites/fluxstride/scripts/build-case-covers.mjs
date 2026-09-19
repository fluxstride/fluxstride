// Builds the cover image a Work card shows for each real project.
//
//   pnpm assets:covers
//
// A cover is two pieces. The frame is designed in Pencil, one per project, in that
// client's own brand colours and typefaces (the `case-cover-*` frames in
// fluxstride.pen, exported at 2x to images/covers/cover-frame-<key>.png). The screen
// inside it is the live site, so the card stays proof rather than a logo on a panel.
// This script drops the current screenshot into the frame's empty slot.
//
// Run it after `pnpm shots:projects`, then `pnpm assets:images`. Recapturing a client
// site and re-running this is all it takes to refresh a cover.
//
// Redesigning a frame in Pencil: keep the Screen frame where it is, or change SLOT to
// match. Card crops run from 35/32 to 2/1, so anything that must survive every crop
// belongs inside x 330-2070, y 240-1360 of the 2400×1600 cover.
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'

const dir = process.env.DESIGN_IMAGES ?? join(homedir(), 'Documents', 'pencil designs', 'images')
const frames = join(dir, 'covers')

/** 3:2, the shape that crops safely to every card ratio. */
const WIDTH = 2400
const HEIGHT = 1600

/**
 * The empty screen inside the designed frame, in exported pixels: the Pencil "Screen"
 * frame (x 560, y 184, 640×432 at 1x) minus its 32px browser chrome, all doubled. It is the
 * shape of a 1440×900 viewport, so a capture drops in whole and no headline is cropped off.
 */
const SLOT = { left: 1120, top: 432, width: 1280, height: 800 }

const covers = {
  'cs-dexus-cover': { frame: 'cover-frame-dexus', shot: 'cs-dexus-home' },
  'cs-adunyato-cover': { frame: 'cover-frame-adunyato', shot: 'cs-adunyato-home' },
  'cs-fluxstride-cover': { frame: 'cover-frame-fluxstride', shot: 'cs-fluxstride-home' },
}

for (const [name, { frame, shot }] of Object.entries(covers)) {
  const framePath = join(frames, `${frame}.png`)
  if (!existsSync(framePath)) throw new Error(`Missing ${framePath}. Export the Pencil frame first.`)

  const { width, height } = await sharp(framePath).metadata()
  if (width !== WIDTH || height !== HEIGHT) {
    throw new Error(`${frame} is ${width}×${height}, expected ${WIDTH}×${HEIGHT}. Re-export it at 2x.`)
  }

  // Contain, not cover: the slot matches the capture, so this only scales it.
  const screen = await sharp(join(dir, `${shot}.png`))
    .resize({ width: SLOT.width, height: SLOT.height, fit: 'contain', position: 'top' })
    .toBuffer()

  await sharp(framePath)
    .composite([{ input: screen, left: SLOT.left, top: SLOT.top }])
    .png()
    .toFile(join(dir, `${name}.png`))
  console.log(`  ${name.padEnd(22)} ${frame} + ${shot}`)
}
