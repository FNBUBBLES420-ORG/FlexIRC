# FlexIRC Release Notes

## Version 0.0.16

Release date: June 9, 2026

## Summary

FlexIRC `0.0.16` is a dependency security update release. This update refreshes core runtime and desktop packaging dependencies, aligns the lockfile with the current package set, and keeps the project ready for continued server and Electron packaging work.

## Highlights

- Updated runtime dependencies to newer secure versions
- Updated Electron and build tooling dependencies
- Kept project versioning aligned in `package.json` and `package-lock.json`
- Refreshed repository documentation for the current release


## Project status in this release

- Package version: `0.0.16`
- License: `MIT`
- Main server entry point: `comprehensive-server.js`
- Desktop app entry point: `main.js`

## Recommended verification

- Run `npm start` to verify the main server boots correctly
- Run `npm run electron` to verify the desktop launcher still works
- Run `npm run build-win` to verify Windows packaging

## Notes

- This release includes major-version jumps in packages such as `express`, `uuid`, `bcrypt`, and `electron`.
- A smoke test is recommended before publishing installers or binaries.
- Internal update details are also tracked in [VERSION_UPDATES.md](./VERSION_UPDATES.md).
