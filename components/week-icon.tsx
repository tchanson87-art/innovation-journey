import {
  Compass,
  Sparkles,
  HeartHandshake,
  Megaphone,
  Smartphone,
  Palette,
  Footprints,
  Award,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const map: Record<string, LucideIcon> = {
  compass: Compass,
  sparkles: Sparkles,
  'heart-handshake': HeartHandshake,
  megaphone: Megaphone,
  smartphone: Smartphone,
  palette: Palette,
  footprints: Footprints,
  award: Award,
}

export function WeekIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Compass
  return <Icon className={cn('size-6', className)} aria-hidden="true" />
}
