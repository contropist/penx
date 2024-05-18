import { useRef, useState } from 'react'
import { Box } from '@fower/react'
import { Command } from 'cmdk'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { useHandleSelect } from '~/hooks/useHandleSelect'
import { useCommands, useItems, useQueryCommands } from '~/hooks/useItems'
import { useReset } from '~/hooks/useReset'
import { CommandApp } from './CommandApp/CommandApp'
import {
  StyledCommand,
  StyledCommandInput,
  StyledCommandList,
} from './CommandComponents'
import { ListItemUI } from './ListItemUI'
import { ToggleModeButton } from './ToggleModeButton'

const windowHeight = 470
const inputHeight = 54
const footerHeight = 48
const bodyHeight = windowHeight - inputHeight - footerHeight

export const CmdkRoot = () => {
  const [q, setQ] = useState('')
  const { items, developingItems, productionItems, setItems } = useItems()

  console.log('========items:', items)

  // console.log(
  //   '=========developingItems, productionItems:',
  //   developingItems,
  //   productionItems,
  // )

  const { commands } = useCommands()
  const ref = useRef<HTMLInputElement>()

  const { position, isRoot, isCommandApp, setPosition, backToRoot } =
    useCommandPosition()
  const { currentCommand } = useCurrentCommand()
  const handleSelect = useHandleSelect()

  useQueryCommands()

  useReset(setQ)

  return (
    <StyledCommand
      label="Command Menu"
      className="command-panel"
      // shadow="0 16px 70px rgba(0,0,0,.2)"
      w={['100%']}
      column
      absolute
      top-0
      left0
      right0
      bottom0
      zIndex-10000
      // bgNeutral100
      bgWhite
      style={
        {
          // backdropFilter: 'blur(200px)',
        }
      }
      loop
      filter={(value, search) => {
        // console.log('value:', value, 'search:', search)
        return 1
      }}
    >
      <Box toCenterY borderBottom borderGray200>
        {isCommandApp && (
          <Box
            pl3
            mr--8
            cursorPointer
            onClick={() => {
              backToRoot()
            }}
          >
            <ArrowLeft size={20}></ArrowLeft>
          </Box>
        )}
        <StyledCommandInput
          ref={ref as any}
          id="searchBarInput"
          flex-1
          selectNone
          toCenterY
          bgTransparent
          w-100p
          h={inputHeight}
          px3
          placeholderGray400
          textBase
          outlineNone
          placeholder="Search something..."
          autoFocus
          value={q}
          onValueChange={(v) => {
            setQ(v)
            if (v === '') {
              console.log('===========commands:', commands)
              setItems(commands)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // const [a, b = ''] = splitStringByFirstSpace(q)
              // const item = commands.find((item) => item.title === a)
              // if (item) {
              //   handleSelect(item, String(b))
              // }
              if (!q && isCommandApp) {
                backToRoot()
              }
            }
          }}
        />
        <ToggleModeButton mr3 />
      </Box>
      <Box h={bodyHeight} overflowAuto relative>
        {isCommandApp && currentCommand && (
          <StyledCommandList p2>
            <CommandApp />
          </StyledCommandList>
        )}
        {isRoot && (
          <>
            <StyledCommandList p2>
              {developingItems.length > 0 && (
                <Command.Group heading="Development">
                  {developingItems.map((item, index) => {
                    return (
                      <ListItemUI
                        key={index}
                        item={item}
                        onSelect={(item) => handleSelect(item)}
                      />
                    )
                  })}
                </Command.Group>
              )}
              <Command.Group heading={isRoot ? 'Suggestions' : undefined}>
                {isRoot &&
                  productionItems.map((item, index) => {
                    return (
                      <ListItemUI
                        key={index}
                        item={item}
                        onSelect={(item) => handleSelect(item)}
                      />
                    )
                  })}
              </Command.Group>
            </StyledCommandList>
          </>
        )}
      </Box>

      <Box
        data-tauri-drag-region
        h={footerHeight}
        borderTop
        borderNeutral200
        toCenterY
        px4
        toBetween
        bgWhite
      >
        <Image
          src="/logo/128x128.png"
          alt=""
          width={20}
          height={20}
          style={{ borderRadius: 6 }}
        />
        <Box data-tauri-drag-region flex-1 h-100p></Box>
        <Box textSM gray400>
          CMD+K
        </Box>
      </Box>
    </StyledCommand>
  )
}

function splitStringByFirstSpace(str: string) {
  const index = str.indexOf(' ')
  if (index === -1) {
    return [str]
  }

  const firstPart = str.substring(0, index)
  const secondPart = str.substring(index + 1).trim()

  return [firstPart, secondPart]
}
