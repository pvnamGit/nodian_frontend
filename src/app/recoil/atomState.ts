import { atom, selector } from 'recoil';
import { Note, Path, Repository } from '../types/types';

export const reposByOwnerState = atom<{ [key: number]: Repository } | null>({
  key: 'Repos',
  default: null,
});

export const currentRepoState = atom<Repository | null>({
  key: 'CurrentRepo',
  default: null,
});

export const newlyCreatedRepoState = atom<Repository | null>({
  key: 'newlyCreatedRepoState',
  default: null,
});

export const pathsByOwnerAndRepoState = atom<Path[] | null>({
  key: 'pathsByOwnerAndRepoState',
  default: [],
});

export const currentNote = atom<Note | null>({
  key: 'currentNote',
  default: null,
});

export const notesInRepo = atom<{ [key: number]: Note } | null>({
  key: 'notesInRepo',
  default: null,
});
