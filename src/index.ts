export type MaybePromise<T> = T | Promise<T>;
export type AnyRecord = Record<string, any>;
export type AnyOperation = Operation<any, any>;
export type AnyFunction = (...args: any[]) => any;
export type OperationsRecord = Record<string, AnyFunction>;
export type LogMessage =
  | string
  | Record<string, any>
  | any[]
  | number
  | boolean;
export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export type Middleware<TOperations extends Record<string, AnyOperation>> = (
  context: Context<TOperations[keyof TOperations]>,
  middlewareContext: AnyRecord
) => MaybePromise<Context<TOperations[keyof TOperations]>>;

export type OperationsMapSomeRequied<
  RequiredOperations extends Record<string, AnyFunction>,
> = OperationsRecord & RequiredOperations;

export type OperationHandler<TOperation extends Operation<any, any>> = (
  input: TOperation[0],
  context?: Context<TOperation>
) => TOperation[1];

export type Operation<TInput, TOutput> = [
  input: TInput,
  output: MaybePromise<TOutput>,
];

export type OperationPayload<
  TMap extends OperationsRecord,
  TKey extends keyof TMap,
> = Parameters<TMap[TKey]>[0];

export type OperationReturnType<
  TMap extends OperationsRecord,
  TKey extends keyof TMap,
> = ReturnType<TMap[TKey]>;

export type OperationsMap<TMap extends OperationsRecord> = Record<
  keyof TMap,
  Operation<
    Parameters<TMap[keyof TMap]>[0],
    Awaited<ReturnType<TMap[keyof TMap]>>
  >
>;

export type WorkerProcess = {
  newKey?: boolean;
  importKey?: boolean;
  messageReceived?: boolean;
  messageRead?: boolean;
  processFinished?: boolean;
};

export interface SocketPayload<TBody = AnyRecord, TReturn = AnyRecord> {
  body: TBody;
  queryId?: string;
  process?: string;
  promiseId?: string;
  error?: string;
  callback?: (payload: SocketPayload<TReturn>) => Promise<void> | void;
  workerProcess?: WorkerProcess;
  sender?: string;
  receiver?: string;
  sent?: Date;
  reached?: Date;
  read?: Date;
}

export type Context<TBody = AnyRecord, TReturn = AnyRecord> = {
  channel?: "rest" | "socket";
  payload?: SocketPayload<TBody, TReturn>;
  secure?: boolean;
  middleware?: boolean;
} & AnyRecord;

export type UserBase = {
  userName: string;
  firstName: string;
  lastName: string;
} & AnyRecord;

export interface SecureSocketOperations extends OperationsRecord {
  //@ts-expect-error
  messageNotSend?: (payload: SocketPayload<any>) => void;
  //@ts-expect-error
  messageHandler?: (payload: SocketPayload<any>) => void;
  //@ts-expect-error
  socketConnected?: () => void;
  //@ts-expect-error
  socketReady?: () => void;
  //@ts-expect-error
  socketDisconnect?: (reason: string) => void;
  //@ts-expect-error
  socketError?: (reason: string) => void;
  //@ts-expect-error
  login?: (userName: string, pass: string) => MaybePromise<void>;
  //@ts-expect-error
  logout?: () => MaybePromise<void>;
}
export interface SecureFetchApiOperations extends OperationsRecord {
  getRefreshToken: () => MaybePromise<string>;
  saveRefreshToken: (token: string) => MaybePromise<void>;
  //@ts-expect-error
  readyToFetch?: () => void;
}

export type ConsumerOperations = {
  sendMessage: (args: {
    payload: SocketPayload<AnyRecord | string>;
    encrypt?: boolean;
  }) => Promise<string | undefined>;
  exchangeKey: (args: { receiver: string; queryId: string }) => Promise<true>;
};

export interface SecureSocketOptions<
  TOperations extends SecureSocketOperations,
> {
  socketUrl?: string;
  authUrl?: string;
  token?: string;
  operations?: TOperations;
  logLevel?: LogLevel;
}

export type AuthResponse = {
  status: string;
  process?: string;
  error?: string;
  data?: string;
  queryToken?: string;
  validationToken?: string;
  accessToken?: string;
  refreshToken?: string;
  expiryDate?: string;
  userData?: Record<string, unknown>;
  serverPublicKey?: string;
};

export type AccessTokenResponse = {
  status: string;
  process?: string;
  error?: string;
  accessToken: string;
  refreshToken: string;
  expiryDate: string;
  bearerToken: string;
};
export type HttpPayload = {
  sender: string;
  receiver: string;
  queryId: string;
} & (
  | {
      // TODO: Update the payload structure to allow using `MecraProcess` as `wfx`
      wfx: "importKey";
      message: string;
    }
  | {
      wfx?: never;
      message?: string;
    }
);

export type EventListener<T extends OperationsRecord, K extends keyof T> = (
  value: OperationsMap<T>[K][0]
) => OperationsMap<T>[K][1];

export interface BotOptions<TOperationsRecord extends OperationsRecord> {
  name: string;
  socketUrl?: string;
  authUrl?: string;
  restApiPort?: number;
  operations: TOperationsRecord;
  operationBundles?: Record<string, string>;
  middleware?: Middleware<OperationsMap<OperationsRecord>>[];
  logLevel?: LogLevel;
  socketToken?: string;
}
export interface Rule {
  id: number;
  name?: string;
  side?: string;
  priority: number;
  type: string;
  operation: string;
  kind: string;
  protocol?: string;
  role?: string;
  domain?: string;
  list?: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
}

export interface User extends UserBase {
  role?: string;
}

export interface UserGroup {
  id: number;
  name: string;
}

export interface OperationBundle {
  id: number;
  name: string;
  bundlePath: string;
  status: boolean;
}
