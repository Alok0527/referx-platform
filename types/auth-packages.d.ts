declare module 'bcryptjs' {
  export function hash(password: string, saltOrRounds: string | number): Promise<string>
  export function compare(password: string, hash: string): Promise<boolean>
}

declare module 'jsonwebtoken' {
  export interface SignOptions {
    expiresIn?: string | number
  }

  export function sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options?: SignOptions
  ): string

  export function verify(token: string, secretOrPublicKey: string): string | object
}
