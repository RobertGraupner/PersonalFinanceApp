import { IPot } from '@/lib/models/Pot';

export type FormModalType = 'add' | 'edit';
export type MoneyOperationType = 'addMoney' | 'withdraw';
export type DeleteModalType = 'delete';
export type ModalType = FormModalType | MoneyOperationType | DeleteModalType;

export interface BaseModalState {
  type: ModalType;
  pot: IPot | null;
}

export interface FormModalState {
  type: FormModalType;
  pot: IPot | null;
}

export interface MoneyOperationModalState {
  type: MoneyOperationType;
  pot: IPot;
}

export interface DeleteModalState {
  type: DeleteModalType;
  pot: IPot;
}

export type ModalState =
  | {
      type: null;
      pot: null;
    }
  | FormModalState
  | MoneyOperationModalState
  | DeleteModalState;

export interface MoneyOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  isProcessing: boolean;
  type: 'addMoney' | 'withdraw';
  pot: IPot;
  userBalance: number;
}

export interface PotFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<IPot>) => void;
  isLoading: boolean;
  type: 'add' | 'edit';
  pot: IPot | null;
}

export type FormData = {
  name: string;
  target: string;
  theme: string;
};

export interface PotsListProps {
  pots: IPot[];
  onAction: (type: ModalType, pot: IPot) => void;
}

export interface PotProgressProps {
  pot: IPot;
}

export interface PotHeaderProps {
  pot: IPot;
}

export interface PotCardProps {
  pot: IPot;
  onAction: (type: ModalType, pot: IPot) => void;
}

export interface PotActionsProps {
  pot: IPot;
  onAction: (type: ModalType, pot: IPot) => void;
}

export interface PotProgressBarProps {
  baseProgressPercentage: number;
  progressWidth: number;
  changeWidth: number;
  type: 'addMoney' | 'withdraw';
  numericAmount: number;
}
