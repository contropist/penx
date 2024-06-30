import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Box } from '@fower/react'
import { Command } from '@penx/model'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { useItems, useQueryCommands } from '~/hooks/useItems'
import { useOnWindowMessage } from '~/hooks/useOnWindowMessage'
import { useReset } from '~/hooks/useReset'
import { useValue } from '~/hooks/useValue'
import { CommandApp } from './CommandApp/CommandApp'
import { ListItemUI } from './CommandApp/ListApp/ListItemUI'
import { StyledCommand, StyledCommandGroup, StyledCommandList } from './CommandComponents'
import { CommandItemUI } from './CommandItemUI'
import { CommandPaletteFooter } from './CommandPaletteFooter'
import { BackRootButton } from './SearchBar/BackRootButton'
import { SearchBar } from './SearchBar/SearchBar'

const windowHeight = 470
const searchBarHeight = 54
const footerHeight = 40

export const CommandPalette = () => {
  const { value, setValue } = useValue()

  const { developingItems, commandItems, applicationItems } = useItems()

  const { isRoot, isCommandApp } = useCommandPosition()
  const { currentCommand } = useCurrentCommand()
  const { ui } = useCommandAppUI()

  const { isLoading } = useQueryCommands()

  useOnWindowMessage()

  useReset(setValue)
  const isIframe = isCommandApp && currentCommand?.mode === 'custom-ui'

  const bodyHeight = isIframe ? windowHeight : windowHeight - searchBarHeight - footerHeight

  useEffect(() => {
    const $prerender = document.getElementById('prerender')
    if ($prerender && !isLoading) $prerender.style.display = 'none'
  }, [isLoading])

  if (isLoading) return null

  return (
    <StyledCommand
      disablePointerSelection
      id="command-palette"
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
      // bg="#F6F2F0"
      neutral900
      bgWhite
      style={
        {
          // backdropFilter: 'blur(200px)',
        }
      }
      // loop
      value={value}
      onValueChange={(v) => {
        setValue(v)
      }}
      // shouldFilter={false}
      filter={(value, search) => {
        // console.log('value:', value, 'search:', search)
        return 1
      }}
    >
      {isIframe && (
        <Box
          data-tauri-drag-region
          absolute
          top0
          left0
          toCenterY
          toRight
          w={searchBarHeight - 16}
          h={searchBarHeight}
          zIndex-10000
        >
          <BackRootButton
            data-tauri-drag-region
            zIndex-100
            square6
            roundedXL
            bgNeutral900--T94
            bgNeutral900--T94--hover
          />
        </Box>
      )}
      {!isIframe && <SearchBar searchBarHeight={searchBarHeight} />}
      <Box
        h={bodyHeight}
        overflowAuto
        relative
        style={{
          overscrollBehavior: 'contain',
          scrollPaddingBlockEnd: 40,
        }}
      >
        {isCommandApp &&
          currentCommand &&
          (currentCommand.mode === 'custom-ui' ? (
            <Box relative h-100p>
              <Box
                as="iframe"
                id="command-app-iframe"
                width="100%"
                height="100%"
                p0
                m0
                absolute
                top0
                zIndex-99
                // src='https://penx.io'
              />
            </Box>
          ) : (
            <StyledCommandList p2 minH-100p relative>
              <CommandApp ui={ui} currentCommand={currentCommand} />
              <ErrorBoundary
                fallback={
                  <Box toCenter h-100p red500>
                    Please reload App
                  </Box>
                }
              ></ErrorBoundary>
            </StyledCommandList>
          ))}
        {isRoot && (
          <StyledCommandList p2>
            {developingItems.length > 0 && (
              <StyledCommandGroup heading="Development">
                {developingItems.map((item, index) => {
                  return <CommandItemUI key={index} index={index} item={item} />
                })}
              </StyledCommandGroup>
            )}
            <ListGroup heading="Commands" items={commandItems} />

            {/* Support databases in future  */}
            {/* 
            <ListGroup
              heading="Databases"
              items={databaseItems}
            /> */}

            <ListGroup heading="Applications" items={applicationItems.slice(0, 20)} />
          </StyledCommandList>
        )}
      </Box>
      {!isIframe && <CommandPaletteFooter footerHeight={footerHeight} />}
    </StyledCommand>
  )
}

interface ListGroupProps {
  heading: string
  items: Command[]
}

function ListGroup({ heading, items }: ListGroupProps) {
  return (
    <StyledCommandGroup heading={heading}>
      {items.map((item, index) => {
        return <CommandItemUI key={index} index={index} item={item} />
      })}
    </StyledCommandGroup>
  )
}
