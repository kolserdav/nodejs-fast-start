const logger = (type: string, message: string, data: any, stdErr: any) => {
  console.log(type, message, data, stdErr );
}

export default logger;