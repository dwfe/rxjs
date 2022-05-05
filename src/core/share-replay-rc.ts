import {MonoTypeOperatorFunction} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

/**
 * shareReplay + refCount
 */
export function shareReplayRC<T>(bufferSize = 1): MonoTypeOperatorFunction<T> {
  return shareReplay({bufferSize, refCount: true});
}
