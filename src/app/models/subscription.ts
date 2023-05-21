interface Keys {
  p256dh: string;
  auth: string;
}
export class Subscription {
  constructor(
    public endpoint: string,
    public expirationTime: string,
    public keys: Keys
  ) {}
}
