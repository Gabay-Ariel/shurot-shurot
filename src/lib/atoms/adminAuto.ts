import { atom } from "jotai";
import { Admin } from "../types/admin";

export const adminAutoAtom = atom<Admin | null>(null);
