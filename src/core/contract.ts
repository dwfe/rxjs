export type TSubjType =
  'noShare' |
  'share' |      // share()
  'shareReplay'; // shareReplay({refCount: true, bufferSize})

export interface ISubjOpt<TData> {
  type?: TSubjType;
  bufferSize?: number;
  initValue?: TData;
}
