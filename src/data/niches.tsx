import { MdPrecisionManufacturing, MdBuild, MdCode, MdPsychology } from 'react-icons/md';
import type { IconType } from 'react-icons';

export const NICHE_ICONS: Record<string, IconType> = {
  'Mechatronics': MdPrecisionManufacturing,
  'Mechanical':   MdBuild,
  'Full Stack':   MdCode,
  'AI/ML':        MdPsychology,
};
