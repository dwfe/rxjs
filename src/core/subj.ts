import {IStoppable} from '@do-while-for-each/common'
import {filter, firstValueFrom, Observable, share, shareReplay, startWith, Subject, takeUntil} from '../re-export'
import {ISubjOpt} from './contract'
import {Stopper} from './stopper'

export class Subj<TData = any> implements IStoppable {

  subj: Subject<TData>
  value$: Observable<TData>
  lastValue!: TData
  stopper = new Stopper()

  constructor(opt: ISubjOpt<TData> = {type: 'noShare'}) {
    this.subj = new Subject()
    this.value$ = this.createValue$(opt)
  }

  setValue(value: TData): void {
    this.lastValue = value
    this.subj.next(value)
  }

  private createValue$({type, bufferSize, startValue}: ISubjOpt<TData>): Observable<TData> {
    if (type === 'shareReplay' && bufferSize === 0)
      throw new Error('Instead of "shareReplay({refCount: false/true, bufferSize: 0})", use "share()" operator');

    let ob$ = this.subj.asObservable();

    if (startValue !== undefined) {
      this.lastValue = startValue;
      ob$ = ob$.pipe(
        startWith(startValue)
      );
    }
    ob$ = ob$.pipe(
      takeUntil(this.stopper.ob$), // it here because the Source is this.subj
    );
    switch (type) {
      case 'noShare':
        return ob$;
      case 'share':
        return ob$.pipe(
          share()
        );
      case 'shareReplay':
        return ob$.pipe(
          shareReplay({refCount: true, bufferSize: bufferSize ?? 1})
        );
      default:
        throw new Error(`Unknown subj type "${type}"`);
    }
  }

  stop(): void {
    this.stopper.stop()
    this.subj.complete()
  }


//region Future
  /**
   * It may be necessary to wait for a value that does not exist yet, but it is expected in the future
   */

  nextValuePromise = (): Promise<TData> => firstValueFrom(this.value$);

  nextNonNullableValuePromise = (): Promise<NonNullable<TData>> =>
    firstValueFrom(this.value$.pipe(
        filter(x => !(x === null || x === undefined)),
      ) as Observable<NonNullable<TData>>
    );

  nonNullableValuePromise = async (): Promise<NonNullable<TData>> =>
    this.lastValue ?? this.nextNonNullableValuePromise()
  ;

//endregion Future

}
