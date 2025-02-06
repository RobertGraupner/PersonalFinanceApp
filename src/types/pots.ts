import { IPot } from '@/lib/models/Pot';
export interface ModalState {
  type: 'delete' | null;
  pot: IPot | null;
}
