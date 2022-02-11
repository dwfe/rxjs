import {animationFrameScheduler, asapScheduler, asyncScheduler, BehaviorSubject, combineLatest, firstValueFrom, fromEvent, interval, lastValueFrom, merge, Observable, of, queueScheduler, ReplaySubject, Subject, Subscription} from 'rxjs'
import {debounceTime, delay, distinctUntilChanged, filter, finalize, first, map, mapTo, mergeMap, multicast, pairwise, publish, publishReplay, scan, share, shareReplay, skip, startWith, switchMap, takeUntil, tap, throttleTime, withLatestFrom} from 'rxjs/operators'

export {
  Observable,
  Subscription,
  Subject,
  ReplaySubject,
  BehaviorSubject,
  of,
  fromEvent,
  combineLatest,
  merge,
  interval,

  tap,
  map,
  mapTo,
  filter,
  skip,
  first,
  distinctUntilChanged,
  switchMap,
  mergeMap,
  delay,
  debounceTime,
  throttleTime,
  takeUntil,
  withLatestFrom,
  startWith,
  pairwise,
  scan,
  finalize,

  firstValueFrom,
  lastValueFrom,

  multicast,
  publish,         // multicast(new Subject())
  share,           // multicast(() => new Subject()), refCount()
  publishReplay,   // multicast(new ReplaySubject())
  shareReplay,     // publishReplay(), refCount() - но с ньюансами

  asyncScheduler,          // Schedules on the macro task queue
  asapScheduler,           // Schedules on the micro task queue
  queueScheduler,          // Executes task synchronously but waits for current task to be finished
  animationFrameScheduler, // Relies on ‘requestAnimationFrame’
}
