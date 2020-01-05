interface ResponseMessage {
  success: boolean;
  error: string;
  data: any;
}

export default (
  success: boolean = true,
  error: string = "",
  data: any = null
): ResponseMessage => {
  return {
    success,
    error,
    data
  };
};
