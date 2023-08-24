import { atom, selector } from 'recoil';
import { Repository } from '../types/types';

export const reposByOwnerState = atom<Repository[]>({
  key: 'Repos',
  default: [],
});

export const currentRepoState = atom<Repository | null>({
  key: 'CurrentRepo',
  default: null,
});

export const newlyCreatedRepoState = atom<Repository | null>({
  key: 'newlyCreatedRepoState',
  default: null,
});
