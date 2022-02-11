import {IStoppable} from '@do-while-for-each/common'
import {share, Subject} from '../re-export'

export class Stopper implements IStoppable {

  subj = new Subject<boolean>()

  ob$ = this.subj.asObservable().pipe(
    share()
  )

  stop(): void {
    this.subj.next(true)
    this.subj.complete()
  }

}
