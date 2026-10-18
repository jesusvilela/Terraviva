# Terraviva

## A simple data wallet for the people who grow our food

Farmers are asked for more information every season: harvest records, sustainability evidence, sensor readings and compliance data. Too often, that means repeating the same work, losing sight of where information goes, and receiving little value in return.

Terraviva gives each farmer one clear place for their farm data. A farmer can add a harvest by text, see a useful summary of the farm, and choose who can use each part of the record. The result is less paperwork, better-quality information and more control for the person who created it.

> Your farm. Your data. Your choice.

[Open the live demo](https://terraviva-ruddy.vercel.app/?demo=ana) · [Explore the data browser](https://terraviva-ruddy.vercel.app/reference-data.html) · [View the data report](https://terraviva-ruddy.vercel.app/data-report.html)

## The farmer experience

Terraviva is designed to be understood at a glance, including by farmers who do not want another complicated app.

1. **Add my data** — Send a short harvest message, even when working away from a desk.
2. **My farm insights** — See saved harvests, totals and useful field context in one view.
3. **Who sees my data** — Give a trusted cooperative time-limited access, then stop sharing when needed.

The same journey can be supported by an advisor when a farmer prefers a human hand.

## What the wallet holds

- Harvest declarations with product, quantity, field and date.
- Sensor observations such as soil moisture, temperature and rainfall.
- Imported farm records with their original source and validation details.
- Permission history for cooperative access and future aggregated insights.
- A clear separation between the farmer’s private wallet and wider agricultural reference data.

Farmers can share the information needed for a specific purpose without giving away their whole relationship with the data.

## Text from the field

The SMS channel is the simplest way to capture a record when there is no time—or no reason—to open a full application.

Example:

```text
Farmer: Harvested 2 tonnes of wheat from North Field
Terraviva: I found 2 tonnes of wheat from North Field. Reply YES to save it.
Farmer: YES
Terraviva: Saved. Your farm wallet now has the latest harvest.
```

The demo includes a clearly labelled SMS conversation mock-up. When live messaging is enabled, provider credentials stay on the server and the channel uses farm-bound authentication, consent checks, E.164 phone validation, rate limits and replay protection. No real message is sent by the browser demo.

## Data that creates value without taking control away

Terraviva can use opt-in, aggregated data to return benchmarks and planning insight to participating farmers and their value-chain partners. Individual records remain protected, and small groups are withheld rather than presented as anonymous by assumption.

The product keeps three things separate:

- The farmer’s own dashboard.
- Time-limited sharing with a named partner.
- Optional aggregated analysis for wider industry insight.

That separation is the foundation of trust: sharing a harvest with a cooperative does not silently opt the farmer into commercial use.

## Agricultural reference data

The application includes a read-only reference library built from the supplied agricultural collection. It provides context such as farm area, crop type, wheat yield and organic status across a large farm-reporting table.

Reference data is shown as regional context. It is not silently assigned to a farmer’s wallet, and it does not replace a farmer’s own confirmed records.

## Built for real field conditions

- Large, plain-language actions and a short journey.
- Browser demo that works without an account or secret.
- Text-first capture for low-attention moments in the field.
- Local advisor support for farmers who prefer assisted use.
- Clear labels for illustrative, reference and private data.
- Sensor ingestion that preserves device, unit, observation time and source quality.
- Permission expiry and revocation rather than permanent access.

## Privacy and control

Terraviva treats farmer data as something the farmer should be able to understand and govern.

- Farmer records are kept separate from reference datasets.
- Partner views are scoped to the permission granted.
- Commercial participation is independent and off by default.
- Sensor credentials are bound to a farm and device on the server.
- SMS commands cannot create new recipients or enable commercial sharing.
- Connected storage encrypts farm state and rejects cross-farm access.

These controls support the product promise; they are not a claim that a demo is a complete production identity or compliance system.

## Product status

Terraviva is an end-to-end product prototype with:

- A farmer-facing wallet and simplified dashboard.
- Browser-based harvest capture and confirmation.
- Guarded SMS integration with Twilio-compatible server routes.
- Sensor gateway and farmer sensor views.
- Permissioned cooperative access with expiry and revocation.
- Read-only agricultural reference browsing and analysis.

Production rollout would add farmer identity, account recovery, operational monitoring, provider verification, formal consent contracts and durable retention policies.

## Run locally

Requires Node 22 or later and Python 3.11 or later.

```sh
npm run prepare:data
npm test
npm run build
npm start
```

Open `http://127.0.0.1:3000`. The browser demo stores changes on the device and does not send SMS.

For the connected pilot, configure the server-only values described in [.env.example](.env.example). For sensor collection, see [the sensor guide](docs/sensors.md). For the guarded live SMS route, see [the SMS setup guide](docs/live-jury-sms.md).

## Verification

```sh
npm test
npm run build
```

The test suite covers harvest confirmation, permissions, farm isolation, encryption, SMS signatures and replay handling, sensor ingestion, reference-data provenance and archive safety.

## License and contribution

Terraviva is an evolving product prototype. Contributions should preserve the central promise: make farm data easier to use while keeping the farmer’s agency visible at every step.
