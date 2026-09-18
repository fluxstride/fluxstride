/*
 * Underline animations shared by every text link. All wipe along the ease-out-expo curve.
 *
 *   navUnderline      nav items: the line draws in from the left on hover and leaves to the
 *                     right; the current page (or section) keeps it drawn.
 *   textLinkUnderline "All case studies →": the resting line wipes out to the right, then a
 *                     new one draws back in from the left.
 *
 * The <UnderlineOnHover> component (ui/UnderlineOnHover.tsx) is the footer-link version.
 */

export function navUnderline(active: boolean) {
  return [
    'relative after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-current after:transition-transform after:duration-500 after:ease-out-expo',
    active
      ? 'after:scale-x-100'
      : 'after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100',
  ].join(' ')
}

export const textLinkUnderline = [
  'before:absolute before:inset-x-0 before:bottom-0 before:h-px before:origin-right before:bg-current before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-x-0',
  'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:delay-200 after:duration-500 after:ease-out-expo hover:after:scale-x-100',
].join(' ')
