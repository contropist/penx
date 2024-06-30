import { invoke } from '@tauri-apps/api/core'
import { platform } from '@tauri-apps/plugin-os'
import { AppInfo, CommandType, TCommand } from '../models'

export function openTrash() {
  return invoke<void>('plugin:jarvis|open_trash')
}

export function emptyTrash() {
  return invoke<void>('plugin:jarvis|empty_trash')
}

export function shutdown() {
  return invoke<void>('plugin:jarvis|shutdown')
}

export function reboot() {
  return invoke<void>('plugin:jarvis|reboot')
}

export function sleep() {
  return invoke<void>('plugin:jarvis|sleep')
}

export function toggleSystemAppearance() {
  return invoke<void>('plugin:jarvis|toggle_system_appearance')
}

export function showDesktop() {
  return invoke<void>('plugin:jarvis|show_desktop')
}

export function quitAllApps() {
  return invoke<void>('plugin:jarvis|quit_app_apps')
}

export function sleepDisplays() {
  return invoke<void>('plugin:jarvis|sleep_displays')
}

export function setVolume(percentage: number) {
  return invoke<void>('plugin:jarvis|set_volume', { percentage })
}

export function setVolumeTo0(): Promise<void> {
  return setVolume(0)
}

export function setVolumeTo25(): Promise<void> {
  return setVolume(25)
}

export function setVolumeTo50(): Promise<void> {
  return setVolume(50)
}

export function setVolumeTo75(): Promise<void> {
  return setVolume(75)
}

export function setVolumeTo100(): Promise<void> {
  return setVolume(100)
}

export function turnVolumeUp() {
  return invoke<void>('plugin:jarvis|turn_volume_up')
}

export function turnVolumeDown() {
  return invoke<void>('plugin:jarvis|turn_volume_down')
}

export function toggleStageManager() {
  return invoke<void>('plugin:jarvis|toggle_stage_manager')
}

export function toggleBluetooth() {
  return invoke<void>('plugin:jarvis|toggle_bluetooth')
}

export function toggleHiddenFiles() {
  return invoke<void>('plugin:jarvis|toggle_hidden_files')
}

export function ejectAllDisks() {
  return invoke<void>('plugin:jarvis|eject_all_disks')
}

export function logoutUser() {
  return invoke<void>('plugin:jarvis|logout_user')
}

export function toggleMute() {
  return invoke<void>('plugin:jarvis|toggle_mute')
}

export function mute() {
  return invoke<void>('plugin:jarvis|mute')
}

export function unmute() {
  return invoke<void>('plugin:jarvis|unmute')
}

export function getFrontmostApp() {
  return invoke<AppInfo>('plugin:jarvis|get_frontmost_app').then((app) =>
    AppInfo.parse(app),
  )
}

export function hideAllAppsExceptFrontmost() {
  return invoke<void>('plugin:jarvis|hide_all_apps_except_frontmost')
}

export function getSelectedFilesInFileExplorer() {
  return invoke<string[]>('plugin:jarvis|get_selected_files_in_file_explorer')
}

export const rawSystemCommands = [
  {
    name: 'Open Trash',
    icon: 'uil:trash',
    confirmRequired: false,
    function: openTrash,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Empty Trash',
    icon: 'uil:trash',
    confirmRequired: true,
    function: emptyTrash,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Shutdown',
    icon: 'mdi:shutdown',
    confirmRequired: true,
    function: shutdown,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Reboot',
    icon: 'mdi:restart',
    confirmRequired: true,
    function: reboot,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Sleep',
    icon: 'carbon:asleep',
    confirmRequired: false,
    function: sleep,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Toggle System Appearance',
    icon: 'line-md:light-dark',
    confirmRequired: false,
    function: toggleSystemAppearance,
    platforms: ['macos'],
  },
  {
    name: 'Show Desktop',
    icon: 'bi:window-desktop',
    confirmRequired: false,
    function: showDesktop,
    platforms: ['macos'],
  },
  {
    name: 'Quit App',
    icon: 'charm:cross',
    confirmRequired: false,
    function: quitAllApps,
    platforms: ['macos'],
  },
  {
    name: 'Sleep Displays',
    icon: 'solar:display-broken',
    confirmRequired: false,
    function: sleepDisplays,
    platforms: ['macos'],
  },
  {
    name: 'Set Volume to 0%',
    icon: 'flowbite:volume-mute-outline',
    confirmRequired: false,
    function: setVolumeTo0,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Set Volume to 25%',
    icon: 'flowbite:volume-down-solid',
    confirmRequired: false,
    function: setVolumeTo25,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Set Volume to 50%',
    icon: 'flowbite:volume-down-solid',
    confirmRequired: false,
    function: setVolumeTo50,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Set Volume to 75%',
    icon: 'flowbite:volume-down-solid',
    confirmRequired: false,
    function: setVolumeTo75,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Set Volume to 100%',
    icon: 'flowbite:volume-up-solid',
    confirmRequired: false,
    function: setVolumeTo100,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Turn Volume Up',
    icon: 'flowbite:volume-down-solid',
    confirmRequired: false,
    function: turnVolumeUp,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Turn Volume Down',
    icon: 'flowbite:volume-down-outline',
    confirmRequired: false,
    function: turnVolumeDown,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Toggle Mute',
    icon: 'flowbite:volume-down-outline',
    confirmRequired: false,
    function: toggleMute,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Mute',
    icon: 'flowbite:volume-mute-solid',
    confirmRequired: false,
    function: mute,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Unmute',
    icon: 'flowbite:volume-mute-solid',
    confirmRequired: false,
    function: unmute,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Toggle Stage Manager',
    icon: 'material-symbols:dashboard',
    confirmRequired: false,
    function: toggleStageManager,
    platforms: [],
  },
  {
    name: 'Toggle Bluetooth',
    icon: 'material-symbols:bluetooth',
    confirmRequired: false,
    function: toggleBluetooth,
    platforms: [],
  },
  {
    name: 'Toggle Hidden Files',
    icon: 'mdi:hide',
    confirmRequired: false,
    function: toggleHiddenFiles,
    platforms: [],
  },
  {
    name: 'Eject All Disks',
    icon: 'ph:eject-fill',
    confirmRequired: true,
    function: ejectAllDisks,
    platforms: ['macos'],
  },
  {
    name: 'Log Out User',
    icon: 'ic:baseline-logout',
    confirmRequired: false,
    function: logoutUser,
    platforms: ['macos', 'linux'],
  },
  {
    name: 'Hide All Apps Except Frontmost',
    icon: 'mdi:hide',
    confirmRequired: false,
    function: hideAllAppsExceptFrontmost,
    platforms: [],
  },
]

export async function getSystemCommands(): Promise<TCommand[]> {
  return rawSystemCommands
    .filter(async (cmd) => cmd.platforms.includes(await platform())) // Filter out system commands that are not supported on the current platform
    .map((cmd) => ({
      name: cmd.name,
      value: 'system-cmd' + cmd.name.split(' ').join('-').toLowerCase(),
      icon: cmd.icon,
      keywords: cmd.name.split(' '),
      commandType: CommandType.Enum.system,
      function: cmd.function,
      confirmRequired: cmd.confirmRequired,
    }))
}
