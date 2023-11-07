import { NextResponse } from "next/server";

type JsonResponse = {
  code: number;
  message: string;
  data: unknown;
};
/**
 * @description: Make json NextResponse, the HTTP response status code will be 200.
 * @param json JsonResponse
 * @return NextResponse
 */
export function MakeNextJsonResponse(json: JsonResponse) {
  return NextResponse.json(json);
}

export function MakeNextRedirectResponse(
  url: string | URL,
  init?: number | ResponseInit
) {
  return NextResponse.redirect(url, init);
}

/**
 * @description: The HTTP response status code will be 400.
 * @param message string
 * @return NextResponse
 */
export const BadRequestException = (message: string) =>
  MakeNextResponse(400, message);
/**
 * @description: The HTTP response status code will be 401.
 * @param message string
 * @return NextResponse
 */
export const UnauthorizedException = (message: string) =>
  MakeNextResponse(401, message);
/**
 * @description: The HTTP response status code will be 402.
 * @param message string
 * @return NextResponse
 */
export const PaymentRequiredException = (message: string) =>
  MakeNextResponse(402, message);
/**
 * @description: The HTTP response status code will be 403.
 * @param message string
 * @return NextResponse
 */
export const ForbiddenException = (message: string) =>
  MakeNextResponse(403, message);
/**
 * @description: The HTTP response status code will be 404.
 * @param message string
 * @return NextResponse
 */
export const NotFoundException = (message: string) =>
  MakeNextResponse(404, message);
/**
 * @description: The HTTP response status code will be 405.
 * @param message string
 * @return NextResponse
 */
export const MethodNotAllowedException = (message: string) =>
  MakeNextResponse(405, message);
/**
 * @description: The HTTP response status code will be 406.
 * @param message string
 * @return NextResponse
 */
export const NotAcceptableException = (message: string) =>
  MakeNextResponse(406, message);
/**
 * @description: The HTTP response status code will be 407.
 * @param message string
 * @return NextResponse
 */
export const ProxyAuthenticationRequiredException = (message: string) =>
  MakeNextResponse(407, message);
/**
 * @description: The HTTP response status code will be 408.
 * @param message string
 * @return NextResponse
 */
export const RequestTimeoutException = (message: string) =>
  MakeNextResponse(408, message);
/**
 * @description: The HTTP response status code will be 409.
 * @param message string
 * @return NextResponse
 */
export const ConflictException = (message: string) =>
  MakeNextResponse(409, message);
/**
 * @description: The HTTP response status code will be 410.
 * @param message string
 * @return NextResponse
 */
export const GoneException = (message: string) =>
  MakeNextResponse(410, message);
/**
 * @description: The HTTP response status code will be 411.
 * @param message string
 * @return NextResponse
 */
export const LengthRequiredException = (message: string) =>
  MakeNextResponse(411, message);
/**
 * @description: The HTTP response status code will be 412.
 * @param message string
 * @return NextResponse
 */
export const PreconditionFailedException = (message: string) =>
  MakeNextResponse(412, message);
/**
 * @description: The HTTP response status code will be 413.
 * @param message string
 * @return NextResponse
 */
export const PayloadTooLargeException = (message: string) =>
  MakeNextResponse(413, message);
/**
 * @description: The HTTP response status code will be 414.
 * @param message string
 * @return NextResponse
 */
export const URITooLongException = (message: string) =>
  MakeNextResponse(414, message);
/**
 * @description: The HTTP response status code will be 415.
 * @param message string
 * @return NextResponse
 */
export const UnsupportedMediaTypeException = (message: string) =>
  MakeNextResponse(415, message);
/**
 * @description: The HTTP response status code will be 416.
 * @param message string
 * @return NextResponse
 */
export const RangeNotSatisfiableException = (message: string) =>
  MakeNextResponse(416, message);
/**
 * @description: The HTTP response status code will be 417.
 * @param message string
 * @return NextResponse
 */
export const ExpectationFailedException = (message: string) =>
  MakeNextResponse(417, message);
/**
 * @description: The HTTP response status code will be 418.
 * @param message string
 * @return NextResponse
 */
export const ImATeapotException = (message: string) =>
  MakeNextResponse(418, message);
/**
 * @description: The HTTP response status code will be 421.
 * @param message string
 * @return NextResponse
 */
