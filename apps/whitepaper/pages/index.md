# PenX Whitepaper

## Introduction

PenX is a cross-platform productivity App built on open-source and Web3.

PenX Protocol is a decentralized protocol enabling open-source contributors to capture the value they generate within the PenX App.

## Problem

For the past 80 years, open-source software developers have not been properly compensated for their work. Even though open-source software is widely used and very important, traditional funding and reward systems have not given developers enough incentives.

## Mission

PenX is a bold experiment in merging Web3 with open-source software, aiming to create a sustainable and rewarding ecosystem for developers and users alike.

## Payment Design

Traditional SaaS services typically use a subscription-based payment model. PenX, however, employs an innovative approach that we call "Staking as Payment.".

How it works? When you need to use PenX's premium features, you stake a certain amount of ETH and receive a KEY token. Possessing this KEY token grants you lifetime access to the PenX App. You can withdraw your staked ETH at any time, but your KEY token will be destroyed, and you will lose access to the premium features of the PenX App.

In short: Stake when you need, and withdraw when you want.

## Pricing of Key

How do we price the Key? PenX employs a unique pricing model similar to Friend's KEY, defined by the following bonding curve:

```
Price = log(0.00102 * x + 1) + 0.1024
```

This model ensures a fair and transparent pricing mechanism for the protocol's key features.

<!-- ![curve](/images/curve.png) -->

![curve](/images/curve.svg)

## Tokenomics

### Token allocation

The total supply of $PENX tokens is 10 billion, allocated as follows:

- **51%** to PenX community members
  -Key holder
  - Extension developer
  - Sponsor to open source project
  - Curator
  - AI token provider
  - Sync server provider
- **25%** to past and future core contributors
- **19%** to investors with 4 year vesting
- **4%** Liquidity Provision
- **1%** to advisors with 4 year vesting

![penx](/images/allocation.png)

This distribution ensures a balanced and sustainable ecosystem, with a majority of tokens allocated to the key stakeholders driving the project's growth and success.

### Tokenomics design

![penx](/images/tokenomic-no-bg.png)

## Participants

The PenX ecosystem comprises three main participants:

1. **Core contributors**: Initiate and manage projects within the PenX ecosystem.
2. **Extension Developers**: Create and maintain extension, enhancing the functionality of PenX.
3. **General Users**: Utilize the software.

## Community

PenX community:

- [Discord](https://discord.gg/nyVpH9njDu)
- [Twitter](https://twitter.com/coder_zion)
- [GitHub](https://github.com/penxio/penx)
