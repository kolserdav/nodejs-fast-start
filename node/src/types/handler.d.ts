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
    received: LangValue
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

export { HandlerInterface, ResultType, LangType }