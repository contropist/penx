import { ReactNode } from 'react'
import { Box } from '@fower/react'
import { usePrivy } from '@privy-io/react-auth'
import { Minus, Plus, User } from 'lucide-react'
import { IconDiscord, IconGitHub, IconGoogle, IconTwitter } from '@penx/icons'

export function LinkAccount() {
  const {
    user,
    ready,
    linkGithub,
    linkDiscord,
    linkTwitter,
    unlinkGithub,
    unlinkDiscord,
    unlinkTwitter,
  } = usePrivy()

  if (!user || !ready) return null

  return (
    <Box p6 rounded2XL bgWhite column gap3 dashboardCard>
      <Box toCenterY gap1>
        <User size={20} />
        <Box>Link Providers</Box>
      </Box>

      <Box column gap4>
        <LinkItem
          disabled
          name={user?.google?.name}
          type="Google"
          isLinked={!!user?.google}
          icon={<IconGoogle size={20} fillIndigo500 />}
        />

        <LinkItem
          link={linkGithub}
          unlink={() => unlinkGithub(user?.github?.subject!)}
          name={user?.github?.username}
          isLinked={!!user?.github}
          type="GitHub"
          icon={<IconGitHub size={20} />}
        />

        <LinkItem
          link={linkDiscord}
          unlink={() => unlinkDiscord(user?.discord?.subject!)}
          type="Discord"
          name={user?.discord?.username}
          isLinked={!!user?.discord}
          icon={<IconDiscord size={20} fillIndigo500 />}
        />

        <LinkItem
          link={linkTwitter}
          unlink={() => unlinkTwitter(user?.twitter?.subject!)}
          type="Twitter"
          name={user?.twitter?.username}
          isLinked={!!user?.twitter}
          icon={<IconTwitter size={18} fillWhite />}
        />
      </Box>
    </Box>
  )
}

interface LinkItemProps {
  disabled?: boolean
  link?: any
  unlink?: any
  name?: ReactNode
  type: string
  icon: ReactNode
  isLinked?: boolean
}

function LinkItem({
  name,
  type,
  icon,
  isLinked,
  link,
  unlink,
  disabled,
}: LinkItemProps) {
  return (
    <Box border borderZinc200 h-44 roundedXL toCenterY toBetween w-100p px4>
      <Box toCenterY gap2>
        {icon}
        <Box flex-1 gray600>
          {type}
        </Box>
      </Box>
      <Box toCenterY gap1>
        <Box textSM zinc400>
          {name}
        </Box>
        <Box
          inlineFlex
          bgZinc200={isLinked}
          cursorNotAllowed={disabled}
          bgBrand500={!isLinked}
          cursorPointer={!disabled}
          opacity-80--hover={!disabled}
          mr--6
          roundedLG
          square5
          p1
          toCenter
          onClick={isLinked ? unlink : link}
          disabled={disabled}
        >
          {isLinked ? <Minus /> : <Plus />}
        </Box>
      </Box>
    </Box>
  )
}
