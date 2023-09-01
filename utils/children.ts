import { ComponentChildren } from "preact";

export type PropsWithChildren<T> = { children: ComponentChildren } & T;
export type PropsWithOptionalChildren<T> = { children?: ComponentChildren } & T;
