const BasicToken = artifacts.require("BasicToken");

require("chai").use(require("chai-as-promised")).should();
const EVM_REVERT = "Exception while processing transaction: revert";

contract("BasicToken", (accounts) => {
  const totalSupply = 1000;
  const transferAmount = 7;
  let token;
  const wallet = {
    address: accounts[0],
  };
  const walletTo = {
    address: accounts[1],
  };

  beforeEach(async () => {
    token = await BasicToken.new(totalSupply);
  });

  it("Sets the total supply", async () => {
    expect(totalSupply).to.be.equal(totalSupply);
  });

  it("Assigns initial balance to deployer", async () => {
    const balance = await token.balanceOf(wallet.address);
    expect(balance.toString()).to.equal(totalSupply.toString());
  });

  it("Transfer adds amount to destination account", async () => {
    await token.transfer(walletTo.address, transferAmount);
    const balance = await token.balanceOf(walletTo.address);
    expect(balance.toString()).to.equal(transferAmount.toString());
  });

  it("Transfer emits event", async () => {
    const result = await token.transfer(walletTo.address, transferAmount);
    const transferEvent = result.logs[0];
    expect(transferEvent.event).to.equal("Transfer");
    expect(transferEvent.args.from).to.equal(wallet.address);
    expect(transferEvent.args.to).to.equal(walletTo.address);
    expect(transferEvent.args.value.toString()).to.equal(
      transferAmount.toString()
    );
  });

  it("Can not transfer above the amount", async () => {
    await token
      .transfer(walletTo.address, 1007)
      .should.be.rejectedWith(EVM_REVERT);
  });

  it("Can not transfer from empty account", async () => {
    await token
      .transfer(wallet.address, 1, { from: walletTo.address })
      .should.be.rejectedWith(EVM_REVERT);
  });
});
