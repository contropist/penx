import { PropsWithChildren, useRef } from 'react'
import { Command } from 'cmdk'
import { useValue } from '../hooks/useValue'
import { ListAppFooter } from './ListAppFooter'

interface ListAppProps {
  isLoading?: boolean
}

export const ListApp = ({
  isLoading,
  children,
}: PropsWithChildren<ListAppProps>) => {
  const { value, setValue } = useValue()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)

  return (
    <Command
      className="h-full"
      value={value}
      onValueChange={(v) => {
        setValue(v)
      }}
    >
      <style>
        {`

        [list-app-loader] {
          border: 0;
          width: 100%;
          height: 1px;
          background: transparent;
          position: absolute;
          bottom: -1px;
          overflow: visible;
          display: block;
          margin: 0;
          z-index: 10;
        }

        [list-app-loader]:after {
          content: '';
          width: 50%;
          height: 1px;
          position: absolute;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #333 40%,
            transparent 100%
          );
          top: -1px;
          opacity: 0;
          animation-duration: 1.5s;
          animation-delay: 1s;
          animation-timing-function: ease;
          animation-name: listAppLoading;
          animation-iteration-count: infinite;
        }

        @keyframes listAppLoading {
          0% {
            opacity: 0;
            transform: translateX(0);
          }

          50% {
            opacity: 1;
            transform: translateX(100%);
          }

          100% {
            opacity: 0;
            transform: translateX(0);
          }
        }
      `}
      </style>
      <div className="relative border-b border-b-neutral-200 h-[54] bg-amber-200">
        <Command.Input
          ref={inputRef}
          autoFocus
          placeholder="Search..."
          className="w-full outline-none h-full pr-4 pl-[50]"
        />

        {isLoading && <hr list-app-loader="" />}
      </div>
      <Command.List ref={listRef} className="p-2 h-[376] overflow-auto">
        {isLoading && (
          <Command.Loading className="h-full flex items-center justify-center text-neutral-400 text-sm">
            Hang on...
          </Command.Loading>
        )}
        {children}
      </Command.List>
      <ListAppFooter listRef={listRef} inputRef={inputRef} />
    </Command>
  )
}
