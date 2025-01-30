/** iOS */

export declare enum AppleError {
  /**
   * The authorization attempt failed for an unknown reason.
   */
  UNKNOWN = "1000",

  /**
   * The user canceled the authorization attempt.
   */
  CANCELED = "1001",

  /**
   * The authorization request received an invalid response.
   */
  INVALID_RESPONSE = "1002",

  /**
   * The authorization request wasn't handled.
   */
  NOT_HANDLED = "1003",

  /**
   * The authorization attempt failed.
   */
  FAILED = "1004",
}

export declare enum AppleRequestOperation {
  /**
   * An operation that depends on the particular kind of credential provider.
   */
  IMPLICIT = 0,

  /**
   * An operation used to authenticate a user.
   */
  LOGIN = 1,

  /**
   * An operation that refreshes the logged-in user’s credentials.
   */
  REFRESH = 2,

  /**
   * An operation that ends an authenticated session.
   */
  LOGOUT = 3,
}

export declare enum AppleRequestScope {
  /**
   * A scope that includes the user’s email address.
   */
  EMAIL = 0,

  /**
   * A scope that includes the user’s full name.
   */
  FULL_NAME = 1,
}

export declare enum AppleRealUserStatus {
  /**
   * Not supported on current platform, ignore the value.
   */
  UNSUPPORTED = 0,

  /**
   * Could not determine the value.
   *
   * New users in the ecosystem will get this value as well, so you should not blacklist but
   * instead treat these users as any new user through standard email sign up flows
   */
  UNKNOWN = 1,

  /**
   * A hint that there's high confidence that the user is real.
   */
  LIKELY_REAL = 2,
}

/**
 * Apple Authentication Request options to be used with `performRequest(requestOptions)`.
 */

/**
 * An optional full name shared by the user.
 *
 * These fields are populated with values that the user authorized.
 */
export interface AppleRequestResponseFullName {
  /**
   * Pre-nominal letters denoting title, salutation, or honorific, e.g. Dr., Mr.
   */
  namePrefix: string | null;

  /**
   * Name bestowed upon an individual by one's parents, e.g. Johnathan
   */
  givenName: string | null;

  /**
   * Secondary given name chosen to differentiate those with the same first name, e.g. Maple
   */
  middleName: string | null;

  /**
   * Name passed from one generation to another to indicate lineage, e.g. Appleseed
   */
  familyName: string | null;

  /**
   * Post-nominal letters denoting degree, accreditation, or other honor, e.g. Esq., Jr., Ph.D.
   */
  nameSuffix: string | null;

  /**
   * Name substituted for the purposes of familiarity, e.g. "Johnny"
   */
  nickname: string | null;
}

/**
 * A response from `performRequest(requestOptions)`.
 */
export interface AppleRequestResponse {
  /**
   * Nonce that was passed to the identity provider. If none was passed to the request, one will
   * have automatically been created and available to be read from this property, unless `nonceEnabled`
   * is false.
   * NOTE: This value will be SHA256 hashed before sending to Apple.
   */
  nonce: string;

  /**
   * An opaque user ID associated with the AppleID used for the sign in. This identifier will be
   * stable across the 'developer team', it can later be used as an input to
   * @{AppleAuthRequest} to request user contact information.
   *
   * The identifier will remain stable as long as the user is connected with the requesting client.
   * The value may change upon user disconnecting from the identity provider.
   */
  user: string;

  /**
   * An optional full name shared by the user.
   *
   * This field is populated with a value that the user authorized.
   *
   * See @{AppleRequestResponseFullName}
   */
  fullName: null | AppleRequestResponseFullName;

  /**
   * Check this property for a hint as to whether the current user is a "real user".
   *
   * See @{AppleRealUserStatus}
   */
  realUserStatus: AppleRealUserStatus;

  /**
   * This value will contain an array of scopes for which the user provided authorization.
   * Note that these may contain a subset of the requested scopes. You should query this value to
   * identify which scopes were returned as it may be different from ones you requested.
   *
   * See @{AppleRealUserStatus}
   */
  authorizedScopes: AppleRequestScope[];

  /**
   * A JSON Web Token (JWT) used to communicate information about the identity of the user in a
   * secure way to the app.
   *
   * The ID token contains the following information signed by Apple's identity service:
   *  - Issuer Identifier
   *  - Subject Identifier
   *  - Audience
   *  - Expiry Time
   *  - Issuance Time
   */
  identityToken: string | null;

  /**
   * An optional email shared by the user.
   *
   * This field is populated with a value that the user authorized.
   */
  email: string | null;

  /**
   * A copy of the state value that was passed to the initial request.
   */
  state: string | null;

  /**
   * A short-lived, one-time valid token that can provides proof of authorization to the server
   * component of your app.
   *
   * The authorization code is bound to the specific transaction using the state attribute passed
   * in the authorization request. The server component of your app can validate the code using
   * the Apple identity service endpoint.
   */
  authorizationCode: string | null;
}
