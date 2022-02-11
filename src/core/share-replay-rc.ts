import {MonoTypeOperatorFunction} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

/**
 * shareReplay + refCount
 */
export function shareReplayRC<T>(bufferSize: number): MonoTypeOperatorFunction<T> {
  return shareReplay({bufferSize, refCount: true});
}
