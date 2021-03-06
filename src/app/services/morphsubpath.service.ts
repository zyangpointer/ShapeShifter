import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CanvasType } from '../CanvasType';

/**
 * A simple service that broadcasts changes made during morph subpath mode.
 */
@Injectable()
export class MorphSubPathService {
  private readonly source = new BehaviorSubject<{}>({});
  private pairedSubPaths = new Set<number>();
  private currentUnpairedSubPath: Pair;

  reset() {
    this.pairedSubPaths = new Set();
    this.currentUnpairedSubPath = undefined;
    return this;
  }

  setCurrentUnpairedSubPath(source: CanvasType, subIdx: number) {
    this.currentUnpairedSubPath = { source, subIdx };
    return this;
  }

  setPairedSubPaths(pairedSubPaths: Set<number>) {
    this.pairedSubPaths = new Set(pairedSubPaths);
    return this;
  }

  notify() {
    this.source.next({});
  }

  getPairedSubPaths() {
    return new Set(this.pairedSubPaths);
  }

  getCurrentUnpairedSubPath() {
    return this.currentUnpairedSubPath;
  }

  asObservable() {
    return this.source.asObservable();
  }
}

interface Pair { readonly source: CanvasType; readonly subIdx: number; }
