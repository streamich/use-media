import {DependencyList, EffectCallback} from 'react';

export type Effect = (effect: EffectCallback, deps?: DependencyList) => void;
export type MediaQueryObject = {[key: string]: string | number | boolean};
