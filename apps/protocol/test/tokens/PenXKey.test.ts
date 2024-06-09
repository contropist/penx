import { expect } from 'chai'
import { Fixture, deployFixture } from '@utils/deployFixture'
import { precision } from '@utils/precision'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'

describe('penXKey', function () {
  let f: Fixture

  beforeEach(async () => {
    f = await deployFixture()
  })

  async function buyKey(account: HardhatEthersSigner) {
    let price = await f.penXKey.getMintPrice()

    await f.penXKey.connect(account).mintKey({
      value: price,
    })
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await f.penXKey.owner()).to.equal(f.deployer.address)
    })

    it('Should set the correct base URI', async function () {
      expect(await f.penXKey.baseURI()).to.equal('https://www.penx.io/api/believer-nft/')
    })
  })

  describe('mintKey', function () {
    it('check user account after minKey()', async function () {
      await buyKey(f.user0)

      expect(await f.penXKey.balanceOf(f.user1.address)).to.equal(1)
      expect(await f.penXKey.totalSupply()).to.equal(1)
    })

    it('check PenXKey balance after minKey()', async function () {
      await buyKey(f.user0)
      let balance = await f.penXKey.getBalance()
      expect(balance).to.equal(await f.penXKey.getPrice(1n))
    })
  })

  describe('burnKey', function () {
    it('burnKey', async function () {
      await buyKey(f.user0)

      expect(await f.penXKey.balanceOf(f.user0.address)).to.equal(1)
      expect(await f.penXKey.totalSupply()).to.equal(1)
      expect(await f.penXKey.maxTokenId()).to.equal(1)

      await buyKey(f.user1)

      expect(await f.penXKey.balanceOf(f.user1.address)).to.equal(1)
      expect(await f.penXKey.totalSupply()).to.equal(2)
      expect(await f.penXKey.maxTokenId()).to.equal(2)

      await buyKey(f.user0)

      // const balanceOfUser0 = await f.penXKey.balanceOf(f.user0.address)

      await f.penXKey.connect(f.user0).burnKey(1n)

      expect(await f.penXKey.totalSupply()).to.equal(2)
      expect(await f.penXKey.maxTokenId()).to.equal(3)
    })

    it.only('check PenXKey balance after minKey()', async function () {
      await buyKey(f.user0)
      let balance = await f.penXKey.getBalance()
      console.log('======balance:', balance)

      expect(balance).to.equal(await f.penXKey.getPrice(1n))

      await f.penXKey.connect(f.user0).burnKey(1n)

      balance = await f.penXKey.getBalance()
      console.log('======balance2:', balance)
    })
  })
})
