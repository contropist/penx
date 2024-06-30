import jetpack from 'fs-jetpack'
import { join } from 'path'
import { Manifest } from '../types/index'

export async function getManifest(): Promise<Manifest> {
  const manifestPath = join(process.cwd(), 'manifest.json')
  const manifest = await jetpack.readAsync(manifestPath, 'json')
  return manifest
}
