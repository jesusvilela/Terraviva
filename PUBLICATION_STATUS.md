# Publication checkpoint — source transfer incomplete

This branch preserves the completed Terraviva data/report/sensor implementation and the source fragments successfully uploaded before the execution workspace disconnected on 17 October 2026.

**This is a staging checkpoint. It is not a complete, fresh-checkout build or a deployed production release.**

## Completed before the interruption

- Recovered and fully analysed 28 source CSV files: 566,600,488 original bytes, 1,754,685 source-table rows and 804 field occurrences.
- Prepared a self-contained HTML report and a portable SQLite delivery containing every retrieved source row.
- Implemented the complete paginated reference browser and authenticated farmer/device sensor collection.
- Verified original CSV hashes, every generated reference row, the SQLite contents, the report checksum, clean and cached builds, 14 JavaScript test files and 40 Python tests.
- Uploaded all application, pipeline, report source, documentation and test files.
- Uploaded and verified source archive fragments 0001–0081.

## Blocking publication

The execution service returned HTTP 409 `environment_offline`: **Environment is not connected.** The remaining local source bytes could not be read for upload.

The manifest expects **111 fragments**. This checkpoint contains **81 confirmed fragments**, totalling 40,500,000 bytes. Parts **0082–0111**, totalling 14,962,120 bytes, still need to be confirmed and added. A fresh checkout intentionally fails source preparation while these parts are missing. Automatic branch builds may therefore fail until transfer is complete.

The upload map is in [data/source-bundle/upload-checkpoint.json](data/source-bundle/upload-checkpoint.json). The source/member SHA-256 hashes and complete expected inventory are in [data/source-bundle/manifest.json](data/source-bundle/manifest.json).

## Saved deliveries

The separately delivered files are complete for the 28 retrieved sources:

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| Terraviva_Data_Report.html | 2,291,654 | `604a7d58ee0f41e006ab59a90ed3fb7a0b9badb3241010d2b3c6ad9e2322c833` |
| Terraviva_Reference_Data_SQLite.zip | 124,597,297 | `2995fbdaf879b29704db2b3dbf5e1a8958f6512e43ce369d665fbe19e724336e` |

The report records 44 additional observed filenames whose contents were not retrieved. The original ZIP's full inventory and checksum are unknown.

## Resume publication

1. Reconnect the execution workspace and recover its existing verified files and release manifest.
2. Reconcile any unrecorded immutable blobs from the interrupted batch, then upload the remaining confirmed source parts against the manifest hashes.
3. Construct the release tree from the prepared code tree `639b2c7103d5856faf2d4040fa36649c69c622f2` and all 111 source fragments. That clean tree excludes this checkpoint notice, its README banner and the upload ledger. The intended release has 187 files.
4. Verify the remote file inventory and Git blob hashes against the tested release manifest. Inspect the latest main branch before creating/updating its release commit.
5. Run the repository's documented verification gates if any source changes, publish the complete release, and check GitHub CI, Vercel and the live reference/sensor pages.

The source code was tested with the complete local bundle before the workspace went offline. That verification does not establish that this incomplete staging checkout or a future deployment has passed.

## Sensor connection status

The device ingestion interface and farmer view are implemented. No physical sensor or provider account has been enrolled. Live ingestion requires the documented Redis/encryption configuration and device credentials; see [docs/sensors.md](docs/sensors.md).
