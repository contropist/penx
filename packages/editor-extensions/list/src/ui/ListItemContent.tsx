import React, { CSSProperties, forwardRef, memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import { mergeRefs } from 'react-merge-refs'
import { useSortable } from '@dnd-kit/sortable'
import { Box, CSSObject } from '@fower/react'
import { isCheckListItem } from '@penx/check-list'
import { useContextMenu } from '@penx/context-menu'
import { TElement, useEditorStatic } from '@penx/editor-common'
import { findNodePath, getNodeByPath } from '@penx/editor-queries'
import { ElementProps } from '@penx/extension-typings'
import { NodeType } from '@penx/model-types'
import { ListContentElement } from '../types'
import { Bullet } from './Bullet'
import { BulletMenu } from './BulletMenu'
import { Chevron } from './Chevron'

interface Props extends ElementProps<ListContentElement> {
  style?: CSSProperties
  css?: CSSObject
  listeners?: ReturnType<typeof useSortable>['listeners']
}

export const ListItemContent = memo(
  forwardRef<HTMLDivElement, Props>(function ListItemContent(
    {
      attributes,
      element,
      children,
      nodeProps,
      css = {},
      style = {},
      listeners,
    },
    ref,
  ) {
    const editor = useEditorStatic()
    const path = useMemo(
      () => findNodePath(editor, element)!,
      [element, editor],
    )
    const child = getNodeByPath(editor, [...path, 0]) as TElement
    const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(child?.type)

    const nodeType = element.nodeType!
    const isDaily = nodeType === NodeType.DAILY

    function h() {
      // if (isTask) return 'calc(1.5em + 2px)'
      return isHeading ? 'calc(1em)' : 'calc(1.5em + 6px)'
    }

    const nodeId = element.id
    const menuId = `lic-menu-${nodeId}`
    const { show } = useContextMenu(menuId)
    const isTask = isCheckListItem(child)

    const draggable = !isDaily

    const childCount = useMemo(() => {
      if (!isDaily) return 0
      return editor.items.filter((item) => item.date === element.date).length
    }, [isDaily, editor.items, element.date])

    return (
      <>
        <Box
          {...attributes}
          ref={mergeRefs([ref, attributes.ref])}
          data-type="list-item-content"
          m0
          // leadingNormal
          // leadingRelaxed
          textBase
          relative
          h-100p
          // toTop={!isTask}
          px1
          py0
          {...nodeProps}
          css={css}
          style={style}
          className="nodeContent"
        >
          <Box
            absolute
            // top-0={!isTask}
            // top--1={isTask}
            w-40
            left--40
            contentEditable={false}
            toCenterY
            toRight
            // flexShrink-0
            gap-2
            h={h()}
            textSM
            text3XL={child?.type === 'h1'}
            text2XL={child?.type === 'h2'}
            textXL={child?.type === 'h3'}
            textLG={child?.type === 'h4'}
            style={{
              userSelect: 'none',
            }}
            // bgAmber100
            // ringPurple500
          >
            <BulletMenu
              menuId={menuId}
              path={path}
              nodeType={nodeType}
              id={nodeId}
            />

            <Chevron
              path={path}
              id={nodeId}
              collapsed={element.collapsed}
              onContextMenu={show}
            />

            <Box inlineFlex {...(draggable ? listeners : {})}>
              <Bullet element={element} onContextMenu={show} editor={editor} />
            </Box>
          </Box>

          {isDaily && (
            <Box flex-1 pl1 leadingRelaxed toCenterY gap2>
              <Box>{children}</Box>
              {childCount > 0 && (
                <Box
                  contentEditable={false}
                  bgGray100
                  gray400
                  px2
                  h-18
                  roundedFull
                  textXS
                >
                  {childCount}
                </Box>
              )}
            </Box>
          )}

          {!isDaily && (
            <Box
              flex-1
              pl1
              leadingRelaxed
              // bgGreen100
              // ringAmber500
            >
              {children}
            </Box>
          )}
        </Box>
      </>
    )
  }),

  (prev, next) => {
    const {
      element: a1,
      css: b1,
      style: c1,
      nodeProps: d1,
      children: f1,
    } = prev
    const {
      element: a2,
      css: b2,
      style: c2,
      nodeProps: d2,
      children: f2,
    } = next

    const equal =
      isEqual(a1, a2) &&
      isEqual(b1, b2) &&
      isEqual(c1, c2) &&
      isEqual(d1, d2) &&
      isEqual(f1, f2)

    return equal
  },
)
