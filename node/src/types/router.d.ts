type ResultType = 'success' | 'warning' | 'error';

type ResponseType = {
  result: ResultType
  status: number,
  message: string
  body: any
}

type HandlerType = {
  (req: any, res: any): any
}

interface RouterInterface {
  public handler: HandlerType
}

export { RouterInterface, ResponseType };