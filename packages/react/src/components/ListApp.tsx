import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Command } from 'cmdk'
import { loaderStyle } from '../common/constants'
import { detailMap } from '../common/store'
import { useValue } from '../hooks/useValue'
import { ListAppFooter } from './ListAppFooter'

interface ListAppProps {
  isLoading?: boolean
  isDetailVisible?: boolean
}

export const ListApp = ({
  isLoading,
  isDetailVisible,
  children,
}: PropsWithChildren<ListAppProps>) => {
  const { value, setValue } = useValue()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)

  return (
    <Command
      className="h-full bg-white dark:bg-neutral-900 black dark:text-white"
      value={value}
      onValueChange={(v) => {
        setValue(v)
      }}
    >
      <style>{loaderStyle}</style>
      <div className="relative border-b border-b-neutral-200 dark:border-b-neutral-800 h-[54] ">
        <Command.Input
          ref={inputRef}
          autoFocus
          placeholder="Search..."
          className="w-full outline-none h-full pr-4 pl-[50] bg-white dark:bg-neutral-900"
        />

        {isLoading && <hr list-app-loader="" />}
      </div>
      <Command.List ref={listRef} className="h-[376] relative">
        <div className="flex flex-row w-full overflow-hidden absolute top-0 bottom-0 left-0 right-0">
          <Command.Group
            className={`overflow-auto p-2 ${isDetailVisible ? 'w-[280]' : 'w-full'}`}
          >
            {isLoading && (
              <Command.Loading className="h-full flex items-center justify-center text-neutral-400 text-sm">
                Loading...
              </Command.Loading>
            )}
            {children}
          </Command.Group>

          {isDetailVisible && (
            <>
              <div className=" bg-neutral-200 w-[1] h-full" />
              <Detail />
            </>
          )}
        </div>
      </Command.List>
      <ListAppFooter listRef={listRef} inputRef={inputRef} />
    </Command>
  )
}

function Detail() {
  const { value } = useValue()
  const [content, setContent] = useState<any>()
  useEffect(() => {
    setContent(detailMap.get(value))
  }, [value])

  return <div className="flex-1 overflow-auto p-2">{content}</div>
}