export const MisdirectedException = (message: string) =>
  MakeNextResponse(421, message);
/**
 * @description: The HTTP response status code will be 422.
 * @param message string
 * @return NextResponse
 */
export const UnprocessableEntityException = (message: string) =>
  MakeNextResponse(422, message);
/**
 * @description: The HTTP response status code will be 423.
 * @param message string
 * @return NextResponse
 */
export const LockedException = (message: string) =>
  MakeNextResponse(423, message);
/**
 * @description: The HTTP response status code will be 424.
 * @param message string
 * @return NextResponse
 */
export const FailedDependencyException = (message: string) =>
  MakeNextResponse(424, message);
/**
 * @description: The HTTP response status code will be 425.
 * @param message string
 * @return NextResponse
 */
export const TooEarlyException = (message: string) =>
  MakeNextResponse(425, message);
/**
 * @description: The HTTP response status code will be 426.
 * @param message string
 * @return NextResponse
 */
export const UpgradeRequiredException = (message: string) =>
  MakeNextResponse(426, message);
/**
 * @description: The HTTP response status code will be 428.
 * @param message string
 * @return NextResponse
 */
export const PreconditionRequiredException = (message: string) =>
  MakeNextResponse(428, message);
/**
 * @description: The HTTP response status code will be 429.
 * @param message string
 * @return NextResponse
 */
export const RequestHeaderFieldsTooLargeException = (message: string) =>
  MakeNextResponse(429, message);
/**
 * @description: The HTTP response status code will be 431.
 * @param message string
 * @return NextResponse
 */
export const TooManyRequestsException = (message: string) =>
  MakeNextResponse(431, message);
/**
 * @description: The HTTP response status code will be 451.
 * @param message string
 * @return NextResponse
 */
export const UnavailableForLegalReasonsException = (message: string) =>
  MakeNextResponse(451, message);

/**
 * @description: The HTTP response status code will be 500.
 * @param message string
 * @return NextResponse
 */
export const InternalServerErrorException = (message: string) =>
  MakeNextResponse(500, message);
/**
 * @description: The HTTP response status code will be 501.
 * @param message string
 * @return NextResponse
 */
export const NotImplementedException = (message: string) =>
  MakeNextResponse(501, message);
/**
 * @description: The HTTP response status code will be 502.
 * @param message string
 * @return NextResponse
 */
export const BadGatewayException = (message: string) =>
  MakeNextResponse(502, message);
/**
 * @description: The HTTP response status code will be 503.
 * @param message string
 * @return NextResponse
 */
export const ServiceUnavailableException = (message: string) =>
  MakeNextResponse(503, message);
/**
 * @description: The HTTP response status code will be 504.
 * @param message string
 * @return NextResponse
 */
export const GatewayTimeoutException = (message: string) =>
  MakeNextResponse(504, message);
/**
 * @description: The HTTP response status code will be 505.
 * @param message string
 * @return NextResponse
 */
export const HttpVersionNotSupportedException = (message: string) =>
  MakeNextResponse(505, message);
/**
 * @description: The HTTP response status code will be 506.
 * @param message string
 * @return NextResponse
 */
export const VariantAlsoNegotiatesException = (message: string) =>
  MakeNextResponse(506, message);
/**
 * @description: The HTTP response status code will be 507.
 * @param message string
 * @return NextResponse
 */
export const InsufficientStorageException = (message: string) =>
  MakeNextResponse(507, message);
/**
 * @description: The HTTP response status code will be 508.
 * @param message string
 * @return NextResponse
 */
export const LoopDetectedException = (message: string) =>
  MakeNextResponse(508, message);
/**
 * @description: The HTTP response status code will be 509.
 * @param message string
 * @return NextResponse
 */
export const BandwidthLimitExceededException = (message: string) =>
  MakeNextResponse(509, message);
/**
 * @description: The HTTP response status code will be 510.
 * @param message string
 * @return NextResponse
 */
export const NotExtendedException = (message: string) =>
  MakeNextResponse(510, message);
/**
 * @description: The HTTP response status code will be 511.
 * @param message string
 * @return NextResponse
 */
export const NetworkAuthenticationRequiredException = (message: string) =>
  MakeNextResponse(511, message);

function MakeNextResponse(code: number, message: string) {
  return NextResponse.json({ code, message }, { status: code });
}
