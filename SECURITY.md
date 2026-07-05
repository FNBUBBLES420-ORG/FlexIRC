# Security Policy

## Supported versions

Security fixes are currently intended for the latest published release only.

| Version | Supported |
|--------|-----------|
| `0.0.25` | Yes |
| Older versions | No |

If you are running an older release, upgrade to the latest version before reporting a security issue unless the problem prevents upgrading.

## Reporting a vulnerability

Please do not open a public GitHub issue for suspected security vulnerabilities.

Instead, report security issues privately with:

- a clear description of the issue
- affected version and environment
- reproduction steps or proof of concept
- potential impact
- any suggested mitigation if you already have one

If a private security contact address is added later, this file should be updated to point reporters there. Until then, use the repository owner or organization contact path and avoid posting exploit details publicly.

## What to include in a report

- FlexIRC version
- operating system
- whether the issue affects the browser client, Electron app, or server
- whether federation, SSL, or ultra security mode was enabled
- relevant logs with secrets removed

## Response goals

Best-effort targets for security reports:

- initial acknowledgement within 7 days
- validation and triage as quickly as possible
- a fix or mitigation plan for confirmed issues
- coordinated disclosure after a patch is available when practical

## Security features currently present

The current codebase includes several security-focused controls:

- password hashing with `argon2` or `bcrypt`
- optional JWT-based authentication flows
- optional TOTP 2FA with `speakeasy` and QR provisioning
- `helmet` security headers
- `cors` handling
- `hpp` protection for HTTP parameter pollution
- input sanitization and validation using `xss`, `validator`, `jsdom`, and `dompurify`
- rate limiting with `rate-limiter-flexible`
- optional self-signed HTTPS/WSS certificate generation
- security and chat logging in `logs/security.log` and `logs/chat.log`

## Deployment guidance

For safer deployments:

- keep dependencies up to date
- prefer the latest release from [GitHub Releases](https://github.com/FNBUBBLES420-ORG/FlexIRC/releases)
- enable SSL in environments where traffic should not be plaintext
- replace self-signed certificates with trusted certificates for public deployments
- restrict exposed ports and firewall access
- review `.env` values before sharing a packaged build
- avoid publishing secrets, tokens, or local certificates

## Scope notes

- `GET /health` exposes server status and enabled feature flags and should be reviewed before internet exposure
- federation features increase the trust surface between servers and should only be enabled with trusted peers
- Electron packaging should be smoke-tested after dependency or security-related updates

## Related documents

- [README.md](./README.md)
- [RELEASE.md](./RELEASE.md)
- [VERSION_UPDATES.md](./VERSION_UPDATES.md)
