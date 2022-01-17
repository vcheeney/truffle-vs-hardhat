import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BasicToken } from "../typechain";

describe("BasicToken", () => {
  const totalSupply = 1000;
  const transferAmount = 7;
  let token: BasicToken;
  let wallet: SignerWithAddress;
  let walletTo: SignerWithAddress;

  beforeEach(async () => {
    const BasicTokenFactory = await ethers.getContractFactory("BasicToken");
    token = await BasicTokenFactory.deploy(totalSupply);
    const accounts = await ethers.getSigners();
    wallet = accounts[0];
    walletTo = accounts[1];
  });

  it("Sets the total supply", async () => {
    expect(await token.totalSupply()).to.be.equal(totalSupply);
  });

  it("Assigns initial balance to deployer", async () => {
    expect(await token.balanceOf(wallet.address)).to.equal(totalSupply);
  });

  it("Transfer adds amount to destination account", async () => {
    await token.transfer(walletTo.address, transferAmount);
    expect(await token.balanceOf(walletTo.address)).to.equal(transferAmount);
  });

  it("Transfer emits event (waffle syntax)", async () => {
    await expect(token.transfer(walletTo.address, transferAmount))
      .to.emit(token, "Transfer")
      .withArgs(wallet.address, walletTo.address, transferAmount);
  });

  it("Transfer emits event (no waffle syntax)", async () => {
    const transaction = await token.transfer(walletTo.address, transferAmount);
    const result = await transaction.wait();
    const event = result.events!.pop()!;
    expect(event.event).to.equal("Transfer");
    expect(event.args!.from).to.equal(wallet.address);
    expect(event.args!.to).to.equal(walletTo.address);
    expect(event.args!.value).to.equal(transferAmount);
  });

  it("Can not transfer above the amount", async () => {
    await expect(token.transfer(walletTo.address, 1007)).to.be.reverted;
  });

  it("Can not transfer from empty account", async () => {
    const tokenFromOtherWallet = token.connect(walletTo);
    await expect(tokenFromOtherWallet.transfer(wallet.address, 1)).to.be
      .reverted;
  });
});
