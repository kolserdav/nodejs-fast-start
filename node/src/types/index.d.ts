import Auth from "../middlewares/Auth"

interface ServerInterface {
  public startHttps: StartServer
  public start: StartServer
}

type LoggerDataType = {
  url: string,
  headers: any,
  data: any
}


type LoggerType = {
  (type: string, message: string, data: any, stdErr: any): void
}

type LangValue = {
  success: string,
  error: string,
  warning: string
}

type LangType = {
  user: {
    received: LangValue,
    create: LangValue,
    data: {
      password: {
        error: string,
        short: string
      },
      id: {
        error: string
      }
    },
    login: LangValue
  },
  redis: {
    received: LangValue,
    save: LangValue,
    del: LangValue
  },
  auth: {
    access: LangValue
  }
}

type GetLangType = {
  (lang: string): LangType
}

interface HandlerInterface {
  public success: ResultType
  public error: ResultType
  public warning: ResultType
  public logger: LoggerType
  public getLang: GetLangType
}

type ResultType = 'success' | 'warning' | 'error';

type ResponseType = {
  result: ResultType
  status: number,
  message: string
  body: any
}

type HandlerType = {
  (req: RequestType, res: any): Promise<ResponseType>
}

type HandlerMiddlewareType = {
  (req: RequestType, res: any, next: any): Promise<ResponseType>
}

interface MiddlewareInterface {
  public handler: HandlerMiddlewareType
}

interface RouterInterface {
  public handler: HandlerType
}

interface RequestType {
  lang: LangType,
  params: any,
  body: any,
  headers: any,
  url: string
}

type RegistrationData = {
  name: string,
  email: string,
  password: string,
  passwordRepeat: string,
  createTime: number,
  updateTime: number
}

export { 
  HandlerInterface, 
  ResultType, 
  RequestType,
  LangType, 
  RouterInterface, 
  ResponseType, 
  ServerInterface,
  LoggerDataType,
  MiddlewareInterface,
  RegistrationData
}