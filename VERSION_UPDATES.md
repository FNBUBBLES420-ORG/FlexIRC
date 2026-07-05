# Package Version Updates

## 0.0.16 - Dependency Security Update

Release date: June 9, 2026

This release updates project dependencies to newer secure versions and refreshes the lockfile to keep the packaged app aligned with the current dependency set.

### Updated runtime dependencies

- `argon2` -> `^0.44.0`
- `bcrypt` -> `^6.0.0`
- `cors` -> `^2.8.6`
- `dompurify` -> `^3.4.8`
- `express` -> `^5.2.1`
- `express-session` -> `^1.18.1`
- `helmet` -> `^8.1.0`
- `hpp` -> `^0.2.3`
- `jsdom` -> `^29.1.1`
- `jsonwebtoken` -> `^9.0.3`
- `rate-limiter-flexible` -> `^11.2.0`
- `uuid` -> `^14.0.0`
- `validator` -> `^13.15.26`
- `ws` -> `^8.19.0`
- `xss` -> `^1.0.15`

### Updated development dependencies

- `electron` -> `^42.4.0`
- `electron-builder` -> `^26.15.2`
- `nodemon` -> `^3.1.7`

### Notes

- `package.json` and `package-lock.json` are both set to version `0.0.16`.
- This is a dependency maintenance and security-focused release.
- Because this update includes major-version jumps such as `express`, `uuid`, `bcrypt`, and `electron`, a quick smoke test is recommended before publishing installers.

### Suggested verification

- Start the app with `npm start`
- Launch the Electron shell with `npm run electron`
- Build the Windows package with `npm run build-win`
