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

  /**
   * It may be necessary to wait for a value that does not exist yet, but it is expected in the future
   */
  value = (): Promise<TData> => firstValueFrom(this.value$);

  existedValue = (): Promise<TData> =>
    firstValueFrom(this.value$.pipe(
      filter(x => !!x),
    ));

  stop(): void {
    this.stopper.stop()
    this.subj.complete()
  }


  private createValue$({type, bufferSize, initValue}: ISubjOpt<TData>): Observable<TData> {
    if (type === 'shareReplay') {
      switch (bufferSize) {
        case 0:
          throw new Error(`instead of 'shareReplay({refCount: false/true, bufferSize: 0})', use 'share()' operator`);
        case undefined:
          throw new Error(`undefined bufferSize for subj type '${type}'`);
      }
    }
    let ob$ = this.subj.asObservable();

    if (initValue !== undefined) {
      this.lastValue = initValue;
      ob$ = ob$.pipe(
        startWith(initValue)
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
          shareReplay({refCount: true, bufferSize})
        );
      default:
        throw new Error(`unknown subj type '${type}'`);
    }
  }

}
