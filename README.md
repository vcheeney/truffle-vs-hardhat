<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Truffle VS Harhat</h3>

  <p align="center">
    Simple ERC20 token implemented using the <a href="https://trufflesuite.com/">truffle framework</a> and the <a href="https://trufflesuite.com/">hardhat framework</a> to compare both toolsets.
  </p>
</div>

# Table of contents

- [Table of contents](#table-of-contents)
- [Truffle](#truffle)
  - [Commands](#commands)
  - [Tests](#tests)
- [Hardhat](#hardhat)
  - [Commands](#commands-1)
  - [Tests](#tests-1)

# Truffle

- **Installation**: npm install -g truffle ([global unfortunately](https://trufflesuite.com/docs/truffle/quickstart.html#installing-truffle), although we can install it locally and use "npx truffle ..." commands to use a local installation)
- **Network**:
  - Internal network (can be used for testing contracts)
  - Ganache (used for building and testing frontends)

## Commands

- **Compile**: truffle compile
- **Test**: truffle test
- **Migrate?**: truffle migrate (looks like the cmd to deploy, will investigate further though)

## Tests

- **Typescript**: Not much info on the subject (tiny sentence at the end of the docs)
- **Execution speed**: About 250ms to 1000ms per test
  ![truffle-test](misc/truffle-test.png)
- **Compilation frequency**: There must be a way to change that behaviour, I can't imagine, but out of the box smart contracts are ALL recompiled before EVERY tests run.
- **Test structure**: Truffle framework uses its own variation of the describe in chai: contract("name", accounts => {...})

---

# Hardhat

- **Installation**: npm install -D hardhat (in an empty directory => installation is local only for better reproducability)
- **[Network](https://hardhat.org/hardhat-network/)**:
  - Built-in one that automatically spins up when executing tests
  - Can start a persistent one (for the duration of the session) to test a frontend app (npx hardhat node)

## Commands

- **Compile**: npx hardhat compile
- **Test**: npx hardhat test
- **Migrate?**:

## Tests

- **Typescript**: E2E, types are automatically generated for the smart contracts compiled in solidity
- **Execution speed**: Just a few ms per test! ⚡
  ![hardhat-test](misc/hardhat-test.png)
- **Test structure**: Hardhat uses native chai describe and suggest using [waffle](https://getwaffle.io/) to make our tests more elegant. I tried it out and it truly looks promising
  ![chai](misc/chai.png)
