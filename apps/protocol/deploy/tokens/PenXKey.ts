import { DeployFunctionOptions, createDeployFunction } from '../../utils/deploy'

const baseURI = 'https://www.penx.io/api/believer-nft/'

export const options: DeployFunctionOptions = {
  contractName: 'PenXKey',
  dependencyNames: [],
  getDeployArgs({ dependencyContracts, namedAccounts }) {
    // return [dependencyContracts.DaoVault.address]
    return [namedAccounts.deployer, baseURI]
  },
}

export default createDeployFunction(options)
